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

// Fetch the list of blog posts from the manifest
async function loadBlogList() {
    try {
        // Fetch the blog manifest file
        const response = await fetch('blogs/manifest.json');
        const data = await response.json();

        // Sort by date (newest first)
        blogPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));

        renderBlogList();
    } catch (error) {
        console.error('Error loading blog list:', error);
        blogList.innerHTML = '<p class="loading">No blog posts found. Add .md files to the blogs/ directory and update manifest.json.</p>';
    }
}

// Render the blog list in the sidebar
function renderBlogList() {
    if (blogPosts.length === 0) {
        blogList.innerHTML = '<p class="loading">No blog posts found.</p>';
        return;
    }

    blogList.innerHTML = blogPosts.map(post => `
        <a href="#/post/${post.filename}" class="blog-link" data-filename="${post.filename}">
            <div class="blog-title">${post.title}</div>
            <div class="blog-date">${formatDate(post.date)}</div>
        </a>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.blog-link').forEach(link => {
        link.addEventListener('click', (e) => {
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
        // Find metadata from the blogPosts array (loaded from manifest)
        const post = blogPosts.find(p => p.filename === filename);
        if (!post) {
            throw new Error('Post not found in manifest');
        }

        // Fetch the markdown content
        const response = await fetch(`blogs/${filename}`);
        const markdownContent = await response.text();

        // Render markdown to HTML
        const htmlContent = marked.parse(markdownContent);

        // Display the blog post
        content.innerHTML = `
            <article>
                <h1>${post.title}</h1>
                <span class="post-date">${formatDate(post.date)}</span>
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

// Handle hash changes for navigation
function handleHashChange() {
    const hash = window.location.hash;

    // Parse hash like #/post/filename.md
    if (hash.startsWith('#/post/')) {
        const filename = hash.replace('#/post/', '');
        loadBlogPost(filename);

        // Update active state in sidebar
        document.querySelectorAll('.blog-link').forEach(link => {
            if (link.getAttribute('data-filename') === filename) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Initialize the app
async function initApp() {
    await loadBlogList();

    // Check if there's a hash in the URL on page load
    if (window.location.hash) {
        handleHashChange();
    } else if (blogPosts.length > 0) {
        // If no hash, load the first (most recent) post
        const firstPost = blogPosts[0];
        window.location.hash = `/post/${firstPost.filename}`;
    }
}

// Listen for hash changes (back/forward navigation, direct hash changes)
window.addEventListener('hashchange', handleHashChange);

// Start the app
initApp();
