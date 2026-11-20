# $H₹N — website

The live site for $H₹N (shrn.wav): **https://shrn-wav.github.io**. Everything you'll normally change lives in **one file, `content.js`**, plus the image and video files in `assets/`.

## How it's organized

```
site/
├── content.js          ← ALL text, bios, shows, sets, socials, stories, venues (edit this)
├── index.html          ← the main page (design, animations, tape deck)
├── epk.html            ← press kit page (fills itself from content.js)
├── links.html          ← link-in-bio page
├── list.html           ← announcement-list sign-up page (for gigs / QR codes)
├── 404.html            ← "page not found" page
├── robots.txt          ← lets search engines in, keeps AI-training bots out
└── assets/
    ├── brand/          ← logos, tab icons, logo-pixels.js (hero animation data)
    ├── arcade/         ← crate-chase.js, the Crate Chase game
    ├── press/          ← press photos + shrn-press-kit.pdf
    ├── sets/           ← fallback tape art (live art comes from SoundCloud)
    ├── shows/          ← posters and photos for shows
    └── stories/        ← Instagram stories, one folder per night: <date>-<event>/
```

## What updates by itself
- **Upcoming → past:** shows move from Upcoming to "Been There, Rinsed That" the day after their date.
- **New SoundCloud sets** appear in the Archive Tapes crate with their artwork and length.
- **Next show** on the ticker, link-in-bio, sign-up page and press kit page.
- **Press kit page** counts (shows, Madison nights, residencies) from the show list.
  The downloadable **PDF** is a snapshot: ask Claude to rebuild it after big changes.

## Common updates (in `content.js`)

**Add an upcoming show** — copy a line in `shows:` and change it:
```js
{ date: "2026-12-20", time: "10PM – 2AM", name: "Nattspil", tag: "Nattspil: E007", loc: "Nattspil", type: "club", venue: "Nattspil", city: "Madison, WI" },
```
- `tag` = the event name shown big; `loc` = the location line (Madison series group by it)
- `time` shows on Upcoming and goes into "Remind me" calendar alerts
- addresses for the map come from `venues:` (add a venue once, every show there gets the map)
- b2b: `with: "Teryx"`

**Posters:** put the image in `assets/shows/` (JPG under ~500KB) and add `gallery: ["assets/shows/…jpg"]`.

**Instagram stories:** drop the saved files into `assets/stories/<date>-<event>/` and ask Claude to "wire in the new stories" (it converts videos for iPhone, makes the circle thumbnails, and pushes). Optional per story: a tappable link sticker `{src:"…mp4", link:"https://…", label:"@venue"}` or music for silent clips `{src:"…", music:"assets/music/track.mp3"}`.

**Other:** bios → `bioShort` / `bioLong`; ticker extras → `strip`; socials → `active: true/false`; collective text → `collective`; other press kit link → `pressKitExternal`.

## Forms (bookings + announcement list)
Both forms post to a Google Sheet ("SHRN website forms", tabs **Bookings** and **List**) through a Google Apps Script web app (`formsUrl` in content.js). Each submission emails artist.shrn@gmail.com: **🔥 BOOKING —** or **+1 LIST —**. The script has spam traps, formula-injection protection and a flood limit. If `formsUrl` is ever empty, forms fall back to opening the visitor's email app.

## Updating the live site
1. **Ask Claude (easiest):** send the details and files; Claude edits, tests and pushes. Live in about a minute.
2. **github.com:** open a file → ✏️ → edit → **Commit changes** (images: folder → **Add file → Upload files**).
3. **On your computer:** edit `C:\DJ WEBSITE\site`, then `git push`.

Every change is kept in GitHub's history, so anything can be undone. Keep each video under ~50MB (GitHub refuses files over 100MB).

## Hosting
Free on **GitHub Pages** (every push to `main` republishes). A custom domain can be added under **Settings → Pages → Custom domain**, with free HTTPS.

© $H₹N. All rights reserved. Design, code, logos, photos and videos may not be reused.
