<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <title>Fatima & Avi 💕 · animated readme</title>
    <!-- Font Awesome 6 (free) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(145deg, #fff0f5 0%, #ffe4e9 30%, #fce4ec 70%, #f8e0f0 100%);
            font-family: 'Segoe UI', 'Quicksand', system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 1.5rem;
            margin: 0;
            animation: bgGlow 16s ease-in-out infinite alternate;
            position: relative;
            overflow-x: hidden;
        }

        @keyframes bgGlow {
            0% { background: #fff0f5; }
            50% { background: #ffe4e9; }
            100% { background: #f9d5e5; }
        }

        /* decorative floating hearts */
        .floating-hearts {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        }

        .heart-float {
            position: absolute;
            bottom: -60px;
            font-size: 2.2rem;
            opacity: 0.2;
            animation: floatUp 12s infinite ease-in;
            color: #ff6b8a;
        }

        .heart-float:nth-child(1) { left: 8%; animation-delay: 0s; font-size: 2rem; }
        .heart-float:nth-child(2) { left: 22%; animation-delay: 2s; font-size: 3rem; }
        .heart-float:nth-child(3) { left: 38%; animation-delay: 4s; font-size: 1.8rem; }
        .heart-float:nth-child(4) { left: 55%; animation-delay: 1s; font-size: 2.5rem; }
        .heart-float:nth-child(5) { left: 72%; animation-delay: 3.5s; font-size: 2rem; }
        .heart-float:nth-child(6) { left: 88%; animation-delay: 5s; font-size: 3.2rem; }

        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.25; }
            90% { opacity: 0.15; }
            100% { transform: translateY(-110vh) rotate(15deg); opacity: 0; }
        }

        .readme-card {
            max-width: 1100px;
            width: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.65);
            border-radius: 3.5rem;
            padding: 2.5rem 2.8rem;
            box-shadow: 0 30px 45px -20px rgba(190, 60, 90, 0.35),
                        0 0 0 1px rgba(255, 255, 255, 0.7) inset;
            border: 1px solid rgba(255, 210, 220, 0.8);
            transition: all 0.3s ease;
            position: relative;
            z-index: 10;
            animation: cardEnter 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes cardEnter {
            0% { opacity: 0; transform: translateY(30px) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .readme-card:hover {
            box-shadow: 0 40px 60px -20px rgba(200, 40, 80, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.9) inset;
            background: rgba(255, 255, 255, 0.75);
        }

        /* header area with image */
        .hero-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 2rem;
            position: relative;
        }

        .hero-image-wrapper {
            width: 130px;
            height: 130px;
            margin-bottom: 0.5rem;
            filter: drop-shadow(0 12px 15px rgba(230, 80, 120, 0.3));
            animation: bounceSlow 4s ease-in-out infinite;
        }

        @keyframes bounceSlow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
        }

        .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid white;
            background: #ffe3ec;
            box-shadow: 0 8px 0 #f6a5c0;
            transition: transform 0.4s;
        }

        .hero-image-wrapper:hover .hero-image {
            transform: scale(1.05) rotate(-2deg);
        }

        h1 {
            font-size: 3.2rem;
            font-weight: 700;
            color: #b53a5e;
            letter-spacing: -0.5px;
            text-shadow: 3px 3px 0 #ffe0e9;
            margin: 0.5rem 0 0.2rem;
            animation: glowPulse 3s infinite alternate;
        }

        @keyframes glowPulse {
            from { text-shadow: 3px 3px 0 #ffe0e9, 0 0 8px #ffb6c9; }
            to { text-shadow: 3px 3px 0 #ffe0e9, 0 0 18px #ff8da1; }
        }

        .subhead {
            font-size: 1.3rem;
            font-weight: 500;
            color: #7a4050;
            background: rgba(255, 240, 245, 0.8);
            padding: 0.4rem 1.8rem;
            border-radius: 40px;
            backdrop-filter: blur(5px);
            margin-top: 0.5rem;
        }

        /* content grid & beautiful panels */
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1.8rem;
            margin: 2.5rem 0 1.5rem;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            border-radius: 2rem;
            padding: 1.8rem 1.4rem;
            transition: all 0.25s ease;
            border: 1px solid #ffe1ec;
            box-shadow: 0 15px 20px -15px rgba(200, 60, 100, 0.25);
            animation: slideFade 0.8s ease forwards;
            opacity: 0;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }

        @keyframes slideFade {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }

        .feature-card:hover {
            background: rgba(255, 255, 255, 0.85);
            transform: translateY(-7px) scale(1.02);
            border-color: #ffb7cd;
            box-shadow: 0 25px 25px -12px #d16d8b;
        }

        .card-icon {
            font-size: 2.6rem;
            margin-bottom: 0.8rem;
            background: linear-gradient(135deg, #ff9eb2, #ff6b8a);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            display: inline-block;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            font-weight: 650;
            color: #7b2d44;
            margin-bottom: 0.8rem;
            letter-spacing: -0.2px;
        }

        .feature-card p {
            color: #4f2d3a;
            font-weight: 500;
            line-height: 1.5;
            font-size: 0.95rem;
        }

        .highlight-badge {
            background: #ffd9e4;
            border-radius: 30px;
            padding: 0.2rem 1rem;
            font-size: 0.9rem;
            font-weight: 600;
            color: #a12b4f;
            display: inline-block;
            margin-top: 0.8rem;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: #a13455;
            margin: 2rem 0 1.2rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            border-bottom: 3px dotted #f7b6ca;
            padding-bottom: 0.6rem;
        }

        .code-block {
            background: #2d1e28;
            color: #fce4ec;
            border-radius: 1.5rem;
            padding: 1.4rem 1.8rem;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
            margin: 1.2rem 0;
            box-shadow: 0 15px 20px -10px rgba(0,0,0,0.3);
            border-left: 6px solid #ff7b9c;
            transition: 0.3s;
            backdrop-filter: blur(2px);
        }

        .code-block:hover {
            background: #3b2733;
            border-left-color: #ff4f7b;
        }

        .inline-code {
            background: rgba(255, 220, 230, 0.7);
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-family: monospace;
            color: #c23563;
            font-weight: 600;
        }

        .note-box {
            background: #fff5f8;
            border-left: 8px solid #ff8caa;
            border-radius: 20px;
            padding: 1.3rem 1.8rem;
            margin: 1.8rem 0;
            font-weight: 500;
            color: #3d202b;
            box-shadow: 0 10px 15px -10px #e7a3b6;
        }

        .btn-like {
            display: inline-block;
            background: linear-gradient(145deg, #ff6b8a, #e93b62);
            color: white;
            font-weight: 700;
            padding: 0.8rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            box-shadow: 0 10px 15px -5px #b3264f;
            transition: 0.2s;
            margin-top: 0.5rem;
            border: 1px solid white;
            letter-spacing: 0.5px;
        }

        .btn-like:hover {
            background: #d12e58;
            transform: scale(1.03);
            box-shadow: 0 15px 25px -5px #b3264f;
        }

        .footer-note {
            text-align: center;
            color: #974063;
            margin-top: 3rem;
            font-style: italic;
            font-weight: 500;
            background: rgba(255, 240, 245, 0.6);
            padding: 0.8rem;
            border-radius: 50px;
            backdrop-filter: blur(8px);
        }

        hr {
            border: 1px solid #fccfdd;
            margin: 1.8rem 0;
        }
        /* responsive */
        @media (max-width: 650px) {
            .readme-card { padding: 1.5rem; }
            h1 { font-size: 2.5rem; }
            .feature-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- floating hearts background -->
    <div class="floating-hearts">
        <div class="heart-float">💕</div>
        <div class="heart-float">❤️</div>
        <div class="heart-float">🌸</div>
        <div class="heart-float">✨</div>
        <div class="heart-float">💖</div>
        <div class="heart-float">🦋</div>
    </div>

    <div class="readme-card">
        <!-- hero with beautiful image -->
        <div class="hero-section">
            <div class="hero-image-wrapper">
                <!-- decorative img -->
                <img class="hero-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%23ffdae5'/%3E%3Cpath d='M100 40 C130 30, 160 55, 150 90 C140 125, 100 160, 100 160 C100 160, 60 125, 50 90 C40 55, 70 30, 100 40' fill='%23ff6b8a' opacity='0.9'/%3E%3Ccircle cx='70' cy='90' r='14' fill='%23ffffff' opacity='0.7'/%3E%3Ccircle cx='130' cy='90' r='14' fill='%23ffffff' opacity='0.7'/%3E%3Cpath d='M70 115 Q100 140, 130 115' stroke='%23ffffff' stroke-width='5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"
                     alt="Fatima & Avi heart illustration">
            </div>
            <h1>Fatima & Avi 💕</h1>
            <div class="subhead"><i class="fas fa-star"></i> private universe for two <i class="fas fa-star"></i></div>
        </div>

        <!-- short description -->
        <p style="font-size: 1.2rem; text-align: center; max-width: 700px; margin: 0 auto; font-weight: 500; color: #5b3042;">
            Live video, synced YouTube, gallery, music, and games — all in one dreamy web app.
        </p>

        <!-- feature grid with animated cards -->
        <div class="feature-grid">
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-video"></i></div>
                <h3>Video & Voice</h3>
                <p>Live calls, screen sharing, mic & camera control, PeerJS powered. No signup, no server cost.</p>
                <span class="highlight-badge">🎥 P2P calls</span>
            </div>
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-film"></i></div>
                <h3>Synced YouTube</h3>
                <p>Watch videos together in perfect sync. Press play on one device, it plays on both.</p>
                <span class="highlight-badge">🍿 movie time</span>
            </div>
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-images"></i></div>
                <h3>Photo Gallery</h3>
                <p>Avi-only uploads with passcode. Local storage + baked-in images for always-visible memories.</p>
                <span class="highlight-badge">🔒 private gallery</span>
            </div>
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-music"></i></div>
                <h3>Music Player</h3>
                <p>Your own playlist from local mp3 files. Sweet tunes for both of you.</p>
                <span class="highlight-badge">🎵 custom songs</span>
            </div>
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-gamepad"></i></div>
                <h3>Live 2‑Player Games</h3>
                <p>Tic‑Tac‑Toe, Connect 4, Chess, Uno — moves sync automatically between browsers.</p>
                <span class="highlight-badge">♟️ realtime</span>
            </div>
            <div class="feature-card">
                <div class="card-icon"><i class="fas fa-puzzle-piece"></i></div>
                <h3>Solo Games</h3>
                <p>Word Search, Candy Match, Memory Match, Would You Rather. Fun even alone.</p>
                <span class="highlight-badge">🧠 brain games</span>
            </div>
        </div>

        <!-- files section with styled list -->
        <div class="section-title"><i class="fas fa-file-code" style="color:#ff7096;"></i> Files</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; margin-bottom: 1rem;">
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-html5"></i> index.html</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-paint-brush"></i> style.css</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-js"></i> app.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-phone-alt"></i> connect.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-camera"></i> gallery.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-play"></i> watch.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-dice"></i> games.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-chess"></i> chess-game.js</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-folder-open"></i> images/</span>
            <span class="highlight-badge" style="background:#ffe5ed;"><i class="fas fa-folder-open"></i> music/</span>
        </div>

        <!-- first things to edit -->
        <div class="section-title"><i class="fas fa-edit"></i> First things to edit</div>
        <div class="note-box">
            <i class="fas fa-pen-fancy" style="margin-right: 0.5rem;"></i> Open <span class="inline-code">app.js</span> — add <strong>PHOTOS</strong>, <strong>SONGS</strong>, and <strong>PROMPTS</strong>.<br>
            <i class="fas fa-lock" style="margin-right: 0.5rem;"></i> Change <span class="inline-code">AVI_PASSCODE</span> in <span class="inline-code">gallery.js</span>.<br>
            <i class="fas fa-file-upload"></i> Drop photo/mp3 into <span class="inline-code">images</span> and <span class="inline-code">music</span>.
        </div>

        <!-- Connect feature details -->
        <div class="section-title"><i class="fas fa-link"></i> How "Connect" works</div>
        <p>⚡ PeerJS peer‑to‑peer: one creates room, other joins. Automatic sync for Tic‑Tac‑Toe, Connect 4, Chess, Uno. Creator plays first.</p>
        <div class="note-box" style="margin-top: 1rem;">
            <i class="fas fa-shield-alt"></i> <strong>Limits:</strong> free public broker, works on home wifi/mobile; strict networks may block. Needs HTTPS (GitHub Pages provides). Re‑create room if drop.
        </div>

        <!-- Avi-only gallery -->
        <div class="section-title"><i class="fas fa-user-shield"></i> Avi‑only photo gallery</div>
        <p>Photos added via gallery are stored in browser localStorage after passcode. For permanent cross‑device photos, bake them into <span class="inline-code">images/</span> and <span class="inline-code">app.js</span>.</p>
        <p><i class="fas fa-exclamation-triangle" style="color:#d6336c;"></i> Passcode is simple front‑end gate, not real security.</p>

        <!-- hosting block -->
        <div class="section-title"><i class="fas fa-globe"></i> Hosting free forever — GitHub Pages</div>
        <ol style="margin-left: 1.5rem; line-height: 2; font-weight: 500; color: #4e2a38;">
            <li>Create GitHub account & new public repo</li>
            <li>Upload all files (including folders) via Add file → Upload</li>
            <li>Settings → Pages → branch <span class="inline-code">main</span>, root, Save</li>
            <li>Get live link: <span class="inline-code">https://yourusername.github.io/reponame/</span></li>
        </ol>

        <!-- APK section -->
        <div class="section-title"><i class="fab fa-android"></i> Turn into Android APK</div>
        <p>Use <span class="inline-code">pwabuilder.com</span> with your live GitHub Pages link, package for Android. Note: camera/mic inside APK may vary.</p>
        
        <!-- extra call to action -->
        <div style="display: flex; justify-content: center; margin: 2rem 0;">
            <a href="#" class="btn-like"><i class="fas fa-heart"></i> built with love</a>
        </div>

        <!-- decorative bottom -->
        <div class="footer-note">
            <i class="fas fa-code"></i> #FatimaAndAvi · forever yours 💕 <i class="fas fa-magic"></i>
        </div>

        <!-- tiny easter egg of code block -->
        <div class="code-block" style="margin-top: 1.5rem;">
            <span style="color:#ff8da1;">// private universe starts here 🌙</span><br>
            <span style="color:#ffb6c9;">createRoom()</span> · <span style="color:#c9e4ff;">joinRoom(code)</span> · <span style="color:#b0f0c0;">syncGame()</span>
        </div>
    </div>
</body>
</html>
