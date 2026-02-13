Visual CSS Editor

A compact, user-friendly visual CSS editor focused on editing and previewing styles for Title, Heading, Subheading, Bullets, and Paragraph. Designed for fast prototyping and excellent UX.

Quickstart

1. Install dependencies

   npm install

2. Run development server

   npm run dev

3. Build for production

   npm run build

4. Preview production build locally

   npm run preview

Docker

Build container:

   docker build -t visual-css-editor .

Run container (serves built app via nginx):

   docker run -p 8080:80 visual-css-editor

Project goals

- Simple, delightful UI to edit typography and spacing (space before/after, line-height, font style, color, size).
- Live preview for Title, Heading, Subheading, Bullets, Paragraph.
- Strong UX: immediate feedback, sensible defaults, keyboard accessibility.

Roadmap (next steps)

- Implement React UI with controls and live preview panels.
- Add presets, export/import CSS, and shareable URLs.
- Accessibility audit and responsive layout.

License

MIT
