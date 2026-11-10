# Portfolio v2 design system

This document records the portfolio's shared design direction. The implemented
tokens and component styles in [style.css](./style.css) are the source of
truth; reuse them when designing pages.

## Direction and voice

- Research-first and editorial, with enough warmth and personality to feel
  approachable rather than clinical.
- Show thoughtful direction, collaboration, and the reasoning behind research
  without overstating individual contribution or impact.
- Use clear, conversational language. Avoid unnecessary labels, repeated
  slogans, decorative counters, and arrows on ordinary links.
- Make dense research content easy to scan with meaningful headings and concise
  summaries. Let case studies carry the full research rationale.

## Color

| Token | Value | Current role |
| --- | --- | --- |
| `--paper` | `#f8f5ef` | Main background and sticky header |
| `--paper-deep` | `#eee8dd` | Warm contrast for the research section |
| `--paper-card` | `#f4efe7` | Soft project card surface |
| `--paper-card-line` | `#ded5c9` | Subtle card border |
| `--paper-muted` | `#e7ddd3` | Artifact backdrop |
| `--white` | `#fffdf9` | Artifact frames and light buttons |
| `--ink` / `--ink-soft` | `#342d29` / `#625851` | Primary and supporting text |
| `--brown` / `--brown-deep` / `--brown-line` | `#76594c` / `#49372f` / `#756056` | Warm accents and borders |
| `--blue` / `--blue-dark` / `--blue-pale` | `#5264a4` / `#3e4d89` / `#e6e9f4` | Emphasis, links, actions, and personal section |
| `--peach` | `#f3d9c7` | Soft accent and approach rule |
| `--line` | `#d9d0c4` | Dividers |

Prefer soft contrast between paper surfaces to stark white blocks. Use blue
selectively for emphasis and interactions; brown and taupe contribute warmth.

## Typography

- **Display:** Fraunces, with the serif fallbacks defined in `--serif`. Use
  italics and accent color selectively for a meaningful word or phrase.
- **Body and navigation:** Avenir Next and the fallbacks in `--sans`.
- **Body baseline:** `16px / 1.65`; supporting copy uses softer ink.
- **Homepage hero:** `clamp(2.6rem, 4.2vw, 4.2rem)`, weight 400, line-height
  `0.99`; at widths up to 600px, `clamp(2.3rem, 9.5vw, 3.3rem)`.
- **Section headings:** generally `clamp(2.5rem, 4vw, 4rem)`; the personal and
  contact headings have their own responsive scales.
- **Card headings:** `clamp(1.75rem, 2.5vw, 2.4rem)`; compact cards use
  `clamp(1.5rem, 2.2vw, 2rem)` and reserve at least two lines.
- **Labels and metadata:** small uppercase sans-serif, semibold, with
  increased letter spacing. Use sparingly and preserve readable hierarchy.
- **Subsection headings:** `1.35rem / 1.3`, using the shared serif heading
  style, as in the About page and case-study subsections.
- **Case-study text emphasis:** semibold (600) for inline emphasis and
  research questions.

These are starting values, not a fully validated scale for every long-form case
study. Adapt and test readability for text-heavy pages.

## Layout and components

- **Header:** sticky, opaque paper background, wordmark and descriptor, clear
  navigation, and an outlined pill for contact. Work, About, and contact links
  open their v2 pages. The homepage's hero links scroll to its previews.
- **Sections:** generous responsive padding; numbered labels and a fine rule
  introduce the work and personal sections. Headings are distinct from
  navigation labels.
- **Hero:** a short position statement, supporting introduction, actions, and a
  framed research artifact. The hero artifact is slightly rotated and links to
  its case study.
- **Project cards:** warm rounded surfaces with a subtle border. Homepage cards
  show industry · role · year, a clear title, a concise challenge-and-outcome
  summary, a short approach line, and a case-study link. The featured card has
  more space; compact cards preserve the same hierarchy. Describe outcomes at
  the level supported by the evidence, distinguishing recommendations from
  implemented changes. Selected work provides fuller previews.
- **Selected work page:** an editorial list separated by fine rules, with
  alternating artifact placement on wide screens and a single column on
  smaller screens. For each project, present:
  1. Industry · role title · year.
  2. Project title.
  3. Background context.
  4. Approach.
  5. Outcome.
  6. Link to the case study.

  Place a captioned artifact thumbnail alongside the text. The thumbnail and
  caption, title, and case link should all lead to the same case study. Keep
  the approach indented with its warm accent and the outcome aligned with the
  main copy. Projects are currently ordered newest first; identify academic
  or client context where needed without overstating contributions or results.
- **Artifact thumbnails:** a straight, shadowed paper frame on a muted canvas,
  with a short caption identifying the artifact. Use existing project material
  where appropriate and avoid relying on the image for essential project text.
- **Carousel:** manual previous/next controls and horizontal scrolling; controls
  are hidden when all cards fit. At widths up to 1000px, cards display one at a
  time. There is no automatic rotation.
- **Personal section:** pale-blue surface, personal copy, a framed portrait,
  and a flexible “Currently” note.
- **Closing contact:** dark-blue band, small introductory label, large serif
  invitation, and light pill button. The footer provides a copyright notice and
  back-to-top link.
- **Contact page:** an editorial introduction beside a warm, clearly labeled
  form, stacking on smaller screens. Required fields and submission feedback
  remain visible and accessible.
- **404 page:** a brief, centered message with a clear route back to the
  homepage, using the shared header and footer.
- **Case study template:** [case-study-template.html](./case-study-template.html)
  is the starting point for individual case studies, populated with the
  repayment project. Follow the shared design system rather than defining
  competing typography or colors. Adapt content and sections to each project
  without inventing contributions, outcomes, or metrics.

  The overview includes the project title, organization or client context,
  industry, role, year, duration where known, background, approach, outcome,
  and individual contribution. A subdued disclaimer can provide confidentiality
  context. The softly framed navigation matches the reading-column width and
  links to the sections below.

  The example moves through Background (including research questions), Methods
  (participants, approach, and analysis), Results and Recommendations
  (findings, actions, and impact), and Reflections. Use distinct but
  harmonious section surfaces to help readers navigate longer content.
  Warm section surfaces separate background and methods, while impact uses a
  brown outline and reflections retain their pale-blue surface.
  Keep the main reading column comfortable for long text. Stack interactive
  rationale notes beside the text on wide screens and below it on narrow
  screens; keep artifacts in the reading column so opening a note does not
  move them. Click or keyboard activation opens one note at a time; opening it
  highlights the relevant decision and connects it visually on wide screens;
  activating it again closes it and clears the highlight. Notes remain
  readable without JavaScript. Use real artifacts with captions and full-size
  links. The image viewer opens from those links, offers zoom-in and zoom-out
  controls, and zooms toward the point clicked on the image. It closes by
  button, Escape, or outside click; the links remain usable
  without JavaScript. Links within captions remain separate from the viewer.
  Case-study-specific styles and interactions live in
  [case-study.css](./case-study.css) and [case-study.js](./case-study.js).

## Responsive and accessibility considerations

- At 1000px and below, the featured project stacks and the carousel shows one
  card at a time; at 800px the header and hero adapt; at 600px the header,
  hero, project cards, and personal section use mobile layouts.
- Keep keyboard focus visible, link destinations meaningful, images
  appropriately described, and content usable with reduced motion.
- Maintain the carousel's native horizontal scrolling when scripting is
  unavailable; do not make information dependent on autoplay or hover.
- Check new layouts and text at desktop and mobile widths, including narrow
  viewports, without horizontal page overflow.

## Current pages

The [About page](./about-me.html) pairs a short introduction and research
perspective with a portrait and scannable background details, with a pale-blue
personal note beneath the introduction. The case study template is a reusable
starting point; the homepage and Selected work link to the
[repayment](./rethinking-repayment-communication.html), [intranet](./improving-the-intranet.html),
and [travel](./product-development-project.html) case studies. Adapt its
components to each project's content rather than assuming every case needs
identical sections or notes. GitHub Pages serves the root [404 page](./404.html)
for missing URLs.
