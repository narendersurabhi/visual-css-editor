import { useEffect, useRef } from 'react';

function normalizeKeyEvent(e) {
  const parts = [];
  if (e.ctrlKey) parts.push('ctrl');
  if (e.metaKey) parts.push('meta');
  if (e.altKey) parts.push('alt');
  if (e.shiftKey) parts.push('shift');
  const key = (e.key || '').toLowerCase();
  parts.push(key);
  return parts.join('+');
}

function normalizeKeyString(s) {
  return String(s)
    .split(/\+/)
    .map(p => p.trim().toLowerCase())
    .filter(Boolean)
    .join('+');
}

export default function useShortcuts(shortcuts = {}, deps = []) {
  const mapRef = useRef(null);
  useEffect(() => {
    // normalize shortcuts into {key: {handler, allowInInputs}}
    const map = new Map();
    Object.entries(shortcuts).forEach(([rawKey, val]) => {
      const key = normalizeKeyString(rawKey);
      if (typeof val === 'function') map.set(key, { handler: val, allowInInputs: false });
      else if (val && typeof val === 'object' && typeof val.handler === 'function')
        map.set(key, { handler: val.handler, allowInInputs: !!val.allowInInputs });
    });
    mapRef.current = map;

    function shouldIgnoreEvent(target) {
      if (!target) return false;
      const tag = target.tagName;
      if (!tag) return false;
      if (target.isContentEditable) return true;
      return ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag);
    }

    function onKeyDown(e) {
      const key = normalizeKeyEvent(e);
      const entry = mapRef.current && mapRef.current.get(key);
      if (!entry) return;
      const ignored = shouldIgnoreEvent(e.target);
      if (ignored && !entry.allowInInputs) return;
      if (entry && typeof entry.handler === 'function') {
        try {
          entry.handler(e);
        } catch (err) {
          // swallow handler errors to avoid breaking app
          // console.error(err);
        }
        e.preventDefault();
        e.stopPropagation();
      }
    }

    window.addEventListener('keydown', onKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', onKeyDown, { capture: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
