# Youth Ka Pakistan

Official website for **Youth Ka Pakistan (YKP Foundation)** — a nationwide nonprofit in Karachi that educates, empowers, skills, and connects Pakistani youth through free workshops, mentorship, and national events.

**Live site:** [youthkapakistan.com](https://youthkapakistan.com/)

## About

YKP helps young people build practical skills, find mentors, and join community events such as URAAN-E-AI 2026. The site is the public home for programs, events, gallery, blog, and contact — plus RSVP and inquiry forms.

**Leadership:** Patron-in-Chief Syed Nasir Hussain Shah · Chairperson Ms. Sabi · President Saima Agha, MPA · Vice President Azhar Zia Muhammad

## Stack

- **Frontend:** Vite, React 19, TypeScript, Tailwind CSS 4
- **API:** Express locally; Vercel serverless functions in production
- **Hosting:** [Vercel](https://vercel.com/) at `youthkapakistan.com` (`www` redirects to apex)

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home — about, programs, why YKP, events, FAQ, contact, map |
| `/events` | Featured events (URAAN-E-AI 2026) and RSVP |
| `/gallery` | Photo albums from YKP events |
| `/blog` | Stories on skills, mentorship, and events |
| `/contact` | Contact details (home also includes the form) |
| `/admin` | Private attendee admin (`noindex`) |

## Delegate RSVP generation engine

As part of **YKP — Youth Ka Pakistan**, this repo includes an automated RSVP generation system for **URAAN-E-AI 2026**.

The engine generates **personalized RSVP / attendee graphics for event delegates** from structured attendee information, so individual cards do not have to be designed by hand.

### What it does

- Generates personalized delegate RSVP cards
- Places attendee name, photo, and designation on a locked event template
- Produces consistent, event-branded visuals
- Supports batch generation for multiple delegates
- Reduces repetitive manual design work
- Creates ready-to-share digital RSVP assets for social media and communication

### Workflow

```text
Delegate information
        ↓
Structured attendee data
        ↓
RSVP generation engine
        ↓
Personalized event graphic
        ↓
Ready-to-share RSVP
```

A delegate RSVPs on `/events`. The API composites their portrait onto `public/posters/ykp-attendee-template.png` using `server/poster.ts` and `public/posters/template-config.json`. The result is emailed to the attendee and listed in `/admin`.

### Event operations

This system sits alongside the broader digital infrastructure for **URAAN-E-AI 2026**:

- Event website
- Event graphics and visual identity
- Social media creatives and content
- Delegate RSVP system
- Trophy and medal design
- Event captions and communication material
- Partner coordination and outreach
- Event-management operations

The goal is to combine technology, design, automation, and operations so event execution stays scalable and professional.

> Built for YKP — Youth Ka Pakistan | URAAN-E-AI 2026

## Local development

**Requires Node.js 20+.**

```bash
npm install
cp .env.example .env.local
npm run dev
```

That starts the Vite app on [http://localhost:3000](http://localhost:3000) and the API on port `8788`.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Frontend + API together |
| `npm run dev:web` | Vite only |
| `npm run dev:api` | API only |
| `npm run build` | Production build |
| `npm run lint` | Typecheck (`tsc --noEmit`) |

Copy `.env.example` to `.env.local` and fill in what you need. Forms still work without SMTP if FormSubmit is used as the fallback. For production email, set `RESEND_API_KEY` (preferred) or SMTP. `ADMIN_KEY` protects the attendees view. `GOOGLE_SHEETS_WEBHOOK_URL` is optional for logging submissions to a sheet.

## Deploy

Pushes to `main` deploy on Vercel. Config lives in `vercel.json` (SPA rewrites, cache headers, serverless API). Do not use regex with `jpe?g` in Vercel route sources.

## Contact

- Email: [info@youthkapakistan.com](mailto:info@youthkapakistan.com)
- Phone: +92 300 2530110
- [Facebook](https://www.facebook.com/YouthKaPakistan.YKP) · [Instagram](https://www.instagram.com/ykpfoundation/) · [LinkedIn](https://www.linkedin.com/company/youth-ka-pakistan/)
