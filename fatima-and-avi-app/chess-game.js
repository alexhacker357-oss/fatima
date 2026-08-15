const ChessGame = {
  chess: null,
  board: null,
  myColor: 'white',

  init(){
    this.chess = new Chess();
    this.board = Chessboard('chessBoard', {
      draggable: true,
      position: 'start',
      pieceTheme: 'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/img/chesspieces/wikipedia/{piece}.png',
      onDragStart: (source, piece) => this._onDragStart(source, piece),
      onDrop: (source, target) => this._onDrop(source, target)
    });
    this._updateStatus();
  },

  onConnected(){
    this.myColor = Us.isHost ? 'white' : 'black';
    this.chess.reset();
    this.board.start();
    this._updateStatus();
  },

  _onDragStart(source, piece){
    if(!Us.connected) return false;
    if(this.chess.game_over()) return false;
    const turnColor = this.chess.turn() === 'w' ? 'white' : 'black';
    if(turnColor !== this.myColor) return false;
    if((piece.startsWith('w') && this.myColor !== 'white') || (piece.startsWith('b') && this.myColor !== 'black')) return false;
  },

  _onDrop(source, target){
    const move = this.chess.move({ from: source, to: target, promotion: 'q' });
    if(move === null) return 'snapback';
    Us.send('chess-move', { from: source, to: target });
    this._updateStatus();
  },

  applyRemote(payload){
    this.chess.move({ from: payload.from, to: payload.to, promotion: 'q' });
    this.board.position(this.chess.fen());
    this._updateStatus();
  },

  _updateStatus(){
    let status = '';
    const turnColor = this.chess.turn() === 'w' ? 'white' : 'black';
    if(!Us.connected){
      status = 'Connect first, then take turns';
    } else if(this.chess.in_checkmate()){
      status = (turnColor === this.myColor ? 'You lose' : 'You win') + ' — checkmate! 🎉';
    } else if(this.chess.in_draw()){
      status = "It's a draw";
    } else {
      status = (turnColor === this.myColor ? 'Your turn' : "Waiting for them...") + (this.chess.in_check() ? ' — check!' : '');
    }
    document.getElementById('chessStatus').textContent = status;
  },

  reset(){
    this.chess.reset();
    this.board.start();
    this._updateStatus();
    Us.send('chess-reset', {});
  }
};

Us.onMessage('chess-move', p => ChessGame.applyRemote(p));
Us.onMessage('chess-reset', () => { ChessGame.chess.reset(); ChessGame.board.start(); ChessGame._updateStatus(); });

// Wait for jQuery + chess.js + chessboard.js to be ready before initializing
window.addEventListener('load', () => ChessGame.init());
