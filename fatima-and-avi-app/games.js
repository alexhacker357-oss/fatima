/* ===================== TIC-TAC-TOE (live, synced) ===================== */
const TTT = {
  board: Array(9).fill(null),
  myTurn: false,
  mySymbol: 'X',

  onConnected(){
    this.mySymbol = Us.isHost ? 'X' : 'O';
    this.myTurn = Us.isHost; // host starts
    this.board = Array(9).fill(null);
    this.render();
  },
  render(){
    const grid = document.getElementById('tttGrid');
    grid.innerHTML = '';
    this.board.forEach((v, i) => {
      const cell = document.createElement('div');
      cell.className = 'ttt-cell';
      cell.textContent = v || '';
      cell.onclick = () => this.play(i);
      grid.appendChild(cell);
    });
    document.getElementById('tttStatus').textContent = Us.connected
      ? (this.myTurn ? "Your turn (" + this.mySymbol + ")" : "Waiting for them...")
      : "Connect first, then take turns";
  },
  play(i){
    if(!Us.connected || !this.myTurn || this.board[i]) return;
    this.board[i] = this.mySymbol;
    Us.send('ttt-move', { index: i, symbol: this.mySymbol });
    this.myTurn = false;
    this.render();
    this.checkWin();
  },
  applyRemote(payload){
    this.board[payload.index] = payload.symbol;
    this.myTurn = true;
    this.render();
    this.checkWin();
  },
  checkWin(){
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(const [a,b,c] of lines){
      if(this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]){
        document.getElementById('tttStatus').textContent = this.board[a] + ' wins! 🎉';
        return;
      }
    }
    if(this.board.every(v => v)) document.getElementById('tttStatus').textContent = "It's a draw!";
  },
  reset(){
    this.board = Array(9).fill(null);
    this.myTurn = Us.isHost;
    this.render();
    Us.send('ttt-reset', {});
  }
};
Us.onMessage('ttt-move', p => TTT.applyRemote(p));
Us.onMessage('ttt-reset', () => { TTT.board = Array(9).fill(null); TTT.myTurn = !Us.isHost; TTT.render(); });
TTT.render();

/* ===================== CONNECT 4 (live, synced) ===================== */
const C4 = {
  cols: 7, rows: 6,
  board: [],
  myColor: 'red',
  myTurn: false,

  onConnected(){
    this.myColor = Us.isHost ? 'red' : 'yellow';
    this.myTurn = Us.isHost;
    this.board = Array.from({length:this.rows}, () => Array(this.cols).fill(null));
    this.render();
  },
  render(){
    const grid = document.getElementById('c4Grid');
    grid.innerHTML = '';
    for(let r=0;r<this.rows;r++){
      for(let c=0;c<this.cols;c++){
        const cell = document.createElement('div');
        cell.className = 'c4-cell' + (this.board[r] && this.board[r][c] ? ' ' + this.board[r][c] : '');
        cell.onclick = () => this.play(c);
        grid.appendChild(cell);
      }
    }
    document.getElementById('c4Status').textContent = Us.connected
      ? (this.myTurn ? "Your turn (" + this.myColor + ")" : "Waiting for them...")
      : "Connect first, then take turns";
  },
  _drop(col, color){
    for(let r=this.rows-1; r>=0; r--){
      if(!this.board[r][col]){ this.board[r][col] = color; return r; }
    }
    return -1;
  },
  play(col){
    if(!Us.connected || !this.myTurn) return;
    const row = this._drop(col, this.myColor);
    if(row === -1) return;
    Us.send('c4-move', { col, color: this.myColor });
    this.myTurn = false;
    this.render();
    this.checkWin(row, col, this.myColor);
  },
  applyRemote(payload){
    const row = this._drop(payload.col, payload.color);
    this.myTurn = true;
    this.render();
    if(row !== -1) this.checkWin(row, payload.col, payload.color);
  },
  checkWin(r, c, color){
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    for(const [dr,dc] of dirs){
      let count = 1;
      for(const sign of [1,-1]){
        let rr=r+dr*sign, cc=c+dc*sign;
        while(rr>=0 && rr<this.rows && cc>=0 && cc<this.cols && this.board[rr][cc]===color){
          count++; rr+=dr*sign; cc+=dc*sign;
        }
      }
      if(count>=4){ document.getElementById('c4Status').textContent = color + " wins! 🎉"; return; }
    }
  },
  reset(){
    this.board = Array.from({length:this.rows}, () => Array(this.cols).fill(null));
    this.myTurn = Us.isHost;
    this.render();
    Us.send('c4-reset', {});
  }
};
Us.onMessage('c4-move', p => C4.applyRemote(p));
Us.onMessage('c4-reset', () => { C4.board = Array.from({length:C4.rows}, () => Array(C4.cols).fill(null)); C4.myTurn = !Us.isHost; C4.render(); });
C4.render();

/* ===================== UNO (live, host-authoritative) ===================== */
const Uno = {
  state: null, // {deck, discard, hands:{host:[],guest:[]}, turn, winner}

  myRole(){ return Us.isHost ? 'host' : 'guest'; },
  oppRole(){ return Us.isHost ? 'guest' : 'host'; },

  _buildDeck(){
    const colors = ['red','blue','green','yellow'];
    let deck = [];
    colors.forEach(color => {
      deck.push({ color, value: 0 });
      for(let v=1; v<=9; v++){ deck.push({color,value:v}); deck.push({color,value:v}); }
    });
    for(let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    return deck;
  },

  reset(){
    if(!Us.connected) return alert('Connect first to play Uno together');
    if(Us.isHost){
      const deck = this._buildDeck();
      const hostHand = deck.splice(0,7);
      const guestHand = deck.splice(0,7);
      const discard = [deck.shift()];
      this.state = { deck, discard, hands:{host:hostHand, guest:guestHand}, turn:'host', winner:null };
      this.render();
      Us.send('uno-state', this.state);
    } else {
      Us.send('uno-request-new', {});
    }
  },
  onConnected(){ document.getElementById('unoStatus').textContent = 'Connected! Click "New Game" to deal.'; },

  draw(){
    if(!this.state || this.state.winner) return;
    if(this.state.turn !== this.myRole()) return;
    if(Us.isHost) this._hostProcess('host', {action:'draw'});
    else Us.send('uno-action', {action:'draw'});
  },
  playCard(idx){
    if(!this.state || this.state.winner) return;
    if(this.state.turn !== this.myRole()) return;
    const card = this.state.hands[this.myRole()][idx];
    const top = this.state.discard[this.state.discard.length-1];
    if(card.color !== top.color && card.value !== top.value) return alert("That card doesn't match the color or number on top.");
    if(Us.isHost) this._hostProcess('host', {action:'play', cardIndex:idx});
    else Us.send('uno-action', {action:'play', cardIndex:idx});
  },

  _hostProcess(fromRole, msg){
    const s = this.state;
    if(!s || s.winner) return;
    if(s.turn !== fromRole) return;
    if(msg.action === 'draw'){
      if(s.deck.length === 0){
        const top = s.discard.pop();
        s.deck = s.discard.sort(() => Math.random()-0.5);
        s.discard = [top];
      }
      s.hands[fromRole].push(s.deck.shift());
      s.turn = fromRole === 'host' ? 'guest' : 'host';
    } else if(msg.action === 'play'){
      const card = s.hands[fromRole][msg.cardIndex];
      const top = s.discard[s.discard.length-1];
      if(!card || (card.color !== top.color && card.value !== top.value)) return;
      s.hands[fromRole].splice(msg.cardIndex,1);
      s.discard.push(card);
      if(s.hands[fromRole].length === 0){ s.winner = fromRole; }
      else s.turn = fromRole === 'host' ? 'guest' : 'host';
    }
    this.render();
    Us.send('uno-state', s);
  },

  render(){
    if(!this.state) return;
    const s = this.state;
    const top = s.discard[s.discard.length-1];
    const topEl = document.getElementById('unoTopCard');
    topEl.textContent = top.value;
    topEl.className = 'uno-card uc-' + top.color;

    const hand = s.hands[this.myRole()];
    const handEl = document.getElementById('unoHand');
    handEl.innerHTML = '';
    hand.forEach((card, i) => {
      const el = document.createElement('div');
      el.className = 'uno-card uc-' + card.color;
      el.textContent = card.value;
      el.onclick = () => this.playCard(i);
      handEl.appendChild(el);
    });

    const oppCount = s.hands[this.oppRole()].length;
    let status = '';
    if(s.winner){
      status = (s.winner === this.myRole() ? "You won! 🎉" : "They won this round!");
    } else {
      status = (s.turn === this.myRole() ? "Your turn" : "Waiting for them...") + ` — they have ${oppCount} cards`;
    }
    document.getElementById('unoStatus').textContent = status;
  }
};
Us.onMessage('uno-state', payload => { Uno.state = payload; Uno.render(); });
Us.onMessage('uno-action', payload => { if(Us.isHost) Uno._hostProcess('guest', payload); });
Us.onMessage('uno-request-new', () => { if(Us.isHost) Uno.reset(); });

/* ===================== WORD SEARCH (solo puzzle) ===================== */
const WordSearch = {
  size: 10,
  words: ['LOVE','HUG','KISS','DATE','HEART','SMILE'],
  grid: [],
  found: new Set(),
  firstPick: null,

  newPuzzle(){
    this.found = new Set();
    this.firstPick = null;
    this.grid = Array.from({length:this.size}, () => Array(this.size).fill(null));
    const dirs = [[0,1],[1,0],[1,1],[1,-1]];
    this.words.forEach(word => {
      let placed = false, attempts = 0;
      while(!placed && attempts < 200){
        attempts++;
        const [dr,dc] = dirs[Math.floor(Math.random()*dirs.length)];
        const row = Math.floor(Math.random()*this.size);
        const col = Math.floor(Math.random()*this.size);
        const endRow = row + dr*(word.length-1);
        const endCol = col + dc*(word.length-1);
        if(endRow<0||endRow>=this.size||endCol<0||endCol>=this.size) continue;
        let ok = true;
        for(let i=0;i<word.length;i++){
          const rr=row+dr*i, cc=col+dc*i;
          if(this.grid[rr][cc] !== null && this.grid[rr][cc] !== word[i]){ ok=false; break; }
        }
        if(!ok) continue;
        for(let i=0;i<word.length;i++){ this.grid[row+dr*i][col+dc*i] = word[i]; }
        placed = true;
      }
    });
    for(let r=0;r<this.size;r++) for(let c=0;c<this.size;c++)
      if(!this.grid[r][c]) this.grid[r][c] = String.fromCharCode(65+Math.floor(Math.random()*26));
    this.render();
  },
  render(){
    const grid = document.getElementById('wsGrid');
    grid.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
    grid.innerHTML = '';
    for(let r=0;r<this.size;r++){
      for(let c=0;c<this.size;c++){
        const cell = document.createElement('div');
        cell.className = 'ws-cell';
        cell.textContent = this.grid[r][c];
        cell.dataset.r = r; cell.dataset.c = c;
        cell.onclick = () => this.pick(r,c,cell);
        grid.appendChild(cell);
      }
    }
    const wordsEl = document.getElementById('wsWords');
    wordsEl.innerHTML = '';
    this.words.forEach(w => {
      const span = document.createElement('span');
      span.textContent = w;
      if(this.found.has(w)) span.classList.add('found');
      wordsEl.appendChild(span);
    });
  },
  pick(r,c,cellEl){
    if(!this.firstPick){ this.firstPick = {r,c,cellEl}; cellEl.classList.add('selected'); return; }
    const {r:r1,c:c1,cellEl:el1} = this.firstPick;
    const dr = Math.sign(r-r1), dc = Math.sign(c-c1);
    let path = [], rr=r1, cc=c1;
    while(true){
      path.push({r:rr,c:cc});
      if(rr===r && cc===c) break;
      rr+=dr; cc+=dc;
      if(path.length > this.size) break;
    }
    const str = path.map(p => this.grid[p.r][p.c]).join('');
    const rev = str.split('').reverse().join('');
    const match = this.words.find(w => (w===str || w===rev) && !this.found.has(w));
    el1.classList.remove('selected');
    this.firstPick = null;
    if(match){
      this.found.add(match);
      document.querySelectorAll('.ws-cell').forEach(cell => {
        const rr2 = +cell.dataset.r, cc2 = +cell.dataset.c;
        if(path.some(p => p.r===rr2 && p.c===cc2)) cell.classList.add('found');
      });
      this.render_words_only();
      if(this.found.size === this.words.length) document.getElementById('wsStatus').textContent = "You found them all! 🎉";
    }
  },
  render_words_only(){
    const wordsEl = document.getElementById('wsWords');
    wordsEl.innerHTML = '';
    this.words.forEach(w => {
      const span = document.createElement('span');
      span.textContent = w;
      if(this.found.has(w)) span.classList.add('found');
      wordsEl.appendChild(span);
    });
  }
};
WordSearch.newPuzzle();

/* ===================== CANDY MATCH (solo, simplified match-3) ===================== */
const Candy = {
  size: 8,
  candies: ['🍬','🍭','🍫','🍪','🧁'],
  grid: [],
  selected: null,
  score: 0,

  reset(){
    this.score = 0;
    this.grid = Array.from({length:this.size}, () =>
      Array.from({length:this.size}, () => this.candies[Math.floor(Math.random()*this.candies.length)])
    );
    document.getElementById('candyScore').textContent = this.score;
    this.render();
  },
  render(){
    const grid = document.getElementById('candyGrid');
    grid.innerHTML = '';
    for(let r=0;r<this.size;r++){
      for(let c=0;c<this.size;c++){
        const cell = document.createElement('div');
        cell.className = 'candy-cell';
        cell.textContent = this.grid[r][c];
        cell.onclick = () => this.pick(r,c,cell);
        grid.appendChild(cell);
      }
    }
  },
  pick(r,c,cellEl){
    if(!this.selected){ this.selected = {r,c,cellEl}; cellEl.classList.add('selected'); return; }
    const {r:r1,c:c1,cellEl:el1} = this.selected;
    el1.classList.remove('selected');
    this.selected = null;
    const isAdjacent = Math.abs(r-r1)+Math.abs(c-c1) === 1;
    if(!isAdjacent) return;
    [this.grid[r1][c1], this.grid[r][c]] = [this.grid[r][c], this.grid[r1][c1]];
    const matches = this._findMatches();
    if(matches.size === 0){
      [this.grid[r1][c1], this.grid[r][c]] = [this.grid[r][c], this.grid[r1][c1]]; // revert
      this.render();
      return;
    }
    this._resolveMatches(matches);
  },
  _findMatches(){
    const matched = new Set();
    for(let r=0;r<this.size;r++){
      for(let c=0;c<this.size-2;c++){
        const v = this.grid[r][c];
        if(v && this.grid[r][c+1]===v && this.grid[r][c+2]===v){
          matched.add(`${r},${c}`); matched.add(`${r},${c+1}`); matched.add(`${r},${c+2}`);
        }
      }
    }
    for(let c=0;c<this.size;c++){
      for(let r=0;r<this.size-2;r++){
        const v = this.grid[r][c];
        if(v && this.grid[r+1][c]===v && this.grid[r+2][c]===v){
          matched.add(`${r},${c}`); matched.add(`${r+1},${c}`); matched.add(`${r+2},${c}`);
        }
      }
    }
    return matched;
  },
  _resolveMatches(matched){
    matched.forEach(key => {
      const [r,c] = key.split(',').map(Number);
      this.grid[r][c] = this.candies[Math.floor(Math.random()*this.candies.length)];
    });
    this.score += matched.size * 10;
    document.getElementById('candyScore').textContent = this.score;
    this.render();
    const more = this._findMatches();
    if(more.size > 0) setTimeout(() => this._resolveMatches(more), 300);
  }
};
Candy.reset();

/* ===================== MEMORY MATCH (solo/local) ===================== */
const memoryGrid = document.getElementById('memoryGrid');
const memoryStatus = document.getElementById('memoryStatus');
const ICONS = ['💖','🌹','✨','🎬','🎵','🍫','☕','🌙'];
let mCards = [], mFlipped = [], mMatchedCount = 0, mLock = false;

function setupMemory(){
  mCards = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5);
  mFlipped = []; mMatchedCount = 0; mLock = false;
  memoryGrid.innerHTML = '';
  memoryStatus.textContent = 'Find all the matching pairs 💕';
  mCards.forEach((icon) => {
    const div = document.createElement('div');
    div.className = 'mcard';
    div.dataset.icon = icon;
    div.onclick = () => flipCard(div);
    memoryGrid.appendChild(div);
  });
}
function flipCard(div){
  if(mLock || div.classList.contains('flipped') || div.classList.contains('matched')) return;
  div.textContent = div.dataset.icon;
  div.classList.add('flipped');
  mFlipped.push(div);
  if(mFlipped.length === 2){
    mLock = true;
    const [a,b] = mFlipped;
    if(a.dataset.icon === b.dataset.icon){
      a.classList.add('matched'); b.classList.add('matched');
      mMatchedCount++;
      mFlipped = []; mLock = false;
      if(mMatchedCount === ICONS.length) memoryStatus.textContent = "You found them all! 🎉 Play again?";
    } else {
      setTimeout(() => {
        a.classList.remove('flipped'); a.textContent = '';
        b.classList.remove('flipped'); b.textContent = '';
        mFlipped = []; mLock = false;
      }, 700);
    }
  }
}
setupMemory();
