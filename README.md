# 🔖 Smart Bookmark App

A modern, real-time bookmark manager built using **Next.js App Router**, **Supabase**, **Prisma**, and **TanStack Query**.

Users can authenticate using Google, save private bookmarks, and see updates reflected instantly across multiple tabs without refreshing the page.

---

## 🚀 Live Demo

- **Live URL:** [LIVE_DEMO](https://smart-bookmark-beige.vercel.app)
- **GitHub Repo:** [SOURCE_CODE](https://github.com/shoaibakhtar800/smart-bookmark)

---

## ✨ Features

- 🔐 Google OAuth authentication (Supabase Auth)
- 👤 Bookmarks are private per user
- ➕ Add bookmarks with title and URL
- 🗑️ Delete your own bookmarks
- 🔄 Real-time sync across tabs using Supabase Realtime
- ⚡ Fast UI with server-driven data fetching
- 🎨 Clean UI built with shadcn/ui and Tailwind CSS
- 🧠 Fully type-safe APIs using Prisma + Zod
- 🛡️ Secure database access using Supabase Row Level Security (RLS)

---

## 🧑‍💻 Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Sonner (toasts)

### Backend
- Supabase (Auth, Database, Realtime)
- Prisma ORM
- PostgreSQL

---

## 🏗️ Architecture Overview

- **Server Components**
  - Route protection
  - Authentication checks
  - Redirect logic
  - Page composition

- **Client Components**
  - Forms and buttons
  - TanStack Query hooks
  - Supabase Realtime listeners
  - Toast notifications

- **State Management**
  - Server state handled by TanStack Query
  - Realtime events invalidate query cache instead of mutating UI state directly

- **Database Access**
  - Prisma ORM for all DB operations
  - Supabase Postgres as the database
  - RLS for user-level data isolation

---

## 🔐 Authentication & Route Protection

The app enforces authentication at the **server level**.

### Rules:
- Logged-out users cannot access protected routes like `/bookmarks`
- Logged-in users cannot access the login page (`/`)
- Server-side guards (`requireAuth`, `requireGuest`) enforce redirects
- Optional client-side hooks prevent UI flicker during hydration

This ensures both **security and smooth UX**.

---

## 🔄 Real-time Updates

- Supabase Realtime listens to changes on the `Bookmark` table
- Events are filtered by `userId`
- On insert/delete:
  - TanStack Query cache is invalidated
  - Bookmarks are re-fetched automatically
- UI stays in sync across multiple tabs without manual state management

---

## 🛡️ Database Security (Row Level Security)

Supabase Row Level Security (RLS) policies ensure:

- Users can read only their own bookmarks
- Users can insert bookmarks only for themselves
- Users can delete only their own bookmarks

Policies compare `auth.uid()` with the bookmark owner directly at the database level.

This guarantees data isolation even if APIs are bypassed.

---

## 🎨 UX & UI Polish

- Skeleton loaders for loading states
- Toast notifications for success and error feedback
- Graceful error handling using Next.js error boundaries
- Animated empty state for first-time users
- Disabled states during async actions to prevent duplicate requests

---

## ⚠️ Challenges Faced & Solutions

### 1. Supabase OAuth + App Router Cookies
- **Problem:** Cookies cannot be modified inside Server Components
- **Solution:** Moved OAuth exchange logic to a dedicated route handler

### 2. Prisma v7 Adapter Requirement
- **Problem:** Prisma required explicit adapter configuration
- **Solution:** Used `@prisma/adapter-pg` with pooled and direct database URLs

### 3. Async `params` and `searchParams`
- **Problem:** Route params and searchParams are async in the latest App Router
- **Solution:** Explicitly awaited them before access

### 4. Realtime + UI Consistency
- **Problem:** Avoiding inconsistent UI across tabs
- **Solution:** Used Realtime only to invalidate TanStack Query cache

### 5. Over-strict UUID Validation
- **Problem:** Strict UUID validation caused delete failures
- **Solution:** Relaxed validation and relied on database ownership checks

---

## 📦 Environment Variables

```env
# Prisma database connections
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Supabase publishable key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
