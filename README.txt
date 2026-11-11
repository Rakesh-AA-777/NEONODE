NEONODE — Source files

Files
- index.html   Main page and metadata
- styles.css   Layout, visual design, responsive behaviour, light/dark theme
- script.js    Project catalogue, filters, search, sorting and interactions

Run locally
1. Keep all three files in the same folder.
2. Open index.html in a modern browser.

Deploy on Vercel
1. Create a new project or repository.
2. Put index.html, styles.css and script.js in the project root.
3. Import the repository into Vercel. No build command is required for this static site.
4. Deploy.

To add or edit a project
Open script.js and update the `projects` array. Each item contains its title,
summary, category, URL, artwork key and search keywords. Artwork keys currently
supported: visualizer, reflex, post, blink.

Notes
- Every project opens its own live website in a new tab.
- This is a static frontend; no database or login is needed for the current four-project catalogue.
- The colour-theme toggle is session-only; it does not save a preference.
