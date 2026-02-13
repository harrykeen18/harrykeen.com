# My Blog

A simple, elegant blog site built with vanilla HTML, CSS, and JavaScript. Deployed with GitHub Pages.

## Features

- Clean, minimalist design with vanilla ice cream colored background
- Responsive layout with mobile hamburger menu
- Markdown blog posts with centralized manifest
- Automatic blog list sorted by date (newest first)
- Client-side rendering, no build step required

## How to Add a New Blog Post

1. Create a new `.md` file in the `blogs/` directory with your content
2. Add an entry to `blogs/manifest.json`:

```json
{
  "filename": "your-post.md",
  "title": "Your Blog Post Title",
  "date": "2025-01-15"
}
```

3. Commit and push to GitHub:

```bash
git add blogs/your-post.md blogs/manifest.json
git commit -m "Add new blog post"
git push
```

4. Your blog will automatically update on GitHub Pages!

## Manifest Fields

Required fields for each post in `manifest.json`:
- `filename`: The markdown file name in the `blogs/` directory
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

# Furture blog ideas

The new PM paradigm
- Everyones talking about text to code, but no one is really talking about code to text
- Hacking multiple options out in front of the engineers

The fight for determinism in a non-deterministic world 	

Ai is the hive mind we’ve all been waiting for

The long term survival of the human race race is in non biological form

Custom software
- Is the build vs buy in the enterprise paradigm over?
- A lot of chat about “buy” being dead
- Clearly not true
    - Out of core skill set
    -
- Opportunity

Is it possible to build a 1 person billion dollar company

Is it possible to build a 1 man saas product

Running a local llm server

Reminded of the woman from that pathé documentary who hand painted crockery and then got moved in to the factory

Holy Hell. Claude code is good.

Am I getting dumber or smarter with AI.
- Strain to think about how to communicate and details can be kind of ignored as AI can fill in the details.

Stienbeck and AI

Memories are what define us, LLMs are good at language, but don’t remember in the same way as us. Really this is the crux of AGI. We need to focus on memory. Kind of like mind 1 vs. mind 2 of Kauffman.
