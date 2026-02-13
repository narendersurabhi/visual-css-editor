# Contributing to the Visual CSS Editor

Thank you for contributing! This document explains how to add and maintain style presets and polish the UI/UX for the compact visual CSS editor. Follow the guidelines below to keep presets consistent, accessible, and easy to preview.

Principles
- Be concise: presets should be focused, performant, and easy to scan in the UI.
- Predictable previews: each preset contains a short preview string used by the live preview panel.
- Accessibility-first: think contrast, readable sizes, and adequate spacing.
- Mobile/responsive: avoid absolute assumptions; prefer scalable sizes (px shown for clarity, but the editor can support rem conversion).

Preset file format (examples/preset-sample.json)
- Root: {"presets": [ ... ]}
- Each preset object keys:
  - id: string, unique slug (kebab-case).
  - name: friendly label shown in lists.
  - target: one of Title | Heading | Subheading | Bullets | Paragraph (used to route controls/UI).
  - preview: short text shown in the editor preview.
  - properties: map of style tokens the editor consumes. Supported fields:
    - spaceBefore: number (px) — vertical spacing before the element.
    - spaceAfter: number (px) — vertical spacing after the element.
    - lineHeight: number — unitless multiplier for line-height.
    - fontFamily: string — CSS font-family fallback stack.
    - fontWeight: number (e.g., 400, 600, 800).
    - fontStyle: string ("normal" | "italic").
    - fontSize: number (px).
    - color: hex or valid CSS color string.
    - letterSpacing: number (px or fractional values; editor treats as px by default).
    - textTransform: string ("none" | "uppercase" | "capitalize" | "lowercase").
    - listStyleType: string (for Bullets: "disc", "circle", "square", "decimal").
    - bulletIndent: number (px) — horizontal indent for bullets.

Example: see examples/preset-sample.json. Keep presets small and purposeful.

Adding a new preset
1. Open examples/preset-sample.json and add a new entry under "presets".
2. Assign a unique id and pick a clear name.
3. Provide a meaningful preview string that demonstrates the style in context.
4. Keep numeric spacing and sizes realistic for typical pages (titles: 28–48px, headings: 18–32px, paragraph: 14–20px).
5. Run the dev preview (local instructions below) and check the live preview for truncation, overflow, and contrast.

UI/UX guidelines for presets
- Group related controls: spacing (before/after), typography (family/weight/size/style), color, and list options.
- Show live feedback: apply changes immediately to the preview with a smooth transition.
- Preserve user edits: allow saving custom presets and fallback to defaults.
- Provide reset/undo for accidental changes.
- Use clear labels and microcopy for advanced options (e.g., "Line spacing (line-height)").

Accessibility checklist
- Minimum contrast: aim for contrast ratio >= 4.5:1 for paragraph and >= 3:1 for large text.
- Scalable fonts: ensure line-heights and spacing maintain readability at larger font sizes.
- Keyboard: all controls reachable and operable by keyboard only.
- Screen readers: controls have accessible labels; preview has an aria-live region for immediate feedback.

Testing and validation
- Validate JSON: ensure presets file is valid JSON. Run a quick linter or JSON validator before submitting.
- Visual regression: when updating a preset, check the preview against small, medium, and large viewports.
- Cross-browser: test font rendering fallbacks in common browsers.

Development notes
- Files under examples/ are intended for sample presets and quick editing; import them into the editor UI.
- Keep presets independent (don’t reference other presets by id inside a preset).

Commit and PR guidelines
- One logical change per PR (e.g., "Add warm heading preset" or "Fix bullet spacing default").
- Include a brief description of why the change improves UX or accessibility.
- If adding fonts or external assets, document licensing and source.

Contact
- If you're unsure about a value or UX decision, open an issue with screenshots and a short rationale. Prefer small, iterative improvements.

Thank you for helping make the editor usable, accessible, and delightful.
