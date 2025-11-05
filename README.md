# My Blog

A simple, elegant blog site built with vanilla HTML, CSS, and JavaScript. Deployed with GitHub Pages.

## Features

- Clean, minimalist design with vanilla ice cream colored background
- Responsive layout with mobile hamburger menu
- Markdown blog posts with YAML front matter
- Automatic blog list sorted by date (newest first)
- Client-side rendering, no build step required

## How to Add a New Blog Post

1. Create a new `.md` file in the `blogs/` directory
2. Add YAML front matter at the top with title and date:

```markdown
---
title: Your Blog Post Title
date: 2025-01-15
---

# Your Blog Post Title

Your content goes here...
```

3. Write your post content in markdown
4. Commit and push to GitHub:

```bash
git add blogs/your-post.md
git commit -m "Add new blog post"
git push
```

5. Your blog will automatically update on GitHub Pages!

## Front Matter Fields

Required fields:
- `title`: The title of your blog post
- `date`: Publication date in YYYY-MM-DD format

## Local Development

To preview locally, you'll need to run a local web server (due to CORS restrictions when fetching files):

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## GitHub Pages Setup

1. Go to your repository settings
2. Navigate to Pages section
3. Set source to "Deploy from a branch"
4. Select the `main` branch and `/ (root)` folder
5. Save

Your site will be available at `https://yourusername.github.io/repositoryname/`

## Customization

- Edit `index.html` to change the About Me content
- Modify `styles.css` to adjust colors, fonts, or layout
- Update `app.js` to change functionality or add features

## Technologies Used

- [Marked.js](https://marked.js.org/) - Markdown parser
- [js-yaml](https://github.com/nodeca/js-yaml) - YAML front matter parser
- Roboto font from Google Fonts
- Pure vanilla JavaScript, no frameworks
