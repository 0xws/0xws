---
title: "Mastering Content Collections in Astro"
slug: "astro-content-guide"
description: "A deep dive into Astro's content collections with schema validation, Markdown support, and advanced use cases."
tags: ["astro", "content", "markdown", "guide"]
pubDate: 2025-07-28
---

Managing content in Astro using the `@astro/content` module is a **game-changer** for structured sites.

## 🔍 Overview

Astro provides a powerful and type-safe way to manage your content with:

- Collections
- Schemas
- Markdown/MDX parsing
- Static typing (Zod)

---

## 🛠️ Getting Started

To set up content collections:

```ts
// src/content/config.ts
import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      pubDate: z.date(),
    }),
  }),
};
```

---

## ✅ Features

1. **Schema Validation**
   Ensures consistent metadata across posts.

2. **Type Inference**
   IntelliSense in your IDE.

3. **Custom Fields**
   You can extend the schema to support authors, reading time, or cover images.

---

## 📸 Embedding Images

You can use standard markdown syntax:

![Astro Logo](https://astro.build/assets/press/astro-logo-light.svg)

---

## 📊 Tables

| Feature         | Status |
| --------------- | ------ |
| MDX Support     | ✅      |
| Schema Typed    | ✅      |
| RSS Integration | ✅      |

---

## 🧠 Bonus Tips

> Always define a unique `slug` to prevent route conflicts.

---

## 🚀 Deploying Your Content

Once everything is set up:

```bash
npm run build && npm run preview
```

You’ll now have statically generated pages based on your Markdown.

---

## 🔗 Resources

* [Astro Docs](https://docs.astro.build)
* [Zod Docs](https://zod.dev)
