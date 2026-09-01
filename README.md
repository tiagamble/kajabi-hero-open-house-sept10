# Kajabi Hero Open House — September 10, 2026

Internal team hero profile directory for the September 10 event at Kajabi HQ (400 Spectrum Center Drive, Irvine, CA).

**15 heroes + 7 guests = 22 attendees**

## Features

- **Hero Grid:** Browse all 15 heroes with search and stage filtering
- **Hero Details:** Click any card to see full CSM, technical support, and risk flag information
- **Password Protected:** Access controlled with password: `Intheroom`
- **Mobile Responsive:** Works seamlessly on desktop, tablet, and mobile
- **Stage Filters:** Scale, Growth, Established, Launch, Transition

## Setup

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
Password: `Intheroom`

### Build & Deploy

```bash
npm run build
npm start
```

## Heroes (15 Total)

| # | Hero | Business | GMV Trailing 12mo | Status |
|----|------|----------|------------------|--------|
| 1 | Bernd Brodtraeger | Bernth's Guitar Academy | $765K | Scale (+127.8% YoY) |
| 2 | Cinthia Holguin | Brows Couple | $397K | Growth (-19.6% YoY) |
| 3 | Seth Powell | Yogic Studies | $563K | Established (55.5% off-platform) |
| 4 | Suzie & Rory Gutierrez | EZ Biz Inc | $71K | Growth (+103.6% YoY) |
| 5 | Glenn Rottmann | The Hypno Vault | $251K | Established (no login since May 18) |
| 6 | Laura Alessio | Nurse Coach Alessio | $5.4K | Launch (earliest stage) |
| 7 | Hayley & Doug Johnson | YouTubepreneur | $0 | Launch (SENSITIVE) |
| 8 | Brandon Trentalange | Millennial Marketer | $198K | Growth (-26.7% YoY) |
| 9 | Lane Sebring | Preaching Donkey | $3.3K | Transition (SENSITIVE) |
| 10 | Dylan Stewart | The MacWhisperer | $320K | Scale (mid-breakout) |
| 11 | Michele Park | The SOUL Fitness Brands | $185K | Established (legacy plan) |
| 12 | Phillip Goltiao | Hymns With Phil | $15K | Launch (new, healthy ramp) |
| 13 | Tania Lucely | Tania Lucely | $150K | Established (AI-focused) |
| 14 | Samantha Weaver | AOMT | $817K | Established (SENSITIVE: cash flow stress) |
| 15 | Lauren Messiah | Style Boss Academy | $357K | Growth (no RSVP data) |

## Sensitive Profiles

**Read these three before the day:**

- **Hayley & Doug Johnson:** $0 recorded revenue. Do NOT reference numbers in group setting.
- **Lane Sebring:** Revenue down 87% YoY. He knows his funnels are broken. Do NOT say the number.
- **Samantha Weaver:** Highest lifetime GMV ($4.65M) but reported cash flow stress. Do NOT lead with upgrade.

## Password

Default password: `Intheroom`

## Data Structure

Hero data is stored in `data/heroes.json` with the following fields:

- **Vitals:** MRR, ARR, tenure, contacts, members, sites, add-ons
- **GMV:** All-time, trailing 12-month, YoY growth, recent quarter, processor mix
- **CSM Focus:** Key actions and conversation points
- **Technical Support:** Platform setup and support priorities
- **Risk Flags:** Potential issues to monitor

## Adding Hero Photos

Place hero photos in `public/heroes/` with naming convention:
- `bernd-brodtraeger.jpg`
- `cinthia-holguin.jpg`
- etc.

Update the `photo` field in `data/heroes.json`:

```json
"photo": "/heroes/bernd-brodtraeger.jpg"
```

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **JavaScript** - No TypeScript required
- **Static Generation** - Fast, secure site

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect to Vercel for auto-deployment.

## Notes

- All hero data is internal use only
- Password protection required for access
- Photos are optional (placeholders shown if missing)
- Three profiles require sensitive handling — read the Sensitive Profiles section

---

**Event Date:** September 10, 2026  
**Location:** Kajabi HQ, 400 Spectrum Center Drive, Suite 125, Irvine, CA 92618
