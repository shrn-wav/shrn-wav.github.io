/* =====================================================================
   $H₹N — SITE CONTENT
   This is the ONLY file you need to edit to update the website.
   - Text goes between "quotes". Keep the commas at the end of lines.
   - Dates are "YYYY-MM-DD". Shows automatically move from UPCOMING to
     past on their own once the date passes.
   - Images: drop files into the assets/ folders, then add the path here.
   - Leave a field as "" to hide it.
   ===================================================================== */

window.SITE = {

  /* ---------- identity ---------- */
  artist: "$H₹N",
  /* The hero logo cycles through these, in this order.
     img: path to a logo file. If img is "", the text (txt) is shown instead.
     scale: shrink/grow one logo so all three feel the same size (1 = normal). */
  names: [
    { txt: "$H₹N", cls: "logo", lang: "en", img: "assets/brand/shrn-logo.svg",  scale: 1 },
    { txt: "ஷரண்", cls: "taml", lang: "ta", img: "assets/brand/shrn-tamil-a4.png", scale: 1 },
    { txt: "शरन",  cls: "deva", lang: "hi", img: "assets/brand/shrn-hindi.svg", scale: 0.9 },
  ],
  logoHold: 6000,    // how long each logo stays on screen (milliseconds)
  titleHold: 5000,   // how long each version of the "Upcoming" title stays
  location: "MADISON, WI",
  /* extra lines for the ticker under the logo (between the upcoming dates) */
  strip: ["HOSTING OPEN DECKS @ RUBY"],
  /* addresses for the Upcoming map + directions, by venue name (a show's own address: wins) */
  venues: {
    "Ruby":     { place: "Ruby at Liquid", address: "624 University Ave, Madison, WI 53715" },
    "Liquid":   { place: "Liquid",         address: "624 University Ave, Madison, WI 53715" },
    "Nattspil": { place: "Nattspil",       address: "211 King St, Madison, WI 53703" },
  },

  /* ---------- section titles ----------
     Only "board" switches languages (English → Tamil → Hindi).
     cap = optional line under a title. Use "" to hide it. */
  sections: {
    board:   { en: "Upcoming", ta: "என்ன சீன்?", hi: "सीन क्या है?", cap: "going berserk @" },
    tapes:   { en: "Archive Tapes",           cap: "" },
    been:    { en: "Been There, Rinsed That", cap: "" },
    about:   { en: "About",                   cap: "" },
    gallery: { en: "Gallery",                 cap: "" },
    booking: { en: "Booking",                 cap: "need a bass dealer for the night? i got you." },
    socials: { en: "Socials",                 cap: "" },
    list:    { en: "Join my announcement list", cap: "" },
  },
  captions: {
    deckEmpty: "pick a tape, macha",
    formSent:  "Received! Talk Soon..",
    listJoined: "you're on the list. see you on the floor.",
  },
  buttons: { send: "SEND IT →", join: "I'M IN →" },

  /* Press kit link. Leave "" to use the built-in press kit page (epk.html),
     or paste a link to your own (Google Drive / Dropbox PDF, Canva, etc.) */
  pressKitUrl: "",
  pressKitPdf: "assets/press/shrn-press-kit.pdf",   // downloadable PDF version (rebuilt by Claude when info changes)
  pressKitExternal: "",                              // your other press kit link (the one you mentioned), shown as a button
  /* the collective (in the making) — shown in the press kit */
  collective: {
    name: "",
    text: "A DJ collective in development, built around unplanned back-to-back sessions between selectors. Sessions will be filmed for YouTube and streamed live, with the long-term aim of an online radio platform for Madison and South Asian underground talent.",
  },

  /* ---------- gallery (photos + posters, shown in this order) ---------- */
  gallery: [
    "assets/press/shrn-press-01.jpg",
    "assets/shows/open-decks-2.jpg",
    "assets/press/shrn-press-03.jpg",
    "assets/shows/nattspil-2026-09-27.jpg",
    "assets/press/shrn-press-02.jpg",
    "assets/shows/mdm-tech-social-hour.jpg",
    "assets/press/shrn-press-04.jpg",
    "assets/shows/open-decks-1.jpg",
    "assets/press/shrn-press-05.jpg",
    "assets/shows/nattspil-2026-10-24.jpg",
    "assets/shows/twitch-edm-train.jpg",
  ],

  /* ---------- announcement list ----------
     Once you make a free Kit account (kit.com) and create a form, paste its
     form ID here (the number in the form's share link). Until then, sign-ups
     are sent to your email so nobody gets lost. */
  list: { kitFormId: "" },

  /* ---------- where the forms go ----------
     The "Web app URL" of your Google Sheet script (tools/forms-apps-script.gs).
     When set, bookings + list sign-ups save to the Sheet and email you instantly.
     Leave "" and forms fall back to opening the visitor's email app. */
  formsUrl: "https://script.google.com/macros/s/AKfycbyIesmxB7ebI0mX4h6iJgFRTC_hGFywFmKO4RTAEuzkUqRVN5wWYR-20GhF1D3Fy9pb/exec",
  email: "artist.shrn@gmail.com",
  bpm: 126,                                   // default pulse speed when a set plays

  /* ---------- socials (active:false = hidden until you start using it) ---------- */
  socials: [
    { name: "Instagram",  handle: "@shrn.wav",  url: "https://www.instagram.com/shrn.wav/",     active: true },
    { name: "SoundCloud", handle: "shrnwav",    url: "https://soundcloud.com/shrnwav",          active: true },
    { name: "YouTube",    handle: "@shrn_wav",  url: "https://www.youtube.com/@shrn_wav",        active: true },
    { name: "Twitch",     handle: "shrn_wav",   url: "https://www.twitch.tv/shrn_wav",           active: true },
    { name: "Spotify",    handle: "playlists",  url: "https://open.spotify.com/user/31pqj2hwbu4sug7j5f7hmpgxrnbm", active: false },
    { name: "Discord",    handle: "shrn.wav",   url: "",  copy: "shrn.wav",                     active: false },
    { name: "Mixcloud",   handle: "SHRN_WAV",   url: "https://www.mixcloud.com/SHRN_WAV/",      active: false },
    { name: "Bandcamp",   handle: "shrnwav",    url: "https://shrnwav.bandcamp.com",            active: false },
    { name: "TikTok",     handle: "@shrn.wav",  url: "https://www.tiktok.com/@shrn.wav",        active: false },
    { name: "X",          handle: "@shrn_wav",  url: "https://x.com/shrn_wav",                  active: false },
    { name: "Resident Advisor", handle: "shrn.wav", url: "",                                    active: false },
  ],

  /* ---------- bio ---------- */
  bioShort: "$H₹N is a DJ based in Madison, Wisconsin. His sets move between tech house, UK garage, techno and house, shaped by his South Asian heritage and an interest in club music from across the diaspora. He plays regularly across Madison's club circuit, including Liquid, Ruby, Local Motive and Nattspil, and hosts the Open Decks series at Ruby. His live recordings are collected in the ongoing Archive Tapes series.",
  bioLong: [
    "$H₹N is a DJ based in Madison, Wisconsin. His sets draw on tech house, UK garage, speed garage, techno, house and disco, with an emphasis on reading the room and building each set around the space and the crowd. Growing up between South Asian music and Western club culture has shaped an approach that favours rhythm, groove and contrast over a single fixed sound.",
    "In Madison he plays regularly across the city's club circuit. At Liquid he performs tech house, baile funk, hip-hop and UK garage across the venue's themed nights; at Ruby he hosts the Open Decks series and the London Underground nights, focused on techno, speed garage and bass; at Local Motive he plays house and disco; and at Nattspil he contributes to the venue's episode series with acid house, funky house and disco. Before Madison he performed in Los Angeles, including Phase 1's after-hours series in downtown LA, the YOUR SHOT 2025 DJ competition and pop-up events in Malibu and Topanga, with further appearances in Miami, at Elements Festival in Pennsylvania, on Birdcage Radio in Utrecht and in HÖR's Maximum Heat contest.",
    "His performances are documented in Archive Tapes, an ongoing series of unedited live recordings from club nights, radio and pop-up events. He is currently developing a DJ collective centred on unplanned back-to-back sessions, to be filmed and streamed, with plans to grow into an online radio platform.",
  ],
  genres: "Tech House · UKG · Techno · Speed Garage · Baile · House · Disco · Acid House",

  /* ---------- press photos (shown on About + downloadable in the EPK) ---------- */
  press: [
    "assets/press/shrn-press-01.jpg",
    "assets/press/shrn-press-02.jpg",
    "assets/press/shrn-press-03.jpg",
    "assets/press/shrn-press-04.jpg",
    "assets/press/shrn-press-05.jpg",
  ],
  pressFolder: "",   // optional: Google Drive / Dropbox link with hi-res photos + WAVs

  /* ---------- sets ----------
     PLAY finds the track on your SoundCloud automatically by matching the
     title (or "match", if the SoundCloud title is written differently).
     soundcloud: optional exact SoundCloud link (overrides the matching).
     youtube: optional YouTube link for the same set. */
  soundcloudProfile: "https://soundcloud.com/shrnwav",
  sets: [
    { title: "From the Shadows",       series: "Club Mixes",                      genres: "Tech House · Bass · Hip-Hop",       cover: "assets/sets/from-the-shadows.jpg",  soundcloud: "", youtube: "", bpm: 126 },
    { title: "Into the Storm",         series: "Club Mixes",                      genres: "Tech House · DnB · Bass",           cover: "assets/sets/into-the-storm.jpg",    soundcloud: "", youtube: "", bpm: 130 },
    { title: "Retro Sparks",           series: "Club Mixes",                      genres: "Tech House · Bass House · Hip-Hop", cover: "assets/sets/retro-sparks.jpg",      soundcloud: "", youtube: "", bpm: 126 },
    { title: "Blackout Protocol",      series: "Twitch EDM Train · TMA Network", genres: "Drum & Bass · Dubstep",                     cover: "assets/sets/blackout-protocol.jpg", soundcloud: "", youtube: "", bpm: 174 },
    { title: "Phase I — Sequence 004", series: "Phase 1 Afters · DTLA",          genres: "Tech House",                    cover: "assets/sets/phase-i.jpg",           soundcloud: "", youtube: "", bpm: 128 },
    { title: "Maximum Heat",           series: "HÖR DJ Contest 2026",            genres: "Techno",             cover: "assets/sets/hor-max-heat.jpg",      soundcloud: "", youtube: "", bpm: 128 },
    { title: "Hump Day Freestyle",     match: "humpdayfreestyle", series: "Freestyle Sessions", genres: "Freestyle",       cover: "assets/sets/humpday-freestyle.jpg", soundcloud: "", youtube: "", bpm: 126 },
  ],

  /* ---------- shows ----------
     type: club | popup | radio | stream | festival | competition
     date: "YYYY-MM-DD"  (or leave "" and use when: "free text")
     tag: the event line on the show's card (episode, event name)
     loc: the location line under it (venue or place); Madison shows are grouped by this
     with: b2b partner(s)
     gallery: list of image paths (posters, photos) — put files in assets/shows/
     instagram: link to the Instagram highlight / post for this show
     stories: Instagram story files for this show (photos/videos). They show as small circles
              inside the show's card; tap one to watch. Thumbnails: run the story tool (ask Claude).
     instagram: link to the matching Instagram highlight ("View on Instagram" button)
     time: set time / doors, e.g. "10PM – 2AM" (shown on Upcoming)
     address: street address for the map + directions (Upcoming)
     links: per-story link stickers, e.g. stories: [{src:"...mp4", link:"https://...", label:"@nattspil"}]
     recurring: for weekly residencies, e.g. recurring: "Every Thursday", day: "THU" */
  shows: [
    { date: "2026-08-28", name: "Sotto", tag: "Open Decks", loc: "Sotto Nightclub",                       type: "club", venue: "Sotto Nightclub", city: "Madison, WI", stories: ["assets/stories/2026-08-28-sotto-open-decks/2026-08-28-01.mp4", "assets/stories/2026-08-28-sotto-open-decks/2026-08-28-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-12-13", name: "Nattspil", tag: "Nattspil: E006", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI" },
    { date: "2026-12-03", name: "Nattspil", tag: "Nattspil: E005", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI" },
    { date: "2026-11-21", time: "9PM – 1AM", name: "Ruby", tag: "London Underground #2", loc: "Ruby",                            type: "club", venue: "Ruby",     city: "Madison, WI" },
    { date: "2026-11-20", time: "7PM – 11PM", name: "Ruby", tag: "Open Decks #2", loc: "Ruby",                     type: "club", venue: "Ruby",     city: "Madison, WI", note: "Poster designed by $H₹N", gallery: ["assets/shows/open-decks-2.jpg", "assets/shows/open-decks-2-story.jpg"] },
    { date: "2026-11-14", name: "Liquid", tag: "GTA Rave 2", loc: "Liquid",                       type: "club", venue: "Liquid", city: "Madison, WI", with: "Teryx", stories: ["assets/stories/2026-11-14-gta-rave-2/2026-11-15-01.mp4", "assets/stories/2026-11-14-gta-rave-2/2026-11-18-02.mp4", "assets/stories/2026-11-14-gta-rave-2/2026-11-18-03.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-11-13", name: "Liquid", tag: "GTA Rave", loc: "Liquid",                         type: "club", venue: "Liquid", city: "Madison, WI", with: "Teryx", stories: ["assets/stories/2026-11-13-gta-rave/2026-11-13-01.mp4", "assets/stories/2026-11-13-gta-rave/2026-11-14-02.mp4", "assets/stories/2026-11-13-gta-rave/2026-11-15-03.mp4", "assets/stories/2026-11-13-gta-rave/2026-11-15-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-11-08", name: "Nattspil", tag: "Nattspil: E004", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI", stories: ["assets/stories/2026-11-08-nattspil/2026-11-04-01.mp4", "assets/stories/2026-11-08-nattspil/2026-11-08-02.mp4", "assets/stories/2026-11-08-nattspil/2026-11-09-03.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-11-07", name: "Ruby", tag: "London Underground #1", loc: "Ruby",                              type: "club", venue: "Ruby",     city: "Madison, WI", stories: ["assets/stories/2026-11-07-ruby-ukg/2026-11-08-01.webp"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-11-07", name: "Liquid", tag: "Nostalgia Night: 2010s", loc: "Liquid",           type: "club", venue: "Liquid",   city: "Madison, WI", stories: ["assets/stories/2026-11-07-liquid-2010s/2026-11-06-01.mp4", "assets/stories/2026-11-07-liquid-2010s/2026-11-07-02.mp4", "assets/stories/2026-11-07-liquid-2010s/2026-11-08-03.mp4", "assets/stories/2026-11-07-liquid-2010s/2026-11-08-04.mp4", "assets/stories/2026-11-07-liquid-2010s/2026-11-08-05.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-11-06", name: "Ruby", tag: "Open Decks #1", loc: "Ruby",                       type: "club", venue: "Ruby",     city: "Madison, WI", note: "Poster designed by $H₹N", gallery: ["assets/shows/open-decks-1.jpg"], stories: ["assets/stories/2026-11-06-ruby-open-decks/2026-11-06-01.mp4", "assets/stories/2026-11-06-ruby-open-decks/2026-11-07-02.mp4", "assets/stories/2026-11-06-ruby-open-decks/2026-11-07-03.mp4", "assets/stories/2026-11-06-ruby-open-decks/2026-11-07-04.mp4", "assets/stories/2026-11-06-ruby-open-decks/2026-11-07-05.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-10-30", name: "Liquid", tag: "Thrillaween", loc: "Liquid",                      type: "club", venue: "Liquid",   city: "Madison, WI", stories: ["assets/stories/2026-10-30-liquid-thrillaween/2026-10-30-01.mp4", "assets/stories/2026-10-30-liquid-thrillaween/2026-10-31-02.mp4", "assets/stories/2026-10-30-liquid-thrillaween/2026-10-31-03.mp4", "assets/stories/2026-10-30-liquid-thrillaween/2026-10-31-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-10-24", name: "Nattspil", tag: "Nattspil: E003", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI", gallery: ["assets/shows/nattspil-2026-10-24.jpg"], stories: ["assets/stories/2026-10-24-nattspil/2026-10-24-01.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-10-23", name: "Liquid", tag: "Nostalgia Night: Halloween Edition", loc: "Liquid", type: "club", venue: "Liquid", city: "Madison, WI", with: "Biabebo", stories: ["assets/stories/2026-10-23-liquid-halloween/2026-10-23-01.mp4", "assets/stories/2026-10-23-liquid-halloween/2026-10-24-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-10-10", name: "Local Motive", tag: "Tech House", loc: "Local Motive",                     type: "club", city: "Madison, WI", with: "EJKT", stories: ["assets/stories/2026-10-10-local-motive/2026-10-10-01.mp4", "assets/stories/2026-10-10-local-motive/2026-10-10-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-09-27", name: "Nattspil", tag: "Nattspil: E002", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI", gallery: ["assets/shows/nattspil-2026-09-27.jpg"], stories: ["assets/stories/2026-09-27-nattspil/2026-09-26-01.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-09-18", name: "Local Motive", tag: "Tech House", loc: "Local Motive",                     type: "club", city: "Madison, WI", with: "DIExRICH", stories: ["assets/stories/2026-09-18-local-motive/2026-09-18-01.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-09-12", name: "Liquid", tag: "2016 vs 2026", loc: "Liquid",             type: "club", venue: "Liquid",   city: "Madison, WI", stories: ["assets/stories/2026-09-12-liquid-2016-vs-2026/2026-09-11-01.mp4", "assets/stories/2026-09-12-liquid-2016-vs-2026/2026-09-13-02.mp4", "assets/stories/2026-09-12-liquid-2016-vs-2026/2026-09-13-03.mp4", "assets/stories/2026-09-12-liquid-2016-vs-2026/2026-09-13-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-09-04", name: "Nattspil", tag: "Nattspil: E001", loc: "Nattspil",                         type: "club", venue: "Nattspil", city: "Madison, WI", gallery: ["assets/shows/nattspil-2026-09-04.jpg"], stories: ["assets/stories/2026-09-04-nattspil/2026-09-04-01.mp4", "assets/stories/2026-09-04-nattspil/2026-09-05-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18187212193389125/" },
    { date: "2026-04-29", name: "HÖR", tag: "Maximum Heat · DJ Contest", loc: "HÖR · Online",    type: "competition", venue: "HÖR", city: "Online", note: "50-minute contest set", gallery: ["assets/shows/hor-max-heat-entry.jpg", "assets/sets/hor-max-heat.jpg"], stories: ["assets/stories/2026-04-29-hor-maximum-heat/2026-04-29-01.mp4", "assets/stories/2026-04-29-hor-maximum-heat/2026-04-29-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18101711863814170/" },
    { date: "2026-04-24", name: "Phase 1", tag: "Sequence 004", loc: "Phase 1 · DTLA",           type: "popup", venue: "Secret location · Phase 1 collective afters", city: "Downtown LA, CA", note: "Recorded as “Phase I — Sequence 004” in Archive Tapes", stories: ["assets/stories/2026-04-24-phase-1-dtla/2026-04-09-01.mp4", "assets/stories/2026-04-24-phase-1-dtla/2026-04-24-02.mp4", "assets/stories/2026-04-24-phase-1-dtla/2026-04-27-03.mp4", "assets/stories/2026-04-24-phase-1-dtla/2026-04-27-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/18593894071029781/" },
    { date: "2026-01-24", name: "Tech Social Hour", tag: "Tech Social Hour", loc: "Mission Dolores Manor · SF", type: "popup", venue: "Mission Dolores Manor (tech founders' co-living), Van Ness Ave", city: "San Francisco, CA", gallery: ["assets/shows/mdm-tech-social-hour.jpg"], stories: ["assets/stories/2026-01-24-sf-tech-social-hour/2026-01-07-01.mp4", "assets/stories/2026-01-24-sf-tech-social-hour/2026-01-11-02.mp4", "assets/stories/2026-01-24-sf-tech-social-hour/2026-01-11-03.mp4", "assets/stories/2026-01-24-sf-tech-social-hour/2026-01-24-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/17869308117516839/" },
    { date: "2025-10-11", name: "Twitch", tag: "EDM Train", loc: "TMA Network · Twitch",                 type: "stream", venue: "TMA Network (Twitch)", city: "Online", note: "Set recorded as “Blackout Protocol” in Archive Tapes", gallery: ["assets/shows/twitch-edm-train.jpg"] },
    { date: "2025-11-21", name: "Birdcage Radio", tag: "Live Radio Set", loc: "Birdcage Radio · Utrecht",               type: "radio",  venue: "Birdcage Radio", city: "Utrecht, Netherlands", stories: ["assets/stories/2025-11-21-birdcage-radio/2025-11-17-01.mp4", "assets/stories/2025-11-21-birdcage-radio/2025-11-18-02.mp4", "assets/stories/2025-11-21-birdcage-radio/2025-11-22-03.mp4", "assets/stories/2025-11-21-birdcage-radio/2026-01-06-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/17928418812117513/" },
    { date: "2025-10-31", name: "Viajero", tag: "Pool Party #2", loc: "Viajero · South Beach",     type: "popup",  venue: "Viajero Miami, 1120 Collins Ave", city: "South Beach, Miami, FL", instagram: "https://www.instagram.com/stories/highlights/18159291598389073/" },
    { date: "2025-10-30", name: "Topanga", tag: "Viewpoint Pop-Up", loc: "Topanga, LA",         type: "popup",  city: "Topanga, Los Angeles, CA", instagram: "https://www.instagram.com/stories/highlights/18120834010605759/" },
    { date: "2025-10-30", name: "South Beach", tag: "Beach Pop-Up", loc: "South Beach, Miami",               type: "popup",  city: "South Beach, Miami, FL", note: "With a fitness influencer", instagram: "https://www.instagram.com/stories/highlights/18159291598389073/" },
    { date: "2025-10-26", name: "Malibu", tag: "Beach Pop-Up", loc: "Malibu, CA",              type: "popup",  city: "Malibu, CA", stories: ["assets/stories/2025-10-26-malibu-pop-up/2025-09-26-01.mp4", "assets/stories/2025-10-26-malibu-pop-up/2025-09-26-02.mp4"], instagram: "https://www.instagram.com/stories/highlights/18291536485269886/" },
    { date: "2025-10-24", name: "Viajero", tag: "Pool Party #1", loc: "Viajero · South Beach",     type: "popup",  venue: "Viajero Miami, 1120 Collins Ave", city: "South Beach, Miami, FL", instagram: "https://www.instagram.com/stories/highlights/18159291598389073/" },
    { date: "2025-09-13", name: "YOUR SHOT 2025", tag: "YOUR SHOT 2025", loc: "DJ Competition · DTLA",  type: "competition", city: "Downtown LA, CA", stories: ["assets/stories/2025-09-13-your-shot/2025-09-14-01.mp4", "assets/stories/2025-09-13-your-shot/2025-09-14-02.mp4", "assets/stories/2025-09-13-your-shot/2025-09-16-03.mp4", "assets/stories/2025-09-13-your-shot/2025-10-02-04.mp4"], instagram: "https://www.instagram.com/stories/highlights/17921620545139966/" },
    { date: "2025-08-09", name: "Elements Festival", end: "2025-08-10", tag: "Camp + Broccoli Bar Pop-Ups", loc: "Elements Festival · PA", type: "festival", venue: "Pocono Raceway", city: "Long Pond, PA", stories: ["assets/stories/2025-08-elements-festival/2025-08-13-01.mp4"], instagram: "https://www.instagram.com/stories/highlights/17913701808193796/" },
  ],

  /* ---------- from the floor: shows you've been to ----------
     date: "YYYY-MM-DD" (or "YYYY-MM" if you don't know the day); end: last day of a festival
     artists: who you saw · also: "also caught" names (shown smaller) */
  floor: [
    { date: "2026-07-31", artists: ["Tammy Lakkis"], event: "MSN Jams Weekend", city: "Madison, WI" },
    { date: "2026-07", artists: ["Special Request", "The Carry Nation"], event: "Fête de Marquette", city: "Madison, WI" },
    { date: "2026-06-20", artists: ["Strawbry", "Pangea Sounds", "Baile World"], event: "Red Bull Midsummer", venue: "Hollywood Roosevelt", city: "Los Angeles, CA" },
    { date: "2026-03-14", artists: ["Sidepiece"], venue: "LIV Beach, Fontainebleau", city: "Las Vegas, NV" },
    { date: "2026-03-13", artists: ["Tiësto"], venue: "LIV, Fontainebleau", city: "Las Vegas, NV" },
    { date: "2026-02-28", artists: ["Open Mike Eagle", "Cooling Prongs", "clipping."], venue: "The Fonda Theatre", city: "Los Angeles, CA" },
    { date: "2026-02-27", artists: ["Pyramido"], venue: "Members Club", city: "West Hollywood, CA" },
    { date: "2026-02-20", artists: ["Rozalesd", "Simon Doty"], venue: "The Spotlight", city: "West Hollywood, CA" },
    { date: "2026-02-07", artists: ["Bantu"], venue: "The Spotlight", city: "West Hollywood, CA" },
    { date: "2025-11-14", artists: ["Jai Wolf"], venue: "Stereo Live", city: "Dallas, TX" },
    { date: "2025-10-31", end: "2025-11-02", artists: ["Azyr", "DJ Stingray 313", "999999999", "Chaos in the CBD", "Cassian", "CamelPhat", "KI/KI", "Sara Landry", "SPFDJ"], event: "Hocus Pocus", venue: "Factory Town", city: "Miami, FL" },
    { date: "2025-10-17", end: "2025-10-18", artists: ["Barry Can't Swim", "Chase & Status", "Denzel Curry", "It's Murph", "Tinashe", "Thundercat", "Bicep", "Fcukers", "Turnstile"], event: "III Points", venue: "Mana Wynwood", city: "Miami, FL" },
    { date: "2025-09-26", end: "2025-09-28", artists: ["Dr. Fresch", "LSZEE", "Global Therapy takeover: Andreasone, Mango & Ginger, Shaespins & IJO"], event: "SSBD", venue: "Lake Perris State Park", city: "Perris, CA" },
    { date: "2025-09-21", artists: ["Daphni", "xClub", "Ben UFO b2b Super Call", "Yousuke Yukimatsu"], also: ["Boys Noize"], event: "Boiler Room LA", venue: "City Market", city: "Los Angeles, CA" },
    { date: "2025-09-18", artists: ["Underworld"], venue: "Hollywood Palladium", city: "Los Angeles, CA" },
    { date: "2025-08-29", artists: ["Ahadadream b2b Nikki Nair", "Interplanetary Criminal b2b Malugi", "Eric Prydz", "Hamdi b2b Riordan"], also: ["HAAi b2b Hiroko Yamamura", "Jamie xx"], event: "ARC Music Festival", venue: "Union Park", city: "Chicago, IL" },
    { date: "2025-08-22", artists: ["Donovan Glover", "Channel Tres", "Rhyw", "Wata Igarashi"], venue: "Lincoln Factory", city: "Detroit, MI" },
    { date: "2025-08-14", artists: ["Linkin Park"], venue: "Little Caesars Arena", city: "Detroit, MI" },
    { date: "2025-08-08", end: "2025-08-10", artists: ["Chase & Status", "Sullivan King b2b Kayzo", "Mary Droppinz", "Sara Landry", "Mala vs Malaa", "Tipper", "DJ Diesel"], also: ["Crankdat", "Rezz"], event: "Elements Festival", venue: "Pocono Raceway", city: "Long Pond, PA" },
    { date: "2025-07-29", artists: ["Glass Beams"], venue: "Majestic Theatre", city: "Madison, WI" },
    { date: "2025-06-14", artists: ["Black Club", "DJ Hyperactive", "DJ Pierre", "DJ Seinfeld"], event: "Boiler Room Chicago", venue: "Radius", city: "Chicago, IL" },
    { date: "2025-05-08", artists: ["Punjabi Hit Squad"], venue: "Smoke & Mirrors", city: "Chicago, IL" },
    { date: "2025-03-14", artists: ["Hamdi", "Kettama"], venue: "Radius", city: "Chicago, IL" },
    { date: "2025-02-06", artists: ["Tyler, The Creator"], venue: "Fiserv Forum", city: "Milwaukee, WI" },
    { date: "2025-01-27", artists: ["Mohini Dey"], venue: "Blue Note", city: "New York, NY" },
    { date: "2025-01-09", artists: ["Kenny Hoopla", "Portugal. The Man"], venue: "The Sylvee", city: "Madison, WI" },
    { date: "2024-12-06", artists: ["JPEGMAFIA"], venue: "The Sylvee", city: "Madison, WI" },
    { date: "2024-11-12", artists: ["Lil Darkie"], venue: "The Sylvee", city: "Madison, WI" },
    { date: "2024-10-13", artists: ["Spirit Mother", "Acid Mothers Temple"], venue: "High Noon Saloon", city: "Madison, WI" },
    { date: "2024-09-20", artists: ["Fred again.."], venue: "Alpine Valley", city: "East Troy, WI" },
    { date: "2024-01-17", artists: ["Travis Scott"], venue: "Fiserv Forum", city: "Milwaukee, WI" },
  ],
  floorAlso: ["Disco Lines", "IPC", "MPH", "Skream", "Mau P", "Dom Dolla", "Chris Lake", "Skrillex", "Peggy Gou", "FISHER", "John Summit"],
  floorFavorites: ["Charlotte de Witte", "Amelie Lens", "Rezz", "Yousuke Yukimatsu"],
};
