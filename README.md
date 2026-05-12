# Dao Quang Thuan Portfolio

Personal portfolio website for Dao Quang Thuan, built with React, Vite, Tailwind CSS, Framer Motion, and i18next.

The content highlights software engineering work across backend systems, AI/OCR integration, real-time processing, student achievements, and selected public projects. NDA-sensitive projects are intentionally described as technical case studies without exposing client names or private business details.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Framer Motion
- i18next / react-i18next
- Lucide React icons

## Project Structure

```txt
src/
  assets/              Static images
  components/          Portfolio sections/components
  locales/             English and Vietnamese content
  App.jsx              Main layout and sections
  config.js            Personal links and project links
  i18n.js              Language setup
  index.css            Tailwind and global styles
```

## Local Development

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm run dev
```

Build for production:

```bash
pnpm run build
```

Preview the production build:

```bash
pnpm run preview
```

## Configuration

Before deploying, update [src/config.js](src/config.js):

- `email`
- `socials.github`
- `socials.linkedin`
- `socials.facebook`
- `socials.instagram`
- `resumeUrl`
- `avatarUrl`
- `projectLinks.featured`
- `projectLinks.noteworthy`

For NDA/private projects, keep the GitHub link as `#`. The UI will hide empty project link buttons.

## Content

Portfolio copy is stored in:

- [src/locales/vi.json](src/locales/vi.json)
- [src/locales/en.json](src/locales/en.json)

Update both files when changing portfolio content so the language switch stays consistent.

## Deploying to Netlify

This repo includes [netlify.toml](netlify.toml).

Netlify settings:

- Build command: `pnpm run build`
- Publish directory: `dist`
- Node version: `20`

The config also includes SPA fallback routing and cache/security headers.

## NDA / Public Content Notes

Some internship projects are under NDA. Public descriptions should focus on:

- Technical role and responsibility
- Architecture patterns
- Reliability improvements
- Debugging and delivery impact
- Tools and technologies used

Avoid exposing:

- Client names
- Private workflows
- Internal URLs
- Business-sensitive data
- Screenshots or assets from private systems

## References

The repo also contains supporting narrative/source material:

- [README_GITHUB_PORTFOLIO.MD](README_GITHUB_PORTFOLIO.MD)
- [self-review.md](self-review.md)

These files were used as context for the public portfolio copy.
