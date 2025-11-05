// Blog post data
let blogPosts = [];

// DOM elements
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const blogList = document.getElementById('blog-list');
const content = document.getElementById('content');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active');
        }
    }
});

// Parse front matter from markdown content
function parseFrontMatter(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);

    if (match) {
        try {
            const frontMatter = jsyaml.load(match[1]);
            const markdown = match[2];
            return { frontMatter, markdown };
        } catch (e) {
            console.error('Error parsing front matter:', e);
            return { frontMatter: {}, markdown: content };
        }
    }

    return { frontMatter: {}, markdown: content };
}

// Fetch the list of blog posts from the blogs directory
async function loadBlogList() {
    try {
        // Fetch the blogs directory listing from GitHub
        const response = await fetch('blogs/');
        const text = await response.text();

        // Parse HTML to extract .md file links
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
            .map(a => a.getAttribute('href'))
            .filter(href => href && href.endsWith('.md'));

        // Fetch each blog post to get its metadata
        const posts = await Promise.all(
            links.map(async (filename) => {
                try {
                    const response = await fetch(`blogs/${filename}`);
                    const content = await response.text();
                    const { frontMatter } = parseFrontMatter(content);

                    return {
                        filename,
                        title: frontMatter.title || filename.replace('.md', ''),
                        date: frontMatter.date || new Date().toISOString().split('T')[0],
                        ...frontMatter
                    };
                } catch (e) {
                    console.error(`Error loading ${filename}:`, e);
                    return null;
                }
            })
        );

        // Filter out failed loads and sort by date (newest first)
        blogPosts = posts
            .filter(post => post !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        renderBlogList();
    } catch (error) {
        console.error('Error loading blog list:', error);
        blogList.innerHTML = '<p class="loading">No blog posts found. Add .md files to the blogs/ directory.</p>';
    }
}

// Render the blog list in the sidebar
function renderBlogList() {
    if (blogPosts.length === 0) {
        blogList.innerHTML = '<p class="loading">No blog posts found.</p>';
        return;
    }

    blogList.innerHTML = blogPosts.map(post => `
        <a href="#" class="blog-link" data-filename="${post.filename}">
            <div class="blog-title">${post.title}</div>
            <div class="blog-date">${formatDate(post.date)}</div>
        </a>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.blog-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const filename = link.getAttribute('data-filename');
            await loadBlogPost(filename);

            // Update active state
            document.querySelectorAll('.blog-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Load and render a specific blog post
async function loadBlogPost(filename) {
    try {
        const response = await fetch(`blogs/${filename}`);
        const markdownContent = await response.text();
        const { frontMatter, markdown } = parseFrontMatter(markdownContent);

        // Render markdown to HTML
        const htmlContent = marked.parse(markdown);

        // Display the blog post
        content.innerHTML = `
            <article>
                <h1>${frontMatter.title || filename.replace('.md', '')}</h1>
                <span class="post-date">${formatDate(frontMatter.date)}</span>
                <div class="post-content">
                    ${htmlContent}
                </div>
            </article>
        `;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading blog post:', error);
        content.innerHTML = '<p>Error loading blog post.</p>';
    }
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize the app
loadBlogList();
