/* ============ THE GAMER RICH — shared UI logic ============ */

function renderChrome(activePage){
  if(typeof injectGRSprite==='function') injectGRSprite();
  const user = currentUser();
  const canLaunch = user && canLaunchChallenges(user);
  const langOptions = LANGS.map(l=>`<option value="${l.code}" ${getLang()===l.code?'selected':''}>${l.flag} ${l.label}</option>`).join('');

  const navHtml = `
  <div class="demo-banner" data-i18n="demo_banner"></div>
  <nav class="navbar">
    <div class="navbar-inner">
      <a href="index.html" class="logo">THE GAMER<span class="rich"> RICH</span></a>
      <button class="nav-toggle" id="navToggle">☰</button>
      <div class="nav-links" id="navLinks">
        ${navLink('defis.html', t('nav_challenges'), activePage)}
        ${navDropdown('Communauté', [
          ['classements.html', t('nav_leaderboard')],
          ['communaute.html', t('nav_community')],
          ['sponsors.html', '🏢 Sponsors'],
          ['statuts.html', '🏆 Statuts'],
        ], activePage)}
        ${navLink('recharge.html', '🛍️ Boutique', activePage)}
        ${user? navLink('profil.html?u='+user.id, t('nav_profile'), activePage) : ''}
        ${canLaunch? navLink('lancer-defi.html', '🚀 '+t('nav_create_challenge'), activePage) : ''}
      </div>
      <div class="nav-right">
        <select id="langSelect" class="pill" style="background:var(--bg-card);border:1px solid var(--line);color:var(--text);padding:6px 8px">${langOptions}</select>
        ${user ? `
          <span class="balance-pill gr-pill" title="Solde GR">${grIconHtml(16)} ${fmtNum(grBalance(user))}<a href="recharge.html?tab=gr" class="add-btn" aria-label="Recharger des GR">+</a></span>
          <span class="gold-pill" title="Solde Gold Stars (soutien communautaire)">★ ${user.goldStars} <a href="recharge.html?tab=gold" style="color:var(--cyan);margin-left:4px;font-size:.75rem;font-weight:700" aria-label="Recharger des Gold Stars">+</a></span>
          <a href="portefeuille.html" title="Mon portefeuille" style="font-size:1.2rem">💼</a>
          <a href="parametres.html" title="${t('nav_settings')}" style="font-size:1.2rem">⚙️</a>
          <a href="profil.html?u=${user.id}" class="avatar-btn"><img src="${avatarSrc(user)}" alt=""></a>
        ` : `
          <a href="login.html" class="btn btn-ghost btn-sm" data-i18n="btn_login"></a>
          <a href="register.html" class="btn btn-primary btn-sm" data-i18n="btn_register"></a>
        `}
      </div>
    </div>
  </nav>`;
  document.getElementById('nav-root').innerHTML = navHtml;
  document.getElementById('navToggle').addEventListener('click', ()=>{
    document.getElementById('navLinks').classList.toggle('open');
  });
  document.getElementById('langSelect').addEventListener('change', (e)=> setLang(e.target.value));
  wireNavDropdowns();

  const footerHtml = `
  <footer>
    <div class="container footer-inner">
      <div>
        <div class="logo" style="margin-bottom:8px">THE GAMER<span class="rich"> RICH</span></div>
        <p style="max-width:320px">Plateforme communautaire GTA 6, ouverte au monde entier. Indépendante du jeu — aucune donnée n'est récupérée automatiquement des serveurs de jeu.</p>
      </div>
      <div class="footer-links">
        <a href="defis.html" data-i18n="nav_challenges"></a>
        <a href="classements.html" data-i18n="nav_leaderboard"></a>
        <a href="communaute.html" data-i18n="nav_community"></a>
        <a href="sponsors.html">Nos sponsors</a>
        <a href="lancer-defi.html">Devenir sponsor</a>
        <a href="recharge.html">💳 Recharger mon compte</a>
        <a href="portefeuille.html">💼 Mon portefeuille</a>
        <a href="don.html">💝 Faire un don</a>
        <a href="faq.html">❓ FAQ</a>
        <a href="cgu.html">📜 CGU &amp; Règlement</a>
        <a href="admin.html" data-i18n="nav_admin"></a>
      </div>
    </div>
  </footer>`;
  document.getElementById('footer-root').innerHTML = footerHtml;
  applyI18n();
}
function navLink(href,label,active){
  const isActive = active && href.startsWith(active);
  return `<a href="${href}" class="${isActive?'active':''}">${label}</a>`;
}
// Regroupe plusieurs entrées sous un seul déclencheur — menu épuré en tête de
// page. Le déclencheur passe "actif" si la page en cours correspond à l'un
// des liens du sous-menu, pour que le repère visuel reste cohérent.
function navDropdown(label, items, active){
  const isActive = items.some(([href])=> active && href.startsWith(active));
  return `<div class="nav-dropdown ${isActive?'active':''}">
    <button type="button" class="nav-dropdown-trigger ${isActive?'active':''}">${label} <span class="caret">▾</span></button>
    <div class="nav-dropdown-menu">
      ${items.map(([href,lbl])=>`<a href="${href}" class="${active && href.startsWith(active)?'active':''}">${lbl}</a>`).join('')}
    </div>
  </div>`;
}
function wireNavDropdowns(){
  document.querySelectorAll('.nav-dropdown-trigger').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.stopPropagation();
      const dd = btn.closest('.nav-dropdown');
      const wasOpen = dd.classList.contains('open');
      document.querySelectorAll('.nav-dropdown.open').forEach(x=> x.classList.remove('open'));
      if(!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-dropdown.open').forEach(x=> x.classList.remove('open'));
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape') document.querySelectorAll('.nav-dropdown.open').forEach(x=> x.classList.remove('open'));
  });
}

function toast(msg){
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 3200);
}

function requireAuth(){
  if(!currentUser()){
    toast('Connecte-toi pour continuer.');
    setTimeout(()=> location.href='login.html', 700);
    return false;
  }
  return true;
}

function fmtMoney(n, currency){ return n.toLocaleString('fr-FR') + ' ' + (currency||'€'); }
function fmtNum(n){ return n.toLocaleString('fr-FR'); }
// Format compact type réseau social ("1,2 K") pour les compteurs sur les cartes.
function fmtCompact(n){
  if(n >= 1000000) return (n/1000000).toLocaleString('fr-FR',{maximumFractionDigits:1}) + 'M';
  if(n >= 1000) return (n/1000).toLocaleString('fr-FR',{maximumFractionDigits:1}) + 'K';
  return String(n);
}
// Temps relatif ("il y a 5 min") par rapport à l'horloge figée now() du prototype.
function timeAgo(dateStr){
  const diffMs = now() - new Date(dateStr);
  const min = Math.floor(diffMs/60000);
  if(min < 1) return "à l'instant";
  if(min < 60) return `il y a ${min} min`;
  const h = Math.floor(min/60);
  if(h < 24) return `il y a ${h} h`;
  const d = Math.floor(h/24);
  return `il y a ${d} j`;
}

function daysLeft(dateStr){
  const diff = new Date(dateStr) - now();
  const d = Math.max(0, Math.ceil(diff/86400000));
  return d;
}
function countdownLabel(dateStr){
  const diff = new Date(dateStr) - now();
  if(diff<=0) return 'Terminé';
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  if(d>0) return `${d}j ${h}h`;
  if(h>0) return `${h}h ${m}min`;
  return `${m}min`;
}

function isLikedByMe(db, videoId, userId){
  return !!(db.likedBy[videoId] && db.likedBy[videoId].includes(userId));
}
function toggleLike(db, video, userId){
  db.likedBy[video.id] = db.likedBy[video.id] || [];
  const idx = db.likedBy[video.id].indexOf(userId);
  if(idx === -1){
    db.likedBy[video.id].push(userId);
    video.likes++;
  } else {
    db.likedBy[video.id].splice(idx,1);
    video.likes = Math.max(0, video.likes - 1);
  }
  saveDB(db);
}

function levelBadge(levelKey){
  const l = PROGRESSION.find(p=>p.key===levelKey) || PROGRESSION[0];
  return `<span class="status-badge">${statusIconHtml(l.key,16)} ${l.label}</span>`;
}

// Visuels générés (dégradés + initiales), sans aucune dépendance réseau vers
// un service de photos tiers. Déterministes : le même id donne toujours le
// même rendu, pour rester reconnaissable d'un chargement à l'autre.
function hashSeed(str){
  let h = 0;
  for(let i=0;i<String(str).length;i++) h = (h*31 + String(str).charCodeAt(i)) >>> 0;
  return h;
}
// Illustration procédurale (silhouettes + halos + horizon) pour les vignettes
// de défis, vidéos, bannières et statuts — un rendu bien plus travaillé qu'un
// dégradé plat, tout en restant un simple SVG généré (aucun fichier, aucune
// requête réseau). Cinq ambiances différentes (skyline, bord de mer, désert,
// nuit néon, piste de drift) tirées au sort selon le hash du seed : deux défis
// voisins n'ont plus systématiquement la même composition, seulement la même
// famille de couleurs si le hasard tombe deux fois sur la même ambiance.
function sceneDefs(hue1,hue2,sunHue){
  return `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="hsl(${hue1} 75% 26%)"/>
      <stop offset="1" stop-color="hsl(${hue2} 70% 10%)"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="hsl(${sunHue} 92% 68%)" stop-opacity=".95"/>
      <stop offset="1" stop-color="hsl(${sunHue} 92% 68%)" stop-opacity="0"/>
    </radialGradient>`;
}
function sceneSkyline(rand,hue1,hue2,sunHue){
  const sunX = (40 + rand()*320).toFixed(0), sunY = (30 + rand()*55).toFixed(0);
  let buildings = '', x = -10;
  while(x < 420){
    const w = 16 + rand()*30;
    const bh = 35 + rand()*115;
    buildings += `<rect x="${x.toFixed(0)}" y="${(225-bh).toFixed(0)}" width="${w.toFixed(1)}" height="${(bh+12).toFixed(0)}"/>`;
    if(rand() < 0.5){
      const wx = x + w*0.3, wy = 225 - bh + 10 + rand()*(bh*0.5);
      buildings += `<rect x="${wx.toFixed(0)}" y="${wy.toFixed(0)}" width="3" height="6" fill="hsl(${sunHue} 80% 70%)" opacity=".7"/>`;
    }
    x += w - 2;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
    <defs>${sceneDefs(hue1,hue2,sunHue)}
      <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(${sunHue} 90% 65%)" stop-opacity=".35"/>
        <stop offset="1" stop-color="hsl(${sunHue} 90% 65%)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="400" height="225" fill="url(#sky)"/>
    <circle cx="${sunX}" cy="${sunY}" r="75" fill="url(#sun)"/>
    <path d="M170 225 L188 150 L212 150 L230 225 Z" fill="url(#road)"/>
    <g fill="#0a0514">${buildings}</g>
  </svg>`;
}
function sceneCoastal(rand,hue1,hue2,sunHue){
  const sunX = (60 + rand()*280).toFixed(0), sunY = (55 + rand()*35).toFixed(0);
  let palms = '', x = 15;
  while(x < 400){
    const ph = 38 + rand()*48, lean = (rand()*16 - 8).toFixed(1);
    palms += `<g transform="translate(${x.toFixed(0)},0) skewX(${lean})">
      <rect x="-3" y="${(190-ph).toFixed(0)}" width="6" height="${ph.toFixed(0)}" fill="#0a0514"/>
      <path d="M0 ${(190-ph).toFixed(0)} q -22 -8 -32 -22 M0 ${(190-ph).toFixed(0)} q 24 -6 36 -18 M0 ${(190-ph).toFixed(0)} q -6 -20 4 -36 M0 ${(190-ph).toFixed(0)} q 10 -18 0 -36" stroke="#0a0514" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>`;
    x += 55 + rand()*65;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
    <defs>${sceneDefs(hue1,hue2,sunHue)}
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(${sunHue} 60% 45%)" stop-opacity=".55"/>
        <stop offset="1" stop-color="hsl(${sunHue} 60% 45%)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="400" height="225" fill="url(#sky)"/>
    <circle cx="${sunX}" cy="${sunY}" r="70" fill="url(#sun)"/>
    <rect y="188" width="400" height="37" fill="hsl(${hue2} 55% 14%)"/>
    <rect y="188" width="400" height="20" fill="url(#sea)"/>
    <path d="M0 190 Q 100 184 200 190 T 400 190" stroke="hsl(${sunHue} 90% 75%)" stroke-opacity=".4" stroke-width="2" fill="none"/>
    ${palms}
  </svg>`;
}
function sceneDesert(rand,hue1,hue2,sunHue){
  const sunX = (150 + rand()*100).toFixed(0), sunY = (65 + rand()*30).toFixed(0);
  function mesa(baseY, opacity, seed){
    const lr = mulberry32(hashSeed('mesa'+seed+baseY));
    let d = `M -10 225 `, x = -10;
    while(x < 410){
      const w = 30 + lr()*50, h = 20 + lr()*70;
      d += `L ${x.toFixed(0)} ${(baseY-h).toFixed(0)} L ${(x+w*0.6).toFixed(0)} ${(baseY-h).toFixed(0)} L ${(x+w).toFixed(0)} ${baseY} `;
      x += w;
    }
    return `<path d="${d} L 410 225 Z" fill="#150a10" opacity="${opacity}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
    <defs>${sceneDefs(hue1,hue2,sunHue)}</defs>
    <rect width="400" height="225" fill="url(#sky)"/>
    <circle cx="${sunX}" cy="${sunY}" r="85" fill="url(#sun)"/>
    ${mesa(175,.55,1)}
    ${mesa(205,.85,2)}
  </svg>`;
}
function sceneNeonNight(rand,hue1,hue2,sunHue){
  let stars = '';
  for(let i=0;i<26;i++){
    stars += `<circle cx="${(rand()*400).toFixed(0)}" cy="${(rand()*110).toFixed(0)}" r="${(rand()*1.3+.3).toFixed(1)}" fill="#fff" opacity="${(rand()*.6+.3).toFixed(2)}"/>`;
  }
  let towers = '', x = -10;
  while(x < 420){
    const w = 14 + rand()*22, bh = 60 + rand()*130;
    towers += `<rect x="${x.toFixed(0)}" y="${(225-bh).toFixed(0)}" width="${w.toFixed(1)}" height="${(bh+15).toFixed(0)}" fill="#05030c"/>`;
    let wy = 225 - bh + 8;
    while(wy < 210){
      if(rand() < 0.6) towers += `<rect x="${(x+w*0.25).toFixed(0)}" y="${wy.toFixed(0)}" width="${(w*0.5).toFixed(1)}" height="2.5" fill="hsl(${sunHue} 95% 65%)" opacity=".8"/>`;
      wy += 9;
    }
    x += w - 2;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(${(hue1+220)%360} 55% 8%)"/>
        <stop offset="1" stop-color="hsl(${(hue2+220)%360} 60% 4%)"/>
      </linearGradient>
      <linearGradient id="grid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(${sunHue} 95% 60%)" stop-opacity=".55"/>
        <stop offset="1" stop-color="hsl(${sunHue} 95% 60%)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="400" height="225" fill="url(#sky)"/>
    <g>${stars}</g>
    <g>${towers}</g>
    <rect y="205" width="400" height="20" fill="url(#grid)"/>
    <path d="M0 225 L160 205 L240 205 L400 225 Z" fill="none" stroke="hsl(${sunHue} 95% 65%)" stroke-opacity=".5" stroke-width="1.5"/>
  </svg>`;
}
function sceneDriftTrack(rand,hue1,hue2,sunHue){
  const sunX = (50 + rand()*300).toFixed(0);
  let dashes = '';
  for(let i=0;i<7;i++){
    dashes += `<rect x="${(15+i*58+rand()*10).toFixed(0)}" y="150" width="26" height="6" rx="3" fill="hsl(${sunHue} 20% 90%)" opacity=".55"/>`;
  }
  const skidY = 130 + rand()*40;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
    <defs>${sceneDefs(hue1,hue2,sunHue)}
      <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="hsl(${hue2} 20% 22%)"/>
        <stop offset="1" stop-color="hsl(${hue2} 25% 8%)"/>
      </linearGradient>
    </defs>
    <rect width="400" height="140" fill="url(#sky)"/>
    <circle cx="${sunX}" cy="55" r="65" fill="url(#sun)"/>
    <rect y="132" width="400" height="93" fill="url(#asphalt)"/>
    ${dashes}
    <path d="M -20 ${(skidY+40).toFixed(0)} Q 120 ${(skidY-10).toFixed(0)} 200 ${skidY.toFixed(0)} Q 300 ${(skidY+25).toFixed(0)} 420 ${(skidY-5).toFixed(0)}" stroke="#0a0514" stroke-width="9" fill="none" opacity=".55" stroke-linecap="round"/>
    <path d="M -20 ${(skidY+56).toFixed(0)} Q 130 ${(skidY+6).toFixed(0)} 210 ${(skidY+16).toFixed(0)} Q 300 ${(skidY+41).toFixed(0)} 420 ${(skidY+11).toFixed(0)}" stroke="#0a0514" stroke-width="9" fill="none" opacity=".55" stroke-linecap="round"/>
  </svg>`;
}
const SCENE_BUILDERS = [sceneSkyline, sceneCoastal, sceneDesert, sceneNeonNight, sceneDriftTrack];
function sceneArt(str){
  const h = hashSeed(str);
  const rand = mulberry32(h);
  const hue1 = h % 360, hue2 = (hue1 + 35) % 360, sunHue = (hue1 + 300) % 360;
  const svg = SCENE_BUILDERS[h % SCENE_BUILDERS.length](rand, hue1, hue2, sunHue);
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function initials(name){
  return String(name||'?').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
}
// Certains navigateurs/OS ne renseignent pas file.type pour une vidéo (ex.
// certains gestionnaires de fichiers Android) — on retombe sur l'extension
// pour ne jamais rejeter un vrai fichier vidéo (mp4, mov, etc.) à tort.
function looksLikeVideoFile(file){
  if(file.type && file.type.startsWith('video/')) return true;
  return /\.(mp4|m4v|mov|webm|avi|mkv|3gp)$/i.test(file.name||'');
}

/* ============ stockage vidéo (IndexedDB) ============
   localStorage (db.videos) ne stocke qu'une référence ('idb:<clé>'), jamais
   les octets de la vidéo — trop volumineux et ça ferait échouer saveDB en
   silence en cas de dépassement de quota. Le fichier réel vit dans IndexedDB
   (bien plus de place, pas de limite de taille pratique ici) et on ne crée
   une URL blob qu'au moment où une page a réellement besoin de l'afficher —
   contrairement à URL.createObjectURL(file) seul, qui ne survit pas à une
   navigation vers une autre page. */
const VIDEO_DB_NAME = 'tgr_media', VIDEO_STORE = 'videos';
let _videoDBPromise = null;
function openVideoDB(){
  if(_videoDBPromise) return _videoDBPromise;
  _videoDBPromise = new Promise((resolve, reject)=>{
    if(!window.indexedDB){ reject(new Error('IndexedDB indisponible')); return; }
    const req = indexedDB.open(VIDEO_DB_NAME, 1);
    req.onupgradeneeded = ()=>{ if(!req.result.objectStoreNames.contains(VIDEO_STORE)) req.result.createObjectStore(VIDEO_STORE); };
    req.onsuccess = ()=> resolve(req.result);
    req.onerror = ()=> reject(req.error);
  });
  return _videoDBPromise;
}
async function saveVideoBlob(key, blob){
  try{
    const db = await openVideoDB();
    return await new Promise((resolve,reject)=>{
      const tx = db.transaction(VIDEO_STORE,'readwrite');
      tx.objectStore(VIDEO_STORE).put(blob, key);
      tx.oncomplete = ()=> resolve(true);
      tx.onerror = ()=> reject(tx.error);
    });
  }catch(e){ return false; }
}
async function loadVideoBlobURL(key){
  try{
    const db = await openVideoDB();
    return await new Promise((resolve)=>{
      const tx = db.transaction(VIDEO_STORE,'readonly');
      const req = tx.objectStore(VIDEO_STORE).get(key);
      req.onsuccess = ()=> resolve(req.result ? URL.createObjectURL(req.result) : null);
      req.onerror = ()=> resolve(null);
    });
  }catch(e){ return null; }
}
// Vignettes de vidéo façon aperçu au survol : chaque carte qui a une vraie
// vidéo (IndexedDB) la joue en boucle, en muet, dès que la souris passe
// dessus (tape sur mobile) — jamais chargée tant qu'on ne la survole pas.
// Écouté sur .card-thumb (toujours visible), jamais sur le <video> lui-même :
// il démarre avec l'attribut hidden (display:none), donc un
// IntersectionObserver posé dessus ne le verrait jamais comme visible.
const _cardVideoCache = {};
function mountLazyCardVideos(root){
  root = root || document;
  root.querySelectorAll('video.card-video[data-video-key]').forEach(el=>{
    const thumb = el.closest('.card-thumb');
    if(!thumb) return;
    const key = el.dataset.videoKey;
    let loading = false;
    const start = ()=>{
      if(el.src){ el.currentTime = 0; el.play().catch(()=>{}); return; }
      if(_cardVideoCache[key]){
        el.src = _cardVideoCache[key];
        el.hidden = false;
        thumb.classList.add('has-video');
        el.play().catch(()=>{});
        return;
      }
      if(loading) return;
      loading = true;
      loadVideoBlobURL(key).then(url=>{
        loading = false;
        if(!url) return;
        _cardVideoCache[key] = url;
        el.src = url;
        el.hidden = false;
        thumb.classList.add('has-video');
        el.play().catch(()=>{});
      });
    };
    const stop = ()=>{ if(!el.paused) el.pause(); };
    thumb.addEventListener('mouseenter', start);
    thumb.addEventListener('mouseleave', stop);
    thumb.addEventListener('touchstart', start, { passive:true });
  });
}
function avatarUrl(id, name){
  const h = hashSeed(id);
  const bg1 = `hsl(${h % 360} 65% 42%)`, bg2 = `hsl(${(h+50) % 360} 65% 26%)`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect width="150" height="150" fill="url(#g)"/><text x="75" y="88" font-family="Arial,sans-serif" font-size="56" font-weight="700" fill="#fff" text-anchor="middle">${initials(name||id)}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
function rankPhotoUrl(key){
  // Guillemets simples : cette valeur est toujours interpolée dans un attribut
  // style="..." en guillemets doubles — des doubles ici casseraient le HTML
  // (l'attribut se refermerait prématurément sur le premier " rencontré).
  return `url('img/statuts/${key}.png')`;
}
// Le personnage choisi (img/characters/*) prime partout — c'est lui "la photo
// de profil". Pour une marque (pas de personnage) ou un compte pas encore
// migré, on retombe sur une photo uploadée si elle existe, puis sur un
// visuel généré à partir de l'id (jamais d'image cassée).
function avatarSrc(u){
  if(!u) return avatarUrl('?','?');
  if(u.characterId){ const c = getCharacter(u.characterId); if(c) return c.img; }
  return u.avatar || avatarUrl(u.id, u.display);
}
function bannerSrc(u){ return (u && u.banner) ? `url('${u.banner}')` : `url('${sceneArt('banner-'+u.id)}')`; }

/* ============ courbes de progression du profil (abonnés / gains) ============
   Deux séries indépendantes, chacune reconstruite à partir d'évènements réels
   déjà en base (paliers franchis, défis remportés) plutôt que de données
   inventées — le dernier point est toujours ancré sur la valeur actuelle
   réellement affichée ailleurs sur le profil (u.followers / u.earnings). */
function followerSeries(db, u){
  const ups = (db.statusUps||[]).filter(s=>s.userId===u.id).slice().sort((a,b)=> new Date(a.date)-new Date(b.date));
  const pts = [{ date:u.createdAt, value:0 }];
  ups.forEach(s=>{
    const lvl = PROGRESSION.find(p=>p.key===s.level);
    if(lvl) pts.push({ date:s.date, value:lvl.followers });
  });
  const last = pts[pts.length-1];
  if(!last || last.value!==u.followers) pts.push({ date:new Date().toISOString(), value:u.followers||0 });
  return pts;
}
function earningsSeries(db, u){
  const wins = (db.challenges||[]).filter(c=>c.winnerId===u.id && c.status==='closed' && c.resultsAt).slice().sort((a,b)=> new Date(a.resultsAt)-new Date(b.resultsAt));
  let cum = 0;
  const pts = [{ date:u.createdAt, value:0 }];
  wins.forEach(c=>{ cum += c.reward; pts.push({ date:c.resultsAt, value:cum }); });
  const last = pts[pts.length-1];
  if(!last || last.value!==(u.earnings||0)) pts.push({ date:new Date().toISOString(), value:u.earnings||0 });
  return pts;
}
// Mini graphique en aire — une seule série, pas de légende nécessaire (le
// titre au-dessus du graphique nomme déjà la série). Point final marqué et
// étiqueté ; un <title> par point sert de repère au survol.
// Axe des valeurs à gauche (3 repères), axe du temps en bas (premher/dernier
// point) — un vrai repère de lecture, pas juste une ligne nue. viewBox gardé
// à son ratio réel (xMidYMid meet, jamais "none") pour que le texte et les
// points ne soient jamais étirés.
function sparklineHtml(series, color, fmtValue, fmtAxisValue){
  if(series.length<2){
    return `<div class="sparkline-empty">Pas encore d'historique</div>`;
  }
  fmtAxisValue = fmtAxisValue || fmtValue;
  const w = 300, h = 140;
  const padL = 46, padR = 10, padT = 10, padB = 22;
  const plotW = w-padL-padR, plotH = h-padT-padB;
  const vals = series.map(p=>p.value);
  const min = Math.min(0, ...vals), max = Math.max(1, ...vals);
  const x = i => padL + (i/(series.length-1)) * plotW;
  const y = v => padT + plotH - ((v-min)/(max-min||1)) * plotH;
  const pts = series.map((p,i)=> [x(i), y(p.value)]);
  const linePts = pts.map(p=>p.join(',')).join(' ');
  const areaPts = `${x(0)},${padT+plotH} ${linePts} ${x(series.length-1)},${padT+plotH}`;
  const gid = 'spark-'+Math.random().toString(36).slice(2,9);
  const lastPt = pts[pts.length-1];
  const fmtDate = d => new Date(d).toLocaleDateString('fr-FR',{ day:'2-digit', month:'short' });
  const yTicks = [min, (min+max)/2, max];
  return `
  <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    ${yTicks.map(t=>{
      const ty = y(t);
      return `<line x1="${padL}" y1="${ty}" x2="${w-padR}" y2="${ty}" stroke="var(--line)" stroke-width="1"/>
      <text x="${padL-8}" y="${ty}" text-anchor="end" dominant-baseline="middle" font-size="9" fill="var(--text-faint)">${fmtAxisValue(t)}</text>`;
    }).join('')}
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+plotH}" stroke="var(--line)" stroke-width="1"/>
    <polygon points="${areaPts}" fill="url(#${gid})"/>
    <polyline points="${linePts}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map(([px,py],i)=>`<circle cx="${px}" cy="${py}" r="7" fill="transparent"><title>${fmtDate(series[i].date)} — ${fmtValue(series[i].value)}</title></circle>`).join('')}
    <circle cx="${lastPt[0]}" cy="${lastPt[1]}" r="3.5" fill="${color}"/>
    <text x="${padL}" y="${h-6}" font-size="9" fill="var(--text-faint)" text-anchor="start">${fmtDate(series[0].date)}</text>
    <text x="${w-padR}" y="${h-6}" font-size="9" fill="var(--text-faint)" text-anchor="end">${fmtDate(series[series.length-1].date)}</text>
  </svg>`;
}
// Vignette de progression du profil, divisée en deux courbes indépendantes
// (abonnés, gains) — même format des deux côtés, chacune sur sa propre
// échelle, jamais mélangées sur un même axe.
function renderGrowthCharts(db, u){
  const followers = followerSeries(db, u);
  const earnings = earningsSeries(db, u);
  return `<div class="growth-split">
    <div class="growth-panel">
      <div class="growth-panel-head">
        <span class="label">👥 Abonnés</span>
        <span class="value" style="color:var(--cyan)">${fmtNum(u.followers)}</span>
      </div>
      <div class="sparkline">${sparklineHtml(followers, 'var(--cyan)', v=>fmtNum(v)+' abonnés', v=>fmtCompact(v))}</div>
    </div>
    <div class="growth-panel">
      <div class="growth-panel-head">
        <span class="label">💰 Gains</span>
        <span class="value" style="color:var(--gold)">${u.earningsVisible ? fmtMoney(u.earnings,'€') : '🔒'}</span>
      </div>
      ${u.earningsVisible
        ? `<div class="sparkline">${sparklineHtml(earnings, 'var(--gold)', v=>fmtMoney(v,'€'), v=>fmtCompact(v)+'€')}</div>`
        : `<div class="sparkline-empty">🔒 Gains privés</div>`}
    </div>
  </div>`;
}
function thumbBg(seed){
  return `background-image:url('${sceneArt(seed)}');background-size:cover;background-position:center`;
}
// 20 vraies illustrations de défis (img/defis/defi01.jpg..defi20.jpg),
// choisies de façon stable par défi (même hash que sceneArt) — uniquement
// pour les vignettes de DÉFIS, jamais pour les vidéos (qui gardent l'art
// procédural via thumbBg/sceneArt).
const CHALLENGE_THUMB_COUNT = 20;
function challengeThumbBg(seed){
  const n = (hashSeed(seed) % CHALLENGE_THUMB_COUNT) + 1;
  const file = 'img/defis/defi' + String(n).padStart(2,'0') + '.jpg';
  return `background-image:url('${file}');background-size:cover;background-position:center`;
}
function thumbBadge(emoji){
  return `<span class="thumb-badge">${emoji}</span>`;
}
// Anime un nombre affiché de 0 jusqu'à sa valeur finale (cagnottes de défis,
// stats en jeu...) pour donner un effet dynamique dès l'ouverture de la page.
// `formatter` reçoit la valeur courante (flottante) à chaque frame.
function animateCountUp(el, endValue, formatter, duration){
  duration = duration || 900;
  formatter = formatter || (n=>Math.round(n).toLocaleString('fr-FR'));
  if(!el) return;
  if(!endValue || endValue<=0){ el.textContent = formatter(endValue||0); return; }
  const start = performance.now();
  function tick(now){
    const t = Math.min(1, (now-start)/duration);
    const eased = 1 - Math.pow(1-t, 3);
    el.textContent = formatter(endValue*eased);
    if(t<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
// Défi d'origine d'une vidéo + place actuelle dans son classement (même règle
// de score que le classement du défi) — repère jaune partagé par les cartes
// vidéo (profil, vidéos, tendances) pour savoir sur quel défi juger un ❤️.
function videoChallengeRank(db, v){
  if(!v.challengeId) return { challenge:null, rankLabel:'' };
  const challenge = db.challenges.find(c=>c.id===v.challengeId);
  if(!challenge) return { challenge:null, rankLabel:'' };
  const sub = db.submissions.find(s=>s.videoId===v.id);
  let rankLabel = '';
  if(sub && sub.status==='published'){
    const ranked = db.submissions.filter(s=>s.challengeId===challenge.id && s.status==='published')
      .map(s=>({ s, v: db.videos.find(vv=>vv.id===s.videoId) }))
      .sort((a,b)=> scoreOf(b.v,b.s) - scoreOf(a.v,a.s));
    const idx = ranked.findIndex(r=>r.s.id===sub.id);
    if(idx>=0) rankLabel = `#${idx+1}`;
  }
  return { challenge, rankLabel };
}
// Convertit un fichier image uploadé en vignette data: URL (redimensionnée),
// pour un stockage léger côté client (localStorage n'a pas de vrai stockage fichier).
function fileToResizedDataURL(file, maxSize){
  maxSize = maxSize || 160;
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ()=>{
      const img = new Image();
      img.onerror = reject;
      img.onload = ()=>{
        const ratio = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * ratio), h = Math.round(img.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/png', 0.9));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function logoHtml(logo, size){
  size = size || 28;
  if(!logo) return '';
  // Logo réel (fichier ou data URI) : une image large façon "wordmark", jamais
  // forcée dans un carré comme un emoji — hauteur fixe, largeur libre.
  if(logo.startsWith('data:') || /\.(png|jpe?g|svg|webp)$/i.test(logo)){
    return `<img src="${logo}" style="height:${size}px;width:auto;max-width:${size*4}px;object-fit:contain;vertical-align:middle">`;
  }
  return `<span style="font-size:${size*0.8}px;line-height:1;vertical-align:middle">${logo}</span>`;
}

// Bandeau posé en bas de la vignette d'un défi sponsorisé — le logo doit
// occuper une vraie place, pour qu'on comprenne au premier coup d'œil que
// c'est la marque qui produit le défi, pas juste une mention en petit texte.
function sponsorBadgeHtml(c){
  if(!c || !c.sponsor || c.creatorType!=='brand') return '';
  const logo = c.sponsorLogo ? logoHtml(c.sponsorLogo,26) : '<span class="logo-emoji">🏢</span>';
  return `<div class="sponsor-badge">${logo}<div class="sponsor-badge-text"><span class="sponsor-badge-eyebrow">Défi produit par</span><span class="sponsor-badge-name">${c.sponsor}</span></div></div>`;
}

// Les emojis s'affichent avec la police système native (pas de conversion en
// images via une lib externe type Twemoji) : c'est ce qui fonctionne de façon
// fiable partout, y compris dans un aperçu à origine restreinte où les images
// tierces peuvent être bloquées silencieusement — ce qui produisait des
// carrés vides à la place des icônes.

function statusOf(followers){ return getLevelForFollowers(followers); }

function qs(name){ return new URLSearchParams(location.search).get(name); }

function isFollowing(db, followerId, targetId){
  return !!(db.follows[followerId] && db.follows[followerId].includes(targetId));
}
function toggleFollow(db, follower, target){
  db.follows[follower.id] = db.follows[follower.id] || [];
  const idx = db.follows[follower.id].indexOf(target.id);
  if(idx === -1){
    db.follows[follower.id].push(target.id);
    target.followers++;
  } else {
    db.follows[follower.id].splice(idx,1);
    target.followers = Math.max(0, target.followers - 1);
  }
  saveDB(db);
}

document.addEventListener('DOMContentLoaded', ()=>{
  const path = location.pathname.split('/').pop() || 'index.html';
  renderChrome(path);
});
