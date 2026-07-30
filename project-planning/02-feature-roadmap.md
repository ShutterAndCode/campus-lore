# CampusLore - Feature Roadmap

## Overview

This document defines the planned feature set for CampusLore and categorizes features into implementation phases. The roadmap ensures that the platform is developed incrementally, with a strong focus on delivering a stable Minimum Viable Product (MVP) before introducing advanced functionality.

---

# Phase 1 - Minimum Viable Product (MVP)

The MVP focuses on solving the core problem: enabling verified students to share and discover valuable campus knowledge.

## Authentication & User Management

* Google OAuth authentication
* Restrict access to approved institutional email domains
* JWT-based authentication
* Protected routes
* User profile creation
* Edit profile
* Profile picture support

---

## Knowledge Repository

* Create knowledge posts
* Edit posts
* Delete posts
* View individual posts
* Browse all posts
* Rich Markdown editor
* Image uploads
* Category selection
* Tag support

---

## Categories

* Academics
* Internships
* Placements
* Research
* Clubs & Societies
* Campus Life
* Hostel
* Events
* Resources

---

## Search & Discovery

* Keyword search
* Filter by category
* Filter by tags
* Sort by newest
* Sort by most helpful

---

## Community Interaction

* Comment on posts
* Reply to comments
* Edit comments
* Delete comments
* Mark posts as Helpful
* Bookmark posts

---

## User Experience

* Responsive design
* Dark mode
* Loading states
* Error handling
* Empty state pages
* Toast notifications

---

# Phase 2 - Enhanced Experience

These features improve usability and engagement without changing the core product.

## Notifications

* New comments
* Replies
* Mentions
* Bookmark reminders
* New content in followed categories

---

## User Profiles

* Public profile pages
* User activity history
* Published posts
* Bookmarked posts
* Contribution statistics

---

## Content Organization

* Trending posts
* Popular tags
* Featured experiences
* Recently updated posts
* Related posts

---

## Moderation

* Report posts
* Report comments
* Admin moderation dashboard
* Soft deletion
* Content review queue

---

# Phase 3 - AI Features

My aim is that the AI features should enhance, not replace the community-driven knowledge base.

## AI Summaries

Generate concise summaries for long experiences.

---

## AI Tag Suggestions

Automatically recommend tags while creating a post.

---

## AI Category Suggestions

Recommend the most relevant category based on post content.

---

## Semantic Search

Allow users to search using natural language instead of exact keywords.

Example:

> "How should I prepare for DBMS viva?"

instead of

> "DBMS"

---

## AI Campus Assistant

Answer student questions using existing CampusLore knowledge through Retrieval-Augmented Generation (RAG).

The assistant should only generate answers based on verified platform content.

---

## Duplicate Detection

Identify highly similar posts and recommend existing discussions before publishing.

---

## Content Moderation

Detect spam, abusive language, and inappropriate content before publication.

---

# Phase 4 - Advanced Features

These features expand the platform into a comprehensive campus ecosystem.

## Recommendations

* Personalized feed
* Recommended posts
* Category recommendations
* Suggested authors

---

## Real-Time Features

* Live notifications
* Real-time comments
* Online status

---

## Analytics

* Trending topics
* Popular categories
* Most helpful contributors
* Platform statistics

---

## Multi-University Support

* Organization management
* Multiple institutional domains
* University-specific communities

---

# Future Scope

Potential long-term enhancements include:

* Progressive Web App (PWA)
* Mobile applications
* Event management
* Club pages
* Study groups
* Resume review section
* Alumni mentorship
* Research collaboration
* Internship tracker
* Referral board
* Polls and surveys

---

# Feature Priorities

| Priority | Description                                |
| -------- | ------------------------------------------ |
| High     | Required for MVP and core functionality    |
| Medium   | Improves user experience after MVP         |
| Low      | Future enhancements and platform expansion |

---

# MVP Success Criteria

The MVP will be considered complete when a verified student can:

* Sign in using their institutional email.
* Create and publish a knowledge post.
* Browse and search existing posts.
* Comment on discussions.
* Bookmark useful content.
* Discover information through categories and tags.
* Access the platform from both desktop and mobile devices.

---

# Development Philosophy

CampusLore follows an incremental development strategy.

Each completed phase should produce a fully functional, deployable application before moving to the next phase.

Advanced features, including AI capabilities, should build upon a stable and well-tested core platform rather than becoming dependencies for the primary user experience.
