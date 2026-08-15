/* ============================================
   EDIT THESE
   ============================================ */

// Starter photos (Avi can add more live from the Gallery tab too)
const PHOTOS = [
  { file: "photo1.jpg", caption: "Us :)" },
];

// Songs — put mp3 files in /music and list them here
const SONGS = [
  { file: "song1.mp3", title: "Add your song here" },
];

const PROMPTS = [
  "Would you rather have a picnic under the stars or a cozy movie night in?",
  "Beach vacation or mountain cabin, just the two of us?",
  "What's one place you'd love for us to visit together someday?",
  "Would you rather I cook for you or we cook together?",
  "What's your favorite memory of us so far?",
  "Would you rather get flowers or a handwritten letter?",
  "If we had a free weekend with no plans, what would you want to do?",
  "Would you rather stay in and cuddle or go out on an adventure tonight?",
];

/* ============================================
   Core app logic
   ============================================ */

function showTab(name){
  document.querySelectorAll('main > section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('#mainNav .tab').forEach(t => t.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  document.querySelector(`#mainNav .tab[data-tab="${name}"]`).classList.add('active');
}
document.querySelectorAll('#mainNav .tab').forEach(tab => {
  tab.addEventListener('click', () => showTab(tab.dataset.tab));
});

// Games sub-nav
const GAME_IDS = ['ttt','connect4','chess','uno','wordsearch','candy','memory','wheel'];
document.querySelectorAll('#gameSelect button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#gameSelect button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    GAME_IDS.forEach(id => {
      document.getElementById('game-' + id).style.display = (id === btn.dataset.game) ? 'block' : 'none';
    });
  });
});

// Floating hearts
function spawnHearts(){
  const container = document.getElementById('heartsBg');
  const symbols = ['♥','❤','💕'];
  for(let i=0;i<18;i++){
    const h = document.createElement('div');
    h.className = 'heart-particle';
    h.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    h.style.left = Math.random()*100 + 'vw';
    h.style.fontSize = (12 + Math.random()*18) + 'px';
    h.style.animationDuration = (10 + Math.random()*14) + 's';
    h.style.animationDelay = (Math.random()*10) + 's';
    container.appendChild(h);
  }
}
spawnHearts();

// Day counter
const startDateInput = document.getElementById('startDate');
const dayCountEl = document.getElementById('dayCount');
function updateDayCount(){
  const val = startDateInput.value;
  if(!val){ dayCountEl.textContent = '0'; return; }
  const start = new Date(val);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000*60*60*24));
  dayCountEl.textContent = diff >= 0 ? diff : 0;
  localStorage.setItem('us_start_date', val);
}
startDateInput.addEventListener('change', updateDayCount);
const savedDate = localStorage.getItem('us_start_date');
if(savedDate){ startDateInput.value = savedDate; updateDayCount(); }

// Music player
const audio = document.getElementById('audio');
const disc = document.getElementById('disc');
const trackName = document.getElementById('trackName');
const playBtn = document.getElementById('playBtn');
const playlistEl = document.getElementById('playlist');
let currentTrack = 0;
let isPlaying = false;

function renderPlaylist(){
  playlistEl.innerHTML = '';
  SONGS.forEach((s, i) => {
    const li = document.createElement('li');
    li.textContent = s.title;
    li.className = i === currentTrack ? 'current' : '';
    li.onclick = () => { currentTrack = i; loadTrack(); play(); };
    playlistEl.appendChild(li);
  });
}
function loadTrack(){
  const song = SONGS[currentTrack];
  audio.src = `music/${song.file}`;
  trackName.textContent = song.title;
  renderPlaylist();
}
function play(){
  audio.play().catch(()=>{ trackName.textContent = "Add this song's mp3 file to /music first"; });
  disc.classList.add('playing');
  playBtn.textContent = '⏸';
  isPlaying = true;
}
function pause(){
  audio.pause(); disc.classList.remove('playing'); playBtn.textContent = '▶'; isPlaying = false;
}
function togglePlay(){ isPlaying ? pause() : play(); }
function nextTrack(){ currentTrack = (currentTrack+1) % SONGS.length; loadTrack(); play(); }
function prevTrack(){ currentTrack = (currentTrack-1+SONGS.length) % SONGS.length; loadTrack(); play(); }
audio.addEventListener('ended', nextTrack);
loadTrack();

// Would you rather
function newPrompt(){
  const p = PROMPTS[Math.floor(Math.random()*PROMPTS.length)];
  document.getElementById('promptCard').textContent = p;
}
