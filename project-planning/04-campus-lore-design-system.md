# CampusLore Design System
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** August 2026

---

# Purpose

The CampusLore Design System defines the visual language, reusable UI components, interaction patterns, and implementation standards used throughout the application.

Its objectives are:

- Maintain visual consistency
- Improve developer productivity
- Simplify future feature development
- Ensure accessibility
- Support light and dark themes
- Create a premium product experience

This document should be treated as the single source of truth for all frontend development.

---

# 1. Design Philosophy

CampusLore follows the philosophy of:

> **"Clean enough for professionals. Warm enough for students."**

The interface should prioritize:

- Readability
- Simplicity
- Consistency
- Accessibility
- Calm interactions

Users should feel like they are browsing a modern university platform rather than a traditional social network.

---

# 2. Design Inspirations

Primary Inspiration

- Linear
- Notion
- GitHub
- Modern University Portals

Secondary Inspiration

- Medium
- Read.cv

Avoid Inspiration From

- Instagram
- Facebook
- TikTok
- Snapchat

Reason:

CampusLore is built for learning rather than entertainment.

---

# 3. Theme Support

CampusLore supports two complete themes.

## Light Theme

Default experience.

Characteristics:

- Bright
- Minimal
- Academic
- Reading focused

---

## Dark Theme

Characteristics:

- Slate-based
- High readability
- Low eye strain
- Professional

Pure black backgrounds should be avoided.

---

# 4. Color System

## Brand Colors

Primary

Blue

Purpose:

- Primary buttons
- Active navigation
- Links

Secondary

Emerald

Purpose:

- Success
- Helpful actions
- Mentorship

Accent

Amber

Purpose:

- Highlights
- Featured content
- Warnings

Danger

Red

Purpose:

- Delete
- Errors

Neutral

Slate / Gray

Purpose:

- Backgrounds
- Borders
- Cards
- Text hierarchy

---

## Color Hierarchy

Primary

Brand identity.

Secondary

Supporting actions.

Neutral

Backgrounds and structure.

Semantic

Status colors only.

---

# 5. Light Theme

Background

Off-white

Cards

White

Sidebar

Very light gray

Borders

Light gray

Primary Text

Near black

Secondary Text

Muted gray

---

# 6. Dark Theme

Background

Slate 950

Cards

Slate 900

Sidebar

Slate 950

Borders

Slate 800

Primary Text

Gray 100

Secondary Text

Gray 400

Accent colors remain identical to Light Mode.

---

# 7. Typography

Primary Font

Inter

Reasons

- Highly readable
- Excellent for long-form content
- Professional appearance
- Modern

---

## Heading Scale

H1

Page Titles

H2

Section Titles

H3

Card Titles

H4

Subsections

---

## Body

Body Large

Story content

Body Medium

General content

Body Small

Metadata

---

## Font Weights

Regular

General reading

Medium

Labels

Semibold

Buttons

Bold

Page titles only

---

# 8. Spacing System

CampusLore uses an 8px spacing system.

Allowed values:

4

8

12

16

24

32

40

48

64

96

Do not invent custom spacing unless absolutely necessary.

---

# 9. Border Radius

Cards

Large

Buttons

Medium

Inputs

Medium

Dropdowns

Medium

Badges

Pill

Avatars

Full

Consistency is preferred over variety.

---

# 10. Elevation

Only three elevation levels exist.

Level 0

Flat

Level 1

Cards

Level 2

Dialogs

Avoid dramatic floating effects.

---

# 11. Borders

Default

1px

Use borders to define layout before relying on shadows.

---

# 12. Icons

Library

Lucide

Rules

- Outline icons only
- Consistent stroke width
- Use icons to support labels, not replace them
- Avoid mixing icon libraries

---

# 13. Layout System

Desktop

Three-column layout.

Sidebar

Main Content

Campus Pulse

---

Tablet

Sidebar collapses.

Campus Pulse moves below content.

---

Mobile

Bottom Navigation

Campus Pulse becomes a dedicated page or collapsible section.

---

# 14. Navigation

Navbar

Global actions.

Sidebar

Navigation only.

Campus Pulse

Information only.

Navigation should never appear inside Campus Pulse.

---

# 15. Grid System

Content Width

Centered.

Maximum readable width.

Cards should align to a consistent grid.

Avoid unpredictable layouts.

---

# 16. Component Library

Reusable components include:

Buttons

Inputs

Textarea

Select

Dropdown

Checkbox

Radio

Switch

Badge

Avatar

Card

Dialog

Modal

Toast

Tabs

Accordion

Pagination

Breadcrumb

Search Bar

Empty State

Skeleton Loader

Tooltip

Popover

Command Palette (Future)

---

# 17. Specialized Components

Story Card

Mentor Card

Event Card

Announcement Card

Achievement Card

Profile Card

Category Card

Campus Pulse Widget

Search Result Card

Comment Thread

Bookmark Card

These should share spacing, typography, and interaction patterns.

---

# 18. Campus Pulse Widgets

Widgets include:

Upcoming Events

Exam Schedule

Placement Calendar

Announcements

Trending Topics

Featured Story

Mentor Spotlight

Student Achievements

Each widget should have:

- Title
- Icon
- Content
- Action button (optional)

Widgets should remain compact and glanceable.

---

# 19. Motion System

Motion should communicate feedback, not decoration.

Animation Duration

Fast

Normal

Slow

Examples

Hover

Fade

Slide

Collapse

Loading

Avoid bounce animations.

---

# 20. States

Every interactive component must support:

Default

Hover

Focus

Active

Disabled

Loading

Error

Success

These states should remain visually consistent.

---

# 21. Empty States

Every feature requires an empty state.

Examples

No Bookmarks

No Stories

No Mentorship Requests

No Search Results

No Events

Empty states should encourage action.

---

# 22. Loading States

Use Skeleton Loaders instead of spinners whenever possible.

Benefits

- Better perceived performance
- Reduced layout shift

---

# 23. Forms

Rules

Clear labels

Visible validation

Helpful error messages

Logical grouping

Keyboard accessibility

Never rely solely on placeholder text.

---

# 24. Accessibility

Follow WCAG guidelines.

Requirements

Keyboard navigation

Visible focus

Screen reader support

Reduced motion

Minimum touch target size

Accessible color contrast

---

# 25. Responsive Design

Desktop

Primary experience.

Tablet

Adaptive layout.

Mobile

Essential functionality only.

Every component must work across all breakpoints.

---

# 26. Dark Mode Guidelines

Dark mode should not simply invert colors.

Instead:

- Preserve hierarchy
- Reduce eye strain
- Maintain contrast
- Keep accent colors consistent

---

# 27. Implementation Standards

Recommended Stack

React

Tailwind CSS

shadcn/ui

Lucide Icons

Framer Motion (subtle use only)

---

Component Naming

PascalCase

Example

StoryCard

CampusPulse

MentorCard

Navbar

Sidebar

---

Folder Organization

components/

ui/

layout/

cards/

forms/

pulse/

navigation/

---

# 28. Future Expansion

Future components should:

Follow spacing rules.

Use existing color tokens.

Support dark mode.

Support accessibility.

Remain responsive.

Avoid introducing new visual patterns unless absolutely necessary.

---

# 29. Design Review Checklist

Before shipping any new UI:

✓ Matches design philosophy

✓ Uses existing components

✓ Supports dark mode

✓ Responsive

✓ Accessible

✓ Consistent spacing

✓ Correct typography

✓ Uses proper colors

✓ Appropriate interaction states

✓ Fits CampusLore brand

---

# Revision History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | August 2026 | Initial Design System |