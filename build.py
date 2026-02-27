#!/usr/bin/env python3
"""Static site generator for harrykeen.com.

Reads blogs/manifest.json and converts markdown posts to static HTML pages.
Generates index.html (About Me) and posts/{slug}.html for each blog post.
"""

import json
import os
from datetime import datetime

import markdown

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="stylesheet" href="{css_path}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="hamburger" id="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="container">
        <aside class="sidebar" id="sidebar">
            <nav id="me-nav">
                <a href="/" class="blog-link{me_active}">
                    <div class="blog-title">About Me</div>
                </a>
            </nav>
            <h2>Posts</h2>
            <nav id="blog-list">
                {sidebar_links}
            </nav>
        </aside>

        <main class="content">
            {content}
        </main>
    </div>

    <script>
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.getElementById('hamburger');
        hamburger.addEventListener('click', () => {{
            sidebar.classList.toggle('open');
            hamburger.classList.toggle('active');
        }});
        document.addEventListener('click', (e) => {{
            if (window.innerWidth <= 768) {{
                if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {{
                    sidebar.classList.remove('open');
                    hamburger.classList.remove('active');
                }}
            }}
        }});
    </script>
</body>
</html>"""


def format_date(date_string):
    """Format a date string like 'January 15, 2026'."""
    dt = datetime.strptime(date_string, "%Y-%m-%d")
    return dt.strftime("%B %d, %Y").replace(" 0", " ")


def slug_from_filename(filename):
    """Convert 'my-post.md' to 'my-post'."""
    return os.path.splitext(filename)[0]


def build_sidebar_links(posts, active_slug=None):
    """Generate sidebar HTML links for all posts."""
    links = []
    for post in posts:
        slug = slug_from_filename(post["filename"])
        active = " active" if slug == active_slug else ""
        links.append(
            f'<a href="/posts/{slug}.html" class="blog-link{active}">'
            f'<div class="blog-title">{post["title"]}</div>'
            f'<div class="blog-date">{format_date(post["date"])}</div>'
            f"</a>"
        )
    return "\n                ".join(links)


def render_page(title, content, posts, css_path, active_slug=None, is_about=False):
    """Render a full HTML page from the template."""
    me_active = " active" if is_about else ""
    sidebar_links = build_sidebar_links(posts, active_slug)

    return TEMPLATE.format(
        title=title,
        css_path=css_path,
        me_active=me_active,
        sidebar_links=sidebar_links,
        content=content,
    )


def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Load manifest
    with open(os.path.join(base_dir, "blogs", "manifest.json")) as f:
        manifest = json.load(f)

    # Sort posts newest first
    posts = sorted(manifest["posts"], key=lambda p: p["date"], reverse=True)

    md = markdown.Markdown(extensions=["tables"])

    # Create posts directory
    posts_dir = os.path.join(base_dir, "posts")
    os.makedirs(posts_dir, exist_ok=True)

    # Generate index.html (About Me) from about.md
    with open(os.path.join(base_dir, "about.md")) as f:
        about_md = f.read()

    md.reset()
    about_html = md.convert(about_md)
    about_content = f'<div class="about">\n            {about_html}\n        </div>'

    index_html = render_page(
        title="Harry Keen",
        content=about_content,
        posts=posts,
        css_path="styles.css",
        is_about=True,
    )

    with open(os.path.join(base_dir, "index.html"), "w") as f:
        f.write(index_html)
    print("Generated index.html")

    # Generate each blog post page
    for post in posts:
        slug = slug_from_filename(post["filename"])
        md_path = os.path.join(base_dir, "blogs", post["filename"])

        with open(md_path) as f:
            md_content = f.read()

        md.reset()
        html_content = md.convert(md_content)

        page_content = f"""<article>
                <h1>{post["title"]}</h1>
                <span class="post-date">{format_date(post["date"])}</span>
                <div class="post-content">
                    {html_content}
                </div>
            </article>"""

        page_html = render_page(
            title=f'{post["title"]} - Harry Keen',
            content=page_content,
            posts=posts,
            css_path="../styles.css",
            active_slug=slug,
        )

        output_path = os.path.join(posts_dir, f"{slug}.html")
        with open(output_path, "w") as f:
            f.write(page_html)
        print(f"Generated posts/{slug}.html")

    print(f"\nDone! Generated {len(posts) + 1} pages.")


if __name__ == "__main__":
    main()
