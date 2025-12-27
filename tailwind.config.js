/* src/styles/theme.css */
@layer base {
  :root {
    /* 1. THE CANVAS (Backgrounds)
      Default: Deep Cosmic (#0f172a) and Surface (#1e293b)
    */
    --color-canvas: 15 23 42;
    --color-surface: 30 41 59;
    --color-muted: 15 23 42; /* Usually same as canvas or slightly off */

    /* 2. THE BRAND (Primary Action)
      Default: Foxther Blue (#3b82f6)
    */
    --color-brand: 59 130 246;

    /* 3. THE TEXT (Typography)
      Default: Readable (#f1f5f9) and Soft (#94a3b8)
    */
    --color-text-main: 241 245 249;
    --color-text-soft: 148 163 184;

    /* 4. FONTS
      (Keeping your existing font definitions)
    */
    --font-heading: 'JetBrains Mono', monospace;
    --font-body: 'Inter', sans-serif;
  }
}