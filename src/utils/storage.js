const KEY = "visual-css:settings";

export const DEFAULT_SETTINGS = {
  Title: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 32, color: "#0b1220", fontWeight: "700", fontStyle: "normal", lineHeight: 1.1, spaceBefore: 6, spaceAfter: 10 },
  Heading: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 20, color: "#0d1726", fontWeight: "600", fontStyle: "normal", lineHeight: 1.25, spaceBefore: 12, spaceAfter: 8 },
  Subheading: { fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize: 16, color: "#334155", fontWeight: "400", fontStyle: "normal", lineHeight: 1.3, spaceBefore: 8, spaceAfter: 8 },
  Paragraph: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 15, color: "#334155", fontWeight: "400", fontStyle: "normal", lineHeight: 1.6, spaceBefore: 6, spaceAfter: 6 },
  Bullets: { fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 15, color: "#334155", fontWeight: "400", fontStyle: "normal", lineHeight: 1.5, spaceBefore: 6, spaceAfter: 6 }
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    // merge with defaults to keep new props
    const merged = { ...DEFAULT_SETTINGS };
    for (const k of Object.keys(DEFAULT_SETTINGS)) merged[k] = { ...DEFAULT_SETTINGS[k], ...(parsed[k] || {}) };
    return merged;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch (e) {
    // ignore
  }
}
