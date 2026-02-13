import React from "react";

function styleFor(s) {
  return {
    marginTop: (s.spaceBefore || 0) + "px",
    marginBottom: (s.spaceAfter || 0) + "px",
    lineHeight: s.lineHeight || 1.4,
    fontFamily: s.fontFamily,
    fontStyle: s.fontStyle,
    fontWeight: s.fontWeight,
    color: s.color,
    fontSize: (s.fontSize || 16) + "px",
  };
}

export default function Preview({ settings }) {
  const title = settings.Title;
  const heading = settings.Heading;
  const sub = settings.Subheading;
  const para = settings.Paragraph;
  const bullets = settings.Bullets;

  return (
    <div style={wrap}>
      <div style={{ ...panel }}>
        <div style={styleFor(title)}>
          <div style={{ fontSize: (title.fontSize || 28) + 10, fontWeight: 700 }}>{"Title Example"}</div>
        </div>

        <div style={styleFor(heading)}>
          <div style={{ fontSize: (heading.fontSize || 20) + 4 }}>{"Heading Example"}</div>
        </div>

        <div style={styleFor(sub)}>
          <div style={{ fontSize: (sub.fontSize || 16) }}>{"Subheading Example"}</div>
        </div>

        <div style={styleFor(para)}>
          <p style={{ margin: 0 }}>{"This is a paragraph example demonstrating how body text will look with your chosen settings. Use the editor to tweak spacing, size and color for clear, readable typography."}</p>
        </div>

        <div style={styleFor(bullets)}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>{"First bullet item"}</li>
            <li style={{ marginBottom: 6 }}>{"Second bullet item"}</li>
            <li>{"Third bullet item"}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const wrap = { padding: 24 };
const panel = { background: "#fff", padding: 28, borderRadius: 12, boxShadow: "0 8px 30px rgba(20,30,50,0.06)", minHeight: 420 };
