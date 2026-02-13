import React, { useEffect, useRef } from 'react';
import useShortcuts from '../hooks/useShortcuts';

export default function HelpModal({ isOpen, onClose, openerRef }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousActive = useRef(null);

  useShortcuts(
    {
      Escape: { handler: e => onClose && onClose(e), allowInInputs: false },
      '?': { handler: e => onClose && onClose(e) /* if open, ? can also close */ , allowInInputs: false }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    previousActive.current = document.activeElement;
    // focus close button when modal opens
    const t = setTimeout(() => (closeBtnRef.current || modalRef.current)?.focus?.(), 0);

    function trap(e) {
      if (e.key !== 'Tab') return;
      const el = modalRef.current;
      if (!el) return;
      const focusable = Array.from(
        el.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(Boolean);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    }

    document.addEventListener('keydown', trap);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', trap);
      // restore focus
      try {
        if (openerRef && openerRef.current) openerRef.current.focus();
        else if (previousActive.current) previousActive.current.focus();
      } catch (err) {}
    };
  }, [isOpen, openerRef]);

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    },
    modal: {
      width: 'min(880px, 96%)', maxHeight: '90vh', overflow: 'auto', borderRadius: 12, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', padding: 20, outline: 'none'
    },
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 },
    title: { fontSize: 18, fontWeight: 700, margin: 0, color: '#111' },
    body: { display: 'flex', gap: 20, alignItems: 'flex-start' },
    column: { flex: 1, minWidth: 260 },
    shortcutsList: { listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }
  };

  return (
    <div style={styles.overlay} aria-modal="true" role="dialog" aria-labelledby="help-title">
      <div ref={modalRef} style={styles.modal} tabIndex={-1}>
        <div style={styles.header}>
          <h2 id="help-title" style={styles.title}>Shortcuts & Accessibility</h2>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close help"
              style={{
                background: 'transparent', border: '1px solid #ddd', padding: '6px 10px', borderRadius: 8, cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div style={styles.body}>
          <div style={styles.column}>
            <p style={{ marginTop: 0, color: '#333' }}>
              Quick keyboard shortcuts and accessibility tips for the visual CSS editor. These help you move faster and keep the UI usable with keyboards and assistive tech.
            </p>

            <ul style={styles.shortcutsList}>
              <li>
                <strong>?</strong> — Open help (from main app)
              </li>
              <li>
                <strong>Esc</strong> — Close this panel
              </li>
              <li>
                <strong>Ctrl/Cmd + S</strong> — Save styles
              </li>
              <li>
                <strong>Tab / Shift+Tab</strong> — Navigate controls
              </li>
              <li>
                <strong>Arrow Up / Arrow Down</strong> — Nudge numeric controls (space before/after, line spacing, size)
              </li>
              <li>
                <strong>Ctrl/Cmd + + / -</strong> — Increase/decrease font size
              </li>
              <li>
                <strong>Enter</strong> — Activate focused control
              </li>
            </ul>

            <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '12px 0' }} />

            <div>
              <h3 style={{ margin: '6px 0 8px' }}>Accessibility tips</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Ensure form controls have clear labels and focus indicators.</li>
                <li>Prefer relative font sizes and sufficient color contrast.</li>
                <li>Use live regions for preview updates if you rely on screen readers.</li>
              </ul>
            </div>
          </div>

          <div style={{ ...styles.column, flex: 1.1 }}>
            <div style={{ borderRadius: 10, padding: 16, background: 'linear-gradient(180deg,#fff,#fbfdff)', border: '1px solid #eef4ff' }}>
              <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial', color: '#0b2545' }}>
                <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Title Preview</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: '#0d3b66' }}>Heading Preview</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: '#145374' }}>Subheading preview — concise and bold</div>

                <div style={{ marginBottom: 10 }}>
                  <ul style={{ margin: 0, paddingLeft: 20, color: '#16324f' }}>
                    <li>Bullet item one — good for lists</li>
                    <li>Bullet item two — readable spacing</li>
                    <li>Bullet item three — consistent styling</li>
                  </ul>
                </div>

                <p style={{ margin: 0, color: '#23395b', lineHeight: 1.5 }}>
                  Paragraph preview — shows body text with comfortable line spacing, space before/after, font style and color. Use the editor controls to tweak these values and see immediate feedback here.
                </p>
              </div>

              <div style={{ marginTop: 14, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={onClose} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #cfe0ff', background: '#eaf3ff', cursor: 'pointer' }}>
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
