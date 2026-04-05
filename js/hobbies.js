/* ═══════════════════════════════════════════════════════════
   Hobbies Module — Side panel for hobby detail views
   ═══════════════════════════════════════════════════════════ */

const hobbyData = {
  football: {
    emoji: '⚽',
    title: 'Football',
    content: `
      <p>Football has been a constant in my life since school days. Whether it's a casual
      5-a-side with friends or watching the Premier League on weekends, the beautiful game
      never fails to excite me.</p>
      <p>I usually play as a midfielder — I enjoy the blend of creativity and defensive
      responsibility. Some of my favourite players include Iniesta, Modric, and Kevin De Bruyne.</p>
      <p>There's something about the teamwork, strategy, and split-second decisions on the
      pitch that mirrors problem-solving in code. It keeps me sharp, both physically and mentally.</p>
    `,
    extra: `
      <div class="hobby-panel-section">
        <h4>Photos</h4>
        <div class="hobby-panel-photos">
          <div class="photo-placeholder">📷 Photo 1</div>
          <div class="photo-placeholder">📷 Photo 2</div>
          <div class="photo-placeholder">📷 Photo 3</div>
          <div class="photo-placeholder">📷 Photo 4</div>
        </div>
      </div>
    `
  },
  music: {
    emoji: '🎸',
    title: 'Music',
    content: `
      <p>Music is my go-to for unwinding after a long coding session. I'm an amateur guitarist
      who dabbles in acoustic fingerstyle and the occasional campfire singalong.</p>
      <p>My playlists swing between indie rock, lo-fi beats, and classic Bollywood melodies.
      I find that music helps me get into a flow state — many of my best ideas have come
      while listening to an album on loop.</p>
      <p>Currently learning: fingerpicking patterns and a bit of music theory to understand
      why certain chord progressions feel so satisfying.</p>
    `,
    extra: `
      <div class="hobby-panel-section">
        <h4>Preview Links</h4>
        <div class="hobby-panel-links">
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-spotify-logo" aria-hidden="true"></i> Spotify Playlist</a>
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-youtube-logo" aria-hidden="true"></i> Guitar Covers</a>
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-music-notes" aria-hidden="true"></i> SoundCloud</a>
        </div>
      </div>
    `
  },
  writing: {
    emoji: '✍️',
    title: 'Writing',
    content: `
      <p>Writing helps me organize my thoughts and communicate complex ideas clearly.
      I maintain a personal blog where I write about technology, life at IIT, and
      lessons from the industry.</p>
      <p>I also enjoy journaling — it's a great way to reflect and stay grounded. Occasionally,
      I write poetry when inspiration strikes, usually at odd hours of the night.</p>
      <p>I believe that strong writing skills make you a better engineer. Whether it's
      documentation, design docs, or explaining a tricky bug, words matter.</p>
    `,
    extra: `
      <div class="hobby-panel-section">
        <h4>Preview Links</h4>
        <div class="hobby-panel-links">
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-article" aria-hidden="true"></i> Personal Blog</a>
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-medium-logo" aria-hidden="true"></i> Medium Articles</a>
          <a href="#" target="_blank" rel="noopener"><i class="ph ph-notebook" aria-hidden="true"></i> Poetry Collection</a>
        </div>
      </div>
    `
  }
};

export function initHobbyModals() {
  const overlay = document.getElementById('hobbyPanelOverlay');
  const panel = document.getElementById('hobbyPanel');
  const closeBtn = document.getElementById('hobbyPanelClose');
  const body = document.getElementById('hobbyPanelBody');

  if (!overlay || !panel || !closeBtn || !body) return;

  // Open panel on card click
  document.querySelectorAll('.fun-card[data-hobby]').forEach(card => {
    const open = () => {
      const key = card.dataset.hobby;
      const data = hobbyData[key];
      if (!data) return;
      body.innerHTML = `
        <span class="panel-emoji" aria-hidden="true">${data.emoji}</span>
        <h3>${data.title}</h3>
        ${data.content}
        ${data.extra || ''}
      `;
      overlay.classList.add('active');
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  // Close panel
  const close = () => {
    overlay.classList.remove('active');
    panel.classList.remove('active');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
