# $H₹N — website

The live site for $H₹N (shrn.wav). Everything you'll ever change lives in **one file, `content.js`**, plus the image and video files in `assets/`.

## How it's organized

```
site/
├── content.js          ← ALL text, shows, sets, socials, stories, gallery (edit this)
├── index.html          ← the main page (design + animations, rarely touched)
├── list.html           ← announcement-list sign-up page (for gigs / QR codes)
├── links.html          ← link-in-bio page
├── epk.html            ← built-in press kit
└── assets/
    ├── brand/          ← logos (+ logo-pixels.js, the hero animation data)
    ├── shows/          ← posters and photos for shows
    ├── stories/        ← Instagram story files (photos .jpg / videos .mp4)
    ├── press/          ← press photos
    └── sets/           ← fallback cover art (live art comes from SoundCloud)
```

## What updates by itself
- **Upcoming → past:** shows move from Upcoming to "Been There, Rinsed That" automatically the day after their date.
- **New sets:** any new SoundCloud upload appears in the Archive Tapes crate with its SoundCloud artwork and length.
- **Next show:** the scrolling strip, the link-in-bio page and the announcement page always show your next date.

## Common updates (in `content.js`)

**Add an upcoming show:** copy a line in `shows:` and change it:
```js
{ date: "2026-12-20", name: "Nattspil", type: "club", venue: "Nattspil", city: "Madison, WI" },
```
- `type`: `club`, `popup`, `radio`, `stream`, `festival` or `competition`
- b2b: `with: "Teryx"`
- weekly residency: `recurring: "Every Thursday", day: "THU"` (and `date: ""`)

**Add a poster:** put the image in `assets/shows/` (JPG under about 500KB), then add it to the show:
`gallery: ["assets/shows/2026-12-20-nattspil.jpg"]`. The show's card then shows the poster.

**Link Instagram stories to a show:** save the stories from Instagram (open the highlight or story → **⋯ → Save**). Put them in `assets/stories/`, then add them to the show:
`stories: ["assets/stories/2025-10-26-malibu-1.mp4", "assets/stories/2025-10-26-malibu-2.jpg"]`
The card gets a ▶ badge and plays them in the story viewer.

**Highlights row** (the circles under "Been There, Rinsed That"): in `highlights:`, list story files under `items`. A highlight with no items stays hidden.

**Name files by date and event**, for example `2025-10-30-topanga-1.mp4`, so you can always tell what goes where.

**Gallery:** add or remove image paths in `gallery:`.
**Titles / captions / buttons:** `sections:`, `captions:`, `buttons:`.
**Socials:** set `active: true` or `false`.
**Press kit:** paste your own link into `pressKitUrl` (empty = built-in page).
**Announcement list:** after setting up a free form at kit.com, paste its number into `list: { kitFormId: "…" }`. Until then, sign-ups arrive as an email to you.

## Three ways to update the live site

1. **Ask Claude (easiest).** Send the details and files, for example "add Dec 20 Nattspil, poster attached". Claude edits `content.js`, adds the files, and pushes; the site updates in about a minute.
2. **On github.com, from your phone or laptop.**
   - Text: open `content.js` → ✏️ → edit → **Commit changes**.
   - Images: open the folder (for example `assets/shows`) → **Add file → Upload files** → **Commit changes**.
3. **On your computer:** edit the files in `C:\DJ WEBSITE\site`, then push (GitHub Desktop or `git push`).

Every change is saved in GitHub's history, so any mistake can be undone.

**File sizes:** keep each video under about 50MB (GitHub refuses files over 100MB). Instagram story videos are usually 5–15MB.

## Hosting

The site is hosted for free on **GitHub Pages**: every push to the `main` branch republishes it automatically. A custom domain (for example `shrnwav.com`) can be added under **Settings → Pages → Custom domain**, and HTTPS is free.

On GitHub Pages the booking form opens the visitor's email app with the request filled in, addressed to artist.shrn@gmail.com.
