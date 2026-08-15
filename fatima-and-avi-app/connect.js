/* Handles: creating/joining a room, voice+video call, screen share,
   and a shared data channel that games.js / watch.js send messages over. */

const Us = {
  peer: null,
  conn: null,
  call: null,
  localStream: null,
  isHost: false,
  connected: false,
  micOn: true,
  camOn: true,
  screenSharing: false,
  _handlers: {},

  onMessage(type, fn){ this._handlers[type] = fn; },
  send(type, payload){
    if(this.conn && this.conn.open){ this.conn.send({ type, payload }); }
  },
  _route(data){
    const h = this._handlers[data.type];
    if(h) h(data.payload);
  },

  async _getMedia(){
    try{
      this.localStream = await navigator.mediaDevices.getUserMedia({ video:true, audio:true });
      document.getElementById('localVideo').srcObject = this.localStream;
    }catch(e){
      alert("Couldn't access your camera/mic. You can still connect for games and text-free watching, just without video.");
      this.localStream = new MediaStream(); // empty fallback
    }
  },

  async createRoom(){
    await this._getMedia();
    this.isHost = true;
    this.peer = new Peer();
    this.peer.on('open', id => {
      document.getElementById('roomCodeDisplay').style.display = 'block';
      document.getElementById('roomCodeText').textContent = id;
      document.querySelector('#connectSetup .connect-choice').style.display = 'none';
    });
    this.peer.on('connection', c => {
      this.conn = c;
      this._setupDataChannel();
    });
    this.peer.on('call', call => {
      call.answer(this.localStream);
      this._setupMediaCall(call);
    });
  },

  async joinRoom(){
    const code = document.getElementById('joinCode').value.trim();
    if(!code) return alert('Enter the room code first');
    await this._getMedia();
    this.isHost = false;
    this.peer = new Peer();
    this.peer.on('open', () => {
      this.conn = this.peer.connect(code);
      this._setupDataChannel();
      const call = this.peer.call(code, this.localStream);
      this._setupMediaCall(call);
    });
  },

  _setupDataChannel(){
    this.conn.on('open', () => {
      this.connected = true;
      document.getElementById('connectSetup').style.display = 'none';
      document.getElementById('callUi').style.display = 'block';
      document.getElementById('liveGameHint').textContent = "Connected! Games will sync live between you two.";
      TTT && TTT.onConnected && TTT.onConnected();
      C4 && C4.onConnected && C4.onConnected();
      ChessGame && ChessGame.onConnected && ChessGame.onConnected();
      Uno && Uno.onConnected && Uno.onConnected();
    });
    this.conn.on('data', data => this._route(data));
    this.conn.on('close', () => this.hangUp());
  },

  _setupMediaCall(call){
    this.call = call;
    call.on('stream', remoteStream => {
      document.getElementById('remoteVideo').srcObject = remoteStream;
    });
  },

  toggleMic(){
    if(!this.localStream) return;
    this.micOn = !this.micOn;
    this.localStream.getAudioTracks().forEach(t => t.enabled = this.micOn);
    document.getElementById('micBtn').classList.toggle('off', !this.micOn);
  },
  toggleCam(){
    if(!this.localStream) return;
    this.camOn = !this.camOn;
    this.localStream.getVideoTracks().forEach(t => t.enabled = this.camOn);
    document.getElementById('camBtn').classList.toggle('off', !this.camOn);
  },

  async toggleScreenShare(){
    if(!this.call) return;
    const sender = this.call.peerConnection.getSenders().find(s => s.track && s.track.kind === 'video');
    if(!this.screenSharing){
      try{
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video:true });
        const screenTrack = screenStream.getVideoTracks()[0];
        if(sender) sender.replaceTrack(screenTrack);
        document.getElementById('localVideo').srcObject = screenStream;
        this.screenSharing = true;
        document.getElementById('screenBtn').classList.add('off');
        screenTrack.onended = () => this._stopScreenShare(sender);
      }catch(e){ /* user cancelled */ }
    } else {
      this._stopScreenShare(sender);
    }
  },
  _stopScreenShare(sender){
    const camTrack = this.localStream.getVideoTracks()[0];
    if(sender && camTrack) sender.replaceTrack(camTrack);
    document.getElementById('localVideo').srcObject = this.localStream;
    this.screenSharing = false;
    document.getElementById('screenBtn').classList.remove('off');
  },

  hangUp(){
    if(this.call) this.call.close();
    if(this.conn) this.conn.close();
    if(this.peer) this.peer.destroy();
    if(this.localStream) this.localStream.getTracks().forEach(t => t.stop());
    this.connected = false;
    document.getElementById('callUi').style.display = 'none';
    document.getElementById('connectSetup').style.display = 'block';
    document.querySelector('#connectSetup .connect-choice').style.display = 'flex';
    document.getElementById('roomCodeDisplay').style.display = 'none';
    document.getElementById('liveGameHint').textContent = 'Live games (Tic-Tac-Toe, Connect 4, Chess, Uno) need you to Connect first.';
  }
};
