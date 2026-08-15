/* Avi-only photo adding.
   NOTE: this is a simple front-end passcode, not real security — anyone
   who reads the code could find it. Good enough to stop Fatima from
   accidentally uploading over your app, not meant to stop a determined snoop. */
const AVI_PASSCODE = "changeme123"; // <-- change this to your own passcode!

const Gallery = {
  unlock(){
    const pass = prompt("Enter Avi's passcode to add photos:");
    if(pass === AVI_PASSCODE){
      document.getElementById('galleryLocked').style.display = 'none';
      document.getElementById('galleryUnlocked').style.display = 'block';
    } else if(pass !== null){
      alert("Wrong passcode.");
    }
  },
  addPhotos(){
    const input = document.getElementById('photoInput');
    const files = Array.from(input.files);
    if(files.length === 0) return alert('Choose at least one photo first');
    let stored = JSON.parse(localStorage.getItem('us_extra_photos') || '[]');
    let remaining = files.length;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        stored.push({ data: e.target.result, caption: '' });
        remaining--;
        if(remaining === 0){
          localStorage.setItem('us_extra_photos', JSON.stringify(stored));
          renderGallery();
          input.value = '';
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

function renderGallery(){
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = '';
  PHOTOS.forEach(p => {
    addPolaroid(`images/${p.file}`, p.caption);
  });
  const extra = JSON.parse(localStorage.getItem('us_extra_photos') || '[]');
  extra.forEach(p => addPolaroid(p.data, p.caption));

  function addPolaroid(src, caption){
    const div = document.createElement('div');
    div.className = 'polaroid';
    div.style.setProperty('--r', (Math.random()*8 - 4) + 'deg');
    div.innerHTML = `<img src="${src}" alt="${caption}" onerror="this.src='https://placehold.co/300x300/2B1B2E/D4A574?text=Add+photo';">
                      <div class="cap">${caption || ''}</div>`;
    galleryGrid.appendChild(div);
  }
}
renderGallery();
