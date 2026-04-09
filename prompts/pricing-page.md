# Prompt: Create the DrTutor Pricing Page

## Context

You are building a **Pricing Page** for **DrTutor** — a UK-based online tutoring platform for KS2 to A-Level students in English, Maths & Science. The page must be a new route (`/pricing`) in the existing React + TypeScript + Tailwind CSS v4 + Vite app, and it must seamlessly match the established design language described below.

---

## Tech Stack & Project Conventions

| Layer | Detail |
|---|---|
| Framework | React 19, TypeScript, Vite 6 |
| Styling | Tailwind CSS v4 (using `@theme` block in `index.css`) |
| Animation | `motion/react` (Framer Motion) |
| Icons | `lucide-react` |
| Routing | `react-router-dom` v7 |
| Path alias | `@` maps to project root (so `@/images/…`, `@/src/data/…`) |
| UI components | Reuse `Container`, `Button`, `Card`, `Badge`, `SectionHeading` from `src/components/ui/` |
| Layout | Pages are wrapped by `<Navbar />` and `<Footer />` automatically via `App.tsx` |

---

## Design System — Match These Aesthetics Exactly

### Color Palette (CSS custom properties already defined)

- **Primary brand:** `--brand-teal: #0FA5A5` — used for headings, accents, buttons, active states
- **Primary dark:** `--brand-teal-dark: #0D8A8A` — used for hover states, navbar CTA, darker badges
- **Primary darker:** `--brand-teal-darker: #086868` — deepest teal variant
- **Light teal backgrounds:** `--brand-teal-light: #E6F7F7` and `--brand-teal-lighter: #F0FAFA`
- **Navy (text primary):** `--brand-navy: #031A35` — main body text color
- **Warm gray (borders):** `--brand-warm-gray: #E6E1E1`
- **Coral accent:** `--brand-coral: #F97066` — for "most popular" or highlight badges
- **Gold accent:** `--brand-gold: #F5A623` — secondary accent
- **Green accent:** `--brand-green: #22C55E` — checkmarks, success indicators
- **Section alt bg:** `--bg-section-alt: #F0FAFA`
- **Text secondary:** `--text-secondary: #6B7280`

### Typography

- **Headline font:** `font-headline` → "Sora", sans-serif — for all headings (h1–h4)
- **Body font:** `font-body` → "Plus Jakarta Sans", sans-serif — for paragraphs, labels, prices
- Heading sizes: `text-3xl md:text-4xl lg:text-5xl` for page title, `text-xl` for card titles
- Body: `text-sm` to `text-base`, always with `leading-relaxed`

### Card Style

- `rounded-3xl` corners (24px)
- Background: soft gradient `linear-gradient(to top, rgba(15,165,165,0.12) 0%, rgba(224,244,244,0.4) 40%, rgba(255,255,255,0.6) 100%)`
- Shadow: `box-shadow: 0 2px 12px rgba(3,26,53,0.05)`
- Hover effect: teal gradient overlay fading in via `opacity-0 group-hover:opacity-100`, and `hover:translate-y-[-4px]`
- Group hover pattern: wrap card in `group` class, overlay with pointer-events-none absolute div

### Buttons

- Primary: `bg-brand-teal text-white rounded-full` with `hover:bg-brand-teal-dark hover:shadow-glow-teal`
- Secondary: `bg-white text-brand-teal border border-brand-teal rounded-full`
- Outline (on dark): `bg-transparent text-white border border-white rounded-full`
- Sizes: `h-9 px-4 text-sm` (sm) | `h-11 px-6 text-sm` (md) | `h-12 px-8 text-base` (lg)
- Always `font-body font-semibold`, with `active:scale-[0.97]` press effect

### Motion / Animation

- Use `motion/react`'s `<motion.div>` for entrance animations
- Standard pattern: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` → `viewport={{ once: true }}`
- Stagger children with increasing `delay` (0.1s increments)
- Duration: `0.6s–0.8s`, easing: `easeOut`

### Spacing & Layout

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-16 lg:py-24`
- Grid gaps: `gap-6` for card grids
- The page should have a hero area at the top (with `pt-28` to clear the fixed navbar)

---

## Pricing Data — All Prices in GBP (£)

### Per-Session Rates (1 hour each)

| Key Stage | Standard Teacher | Experienced Teacher | Expert Teacher |
|---|---|---|---|
| Primary (KS2) | from £20/hr | from £25/hr | from £30/hr |
| Secondary (KS3) | from £30/hr | from £35/hr | from £40/hr |
| GCSE (KS4) | from £40/hr | from £45/hr | from £50/hr |
| A-Level (KS5) | from £50/hr | from £55/hr | from £65/hr |

### Specialist / Exam Preparation

- Expert Teachers & Examiners — from £70/hour

### Monthly Packages (Discounted)

- **4 Sessions/month** → 10% discount on total monthly fee
- **8 Sessions/month** → 15% discount on total monthly fee

### Example Pricing (for clarity)

- GCSE Standard (from £40/hr): 4 sessions → £144/month (10% off) | 8 sessions → £272/month (15% off)
- A-Level Experienced (from £55/hr): 4 sessions → £198/month | 8 sessions → £374/month

### Optional Add-Ons

- Trial Session — from £25
- Assessment & Progress Report — included with all packages

### Positioning Line (display below pricing)

> "All sessions are delivered by qualified UK teachers (PGCE/QTS), with structured lesson plans, ongoing assessment, and measurable academic progress."

---

## Page Structure & Sections

### 1. Pricing Hero Section

- Background: use a teal gradient similar to `hero-bg` (linear-gradient from light teal at top to slightly deeper teal at bottom), or use `bg-section-alt` (#F0FAFA) for a softer look
- Top padding: `pt-28 pb-16` (to clear the fixed navbar)
- Centered heading: **"Transparent Pricing, Exceptional Teaching"** in `font-headline font-bold text-brand-teal`, sized `text-3xl md:text-4xl lg:text-5xl`
- Subtitle: **"Qualified UK Teachers | KS2 – A-Level | English, Maths & Science"** in `text-secondary`, `text-base lg:text-lg font-body`
- Optional: a small pill/badge above the heading saying "Pricing" in a teal badge (use `<Badge>` component)

### 2. Interactive Stage/Level Selector

- A horizontal row of rounded-pill toggles (styled like the `StagesSection` badges: `rounded-2xl bg-brand-teal-dark text-white px-5 py-2.5 font-body font-semibold text-sm`)
- Options: **Primary (KS2)** | **Secondary (KS3)** | **GCSE (KS4)** | **A-Level (KS5)** | **Specialist**
- Active tab: `bg-brand-teal` with a subtle `shadow-glow-teal`
- Inactive tabs: `bg-white text-brand-navy border border-brand-warm-gray`
- Use React `useState` to track the active selection
- Wrap in a flex container with `gap-3` and center horizontally

### 3. Pricing Cards Grid (3 columns on desktop, 1 on mobile)

For each level, show **3 cards** (Standard, Experienced, Expert) — or **1 card** for Specialist.

Each card should follow this structure:

```
┌─────────────────────────────┐
│  [Badge: tier name]         │  ← "Standard", "Experienced", or "Expert"
│                             │
│  from £XX                   │  ← large price, font-headline font-bold text-3xl
│  /hour                      │  ← smaller, text-secondary
│                             │
│  ─────────────────────      │  ← subtle divider (border-brand-warm-gray)
│                             │
│  ✓ Qualified UK Teacher     │  ← feature list with teal checkmarks (Check icon from lucide)
│  ✓ Structured Lesson Plans  │
│  ✓ Progress Reports         │
│  ✓ Online via Zoom/Meet     │
│                             │
│  [Book a Free Assessment]   │  ← primary CTA button (full width, rounded-full)
│                             │
└─────────────────────────────┘
```

**Card styling:**
- Use the same card gradient background as `FeaturesSection` cards
- `rounded-3xl`, with `p-8` padding
- The **middle card** (Experienced) should be the "recommended" one:
  - Slightly taller (use `lg:scale-105` or extra padding)
  - Add a `<Badge color="var(--brand-coral)">Most Popular</Badge>` at the top
  - Add a teal border: `border-2 border-brand-teal`
- Hover: teal gradient overlay + `translate-y-[-4px]` lift (matching existing card hover pattern)
- Animate in with `motion.div` stagger

**Feature lists per tier:**
- **Standard:** Qualified UK Teacher, Structured Lesson Plan, Homework Support, Online Sessions
- **Experienced:** Everything in Standard + Exam-Board Expertise, Personalised Study Plan, Priority Booking
- **Expert:** Everything in Experienced + Senior Examiner Insights, Intensive Revision Programmes, Assessment & Progress Report Included

### 4. Monthly Packages Section

- Section background: `bg-white` or `bg-section-alt` for contrast
- Heading: **"Save More with Monthly Packages"** in teal
- Two side-by-side cards (or a comparison strip):

  **4 Sessions/Month**
  - 10% discount badge (`<Badge color="var(--brand-gold)">Save 10%</Badge>`)
  - Show calculated example: "GCSE Standard from £144/month"

  **8 Sessions/Month**
  - 15% discount badge (`<Badge color="var(--brand-green)">Save 15%</Badge>`)
  - Show calculated example: "GCSE Standard from £272/month"
  - Mark as "Best Value" with a coral badge

- Use a dynamic price calculator: when the user selects a level + tier from Section 2, auto-update the monthly price examples here

### 5. Add-Ons Strip

- A simple horizontal flex row or a subtle card
- Two items with icons:
  - **Trial Session** — "from £25" with a Sparkles icon
  - **Assessment & Progress Report** — "Included" with a CheckCircle icon
- Style: light teal background (`bg-brand-teal-lighter`), rounded-2xl, gentle padding

### 6. Trust / Positioning Banner

- Full-width strip with `bg-brand-teal` background
- White text, centered: the positioning line quoted above
- Keep it concise — one line with `font-body text-sm lg:text-base`
- Add small icons or checkmarks for visual rhythm

### 7. CTA Section (reuse or adapt existing `CTASection`)

- Heading: **"Ready to Get Started?"**
- Two buttons: "Book a Free Assessment" (primary) and "Find a Tutor" (secondary)
- Optionally reuse the fan-layout student images from the existing `CTASection`

---

## File Structure to Create

```
src/
  pages/
    PricingPage.tsx          ← new page component
  components/
    sections/
      PricingHeroSection.tsx ← hero with title + subtitle
      PricingCardsSection.tsx ← interactive tab selector + pricing cards
      MonthlyPackagesSection.tsx ← monthly discount cards
      PricingAddOnsSection.tsx   ← trial + assessment strip
      PricingTrustBanner.tsx     ← positioning line banner
  data/
    pricing.ts               ← all pricing data as typed constants
```

**Also update:**
- `App.tsx` — add `<Route path="/pricing" element={<PricingPage />} />`
- `src/data/navigation.ts` — add "Pricing" to `navLinks` array (e.g. `{ label: 'Pricing', href: '/pricing' }`)

---

## Data File (`src/data/pricing.ts`)

Create a strongly-typed data file:

```typescript
export interface PricingTier {
  name: 'Standard' | 'Experienced' | 'Expert';
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface KeyStagePrice {
  stage: string;
  shortLabel: string;
  tiers: {
    standard: number;
    experienced: number;
    expert: number;
  };
}

export const keyStages: KeyStagePrice[] = [
  { stage: 'Primary (KS2)', shortLabel: 'KS2', tiers: { standard: 20, experienced: 25, expert: 30 } },
  { stage: 'Secondary (KS3)', shortLabel: 'KS3', tiers: { standard: 30, experienced: 35, expert: 40 } },
  { stage: 'GCSE (KS4)', shortLabel: 'GCSE', tiers: { standard: 40, experienced: 45, expert: 50 } },
  { stage: 'A-Level (KS5)', shortLabel: 'A-Level', tiers: { standard: 50, experienced: 55, expert: 65 } },
];

export const specialistPrice = 70;

export const monthlyDiscounts = {
  four: { sessions: 4, discountPercent: 10 },
  eight: { sessions: 8, discountPercent: 15 },
};

export const tierDetails: PricingTier[] = [
  {
    name: 'Standard',
    description: 'Solid foundations with a qualified UK teacher',
    features: [
      'Qualified UK Teacher (PGCE/QTS)',
      'Structured Lesson Plans',
      'Homework Support',
      'Online Sessions (Zoom/Google Meet)',
    ],
  },
  {
    name: 'Experienced',
    description: 'Enhanced learning with exam-board expertise',
    isPopular: true,
    features: [
      'Everything in Standard',
      'Exam-Board Expertise',
      'Personalised Study Plan',
      'Priority Booking',
    ],
  },
  {
    name: 'Expert',
    description: 'Premium support from senior examiners',
    features: [
      'Everything in Experienced',
      'Senior Examiner Insights',
      'Intensive Revision Programmes',
      'Assessment & Progress Report Included',
    ],
  },
];
```

---

## Responsiveness

- **Mobile (< 768px):** Single-column card stack, horizontal scroll for the stage selector tabs, full-width buttons
- **Tablet (768px–1024px):** 2-column card grid, tabs wrap naturally
- **Desktop (> 1024px):** 3-column card grid with the middle card elevated, tabs in a single row

---

## Accessibility

- All interactive elements (tabs, buttons) must be keyboard-navigable
- Use `role="tablist"` and `role="tab"` for the stage selector
- Price cards should use semantic headings (`h3` for tier name)
- Sufficient color contrast on all text (the existing palette already meets WCAG AA)
- All icons should have `aria-hidden="true"` since they're decorative alongside text

---

## Summary

Build a polished, conversion-focused pricing page that feels like a natural extension of the existing DrTutor landing page. Prioritize clarity of pricing, easy comparison between tiers, and strong CTAs. Every visual element — from the rounded-3xl cards with teal gradient overlays, to the Sora/Plus Jakarta Sans typography, to the motion entrance animations — should be indistinguishable from the existing sections already built.
