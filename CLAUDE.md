# JVL Website — Technical Setup & Deployment Guide

**Last updated:** 2026-05-05
**Project:** JVL Website / ECHO landing pages
**Purpose:** One clean reference for the site stack, repository, key files, deployment workflow, cache behavior, and troubleshooting.

---

## 1. Project context

This document covers the current working setup for the JVL website and ECHO landing pages, including `/echo-1`, `/echo-2`, shared components, global styles, server paths, and the deploy flow.

Primary working focus: landing-page changes around the ECHO home/B2C experience — the `echo-1` route.

---

## 2. Stack

- **Next.js 15** with **App Router**
- **TypeScript / React**
- CSS is written **inline via `<style>` tags inside components**
- No Tailwind, no CSS modules for page-level styling
- Sub-components are defined in the same file above the main export
- Global button classes live in `src/app/globals.css`:
  - `.btn-outline` — outline-style CTA ("Explore on Amazon")
  - `.btn-amazon` — filled blue CTA (`background: #059FFF`)

---

## 3. Repository

| Item | Value |
|---|---|
| GitHub repository | `https://github.com/SergeyVVVV/JVL-test` |
| Working branch | `main` |

**Always work in a feature branch.** Never commit directly to `main`. Every task goes through a feature branch → PR → merge. Only after merge does the code reach production via a manual deploy.

---

## 4. Server and runtime

| Item | Value |
|---|---|
| SSH | `ssh jvladmin@jvl.ca` then `sudo su -` |
| Server project path | `/var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca/` |
| PM2 process name | `jvl-vibe` |
| PM2 owner user | `jvl.ca` |
| Node.js binary path | `/opt/plesk/node/23/bin/` |
| PM2 binary | `/opt/plesk/node/23/bin/node /opt/plesk/node/23/lib/node_modules/pm2/bin/pm2` |
| Production URL | `https://www.jvl.ca` |

---

## 5. Key files

| File | What it is |
|---|---|
| `src/app/(frontend)/[locale]/echo-1/EchoHomeClient.tsx` | `echo-1` page — current main working file |
| `src/app/(frontend)/[locale]/echo-1/page.tsx` | Server component for `echo-1`; uses `revalidate = 300` |
| `src/app/(frontend)/[locale]/echo-2/EchoTwoClient.tsx` | `echo-2` page |
| `src/app/globals.css` | Global styles: `.btn-outline`, `.btn-amazon` |
| `src/components/Footer.tsx` | Site footer |

---

## 6. Visual constants

| Token | Value |
|---|---|
| Accent color | `#FB671F` |
| Blue CTA color | `#059FFF` |
| Dark section background | `#080a0b` or `#101213` |
| Main text color | `#F4F3EC` |
| Section heading size | `clamp(1.6rem, 2.8vw, 2.6rem)` |
| Section heading weight | `700` |
| Body text size | `16–17px` |
| Body text weight | `300` |
| Content max-width | `1200px` |
| Content padding | `0 5vw` |

---

## 7. Page caching

Pages use ISR with `revalidate = 300` (5 minutes). After deployment, if changes are not visible, clear the ISR cache:

```bash
sudo -u jvl.ca rm -f /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca/.next/server/app/en/echo-1.{html,rsc,meta}
```

---

## 8. Deployment — step by step

### Step 1 — SSH into server and switch to root

```bash
ssh jvladmin@jvl.ca
sudo su -
```

### Step 2 — Pull main branch

```bash
sudo -u jvl.ca git -C /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca pull origin main
```

### Step 3 — Build

```bash
sudo -u jvl.ca bash -c 'cd /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca && /opt/plesk/node/23/bin/npm run build'
```

### Step 4 — Clear ISR cache for changed page (if needed)

```bash
sudo -u jvl.ca rm -f /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca/.next/server/app/en/echo-1.{html,rsc,meta}
```

### Step 5 — Restart PM2

```bash
sudo -u jvl.ca /opt/plesk/node/23/bin/node /opt/plesk/node/23/lib/node_modules/pm2/bin/pm2 restart jvl-vibe
```

---

## 9. Quick deploy block (copy-paste after sudo su -)

```bash
sudo -u jvl.ca git -C /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca pull origin main && sudo -u jvl.ca bash -c 'cd /var/www/vhosts/jvl.ca/devsite-vibe.jvl.ca && /opt/plesk/node/23/bin/npm run build' && sudo -u jvl.ca /opt/plesk/node/23/bin/node /opt/plesk/node/23/lib/node_modules/pm2/bin/pm2 restart jvl-vibe
```

---

## 10. If changes are not visible after deploy

1. Clear ISR cache (Section 8, Step 4)
2. Check for stale Next.js process:

```bash
ps aux | grep "next-server" | grep -v grep
```

If found, kill it and restart PM2:

```bash
sudo kill -9 <PID>
sudo -u jvl.ca /opt/plesk/node/23/bin/node /opt/plesk/node/23/lib/node_modules/pm2/bin/pm2 restart jvl-vibe
```

---

## 11. Implementation rules for Claude Code

- Always create a feature branch — never commit directly to `main`
- Open a PR for every change; merge only after review
- Keep sub-components in the same file above the main export
- Use inline `<style>` blocks for page-level CSS
- Do not introduce Tailwind or CSS modules
- Reuse `.btn-outline` and `.btn-amazon` from globals.css
- Follow visual constants from Section 6
- Pages use ISR `revalidate = 300` — do not change this
