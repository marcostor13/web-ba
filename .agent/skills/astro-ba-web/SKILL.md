---
name: Astro-BA-Web
description: Standardized workflow and design system rules for BA Kitchen & Bath Remodeling website using Astro and Tailwind CSS 4.
---

# Astro-BA-Web Skill

This skill ensures that all development for the BA website follows consistent design patterns, technical standards, and AI-driven workflows.

## 1. Tech Stack & Design Tokens
- **Framework**: Astro 5+
- **Styling**: Tailwind CSS 4 (Configured in `src/styles/global.css`)
- **Typography**: `Urbanist` (Google Fonts)
- **Palette**:
    - `beige-light`: `#F4E9DE`
    - `black-soft`: `#151006`
    - `gold`: `#956B24` (Acento)
    - `gray-dark`: `#717171`
    - `gray-light`: `#B5B5B5`
    - `white`: `#FFFFFF`

## 2. Layout & Spacing Rules
- **Full Sections**: Always attempt `h-screen` or `min-h-screen`.
- **Standard Padding**:
    - Top/Bottom: `py-[110px]` (or `pt-[110px]` / `pb-[110px]`)
    - Left/Right: `px-[54px]`
- **Container**: Use `max-w-[1440px] mx-auto`.

## 3. Responsive Design
- **Mobile-First**: Always build for mobile first and use breakpoints (`md:`, `lg:`) for larger screens.
- **Breakpoints**:
    - Default: Mobile (< 768px)
    - `md:`: Tablet / Small Laptop (>= 768px)
    - `lg:`: Desktop (>= 1024px)
- **Fluid Layouts**: Use percentage widths or flex/grid where appropriate, but maintain `px-[54px]` on mobile if possible, or reduce to `px-6` for very small screens.
- **Single Responsibility**: One component = One feature.
- **Tailwind Only**: No Vanilla CSS in components. Use `@apply` in `global.css` only for base/repeated elements.
- **Accessibility**: Use semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).

## 4. AI Workflow Roles
- **Architect**: Manages layout and routing.
- **UI Engineer**: Focuses on pixel-perfect Tailwind classes.
- **QA Auditor**: Verifies against `graficsline.md` and reference images.

## 5. Automated Prompts
When creating new components:
1. Import `Layout.astro`.
2. Apply `px-[54px]` for consistency.
3. Use `text-black-soft` for light backgrounds and `text-white` for image/dark backgrounds.
