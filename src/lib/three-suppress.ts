// Suppress noisy `THREE.Clock` deprecation warnings emitted by three.js >=0.180
// while @react-three/fiber 9.x still depends on `Clock` instead of `Timer`.
// This module must be imported BEFORE any `three` / `@react-three/fiber` import
// so the override is in place before those modules evaluate.

if (typeof window !== "undefined") {
  const original = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const first = args[0];
    if (typeof first === "string" && first.includes("THREE.Clock")) return;
    original(...args);
  };
}

export {};
