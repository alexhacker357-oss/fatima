# Fatima & Avi 💕

A private web app for the two of you: live voice/video calls, screen sharing,
synced YouTube watching, a photo gallery (Avi-only uploads), a music player,
and live two-player games (Tic-Tac-Toe, Connect 4, Chess, Uno) plus solo games
(Word Search, Candy Match, Memory Match, Would You Rather).

## Files
- `index.html` — the whole page structure
- `style.css` — all styling
- `app.js` — tabs, day counter, music player, edit your PHOTOS/SONGS/PROMPTS lists here
- `connect.js` — the call/screen-share/room logic (PeerJS)
- `gallery.js` — photo gallery + Avi's passcode gate
- `watch.js` — synced YouTube watching
- `games.js` — Tic-Tac-Toe, Connect 4, Uno, Word Search, Candy Match, Memory Match
- `chess-game.js` — chess (uses the chess.js and chessboard.js libraries)
- `images/`, `music/` — put your photo/song files here

## First things to edit
1. Open `app.js` — add your photo filenames to `PHOTOS`, your mp3 filenames to
   `SONGS`, and your own questions to `PROMPTS`.
2. Open `gallery.js` and change `AVI_PASSCODE` to something only you know.
3. Drop your actual photo/mp3 files into the `images` and `music` folders.

## How the "Connect" feature works
It uses a free service called PeerJS, which lets two browsers talk directly
to each other (peer-to-peer) for video, audio, and game moves — no server or
signup needed on your part, and no ongoing cost.

- One of you clicks **Create a room** — you'll get a short room code.
- The other clicks **Join**, types in that code.
- Once connected: you'll see both video feeds, mic/camera/screen-share
  buttons, and every live game (Tic-Tac-Toe, Connect 4, Chess, Uno) will sync
  moves between you automatically.
- Whoever **creates** the room always plays first / plays as X, red, or white.

**Being upfront about limits:**
- This is peer-to-peer video calling, similar in spirit to what apps like
  Zoom use under the hood, but without an account system or servers of your
  own — it's running on PeerJS's free public broker service, which is meant
  for exactly this kind of personal, low-volume use. On some very restrictive
  networks (strict corporate/school wifi) peer-to-peer connections can get
  blocked; regular home wifi or mobile data should work fine.
- Camera/mic/screen-share permissions only work over HTTPS — GitHub Pages
  serves your site over HTTPS automatically, so this isn't something you need
  to set up.
- If the call drops, just hit **Create room** / **Join** again.

## The Avi-only photo gallery
Photos added through the gallery's "Add Photos" button are stored in that
browser's local storage after Avi enters the passcode — so they show up on
whichever device/browser they were added from. For photos you want *both* of
you to always see no matter what device you're on, add the actual image files
to the `images` folder and list them in `app.js` before uploading to GitHub —
that way they're baked into the site itself.

Note: this passcode is a simple front-end gate, not real security — anyone
who looked at `gallery.js` could find it. It's meant to stop accidental
changes, not a determined snoop.

## Hosting it for free, "forever" — GitHub Pages
1. Create a free GitHub account at github.com if you don't have one.
2. Click **New repository**, name it, set it **Public**, create it.
3. Upload every file in this folder (including the `images` and `music`
   folders with your files inside) via **Add file → Upload files**.
4. Go to **Settings → Pages**. Under "Build and deployment," set Source to
   "Deploy from a branch," branch `main`, folder `/ (root)`, then Save.
5. Wait about a minute, refresh — you'll get a live link like
   `https://yourusername.github.io/reponame/`. That's your permanent link.

## Turning it into an APK (Android app) for free
Once your GitHub Pages link is live and working in a normal browser tab:
1. Go to pwabuilder.com and paste in that link.
2. Click "Package for Stores" → Android.
3. Download the generated APK and install it on the phone (allow "install
   from unknown sources" when prompted, since it's not from the Play Store).

Note: video calling inside a wrapped APK generally still works since it's
just showing your website, but camera/mic permission prompts can behave
differently across wrapper tools — test it once before relying on it.
