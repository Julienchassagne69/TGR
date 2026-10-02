/* ============ Ambiance de Noël (page d'accueil) ============
   S'active tout seul entre NOEL_START et NOEL_END (inclus). Pour tester à
   n'importe quelle date : ajouter ?noel=1 à l'adresse (?noel=0 pour forcer
   l'arrêt). Rien n'est mémorisé : sans le paramètre, on revient au
   calendrier.

   - flocons qui tombent sur toute la page (canvas fixe, ne bloque aucun clic)
   - neige accumulée en bas de l'écran
   - bandeau "Joyeux Noël" en haut de la page
   Animation coupée si le visiteur a demandé de réduire les animations. */
const NOEL_START = new Date('2026-12-20T00:00:00+01:00');
const NOEL_END   = new Date('2026-12-27T00:00:00+01:00'); // exclu : fin le 26 au soir

(function(){
  const param = new URLSearchParams(location.search).get('noel');
  const now = new Date();
  const active = param==='1' || (param!=='0' && now >= NOEL_START && now < NOEL_END);
  if(!active) return;

  const style = document.createElement('style');
  style.textContent = `
    .noel-snow{position:fixed;inset:0;pointer-events:none;z-index:90}
    .noel-ground{position:fixed;left:0;right:0;bottom:0;height:46px;pointer-events:none;z-index:89;
      background:radial-gradient(60% 120% at 12% 100%,#fff 0 40%,transparent 41%),
                 radial-gradient(45% 110% at 42% 100%,#f4f8ff 0 42%,transparent 43%),
                 radial-gradient(55% 130% at 74% 100%,#fff 0 40%,transparent 41%),
                 radial-gradient(40% 100% at 98% 100%,#eef4ff 0 45%,transparent 46%);
      filter:drop-shadow(0 -4px 10px rgba(200,225,255,.35));opacity:.92}
    .noel-banner{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin:18px 0 0;padding:12px 18px;
      border-radius:var(--radius);border:1px solid rgba(255,255,255,.25);text-align:center;
      background:linear-gradient(90deg,rgba(196,30,58,.55),rgba(44,28,71,.85) 50%,rgba(22,128,72,.55));
      box-shadow:0 0 30px rgba(255,255,255,.08)}
    .noel-banner b{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:1.6rem;letter-spacing:.04em;color:#fff}
    .noel-banner span{color:var(--text-dim);font-size:.88rem}
    .noel-lights{position:fixed;top:0;left:0;right:0;height:14px;pointer-events:none;z-index:101;display:flex;justify-content:space-around}
    .noel-lights i{width:9px;height:13px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;margin-top:3px;animation:noelBlink 1.6s infinite}
    .noel-lights i:nth-child(4n+1){background:#ff3b3b;box-shadow:0 0 10px #ff3b3b}
    .noel-lights i:nth-child(4n+2){background:var(--gold);box-shadow:0 0 10px var(--gold);animation-delay:.4s}
    .noel-lights i:nth-child(4n+3){background:#3ddc84;box-shadow:0 0 10px #3ddc84;animation-delay:.8s}
    .noel-lights i:nth-child(4n){background:var(--cyan);box-shadow:0 0 10px var(--cyan);animation-delay:1.2s}
    @keyframes noelBlink{50%{opacity:.35;box-shadow:none}}
    @media (prefers-reduced-motion: reduce){.noel-lights i{animation:none}}
  `;
  document.head.appendChild(style);

  function mount(){
    const lights = document.createElement('div');
    lights.className = 'noel-lights';
    lights.innerHTML = '<i></i>'.repeat(Math.ceil(window.innerWidth / 46));
    document.body.appendChild(lights);

    const ground = document.createElement('div');
    ground.className = 'noel-ground';
    document.body.appendChild(ground);

    const main = document.querySelector('main');
    if(main){
      const banner = document.createElement('div');
      banner.className = 'noel-banner';
      banner.innerHTML = `<b>🎄 Joyeux Noël, la communauté ! 🎁</b><span>Toute l'équipe The Gamer Rich te souhaite de belles fêtes.</span>`;
      main.prepend(banner);
    }

    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    startSnow();
  }

  function startSnow(){
    const canvas = document.createElement('canvas');
    canvas.className = 'noel-snow';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, flakes = [];

    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Densité proportionnelle à la surface : léger sur téléphone.
      const target = Math.round(Math.min(160, w * h / 9000));
      while(flakes.length < target) flakes.push(newFlake(true));
      flakes.length = target;
    }
    function newFlake(anywhere){
      const r = 1 + Math.random() * 3.2;
      return {
        x: Math.random() * w, y: anywhere ? Math.random() * h : -10,
        r, vy: .35 + r * .28, drift: Math.random() * Math.PI * 2,
        glyph: r > 3.4 - .25 && Math.random() < .5, // quelques gros flocons ❄
        alpha: .55 + Math.random() * .45,
      };
    }
    let last = performance.now();
    function frame(t){
      const dt = Math.min(50, t - last) / 16.7; last = t;
      ctx.clearRect(0, 0, w, h);
      for(const f of flakes){
        f.drift += .012 * dt;
        f.y += f.vy * dt;
        f.x += Math.sin(f.drift) * .45 * dt;
        if(f.y > h + 10){ Object.assign(f, newFlake(false)); }
        if(f.x > w + 10) f.x = -10; else if(f.x < -10) f.x = w + 10;
        ctx.globalAlpha = f.alpha;
        if(f.glyph){
          ctx.font = `${f.r * 5}px sans-serif`;
          ctx.fillStyle = '#fff';
          ctx.fillText('❄', f.x, f.y);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
