/* ============ Ambiances saisonnières (page d'inscription) ============
   Chaque thème s'active tout seul entre ses dates start (inclus) et end
   (exclu). Pour tester à n'importe quelle date : ?theme=noel ou
   ?theme=halloween dans l'adresse (?theme=off pour tout couper). Rien n'est
   mémorisé : sans le paramètre, on revient au calendrier.

   Chaque thème = des particules animées (canvas fixe, ne bloque aucun clic),
   un décor fixe (sol, guirlande, toiles…) et un bandeau en haut de la page.
   Particules coupées si le visiteur a demandé de réduire les animations. */
const SEASON_THEMES = {
  halloween: {
    // Jusqu'à l'ouverture de la plateforme : minuit pile, nuit d'Halloween.
    start: new Date('2026-10-24T00:00:00+02:00'),
    end:   new Date('2026-11-01T00:00:00+01:00'),
    banner: `<b>🎃 Joyeux Halloween ! 👻</b><span>La plateforme ouvre à minuit pile, la nuit d'Halloween… si tu l'oses.</span>`,
    css: `
      .theme-banner{background:linear-gradient(90deg,rgba(255,122,61,.6),rgba(24,10,36,.9) 50%,rgba(122,40,200,.6));border-color:rgba(255,122,61,.55);box-shadow:0 0 34px rgba(255,122,61,.25)}
      .theme-banner b{color:#ffb15c;text-shadow:0 0 14px rgba(255,122,61,.7)}
      .theme-ground{height:62px;background:linear-gradient(0deg,#0b0613 0 45%,transparent);display:flex;align-items:flex-end;justify-content:space-around;font-size:38px;line-height:1;padding-bottom:4px}
      .theme-ground span{filter:drop-shadow(0 0 12px rgba(255,140,30,.85));animation:hwGlow 2.4s ease-in-out infinite}
      .theme-ground span:nth-child(2n){animation-delay:1.1s;font-size:30px}
      @keyframes hwGlow{50%{filter:drop-shadow(0 0 4px rgba(255,140,30,.4))}}
      .theme-web{position:fixed;top:0;width:150px;height:150px;pointer-events:none;z-index:91;opacity:.55}
      .theme-web.l{left:0}.theme-web.r{right:0;transform:scaleX(-1)}
      body.theme-halloween .waitlist{background-blend-mode:multiply;background-color:#2a0f1f}
      @media (prefers-reduced-motion: reduce){.theme-ground span{animation:none}}
      @media(max-width:520px){.theme-web{width:96px;height:96px}.theme-ground{font-size:28px}}
    `,
    decor(){
      const w = Math.max(5, Math.round(window.innerWidth / 120));
      const ground = el('div', 'theme-ground', Array.from({ length:w }, (_, i)=> `<span>${i%3===1 ? '🕯️' : '🎃'}</span>`).join(''));
      // Toile d'araignée en SVG (rayons + spirale), posée dans les coins hauts.
      const web = `<svg viewBox="0 0 150 150" fill="none" stroke="#e8e0f0" stroke-width="1">
        ${[0,15,30,45,60,75,90].map(a=>{ const r = a*Math.PI/180; return `<line x1="0" y1="0" x2="${150*Math.cos(r)}" y2="${150*Math.sin(r)}"/>`; }).join('')}
        ${[28,52,78,104,130].map(d=>`<path d="${[0,15,30,45,60,75,90].map((a,i)=>{ const r=a*Math.PI/180; return `${i?'Q':'M'}${i? `${(d-6)*Math.cos(r-.13)} ${(d-6)*Math.sin(r-.13)} ` : ''}${d*Math.cos(r)} ${d*Math.sin(r)}`; }).join(' ')}"/>`).join('')}
        <line x1="104" y1="0" x2="104" y2="46" stroke-width=".8"/><circle cx="104" cy="50" r="4" fill="#e8e0f0"/>
      </svg>`;
      return [ground, el('div', 'theme-web l', web), el('div', 'theme-web r', web)];
    },
    particles: {
      density: 26000,
      spawn(w, h, anywhere){
        const roll = Math.random();
        if(roll < .35){ // chauve-souris qui traverse l'écran en battant des ailes
          const ltr = Math.random() < .5;
          return { kind:'bat', x: anywhere ? Math.random()*w : (ltr ? -40 : w+40), y: 30 + Math.random()*h*.6,
            vx: (ltr?1:-1)*(1.2+Math.random()*1.4), vy: 0, size: 18+Math.random()*16, phase: Math.random()*6, alpha:.9 };
        }
        if(roll < .45){ // fantôme qui monte doucement
          return { kind:'ghost', x: Math.random()*w, y: anywhere ? Math.random()*h : h+40,
            vx: 0, vy: -(.3+Math.random()*.4), size: 22+Math.random()*14, phase: Math.random()*6, alpha:.45 };
        }
        // braises orange qui s'élèvent
        return { kind:'ember', x: Math.random()*w, y: anywhere ? Math.random()*h : h+10,
          vx: 0, vy: -(.4+Math.random()*.9), size: 1+Math.random()*2.2, phase: Math.random()*6, alpha:.5+Math.random()*.5 };
      },
      step(p, dt, w, h){
        p.phase += .05*dt;
        p.x += (p.vx + (p.kind==='bat' ? 0 : Math.sin(p.phase)*.35)) * dt;
        p.y += (p.vy + (p.kind==='bat' ? Math.sin(p.phase*1.3)*.6 : 0)) * dt;
        return p.x > -60 && p.x < w+60 && p.y > -60 && p.y < h+60;
      },
      draw(ctx, p){
        ctx.globalAlpha = p.alpha;
        if(p.kind==='ember'){
          ctx.fillStyle = '#ff9a3d';
          ctx.shadowColor = '#ff7a1a'; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 0;
          return;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        if(p.kind==='bat'){
          ctx.scale(p.vx > 0 ? -1 : 1, .55 + Math.abs(Math.sin(p.phase*3))*.45); // battement d'ailes
        }
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(p.kind==='bat' ? '🦇' : '👻', 0, 0);
        ctx.restore();
      },
    },
  },

  noel: {
    start: new Date('2026-12-20T00:00:00+01:00'),
    end:   new Date('2026-12-27T00:00:00+01:00'),
    banner: `<b>🎄 Joyeux Noël, la communauté ! 🎁</b><span>Toute l'équipe The Gamer Rich te souhaite de belles fêtes.</span>`,
    css: `
      .theme-banner{background:linear-gradient(90deg,rgba(196,30,58,.55),rgba(44,28,71,.85) 50%,rgba(22,128,72,.55))}
      .theme-ground{height:46px;
        background:radial-gradient(60% 120% at 12% 100%,#fff 0 40%,transparent 41%),
                   radial-gradient(45% 110% at 42% 100%,#f4f8ff 0 42%,transparent 43%),
                   radial-gradient(55% 130% at 74% 100%,#fff 0 40%,transparent 41%),
                   radial-gradient(40% 100% at 98% 100%,#eef4ff 0 45%,transparent 46%);
        filter:drop-shadow(0 -4px 10px rgba(200,225,255,.35));opacity:.92}
      .theme-lights{position:fixed;top:0;left:0;right:0;height:14px;pointer-events:none;z-index:101;display:flex;justify-content:space-around}
      .theme-lights i{width:9px;height:13px;border-radius:50%/40% 40% 60% 60%;margin-top:3px;animation:xmBlink 1.6s infinite}
      .theme-lights i:nth-child(4n+1){background:#ff3b3b;box-shadow:0 0 10px #ff3b3b}
      .theme-lights i:nth-child(4n+2){background:var(--gold);box-shadow:0 0 10px var(--gold);animation-delay:.4s}
      .theme-lights i:nth-child(4n+3){background:#3ddc84;box-shadow:0 0 10px #3ddc84;animation-delay:.8s}
      .theme-lights i:nth-child(4n){background:var(--cyan);box-shadow:0 0 10px var(--cyan);animation-delay:1.2s}
      @keyframes xmBlink{50%{opacity:.35;box-shadow:none}}
      @media (prefers-reduced-motion: reduce){.theme-lights i{animation:none}}
    `,
    decor(){
      return [
        el('div', 'theme-ground', ''),
        el('div', 'theme-lights', '<i></i>'.repeat(Math.ceil(window.innerWidth / 46))),
      ];
    },
    particles: {
      density: 9000,
      spawn(w, h, anywhere){
        const r = 1 + Math.random()*3.2;
        return { x: Math.random()*w, y: anywhere ? Math.random()*h : -10, r, vy: .35 + r*.28,
          phase: Math.random()*6, glyph: r > 3.15 && Math.random() < .5, alpha: .55 + Math.random()*.45 };
      },
      step(p, dt, w, h){
        p.phase += .012*dt;
        p.y += p.vy*dt;
        p.x += Math.sin(p.phase)*.45*dt;
        if(p.x > w+10) p.x = -10; else if(p.x < -10) p.x = w+10;
        return p.y < h+10;
      },
      draw(ctx, p){
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#fff';
        if(p.glyph){ ctx.font = `${p.r*5}px sans-serif`; ctx.fillText('❄', p.x, p.y); return; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
      },
    },
  },
};

function el(tag, cls, html){
  const n = document.createElement(tag);
  n.className = cls;
  n.innerHTML = html;
  return n;
}

(function(){
  const param = new URLSearchParams(location.search).get('theme');
  if(param==='off') return;
  const now = new Date();
  const name = SEASON_THEMES[param] ? param
    : Object.keys(SEASON_THEMES).find(k=> now >= SEASON_THEMES[k].start && now < SEASON_THEMES[k].end);
  if(!name) return;
  const theme = SEASON_THEMES[name];

  const style = document.createElement('style');
  style.textContent = `
    .theme-canvas{position:fixed;inset:0;pointer-events:none;z-index:90}
    .theme-ground{position:fixed;left:0;right:0;bottom:0;pointer-events:none;z-index:89}
    .theme-banner{display:flex;align-items:center;justify-content:center;gap:4px 12px;flex-wrap:wrap;margin:0 0 22px;padding:12px 18px;
      border-radius:var(--radius);border:1px solid rgba(255,255,255,.25);text-align:center;backdrop-filter:blur(8px)}
    .theme-banner b{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:1.6rem;letter-spacing:.04em;color:#fff}
    .theme-banner span{color:var(--text-dim);font-size:.88rem}
  ` + theme.css;
  document.head.appendChild(style);

  function mount(){
    document.body.classList.add('theme-' + name);
    theme.decor().forEach(n=> document.body.appendChild(n));
    const host = document.querySelector('.waitlist-card') || document.querySelector('main');
    if(host) host.prepend(el('div', 'theme-banner', theme.banner));
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    animate(theme.particles);
  }

  function animate(P){
    const canvas = el('canvas', 'theme-canvas', '');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, list = [];
    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w*dpr; canvas.height = h*dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Densité proportionnelle à la surface : léger sur téléphone.
      const target = Math.round(Math.min(160, w*h / P.density));
      while(list.length < target) list.push(P.spawn(w, h, true));
      list.length = target;
    }
    let last = performance.now();
    function frame(t){
      const dt = Math.min(50, t - last) / 16.7; last = t;
      ctx.clearRect(0, 0, w, h);
      for(let i=0; i<list.length; i++){
        if(!P.step(list[i], dt, w, h)) list[i] = P.spawn(w, h, false);
        P.draw(ctx, list[i]);
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
