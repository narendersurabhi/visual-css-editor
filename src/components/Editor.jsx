import React, { useEffect, useState } from "react";
import Preview from "./Preview";
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from "../utils/storage";

const ELEMENTS = ["Title", "Heading", "Subheading", "Paragraph", "Bullets"];
const FAMILIES = ["system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", "Georgia, 'Times New Roman', Times, serif", "'Courier New', Courier, monospace"];
const WEIGHTS = ["300","400","600","700"];

export default function Editor() {
  const [settings, setSettings] = useState(() => loadSettings());
  const [active, setActive] = useState(ELEMENTS[0]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function update(prop, value) {
    setSettings(prev => ({ ...prev, [active]: { ...prev[active], [prop]: value } }));
  }

  function reset() {
    setSettings(DEFAULT_SETTINGS);
  }

  const s = settings[active];

  return (
    <div style={styles.container}>
      <div style={styles.panel}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Visual CSS Editor</h3>
          <button style={styles.reset} onClick={reset}>Reset</button>
        </div>
        <div style={styles.row}>
          {ELEMENTS.map(el => (
            <button
              key={el}
              onClick={() => setActive(el)}
              style={{
                ...styles.tab,
                ...(active === el ? styles.tabActive : {}),
              }}
            >
              {el}
            </button>
          ))}
        </div>

        <div style={styles.controls}>
          <label style={styles.label}>Font family</label>
          <select value={s.fontFamily} onChange={e => update("fontFamily", e.target.value)} style={styles.input}>
            {FAMILIES.map(f => <option key={f} value={f}>{f.split(",")[0]}</option>)}
          </select>

          <div style={styles.inline}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Size (px)</label>
              <input type="number" min="8" max="120" value={s.fontSize} onChange={e => update("fontSize", parseInt(e.target.value||0))} style={styles.input} />
            </div>
            <div style={{ width: 12 }} />
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Color</label>
              <input type="color" value={s.color} onChange={e => update("color", e.target.value)} style={{ ...styles.input, padding: 6 }} />
            </div>
          </div>

          <div style={styles.inline}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Weight</label>
              <select value={s.fontWeight} onChange={e => update("fontWeight", e.target.value)} style={styles.input}>
                {WEIGHTS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div style={{ width: 12 }} />
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Style</label>
              <select value={s.fontStyle} onChange={e => update("fontStyle", e.target.value)} style={styles.input}>
                <option value="normal">normal</option>
                <option value="italic">italic</option>
              </select>
            </div>
          </div>

          <label style={styles.label}>Line spacing</label>
          <input type="range" min="1" max="2.2" step="0.05" value={s.lineHeight} onChange={e => update("lineHeight", parseFloat(e.target.value))} style={styles.range} />

          <div style={styles.inline}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Space before (px)</label>
              <input type="number" value={s.spaceBefore} onChange={e => update("spaceBefore", parseInt(e.target.value||0))} style={styles.input} />
            </div>
            <div style={{ width: 12 }} />
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Space after (px)</label>
              <input type="number" value={s.spaceAfter} onChange={e => update("spaceAfter", parseInt(e.target.value||0))} style={styles.input} />
            </div>
          </div>

          <div style={{ marginTop: 8, color: "#666", fontSize: 13 }}>Changes are saved automatically</div>
        </div>
      </div>

      <div style={styles.previewWrap}>
        <Preview settings={settings} />
      </div>

    </div>
  );
}

const styles = {
  container: { display: "flex", gap: 20, padding: 20, fontFamily: "Inter, system-ui, sans-serif", minHeight: "100vh", boxSizing: "border-box", background: "linear-gradient(180deg,#f7fbff,#ffffff)" },
  panel: { width: 420, background: "#fff", borderRadius: 12, boxShadow: "0 6px 20px rgba(20,30,50,0.08)", padding: 18, boxSizing: "border-box" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  reset: { background: "#f5f7fa", border: 0, padding: "6px 10px", borderRadius: 8, cursor: "pointer" },
  row: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  tab: { padding: "8px 12px", borderRadius: 8, border: "1px solid transparent", background: "#fafbfe", cursor: "pointer" },
  tabActive: { background: "linear-gradient(90deg,#eef6ff,#f7fbff)", borderColor: "#dbeafe", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.02)" },
  controls: { display: "flex", flexDirection: "column", gap: 10, marginTop: 4 },
  label: { fontSize: 13, color: "#333", marginBottom: 6 },
  input: { width: "100%", padding: 8, borderRadius: 8, border: "1px solid #e6eef8", boxSizing: "border-box" },
  inline: { display: "flex", gap: 8 },
  range: { width: "100%" },
  previewWrap: { flex: 1, minWidth: 420 }
};
