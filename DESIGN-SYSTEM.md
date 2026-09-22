# Design System

Source: `src/styles/tokens.css`. Components should use tokens only, never raw values.

## Direction
"Editorial-industrial." Warm **talc-white** surfaces, **graphite** dark sections, and the logo's **olive** as the single brand accent.
The logo's thin horizontal rule is reused as the section-label motif (`.eyebrow` = short rule + uppercase label).
Photography carries the page. UI chrome stays quiet: square-ish corners, hairline borders, no glass, no gradients except photo scrims.

## Colour
| Token | Value | Use |
|---|---|---|
| `--c-olive-700` | `#3F5022` | Text-level brand (links, eyebrow), AA on white/stone-50 |
| `--c-olive-600` | `#566B2F` | Logo colour; primary button background |
| `--c-olive-500` | `#6E8740` | Hover/focus accents on dark |
| `--c-olive-100` | `#EDF0E3` | Tinted surfaces, tag backgrounds |
| `--c-stone-50` | `#F7F6F2` | Page background ("talc white") |
| `--c-stone-100` | `#EFEDE6` | Alternate section surface |
| `--c-stone-200` | `#E2DFD5` | Borders/hairlines |
| `--c-stone-400` | `#A9A596` | Disabled, subtle icons |
| `--c-stone-600` | `#65624F` | Secondary text (AA on stone-50: 5.6:1) |
| `--c-ink-900` | `#1A1C16` | Primary text; dark section background |
| `--c-ink-800` | `#24271F` | Dark surface raised |
| `--c-ink-600` | `#3A3E33` | Borders on dark |
| `--c-white` | `#FFFFFF` | Cards |
| `--c-error` | `#A3261B` | Form errors |
| `--c-success` | `#2F6B3A` | Form success |

Semantic aliases: `--bg`, `--surface`, `--surface-alt`, `--text`, `--text-muted`, `--border`, `--accent`, `--accent-strong`, `--on-accent`.
Dark sections set `.theme-dark`, which remaps the aliases.

## Typography
- Display: **Saira** (variable, 500–700). Its geometric technical feel is closest to the logo wordmark.
- Body/UI: **IBM Plex Sans** 400/500/600. Neutral, technical, very readable.
- Fluid scale (`clamp`, 360 → 1440 px):
  `--fs-900` 2.5→4.5rem (hero H1) · `--fs-800` 2.1→3.25rem (page H1) · `--fs-700` 1.6→2.4rem (H2) · `--fs-600` 1.3→1.6rem (H3) · `--fs-500` 1.125→1.25rem (lead) · `--fs-400` 1rem (body, 17px on ≥768) · `--fs-300` .875rem (meta) · `--fs-200` .78rem (eyebrow, uppercase, +0.12em tracking)
- Measure: body copy max `68ch`.

## Space & layout
- Spacing scale `--s-1 … --s-10`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.
- Section padding: `--section-y: clamp(3.5rem, 8vw, 7.5rem)`.
- Containers: `--w-text 44rem`, `--w-content 76rem`, `--w-wide 90rem`. Gutter `--gutter: clamp(1rem, 4vw, 2.5rem)` (16 px on phones).
- Grid: 4 columns (< 768), 8 (768–1023), 12 (≥ 1024). Implemented with CSS grid utilities `.grid-2/3/4` + asymmetric `.split` (7/5).

## Shape & depth
- Radius: `--r-sm 2px` (inputs, tags), `--r-md 4px` (cards, images), `--r-pill 999px` (chips only).
- Shadow: `--sh-1` hairline lift for cards on hover only; `--sh-2` for the mobile drawer. Borders do most of the separating.

## Buttons
| Variant | Style |
|---|---|
| Primary | olive-600 bg, white text, 48 px min height, arrow icon that slides 4 px on hover |
| Secondary | transparent, 1.5 px ink border (white on dark) |
| Text link | olive-700 with underline offset 0.2em, thickness grows on hover |
States: hover darkens by one step, `:focus-visible` shows a 3 px olive-500 outline with 2 px offset, disabled uses stone-400.

## Icons
Inline SVG, 1.5 px stroke, 24 px grid, `currentColor`. No icon font.

## Image treatment
- Documentary photos are never filtered or recoloured. Dark scrims (ink 0→70 %) only behind hero text.
- Aspect ratios come from the prepared crops (21:9, 16:9, 4:3, 4:5, 1:1). Nothing is stretched, and each image is only shown at or below its intrinsic width.
- Diagrams and scans sit on white with a hairline border and have an HTML explanation next to them.

## Motion tokens
| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` |
| `--ease-in-out` | `cubic-bezier(.6,0,.2,1)` |
| `--dur-1` | 160 ms (hover) |
| `--dur-2` | 320 ms (UI) |
| `--dur-3` | 700 ms (reveals) |
| `--dur-4` | 1200 ms (hero image settle) |
Patterns: `[data-reveal]` fade + 24 px rise; `[data-reveal="mask"]` clip-path wipe for images; `[data-stagger]` children delayed 70 ms each; process-line draws with `scaleY`/`scaleX` driven by progress. The hero image settles from 1.06 scale. The header compacts after 24 px of scroll.
Everything is disabled under `prefers-reduced-motion: reduce`. Content is visible without JS: the reveal hiding is applied only when `<html class="js">` is set.
