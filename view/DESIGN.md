---
name: Obsidian Sketch
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c8c6c5'
  primary: '#c8c6c5'
  on-primary: '#313030'
  primary-container: '#1a1a1a'
  on-primary-container: '#848282'
  inverse-primary: '#5f5e5e'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#cac6c4'
  on-tertiary: '#31302f'
  tertiary-container: '#1b1a19'
  on-tertiary-container: '#858281'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
  stroke-primary: '#e2e2e2'
  stroke-muted: '#444748'
  text-high-contrast: '#f9f9f9'
  text-low-contrast: '#9c9b9b'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  caption:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 32px
  gutter: 24px
  section-gap: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system reimagines the "Modern Sketch" aesthetic for a sophisticated dark-mode environment. It transitions from a light-filled architect's notebook to a nocturnal creative studio, evoking the feeling of white charcoal or silver ink on deep matte cardstock. The brand personality is focused, intimate, and artisanal, stripping away the clinical glare of standard dark modes in favor of a tactile, "low-fi" digital experience.

The visual style is **Minimalist Sketch-Brutalism**. It leverages the raw, unrefined edges of hand-drawn paths but constrains them within a professional, systematic grid. By using deep charcoal surfaces instead of pure black, the design maintains a soft, organic quality that feels approachable rather than aggressive.

**Key Visual Pillars:**
- **Inverted Craftsmanship:** All structural elements resemble "hand-inked" strokes in off-white and light gray, creating a high-contrast but eye-friendly workspace.
- **Deep Matte Surfaces:** Utilizing a range of deep charcoals to create depth without relying on traditional light-source physics.
- **Structured Imperfection:** The UI maintains a rigid alignment and professional typography, while the containers themselves possess the slight "wobble" of a human hand.

## Colors

The color palette is strictly monochromatic and utilitarian, avoiding neon accents or vibrant gradients to maintain the "charcoal on paper" narrative.

- **Primary Surface (#1a1a1a):** The bedrock of the UI. This deep charcoal replaces the traditional black background, providing a softer canvas for light-colored strokes.
- **Secondary Surface (#242424):** Used for elevated containers and cards, providing subtle tonal separation from the background.
- **The "Ink" (Stroke Primary):** An off-white (#e2e2e2) is used for all primary borders, icons, and lines. This reduces eye strain compared to pure white.
- **Muted Elements:** Dark grays are used for "ghost" strokes and secondary information, simulating a lighter pencil sketch that hasn't been fully inked yet.
- **Semantic States:** Instead of color-coded alerts (red/green), use stroke thickness, hatching patterns (diagonal lines), or inverted fills (off-white background with charcoal text) to signal importance or success.

## Typography

The typography strategy balances the "hand-drawn" container aesthetic with high-precision digital fonts to ensure the design system feels reliable and professional.

- **Headlines (Be Vietnam Pro):** Its geometric but warm construction complements the charcoal aesthetic. Use it for all major headings. In this dark mode implementation, headlines should primarily use the high-contrast off-white color.
- **Body & Labels (Open Sans):** This font provides the utilitarian foundation. It is used for all long-form text, inputs, and button labels to guarantee maximum legibility against the dark surfaces.
- **Hierarchy through Weight:** Because the color palette is limited, use bold weights for headlines and regular weights for body text to create clear visual separation. Avoid heavy use of italics, which can conflict with the "wobbly" stroke style of the containers.

## Layout & Spacing

The layout adheres to a **Fluid Sketch Grid**, where the structure is mathematically sound but the visual execution is organic.

- **8px Rhythmic Grid:** All components, margins, and gutters are multiples of 8px. This ensures that even though borders may "jitter," the overall balance of the page remains stable.
- **Safe Breath:** In dark mode, negative space is crucial to prevent the UI from feeling claustrophobic. Maintain generous internal padding (stack-lg) within cards.
- **Responsive Behavior:**
    - **Desktop:** 12-column grid with a maximum content width of 1280px.
    - **Tablet:** 8-column fluid grid.
    - **Mobile:** 4-column fluid grid with reduced horizontal margins (16px) to maximize screen real estate.

## Elevation & Depth

In this dark-mode adaptation, depth is created through **Tonal Layering and Offset Stroke-Shadows**. Traditional blurred shadows are replaced with "sketched" equivalents.

- **Tonal Layering:** Surfaces "rise" toward the user by becoming slightly lighter. Background is `#1a1a1a`, while cards and modals are `#242424`.
- **Offset Stroke-Shadows:** To simulate depth, use a secondary 1.5px stroke offset 3px to the bottom-right of a container. This stroke should be in a darker gray or a 20% opacity off-white, resembling a double-inking or a shadow cast by a thick pen.
- **Zero-Blur Philosophy:** Avoid Gaussian blurs. If a shadow is needed, use a solid-color offset block or a fine diagonal "hatch" pattern to represent a shaded area.

## Shapes

The shape language is defined by "Human Geometry"—shapes that intend to be perfect but retain the artifacts of being drawn by a person.

- **Hand-Drawn Borders:** All borders must have a 1px to 1.5px jitter applied via SVG filter or rough-path rendering. No two containers should look exactly identical.
- **Roundedness:** A value of `2` (0.5rem) provides a soft, approachable corner that feels like a natural hand-drawn arc rather than a sharp technical corner.
- **Stroke Terminals:** All strokes must use `round` line caps and `round` line joins to mimic the pool of ink left at the start and end of a physical pen stroke.

## Components

### Buttons
Primary buttons are defined by a 2px off-white outline. To indicate the "Primary" state, the button can have a subtle 10% white fill. "Secondary" buttons use a thinner 1px stroke in a muted gray. All buttons use the offset "shadow" stroke on hover to simulate the button being pressed closer to the page.

### Cards
The workhorse of the design system. Cards use the `#242424` surface with a 1.5px off-white jittered border. Content sections within the card are separated by "drawn" horizontal lines that don't quite touch the edges of the container.

### Input Fields
Inputs are three-sided boxes (bottom, left, right) or simple underlined strokes, evoking a "fill in the blanks" feel. The focus state increases the stroke weight and adds a very faint, low-opacity white glow (5% opacity) to the field background.

### Chips & Lists
Chips are small, hand-drawn pills with 1px borders. For lists, use small, hand-filled circles as bullets. Row separators should be "sketched" dashed lines rather than solid ones, reinforcing the lightweight, temporary feel of a draft.

### Checkboxes & Radios
These should look like literal hand-drawn squares and circles. A "checked" state is represented by a bold "X" or a "filled-in" scribble effect using the off-white ink color.