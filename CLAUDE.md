# The Gamer Rich

## Project overview

The project is a multi-page HTML/CSS/JavaScript website. Pages live at the repository root, shared styles are in `css/style.css`, and shared behavior is in `js/`.

## Repository structure

- Root HTML files: application pages and flows
- `css/style.css`: shared styling
- `js/app.js`: shared application behavior
- `js/data.js`: shared data
- `js/economy.js`: economy-related behavior
- `js/i18n.js`: translations and localization
- `js/avatar3d.js`: 3D avatar behavior
- `js/wardrobe.js`: customization and wardrobe behavior
- `img/`: image assets
- `assets3d/`: 3D asset sources

## Working conventions

- Preserve the existing visual language and vanilla HTML/CSS/JavaScript architecture.
- Keep changes focused on the requested page or behavior.
- Reuse existing shared styles and JavaScript helpers before adding new ones.
- Avoid introducing build tools or dependencies unless explicitly requested.
- Use ASCII in source files unless existing content requires another character set.
- Check affected pages in a browser after UI changes when possible.

## Important project constraint

- Never use or mention Pokemon/Pokémon in code, content, examples, or documentation for this project.
