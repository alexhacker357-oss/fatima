/* Loads the YouTube IFrame API and keeps play/pause/seek in sync
   between both people using the Us data channel. */

const WatchSync = {
  player: null,
  ignoring: false,
  pendingVideoId: null,

  loadVideo(){
    const url = document.getElementById('ytUrl').value.trim();
    const id = this._extractId(url);
    if(!id) return alert("Couldn't find a video ID in that link — paste the full YouTube URL.");
    this._loadLocal(id);
    Us.send('watch-load', { videoId: id });
  },

  _extractId(url){
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /(?:youtu\.be\/)([^?]+)/,
      /(?:youtube\.com\/embed\/)([^?]+)/
    ];
    for(const p of patterns){ const m = url.match(p); if(m) return m[1]; }
    return null;
  },

  _loadLocal(id){
    if(this.player && this.player.loadVideoById){
      this.player.loadVideoById(id);
    } else {
      this.pendingVideoId = id;
    }
  },

  _onStateChange(event){
    if(this.ignoring) return;
    if(event.data === YT.PlayerState.PLAYING){
      Us.send('watch-state', { state: 'play', time: this.player.getCurrentTime() });
    } else if(event.data === YT.PlayerState.PAUSED){
      Us.send('watch-state', { state: 'pause', time: this.player.getCurrentTime() });
    }
  }
};

Us.onMessage('watch-load', payload => WatchSync._loadLocal(payload.videoId));
Us.onMessage('watch-state', payload => {
  const p = WatchSync.player;
  if(!p) return;
  WatchSync.ignoring = true;
  if(payload.state === 'play'){
    p.seekTo(payload.time, true);
    p.playVideo();
  } else {
    p.seekTo(payload.time, true);
    p.pauseVideo();
  }
  setTimeout(() => { WatchSync.ignoring = false; }, 600);
});

// Load the YouTube IFrame API script
const ytScript = document.createElement('script');
ytScript.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(ytScript);

function onYouTubeIframeAPIReady(){
  WatchSync.player = new YT.Player('ytPlayer', {
    videoId: WatchSync.pendingVideoId || 'M7lc1UVf-VE',
    playerVars: { rel: 0 },
    events: {
      onStateChange: (e) => WatchSync._onStateChange(e)
    }
  });
}
