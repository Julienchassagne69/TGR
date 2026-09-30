/* ============ THE GAMER RICH — mock data layer ============
   Prototype front-end uniquement : tout est stocké dans localStorage.
   Aucune donnée n'est envoyée à un serveur ; à remplacer par de vraies
   API (auth, paiement, base de données) lors du développement réel. */

const DB_KEY = 'tgr_db_v18';
const SESSION_KEY = 'tgr_session';

const MAX_VIDEO_SECONDS = 45;
const RECOMMENDED_VIDEO_FORMAT = 'Format vertical 9:16 (comme un Reel), 1080×1920, MP4/H.264';
const LIKES_PER_GOLD_STAR = 100;
const CGU_VERSION = '1.0'; // à incrémenter si le texte des CGU/règlement change — redemande alors l'acceptation

// ============ Personnages ============
// Chaque joueur choisit librement l'un de ces personnages pré-dessinés comme
// avatar — plus de dressing 3D pièce par pièce, un visuel complet et déjà
// stylé par personnage, chacun avec son propre univers. La liste grandit au
// fur et à mesure (25 personnages prévus au total) ; le picker s'adapte
// automatiquement au nombre d'entrées présentes ici.
const CHARACTERS = [
  {
    id:'king',
    name:'King TGR',
    img:'img/characters/01-king.png',
    tagline:'Anonyme. Invaincu. Intouchable.',
    universe:"Le King ne montre jamais son visage — masque et lunettes, toujours. Streetwear noir et violet, couronne cousue partout : casquette, manche, poche cargo. Son univers, ce sont les nuits de Vice City et les défis à gros enjeux. Il ne parle pas : son palmarès parle pour lui.",
  },
  {
    id:'aloha',
    name:'Aloha',
    img:'img/characters/02-aloha.png',
    tagline:'Vacances éternelles, zéro stress.',
    universe:"Aloha ne connaît qu'une vitesse : cool. Débarqué à Vice City avec un sac à dos et une chemise à fleurs, il traîne sur la plage, chill entre deux défis, toujours partant avec le sourire. Son univers : le soleil, les palmiers, et l'esprit vacances H24.",
  },
  {
    id:'titan',
    name:'Titan',
    img:'img/characters/03-titan.png',
    tagline:'La force ne négocie pas.',
    universe:"Titan s'entraîne à l'aube et ne recule devant aucun défi physique. Treillis militaire, silhouette de colosse, un seul mot d'ordre : dépasser ses limites. Son univers, c'est la discipline pure — le camp d'entraînement au bord de Vice City, entre muscu et tactique.",
  },
  {
    id:'doc',
    name:'Doc',
    img:'img/characters/04-doc.png',
    tagline:'Diagnostic imparable, style imparable.',
    universe:"Doc soigne le jour, domine les classements la nuit. Entre deux gardes à l'hôpital de Vice City, il trouve toujours le temps de relever un défi — stéthoscope autour du cou, sang-froid à toute épreuve. Son univers : la précision, appliquée à tout ce qu'il touche.",
  },
  {
    id:'skull-or',
    name:'Skull d\'Or',
    img:'img/characters/05-skull-or.png',
    tagline:'Le visage disparaît, la légende reste.',
    universe:"Personne n'a jamais vu le visage derrière le masque doré. Skull d'Or apparaît, écrase un défi, repart sans un mot. Capuche noire, éclats d'or partout — son univers, c'est la nuit, le mystère, et une réputation qui grandit sans qu'il ait besoin de parler.",
  },
  {
    id:'neo-pink',
    name:'Neo Pink',
    img:'img/characters/06-neo-pink.png',
    tagline:'Rose, forte, imprévisible.',
    universe:"Casque vissé sur les oreilles, cheveux roses au vent, Neo Pink vit au rythme de sa propre bande-son. Crop top, cargo tagué, gants sans doigts — elle fonce, elle filme, elle enchaîne les défis sans jamais lâcher le sourire. Son univers : les nuits électro de Vice City, néons roses à perte de vue.",
  },
  {
    id:'lion',
    name:'Lion',
    img:'img/characters/07-lion.png',
    tagline:'Chaque tatouage raconte une victoire.',
    universe:"Lion porte son histoire sur la peau — lion, croix, roses, une manche entière de souvenirs. Chaîne en or, dégaine assurée, il ne recule devant rien. Son univers : les rings de rue, les paris entre potes, la loyauté avant tout.",
  },
  {
    id:'candy',
    name:'Candy',
    img:'img/characters/08-candy.png',
    tagline:'Douce en apparence, redoutable en défi.',
    universe:"Couettes bicolores, hoodie lapin, Candy a l'air tout droit sortie d'un jeu vidéo pastel — et c'est un peu le cas. Son univers est fait de couleurs bonbon et de private jokes, mais dès qu'un défi commence, elle ne fait plus semblant : elle joue pour gagner.",
  },
  {
    id:'voxella',
    name:'Voxella',
    img:'img/characters/09-voxella.png',
    tagline:'Un monde en cubes, un swag sans limites.',
    universe:"Voxella vient d'un autre monde — tout en blocs, en pixels et en couleurs franches. Elle a traversé l'écran pour rejoindre The Gamer Rich, casquette vissée, chaîne en or, toujours partante pour un défi. Son univers : les mondes voxel, la culture sandbox, le crafting jusqu'au bout de la nuit.",
  },
  {
    id:'kubik',
    name:'Kubik',
    img:'img/characters/10-kubik.png',
    tagline:'Construit bloc par bloc, jamais par hasard.',
    universe:"Kubik débarque du même monde en cubes que Voxella — lunettes siglées, veste violette, toujours un pouce levé. Il voit chaque défi comme une construction à assembler pièce par pièce. Son univers : les mondes voxel, la logique du craft, l'obsession du détail bien placé.",
  },
  {
    id:'patron',
    name:'Le Patron',
    img:'img/characters/11-patron.png',
    tagline:'Costume noir, sang-froid absolu.',
    universe:"Pas de logo tape-à-l'œil, pas besoin. Le Patron impose le respect rien qu'en entrant dans une pièce. Costume sur-mesure, montre en or, il traite les défis comme des négociations à ne surtout pas perdre. Son univers : les toits de Vice City, les deals en coulisses, le pouvoir tranquille.",
  },
  {
    id:'phantom',
    name:'Phantom',
    img:'img/characters/12-phantom.png',
    tagline:'Une ombre qui brille.',
    universe:"Phantom ne montre jamais son vrai visage — juste un masque qui s'illumine de violet dans le noir. Techwear intégral, capuche vissée, il se déplace comme une ombre dans les défis nocturnes. Son univers : la face cachée de Vice City, les ruelles électriques, l'anonymat total.",
  },
  {
    id:'panthere',
    name:'Panthère',
    img:'img/characters/13-panthere.png',
    tagline:"Silhouette d'acier, regard qui ne cille pas.",
    universe:"Panthère s'entraîne comme elle vit : à fond. Crop top noir, bijoux en or, cargo taillé pour bouger — elle enchaîne les défis physiques sans jamais perdre son style. Son univers : les salles de sport de Vice City, la discipline, la confiance totale en soi.",
  },
  {
    id:'robocrown',
    name:'Robocrown',
    img:'img/characters/14-robocrown.png',
    tagline:'Humain hier, machine ce soir.',
    universe:"Robocrown a troqué la rue contre une armure entière — combinaison intégrale, circuits bleus, visière fermée. Personne ne sait qui se cache dessous, et ça n'a pas d'importance : sur le terrain, seule la performance compte. Son univers : la frontière entre le joueur et la machine, la technologie poussée à l'extrême.",
  },
  {
    id:'panda',
    name:'Panda',
    img:'img/characters/15-panda.png',
    tagline:'Zen en apparence, féroce en défi.',
    universe:"Personne ne sait pourquoi il y a un panda à Vice City — et personne ne pose la question. Casquette, lunettes noires, dégaine assurée : Panda roule sa bosse dans le milieu du gaming comme si c'était la jungle. Son univers : l'absurde assumé, le swag jusqu'au bout des pattes.",
  },
  {
    id:'riot',
    name:'Riot',
    img:'img/characters/18-riot.png',
    tagline:'Cheveux électriques, attitude sans filtre.',
    universe:"Riot ne demande jamais la permission. Crâne à moitié rasé, tatouages qui racontent sa liberté, flammes vertes sur le cargo — elle fonce dans chaque défi comme dans une fosse de concert. Son univers : les warehouse parties de Vice City, le bruit, la rébellion assumée.",
  },
  {
    id:'glow',
    name:'Glow',
    img:'img/characters/19-glow.png',
    tagline:'Trop de style ne suffit jamais.',
    universe:"Glow ne fait rien à moitié — fourrure rose, flammes sur le cargo, bijoux à chaque doigt. Il traverse les nuits de Vice City comme une entrée en scène permanente. Son univers : les clubs, les paillettes, l'extravagance comme mode de vie.",
  },
  {
    id:'prof',
    name:'Prof',
    img:'img/characters/20-prof.png',
    tagline:"L'innovation avant tout.",
    universe:"Prof passe ses nuits en laboratoire, à tester ce que personne d'autre n'ose imaginer. Blouse blanche, tablette sous le bras, badge « Recherche & Innovation » — il aborde chaque défi comme une expérience à documenter. Son univers : les labos de Vice City, la science au service du game.",
  },
  {
    id:'magnat',
    name:'Magnat',
    img:'img/characters/21-magnat.png',
    tagline:'Rien n\'est trop, tout est mérité.',
    universe:"Magnat porte l'or comme d'autres portent un t-shirt. Manteau doublé monogrammé, bagues à chaque doigt, il a construit un empire et compte bien l'exhiber. Son univers : les penthouses de Vice City, le luxe sans complexe, le pouvoir qui s'affiche.",
  },
  {
    id:'outlaw',
    name:'Outlaw',
    img:'img/characters/22-outlaw.png',
    tagline:'Les règles, très peu pour lui.',
    universe:"Outlaw n'a jamais suivi le mode d'emploi. Combinaison orange, menottes aux poignets, tatouages qui racontent un passé mouvementé — il a fait de la rébellion son identité. Son univers : les bas-fonds de Vice City, la ligne rouge, l'évasion permanente.",
  },
  {
    id:'brick',
    name:'Brick',
    img:'img/characters/23-brick.png',
    tagline:'Assemblé pièce par pièce, prêt à tout.',
    universe:"Brick vient d'un monde de briques — littéralement. Débarqué tout droit d'un univers de jouets, il garde son sourire figé et son swag intact, banane siglée « Gamer Rich » à la taille. Son univers : les mondes construction, le jeu à l'état pur, l'enfance qui ne meurt jamais.",
  },
  {
    id:'berserk',
    name:'Berserk',
    img:'img/characters/24-berserk.png',
    tagline:'La hache tranche, la légende reste.',
    universe:"Berserk débarque d'un tout autre âge — fourrures, tresses, hache de guerre gravée d'une couronne. Il affronte chaque défi comme une bataille à l'ancienne, sans détour ni excuse. Son univers : les terres du Nord, le code d'honneur, la force brute au service du clan.",
  },
  {
    id:'zorg',
    name:'Zorg',
    img:'img/characters/25-zorg.png',
    tagline:'Venu d\'ailleurs, ici pour gagner.',
    universe:"Personne ne sait vraiment d'où vient Zorg — juste qu'il a atterri à Vice City avec un bob et un sac à dos, prêt à jouer. Casque autour du cou, cargo bardé de poches, il observe les défis humains avec un mélange de curiosité et d'instinct de compétition. Son univers : l'inconnu, l'espace, la fascination pour ce petit monde bien étrange.",
  },
];
function getCharacter(id){ return CHARACTERS.find(c=>c.id===id) || CHARACTERS[0]; }

// ============ Fonds d'écran du personnage ============
// Optionnel — contrairement au personnage, aucun fond n'est sélectionné par
// défaut (backgroundId vaut ''). Les visuels de personnage sont détourés
// (fond transparent avec un léger halo), pensés pour se poser dessus.
const BACKGROUNDS = [
  { id:'rooftop-sunset', name:'Rooftop Sunset', img:'img/backgrounds/01-rooftop-sunset.jpg' },
  { id:'villa-sunset', name:'Villa Sunset', img:'img/backgrounds/02-villa-sunset.jpg' },
  { id:'lakeside-chill', name:'Lakeside Chill', img:'img/backgrounds/03-lakeside-chill.jpg' },
  { id:'vip-night', name:'VIP Night', img:'img/backgrounds/04-vip-night.jpg' },
];
function getBackground(id){ return BACKGROUNDS.find(b=>b.id===id) || null; }

const PROGRESSION = [
  { key:'mains-nues',     label:'Mains nues',        followers:0,        icon:'👊' },
  { key:'batte',          label:'Batte de baseball', followers:100,      icon:'🏏' },
  { key:'velo',           label:'Vélo',              followers:500,      icon:'🚲' },
  { key:'moto',           label:'Moto',              followers:1000,     icon:'🏍️' },
  { key:'voiture',        label:'Voiture',           followers:5000,     icon:'🚗' },
  { key:'voiture-luxe',   label:'Voiture de luxe',   followers:10000,    icon:'🏎️' },
  { key:'appartement',    label:'Appartement',       followers:25000,    icon:'🏢' },
  { key:'maison',         label:'Maison',            followers:50000,    icon:'🏠' },
  { key:'villa',          label:'Villa',             followers:100000,   icon:'🌴' },
  { key:'villa-luxe',     label:'Villa de luxe',     followers:250000,   icon:'🏛️' },
  { key:'yacht',          label:'Yacht',             followers:500000,   icon:'🛥️' },
  { key:'diamant',        label:'Diamant',           followers:1000001,  icon:'💎' },
  { key:'double-diamant', label:'Double Diamant',    followers:10000001, icon:'💎💎' },
];
// Illustration réelle de chaque statut (img/statuts/<key>.png), en plus de
// l'emoji `icon` — l'emoji reste seul utilisable dans les contextes texte
// pur (attribut title, <option>, notifications toast) qui ne peuvent pas
// afficher de balise <img>.
function statusIconHtml(key, size){
  size = size || 22;
  return `<img src="img/statuts/${key}.png" alt="" style="width:${size}px;height:${size}px;object-fit:contain;vertical-align:middle;display:inline-block" loading="lazy">`;
}

function getLevelForFollowers(followers){
  let level = PROGRESSION[0];
  for(const l of PROGRESSION){ if(followers >= l.followers) level = l; }
  return level;
}
function nextLevel(followers){
  return PROGRESSION.find(l => l.followers > followers) || null;
}
function levelRank(key){
  const i = PROGRESSION.findIndex(p=>p.key===key);
  return i===-1 ? 0 : i;
}

// Chaque palier de progression sert aussi de "catégorie" de défi : les participants
// d'une même catégorie ont un niveau proche, donc des chances comparables. La
// récompense minimale augmente avec la catégorie (mains nues → diamant). Il n'y a
// plus de coût de lancement fixe : le créateur paie exactement le montant de la
// récompense qu'il choisit, la plateforme en prélevant 7% (cf. PLATFORM_FEE_RATE).
const PLATFORM_FEE_RATE = 0.07;
const TIER_CONFIG = {};
(function buildTierConfig(){
  const yachtIdx = PROGRESSION.findIndex(p=>p.key==='yacht');
  const fixedAbove = { diamant:2000, 'double-diamant':3000 };
  PROGRESSION.forEach((p,i)=>{
    let minReward;
    if(fixedAbove[p.key]) minReward = fixedAbove[p.key];
    else{
      const ratio = i / yachtIdx;
      minReward = Math.round((50 + (1000-50)*ratio)/10)*10;
    }
    TIER_CONFIG[p.key] = { key:p.key, label:p.label, icon:p.icon, minLevel:p.key, minReward };
  });
})();

// Part des Gold Stars reversée au créateur d'un défi (uniquement pour les défis
// créés par des joueurs statut Voiture de luxe et plus, pas par les marques).
const CREATOR_SHARE_BY_TIER = { 'voiture-luxe':0.05, appartement:0.10, maison:0.15, villa:0.20, 'villa-luxe':0.35, yacht:0.55, diamant:0.75, 'double-diamant':0.95 };
const GOLD_STAR_PRICE_EUR = 0.99;

// Les marques peuvent toujours lancer des défis (c'est leur rôle sur la
// plateforme). Côté joueurs, seuls les statuts Voiture de luxe et plus peuvent
// lancer un défi à leur communauté — en dessous, la communauté est jugée trop
// petite pour garantir une compétition significative. Les défis ne se lancent
// jamais entre deux joueurs en direct (pas d'arbitre possible) : uniquement un
// créateur (marque ou joueur statut suffisant) vers sa communauté ou le monde entier.
function canLaunchChallenges(user){
  if(!user) return false;
  if(user.accountType==='brand') return true;
  return levelRank(user.level) >= levelRank('voiture-luxe');
}

function canParticipate(db, user, challenge){
  if(!user) return false;
  const tg = challenge.targeting || { mode:'global' };
  const tier = TIER_CONFIG[challenge.tier] || TIER_CONFIG['mains-nues'];
  if(levelRank(user.level) < levelRank(tier.minLevel)) return false;
  if(tg.mode==='countries') return (tg.countries||[]).includes(user.country);
  if(tg.mode==='community') return user.id===tg.communityOwnerId || isFollowing(db, user.id, tg.communityOwnerId);
  return true;
}
function eligibilityReason(db, user, challenge){
  if(!user) return 'Connecte-toi pour participer.';
  const tg = challenge.targeting || { mode:'global' };
  const tier = TIER_CONFIG[challenge.tier] || TIER_CONFIG['mains-nues'];
  if(levelRank(user.level) < levelRank(tier.minLevel)){
    const req = PROGRESSION.find(p=>p.key===tier.minLevel);
    return `Réservé aux joueurs statut ${req.icon} ${req.label} et plus.`;
  }
  if(tg.mode==='countries') return `Réservé aux joueurs de : ${(tg.countries||[]).join(', ')}.`;
  if(tg.mode==='community'){
    const owner = db.users.find(u=>u.id===tg.communityOwnerId);
    return `Réservé à la communauté de ${owner? owner.display : 'ce joueur'} (abonne-toi pour participer).`;
  }
  return '';
}

const CATEGORIES = ['Participation à un défi','Cascade','Poursuite','Record','Découverte','Moment drôle','Astuce'];

const COUNTRIES = [
  { code:'FR', label:'France' }, { code:'BE', label:'Belgique' }, { code:'CH', label:'Suisse' },
  { code:'GB', label:'Royaume-Uni' }, { code:'DE', label:'Allemagne' }, { code:'ES', label:'Espagne' },
  { code:'US', label:'États-Unis' }, { code:'CA', label:'Canada' }, { code:'BR', label:'Brésil' },
  { code:'CN', label:'Chine' }, { code:'RU', label:'Russie' }, { code:'IN', label:'Inde' },
  { code:'JP', label:'Japon' }, { code:'AU', label:'Australie' }, { code:'MA', label:'Maroc' },
];

// 1 Gold Star = 0,99 € pièce, sans palier dégressif.
const GOLD_PACKS = [10, 50, 150, 500].map(stars => ({
  id:'pack-'+stars, stars, price: (stars*GOLD_STAR_PRICE_EUR).toLocaleString('fr-FR',{minimumFractionDigits:2}) + ' €',
}));

function scoreOf(video, submission){
  return (video ? video.likes : 0) + (submission ? submission.goldStars : 0) * LIKES_PER_GOLD_STAR;
}

function spendGoldStarOnSubmission(db, user, sub, challenge){
  if(!user || user.goldStars < 1) return false;
  user.goldStars -= 1;
  sub.goldStars = (sub.goldStars||0) + 1;
  db.goldTx.push({ userId:user.id, date:new Date().toISOString().slice(0,10), type:'Attribution', detail:`Soutien à une participation — ${challenge.title}`, stars:-1 });

  const share = CREATOR_SHARE_BY_TIER[challenge.tier];
  if(share && challenge.creatorType==='player'){
    const creator = db.users.find(u=>u.id===challenge.creatorId);
    if(creator && creator.id!==user.id){
      const amount = Math.round(GOLD_STAR_PRICE_EUR * share * 100)/100;
      creator.earnings = Math.round(((creator.earnings||0) + amount)*100)/100;
      db.adminLog.push({ admin:'Système', action:'Commission créateur', detail:`${creator.display} +${amount.toFixed(2)}€ (${Math.round(share*100)}% sur 1 Gold Star — ${challenge.title})`, date:new Date().toISOString().slice(0,16).replace('T',' ') });
    }
  }
  saveDB(db);
  return true;
}

function now(){ return new Date('2026-09-18T15:00:00'); }
function inMinutes(m){ const d = now(); d.setMinutes(d.getMinutes()+m); return d.toISOString(); }
function inHours(h){ const d = now(); d.setHours(d.getHours()+h); return d.toISOString(); }
function inDays(d0){ const d = now(); d.setDate(d.getDate()+d0); return d.toISOString(); }

/* ============ Simulation à grande échelle (~200 comptes) ============
   Génère des comptes de tous statuts, des défis actifs/à venir/terminés,
   des vidéos, des commentaires et un historique Gold Stars, pour auditer
   le rendu des pages sous une charge de données réaliste. PRNG seedé
   (mulberry32) : résultat reproductible à chaque régénération du seed. */
function mulberry32(seed){
  return function(){
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function pick(rand, arr){ return arr[Math.floor(rand()*arr.length)]; }
function pickN(rand, arr, n){
  const pool = arr.slice(); const out = [];
  n = Math.min(n, pool.length);
  for(let i=0;i<n;i++){ out.push(pool.splice(Math.floor(rand()*pool.length),1)[0]); }
  return out;
}
function randInt(rand, min, max){ return min + Math.floor(rand()*(max-min+1)); }

const SIM_NAME_PREFIX = ['Neon','Vice','Turbo','Midnight','Chrome','Velvet','Shadow','Blaze','Static','Rogue','Electric','Crimson','Phantom','Rapid','Savage','Golden','Silver','Cosmic','Rebel','Vortex','Nitro','Solar','Lunar','Toxic','Frost','Ember','Cobalt','Obsidian','Radiant','Feral'];
const SIM_NAME_SUFFIX = ['Rider','Drift','Runner','King','Queen','Wolf','Fox','Storm','Ghost','Blade','Racer','Hawk','Viper','Panther','Falcon','Nova','Comet','Titan','Spectre','Hustler','Maverick','Cyclone','Diesel','Chaser','Prowler','Bandit','Outlaw','Vandal','Reaper','Siren'];
const SIM_BIOS = [
  "Cascades & poursuites dans Vice City.", "Tutos drift chaque semaine.",
  "Découvertes de map & easter eggs.", "Moments drôles garantis.",
  "Records de vitesse en cours de validation.", "Ici pour le fun, pas pour la triche.",
  "Fan de courses de nuit sur le front de mer.", "Spécialiste braquages chronométrés.",
  "Je poste tous les soirs après le boulot.", "Nouveau sur la plateforme, soyez indulgents.",
  "Ex-pilote pro, reconverti en créateur de contenu.", "Ambiance néon et pneus qui crissent.",
  "Toujours partant pour un défi.", "Abonnez-vous pour du contenu quotidien.",
  "Ici pour grimper les statuts.", "Cascadeur amateur, professionnel du style.",
];
const SIM_VIDEO_TITLES = {
  'Cascade': ["Saut impossible depuis le pont","Cascade en moto, sans casque","Chute contrôlée depuis le parking","Backflip en voiture volée","Saut de la grue du chantier"],
  'Poursuite': ["Poursuite avec 3 voitures de police","Évasion par les ruelles","Course-poursuite sur l'autoroute","Semé la police en 20 secondes","Poursuite en hélicoptère"],
  'Record': ["Record du tour sur le circuit","Chrono le plus rapide du front de mer","Nouveau record perso","0 à 200 en un temps record","Record battu sur l'autoroute côtière"],
  'Découverte': ["Easter egg caché sous le pont","Glitch découvert dans le parking souterrain","Secret de la map jamais vu","Passage secret du centre-ville","Référence cachée trouvée par hasard"],
  'Moment drôle': ["Le PNJ qui bug en boucle 😂","Fail total devant tout le monde","La police qui se prend un lampadaire","Moment awkward avec un PNJ","Bug hilarant du jour"],
  'Astuce': ["Astuce pour drifter parfaitement","Comment garder le contrôle en pleine vitesse","Le raccourci que personne ne connaît","Technique pour semer la police","Réglages optimaux pour le drift"],
  'Participation à un défi': ["Ma tentative pour le défi","Run gagnant pour le défi du jour","Participation officielle au défi","Meilleur essai pour ce défi","Run chronométré pour le défi"],
};
const SIM_CHALLENGE_TITLES = [
  "Cascade Éclair","Poursuite Express","Drift Chrono","Record de Vitesse","Braquage Chronométré",
  "Sprint Néon","Nuit Blanche à Vice City","Chasse au Trésor Urbain","Duel des Ruelles","Rallye Côtier",
  "Show Off Motorisé","Défi du Front de Mer","Grand Prix Illégal","Mission Impossible","Escapade Nocturne",
  "Chrono du Centre-Ville","Fuite Parfaite","Style ou Rien","Run du Siècle","Cascade Suprême",
];
const SIM_CHALLENGE_DESC = [
  "Le meilleur clip en 45 secondes gagne, jugé sur le style et la maîtrise.",
  "Défi chronométré : le temps le plus rapide décroche la récompense.",
  "Montre ta meilleure performance, montage interdit.",
  "Le run le plus propre et le plus stylé sera récompensé.",
  "Ouvert à tous ceux qui respectent les critères du palier.",
];
const SIM_VENUES = ["Studio The Gamer Rich — Paris","Arena Vice City — Los Angeles","Salle Néon — Miami","Studio Central — Londres"];
const SIM_BRANDS = [
  { name:'Nexdrift', logo:'img/logos/nexdrift.png', bio:'Technologie de drift et de tuning nouvelle génération.', slogan:'Glisse dans le futur.', instagram:'https://instagram.com/nexdrift', website:'https://nexdrift.com' },
  { name:'Dravolt', logo:'img/logos/dravolt.png', bio:'Boisson énergisante électrique, édition compétition.', slogan:'Charge ton instinct.', instagram:'https://instagram.com/dravolt', website:'https://dravolt.com' },
  { name:'Sonaryx', logo:'img/logos/sonaryx.png', bio:'Son immersif pour tes lives et tes cascades.', slogan:'Feel every wave.', instagram:'https://instagram.com/sonaryx', website:'https://sonaryx.com' },
  { name:'Quantevra', logo:'img/logos/quantevra.png', bio:'Banque digitale nouvelle génération.', slogan:'Ta valeur, amplifiée.', instagram:'https://instagram.com/quantevra', website:'https://quantevra.com' },
  { name:'Aeroviq', logo:'img/logos/aeroviq.png', bio:'Équipement aérien et vitesse extrême.', slogan:'Fly beyond limits.', instagram:'https://instagram.com/aeroviq', website:'https://aeroviq.com' },
  { name:'Pixelora', logo:'img/logos/pixelora.png', bio:'Matériel gaming et streaming créatif.', slogan:'Play in color.', instagram:'https://instagram.com/pixelora', website:'https://pixelora.com' },
  { name:'Zynforge', logo:'img/logos/zynforge.png', bio:'Forge de pièces automobiles sur-mesure.', slogan:'Built to dominate.', instagram:'https://instagram.com/zynforge', website:'https://zynforge.com' },
  { name:'Lumevra', logo:'img/logos/lumevra.png', bio:'Studio de production vidéo et effets visuels.', slogan:'Capture the light.', instagram:'https://instagram.com/lumevra', website:'https://lumevra.com' },
  { name:'Kromiq', logo:'img/logos/kromiq.png', bio:'Jantes et finitions chromées haut de gamme.', slogan:'Shine different.', instagram:'https://instagram.com/kromiq', website:'https://kromiq.com' },
  { name:'Voltaryx', logo:'img/logos/voltaryx.png', bio:'Équipementier sportif haute performance.', slogan:'Unleash the volt.', instagram:'https://instagram.com/voltaryx', website:'https://voltaryx.com' },
];
const SIM_CREWS = [
  { name:'Vice Wolves', emblem:'🐺' }, { name:'Chrome Panthers', emblem:'🐆' },
  { name:'Midnight Hustlers', emblem:'🌃' }, { name:'Coastal Bandits', emblem:'🏖️' },
  { name:'Turbo Ghosts', emblem:'👻' }, { name:'Static Foxes', emblem:'🦊' },
  { name:'Rebel Sirens', emblem:'🚨' }, { name:'Storm Chasers', emblem:'🌪️' },
  { name:'Diesel Hawks', emblem:'🦅' }, { name:'Obsidian Vandals', emblem:'🖤' },
  { name:'Golden Outlaws', emblem:'🏆' }, { name:'Frost Reapers', emblem:'❄️' },
];
const SIM_COMMENTS = [
  "🔥🔥🔥 énorme !","GG le pro, respect total.","Comment t'as fait ça franchement ?!",
  "Je test ça direct ce soir.","Le meilleur run que j'ai vu ce mois-ci.","Ça c'est du contenu, sérieux.",
  "Premier ! Toujours aussi propre.","Franchement dingue cette vidéo.","T'es un daron, continue comme ça.",
  "J'ai backé avec une gold star, tu la mérites.","Mdrrr j'ai explosé de rire.","Fais un tuto stp !",
  "C'est quoi tes réglages de véhicule ?","Je participe au prochain défi promis.","Niveau supérieur atteint 🏆",
  "On dirait un film, incroyable.","Ça mérite plus de vues franchement.","Toujours aussi régulier, chapeau.",
  "Le meilleur de la communauté sans hésiter.","J'y crois pas, GG !","On se voit au prochain défi 💪",
  "Trop stylé le passage à 0:12.","Le timing est parfait.","Ça donne envie de retenter ma chance.",
  "Sérieux la maîtrise est dingue.","Bravo, mérité.","Ce n'est même pas juste pour les autres 😂",
  "Content d'avoir vu ça avant tout le monde.","Le crew est fier de toi.","Vas-y direct au prochain palier.",
];
const SIM_TIP_TITLES = ["Bien doser le frein à main","Le raccourci secret du port","Astuce pour semer la police","Régler la sensibilité caméra","Le meilleur véhicule pour drift"];
const SIM_LOG_ACTIONS = ['Validation défi sponsor','Validation participation','Clôture défi','Modération contenu','Mise à jour paliers visuels'];

function generateSimulation(users, videos, tips, crews, challenges, submissions, follows, goldTx, adminLog, statusUps){
  const rand = mulberry32(20260918);
  const usedIds = new Set(users.map(u=>u.id));

  function uniqueId(base){
    let id = base, tries = 0;
    while(usedIds.has(id)){ tries++; id = base+'-'+randInt(rand,10,99); if(tries>50) break; }
    usedIds.add(id);
    return id;
  }

  // ---- joueurs, répartis sur les 13 paliers (pyramide réaliste) ----
  const TIER_QUOTAS = [64,32,22,16,12,9,7,6,5,4,3,1,1];
  const genPlayers = [];
  TIER_QUOTAS.forEach((quota, tierIdx)=>{
    for(let i=0;i<quota;i++){
      const name = pick(rand,SIM_NAME_PREFIX)+' '+pick(rand,SIM_NAME_SUFFIX);
      const id = uniqueId(name.toLowerCase().replace(/ /g,'-'));
      const lo = PROGRESSION[tierIdx].followers;
      const hi = tierIdx+1<PROGRESSION.length ? PROGRESSION[tierIdx+1].followers-1 : lo+40000000;
      const followers = lo + Math.floor(rand()*(hi-lo+1));
      const country = pick(rand, COUNTRIES).code;
      const u = mkUser(id, name, country, followers, {
        wins:0, participations:0, earnings:0, earningsVisible: rand()>0.3, bio: pick(rand,SIM_BIOS),
        characterId: pick(rand, CHARACTERS).id,
      });
      genPlayers.push(u);
    }
  });
  users.push(...genPlayers);

  // ---- marques additionnelles ----
  const genBrands = SIM_BRANDS.map(b=>{
    const id = uniqueId(b.name.toLowerCase().replace(/ /g,'-'));
    return mkBrand(id, b.name, pick(rand,COUNTRIES).code, b.logo, b.bio, b.slogan, { instagram:b.instagram, website:b.website });
  });
  users.push(...genBrands);

  const allUsers = users;
  const villaPlayers = allUsers.filter(u=>u.accountType==='player' && levelRank(u.level)>=levelRank('villa'));
  const brands = allUsers.filter(u=>u.accountType==='brand');
  const creators = [...villaPlayers, ...brands];

  // ---- crews ----
  const genCrews = SIM_CREWS.map(c=>({ id: uniqueId('crew-'+c.name.toLowerCase().replace(/ /g,'-')), name:c.name, emblem:c.emblem, description:'Crew de la communauté.', members:[], wins: randInt(rand,0,20) }));
  crews.push(...genCrews);
  genCrews.forEach(cr=>{
    const size = randInt(rand,3,9);
    const candidates = allUsers.filter(u=>u.accountType==='player' && !u.crewId);
    const members = pickN(rand, candidates, size);
    members.forEach(m=>{ m.crewId = cr.id; cr.members.push(m.id); });
  });

  // ---- graphe de suivi (pour l'éligibilité des défis "communauté") ----
  function seedFollowers(ownerId, count){
    const candidates = allUsers.filter(u=>u.accountType==='player' && u.id!==ownerId);
    const chosen = pickN(rand, candidates, count);
    chosen.forEach(u=>{
      follows[u.id] = follows[u.id] || [];
      if(!follows[u.id].includes(ownerId)) follows[u.id].push(ownerId);
    });
    return chosen;
  }

  // ---- défis : sponsors + streamers, jamais entre deux joueurs en direct ----
  let cIdx = 0, vIdx = 0, sIdx = 0;
  const durationOpts = [
    {label:'2h', h:2}, {label:'6h', h:6}, {label:'1 jour', h:24},
    {label:'3 jours', h:72}, {label:'7 jours', h:168}, {label:'48h', h:48},
  ];

  creators.forEach(creator=>{
    const isBrand = creator.accountType==='brand';
    const n = isBrand ? randInt(rand,2,5) : randInt(rand,1,3);
    for(let i=0;i<n;i++){
      cIdx++;
      const id = 'gc'+cIdx;
      const title = pick(rand,SIM_CHALLENGE_TITLES) + (rand()>0.6 ? ' — '+pick(rand,['Édition Spéciale','Saison 2','Nuit Blanche','Round Final','Communauté']) : '');
      const statusRoll = rand();
      const status = statusRoll<0.40 ? 'active' : statusRoll<0.65 ? 'upcoming' : 'closed';
      const approvalStatus = rand()<0.06 ? 'pending' : 'approved';

      let targeting, tier, eligiblePool;
      if(isBrand){
        const mode = rand()<0.5 ? 'global' : 'countries';
        targeting = mode==='global' ? { mode:'global', countries:[] } : { mode:'countries', countries: pickN(rand, COUNTRIES, randInt(rand,2,5)).map(c=>c.code) };
        tier = pick(rand, PROGRESSION.slice(0, randInt(rand,1,8))).key;
      } else {
        targeting = { mode:'community', communityOwnerId:creator.id };
        tier = 'mains-nues';
      }

      const dur = pick(rand, durationOpts);
      let opensAt, closesAt, resultsAt;
      if(status==='active'){
        const elapsed = randInt(rand,1,Math.max(1,dur.h-1));
        opensAt = inHours(-elapsed); closesAt = inHours(dur.h-elapsed); resultsAt = inHours(dur.h-elapsed+24);
      } else if(status==='upcoming'){
        const future = randInt(rand,1,10)*24;
        opensAt = inHours(future); closesAt = inHours(future+dur.h); resultsAt = inHours(future+dur.h+24);
      } else {
        const closedDaysAgo = randInt(rand,1,60);
        closesAt = inDays(-closedDaysAgo); opensAt = inDays(-closedDaysAgo - Math.ceil(dur.h/24)); resultsAt = inDays(-closedDaysAgo+1);
      }

      const tierCfg = TIER_CONFIG[tier] || TIER_CONFIG['mains-nues'];
      const reward = Math.round((tierCfg.minReward + rand()*tierCfg.minReward*2)/10)*10;
      const fee = Math.round(reward*PLATFORM_FEE_RATE*100)/100;
      // La récompense affichée/remise doit toujours être un chiffre rond (multiple
      // de 5) — jamais un reste de calcul de commission en centimes.
      const netReward = Math.round((reward-fee)/5)*5;

      const challenge = {
        id, title, sponsor: creator.display, sponsorLogo: isBrand ? creator.logo : '',
        creatorId: creator.id, creatorType: isBrand?'brand':'player', tier,
        image: pick(rand, ['🏙️','🌃','🏎️','🏁','💰','🎆','🌆','🚓','🛥️','💎','🔥','🎮','⚡','🌉']),
        reward: netReward, rewardCurrency:'€', rewardConfirmed:true, amountPaid: reward, launchCost: fee,
        description: pick(rand,SIM_CHALLENGE_DESC),
        instructions: `Un seul plan, ${MAX_VIDEO_SECONDS} secondes maximum.`,
        acceptCriteria: `${RECOMMENDED_VIDEO_FORMAT}, ${MAX_VIDEO_SECONDS} secondes maximum.`,
        targeting, duration:dur.label, format: rand()<0.12?'physical':'online',
        venue: rand()<0.12 ? pick(rand,SIM_VENUES) : '',
        opensAt, closesAt, resultsAt,
        maxParticipations: randInt(rand,1,3), isEvent: dur.label==='48h',
        approvalStatus, verificationCode: pick(rand,['CE','PE','DC','RV','GN','BR','SN','VC']) + '-' + randInt(rand,1000,9999),
        winnerId:null, status: approvalStatus==='pending' ? 'upcoming' : status, participants:[],
      };

      if(challenge.approvalStatus==='pending' || challenge.status==='upcoming'){
        challenges.push(challenge);
        continue;
      }

      if(isBrand){
        eligiblePool = allUsers.filter(u=>{
          if(u.accountType==='brand') return false;
          if(levelRank(u.level) < levelRank(tier)) return false;
          if(targeting.mode==='countries') return targeting.countries.includes(u.country);
          return true;
        });
      } else {
        eligiblePool = [creator, ...seedFollowers(creator.id, randInt(rand,8,25))];
      }

      const nPart = Math.min(eligiblePool.length, randInt(rand,3,18));
      const participants = pickN(rand, eligiblePool, nPart);
      const subEntries = [];
      participants.forEach(u=>{
        vIdx++; sIdx++;
        const vid = 'gv'+vIdx, sid = 'gs'+sIdx;
        const cat = 'Participation à un défi';
        const likes = randInt(rand,5,3000);
        const goldStars = rand()<0.6 ? randInt(rand,0,5) : randInt(rand,6,40);
        const subRoll = rand();
        const subStatus = subRoll<0.82 ? 'published' : subRoll<0.94 ? 'pending' : 'refused';
        const video = mkVideo(vid, u.id, pick(rand,SIM_VIDEO_TITLES[cat]), pick(rand,['🎬','🏙️','🏎️','🌆','🎥']), cat, id, likes, inMinutes(-randInt(rand,2,57600)), randInt(rand,10,MAX_VIDEO_SECONDS));
        videos.push(video);
        const sub = { id:sid, challengeId:id, userId:u.id, videoId:vid, status:subStatus, goldStars: subStatus==='published'?goldStars:0, submittedAt: video.publishedAt, videoLocked:true };
        submissions.push(sub);
        challenge.participants.push(u.id);
        if(subStatus==='published') subEntries.push({sub,video});
      });

      if(challenge.status==='closed' && subEntries.length){
        subEntries.sort((a,b)=> scoreOf(b.video,b.sub) - scoreOf(a.video,a.sub));
        const winnerEntry = subEntries[0];
        challenge.winnerId = winnerEntry.sub.userId;
        const winner = allUsers.find(u=>u.id===winnerEntry.sub.userId);
        winner.wins = (winner.wins||0)+1;
        winner.earnings = Math.round(((winner.earnings||0)+challenge.reward)*100)/100;
        adminLog.push({ admin:'Système', action:'Confirmation du gagnant', detail:`${challenge.title} → ${winner.display} (+${challenge.reward}€)`, date: challenge.resultsAt.slice(0,16).replace('T',' ') });
        // Trophées 3/2/1 pour le podium (pas seulement le gagnant).
        const TROPHY_POINTS = [3, 2, 1];
        subEntries.slice(0,3).forEach((entry,i)=>{
          const pu = allUsers.find(u=>u.id===entry.sub.userId);
          if(pu) pu.trophies = (pu.trophies||0) + TROPHY_POINTS[i];
        });
      }
      challenges.push(challenge);
    }
  });

  // ---- vidéos hors défi ----
  const STANDALONE_CATS = ['Cascade','Poursuite','Record','Découverte','Moment drôle','Astuce'];
  const players = allUsers.filter(u=>u.accountType==='player');
  for(let i=0;i<90;i++){
    vIdx++;
    const author = pick(rand, players);
    const cat = pick(rand, STANDALONE_CATS);
    const noDuration = cat==='Astuce' || cat==='Découverte';
    const video = mkVideo('gv'+vIdx, author.id, pick(rand,SIM_VIDEO_TITLES[cat]), pick(rand,['🎬','💡','🔎','🤣','🏁','🚗']), cat, null, randInt(rand,3,5000), inMinutes(-randInt(rand,2,129600)), noDuration ? null : randInt(rand,8,MAX_VIDEO_SECONDS));
    video.status = rand()<0.05 ? 'pending' : 'published';
    videos.push(video);
  }

  // ---- commentaires sur toutes les vidéos ----
  videos.forEach(v=>{
    const n = rand()<0.3 ? 0 : randInt(rand,1,10);
    for(let i=0;i<n;i++){
      const author = pick(rand, players);
      v.comments.push({ author: author.display, text: pick(rand, SIM_COMMENTS) });
    }
  });

  // ---- statuts récemment débloqués (pour le fil d'activité de l'accueil) ----
  const eligibleForLevelUp = allUsers.filter(u=>u.accountType==='player' && levelRank(u.level) >= levelRank('voiture'));
  pickN(rand, eligibleForLevelUp, Math.min(14, eligibleForLevelUp.length)).forEach(u=>{
    statusUps.push({ userId:u.id, level:u.level, date: inMinutes(-randInt(rand,5,14400)) });
  });

  // ---- historique Gold Stars ----
  for(let i=0;i<220;i++){
    const u = pick(rand, players);
    if(rand()<0.5){
      const pack = pick(rand, GOLD_PACKS);
      goldTx.push({ userId:u.id, date: inDays(-randInt(rand,0,90)).slice(0,10), type:'Achat', detail:`Pack ${pack.stars} ★`, stars: pack.stars });
    } else {
      goldTx.push({ userId:u.id, date: inDays(-randInt(rand,0,90)).slice(0,10), type:'Attribution', detail:'Soutien à une participation', stars:-1 });
    }
  }

  // ---- astuces additionnelles ----
  for(let i=0;i<10;i++){
    const u = pick(rand, players);
    tips.push({ id:'gt'+(i+1), userId:u.id, title: pick(rand,SIM_TIP_TITLES), category:'Astuce', text: pick(rand,SIM_COMMENTS), createdAt: inDays(-randInt(rand,0,60)).slice(0,10) });
  }

  // ---- journal d'audit additionnel ----
  for(let i=0;i<25;i++){
    adminLog.push({ admin:'Admin démo', action: pick(rand,SIM_LOG_ACTIONS), detail:'Action de démonstration #'+(i+1), date: inDays(-randInt(rand,0,60)).slice(0,16).replace('T',' ') });
  }
}

function seedDB(){
  const users = [
    mkUser('vice_king','Vice King','FR', 812000, {wins:14, trophies:46, participations:38, earnings:4200, earningsVisible:true, bio:"Cascades & poursuites dans Vice City. Statut Yacht — je lance des défis à ma communauté."}),
    mkUser('luna_drift','Luna Drift','BE', 431000, {wins:9, trophies:29, participations:22, earnings:1800, earningsVisible:true, bio:"Reine du drift, tutos chaque semaine."}),
    mkUser('malibu_max','Malibu Max','US', 220000, {wins:6, trophies:19, participations:19, earnings:900, earningsVisible:false, bio:"Découvertes de map & easter eggs."}),
    mkUser('nino_flash','Nino Flash','FR', 96000, {wins:4, trophies:13, participations:15, earnings:400, earningsVisible:true, bio:"Moments drôles garantis."}),
    mkUser('sara_speed','Sara Speed','CA', 34000, {wins:2, trophies:7, participations:9, earnings:150, earningsVisible:true, bio:"Records de vitesse en cours de validation."}),
    mkUser('you','Toi','FR', 120, {wins:0, trophies:0, participations:1, earnings:0, earningsVisible:true, bio:"Nouveau sur The Gamer Rich."}),
  ];

  const challenges = [
    {
      id:'c1', title:'Cascade Éclair — Pont de Leonida', sponsor:'Aeroviq', sponsorLogo:'img/logos/aeroviq.png',
      creatorId:'aeroviq', creatorType:'brand', tier:'mains-nues',
      image:'🏙️', reward:1200, rewardCurrency:'€', rewardConfirmed:true, launchCost:84,
      description:"45 secondes chrono pour filmer la cascade la plus folle depuis le pont principal de Leonida. Ouvert à tous, aucune condition de statut.",
      instructions:"Un seul plan, 45 secondes maximum. Le saut doit être visible entièrement.",
      acceptCriteria:"Format vertical 9:16, 1080×1920 minimum, 45 secondes maximum.",
      targeting:{ mode:'global', countries:[] },
      format:'online', venue:'',
      duration:'3 jours', opensAt:inDays(-1), closesAt:inDays(2), resultsAt:inDays(3),
      maxParticipations:3, isEvent:false, approvalStatus:'approved', verificationCode:'CE-7421', winnerId:null,
      status:'active', participants:['vice_king','luna_drift','nino_flash','you'],
    },
    {
      id:'c2', title:'Poursuite Express — Catégorie Vélo', sponsor:'Nexdrift', sponsorLogo:'img/logos/nexdrift.png',
      creatorId:'nexdrift', creatorType:'brand', tier:'velo',
      image:'🌃', reward:300, rewardCurrency:'€', rewardConfirmed:true, launchCost:21,
      description:"2 heures pour poster la poursuite de police la plus intense, en 45 secondes montre en main.",
      instructions:"Poursuite ou fuite, peu importe l'issue. 45 secondes maximum.",
      acceptCriteria:"Aucun mod interdit, gameplay natif uniquement.",
      targeting:{ mode:'countries', countries:['US','CA','FR'] },
      format:'online', venue:'',
      duration:'2h', opensAt:inHours(-1), closesAt:inHours(1), resultsAt:inHours(3),
      maxParticipations:5, isEvent:false, approvalStatus:'approved', verificationCode:'PE-1190', winnerId:null,
      status:'active', participants:['malibu_max','sara_speed'],
    },
    {
      id:'c3', title:'Drift Chrono — Communauté Vice King', sponsor:'Vice King', sponsorLogo:'',
      creatorId:'vice_king', creatorType:'player', tier:'villa',
      image:'🏎️', reward:900, rewardCurrency:'€', rewardConfirmed:true, launchCost:63,
      description:"6 heures pour poster ton meilleur enchaînement de drift en 45 secondes. Réservé à la communauté de Vice King.",
      instructions:"Le drift doit être continu, à l'écran du début à la fin.",
      acceptCriteria:"Véhicule de série uniquement.",
      targeting:{ mode:'community', communityOwnerId:'vice_king' },
      format:'online', venue:'',
      duration:'6h', opensAt:inHours(-3), closesAt:inHours(3), resultsAt:inHours(6),
      maxParticipations:5, isEvent:false, approvalStatus:'approved', verificationCode:'DC-3305', winnerId:null,
      status:'active', participants:['luna_drift'],
    },
    {
      id:'c4', title:'Record de vitesse — Autoroute A1A', sponsor:'Zynforge', sponsorLogo:'img/logos/zynforge.png',
      creatorId:'zynforge', creatorType:'brand', tier:'mains-nues',
      image:'🏁', reward:400, rewardCurrency:'€', rewardConfirmed:true, launchCost:28,
      description:"Le meilleur temps chronométré sur le tronçon officiel de l'autoroute côtière, en 45 secondes. Ouvert à tous.",
      instructions:"Chrono visible à l'écran obligatoire.",
      acceptCriteria:"Véhicule de série uniquement, 45 secondes maximum.",
      targeting:{ mode:'global', countries:[] },
      format:'online', venue:'',
      duration:'3 jours', opensAt:inDays(2), closesAt:inDays(5), resultsAt:inDays(6),
      maxParticipations:1, isEvent:false, approvalStatus:'approved', verificationCode:'RV-9042', winnerId:null,
      status:'upcoming', participants:[],
    },
    {
      id:'c5', title:'GTA 6 Launch Night — Méga Défi', sponsor:'Dravolt', sponsorLogo:'img/logos/dravolt.png',
      creatorId:'dravolt', creatorType:'brand', tier:'diamant',
      image:'🎆', reward:25000, rewardCurrency:'€', rewardConfirmed:true, launchCost:1750,
      description:"Grand événement catégorie Diamant : 48 heures pour livrer ta meilleure séquence, tous styles confondus. Toujours 45 secondes max par vidéo.",
      instructions:"Un seul thème libre, montage interdit, 45 secondes maximum par participation.",
      acceptCriteria:"Format vertical 9:16, 1080×1920 minimum.",
      targeting:{ mode:'global', countries:[] },
      format:'physical', venue:'Studio The Gamer Rich — Paris',
      duration:'48h', opensAt:inDays(4), closesAt:inDays(6), resultsAt:inDays(7),
      maxParticipations:1, isEvent:true, approvalStatus:'approved', verificationCode:'GN-0001', winnerId:null,
      status:'upcoming', participants:[],
    },
    {
      id:'c6', title:'Braquage Chronométré — Défi Prime', sponsor:'Quantevra', sponsorLogo:'img/logos/quantevra.png',
      creatorId:'quantevra', creatorType:'brand', tier:'yacht',
      image:'💰', reward:60000, rewardCurrency:'€', rewardConfirmed:true, launchCost:4200,
      description:"Défi Prime catégorie Yacht : réservé aux statuts Yacht et Diamant, le braquage le plus propre en 45 secondes.",
      instructions:"Braquage complet visible à l'écran, 45 secondes maximum.",
      acceptCriteria:"Gameplay natif uniquement.",
      targeting:{ mode:'countries', countries:['FR','US','CN','RU','IN','ES'] },
      format:'online', venue:'',
      duration:'5 jours', opensAt:inHours(2), closesAt:inDays(5), resultsAt:inDays(6),
      maxParticipations:1, isEvent:false, approvalStatus:'pending', verificationCode:'BR-5588', winnerId:null,
      status:'upcoming', participants:[],
    },
    {
      id:'c0', title:'Sprint Néon — Front de mer', sponsor:'Voltaryx', sponsorLogo:'img/logos/voltaryx.png',
      creatorId:'voltaryx', creatorType:'brand', tier:'mains-nues',
      image:'🌆', reward:500, rewardCurrency:'€', rewardConfirmed:true, launchCost:35,
      description:"Le sprint le plus stylé sur le front de mer, en 45 secondes. Ouvert à tous.",
      instructions:"Chrono ou style, au choix du jury.",
      acceptCriteria:"Véhicule de série uniquement.",
      targeting:{ mode:'global', countries:[] },
      format:'online', venue:'',
      duration:'2 jours', opensAt:inDays(-6), closesAt:inDays(-4), resultsAt:inDays(-3),
      maxParticipations:2, isEvent:false, approvalStatus:'approved', verificationCode:'SN-2201', winnerId:'vice_king',
      status:'closed', participants:['vice_king','malibu_max'],
    },
  ];

  const videos = [
    mkVideo('v1','vice_king','Saut du pont — prise 1','🏙️','Participation à un défi','c1',1204,inDays(-1).slice(0,10),28),
    mkVideo('v2','luna_drift','Drift parfait sur le rond-point central','🚗','Cascade',null,860,inDays(-4).slice(0,10),22),
    mkVideo('v3','malibu_max','Poursuite avec 4 voitures de police','🚓','Poursuite','c2',2311,inHours(-1).slice(0,10),30),
    mkVideo('v4','nino_flash','Le PNJ qui refuse de bouger 😂','🤣','Moment drôle',null,4520,inDays(-2).slice(0,10),18),
    mkVideo('v5','sara_speed','Record perso — chrono à l’écran','🏁','Record','c4',530,inDays(-7).slice(0,10),29),
    mkVideo('v6','vice_king','Astuce : garder le contrôle en drift','💡','Astuce',null,980,inDays(-10).slice(0,10),null),
    mkVideo('v7','luna_drift','Easter egg caché dans le parking souterrain','🔎','Découverte',null,410,inDays(-12).slice(0,10),null),
    mkVideo('v8','you','Ma première cascade ratée (mais stylée)','🎬','Cascade','c1',22,inHours(-6).slice(0,10),15),
    mkVideo('v9','luna_drift','Drift chrono — enchaînement complet','🏎️','Participation à un défi','c3',311,inHours(-2).slice(0,10),30),
    mkVideo('v10','vice_king','Sprint néon — run gagnant','🌆','Participation à un défi','c0',1890,inDays(-5).slice(0,10),27),
  ];

  const tips = [
    { id:'t1', userId:'vice_king', title:'Bien doser le frein à main en drift', category:'Astuce', text:'Relâche l\'accélérateur juste avant le frein à main pour garder plus de vitesse en sortie de virage.', createdAt:inDays(-9).slice(0,10) },
    { id:'t2', userId:'malibu_max', title:'Où trouver les meilleurs raccourcis en poursuite', category:'Astuce', text:'Les ruelles derrière le port permettent souvent de semer la police plus vite que l\'autoroute.', createdAt:inDays(-7).slice(0,10) },
  ];

  const crews = [
    { id:'crew1', name:'Neon Riders', emblem:'⚡', description:'Crew spécialisé cascades & drift.', members:['vice_king','luna_drift'], wins:5 },
    { id:'crew2', name:'Night Chasers', emblem:'🌙', description:'Poursuites nocturnes uniquement.', members:['malibu_max','sara_speed'], wins:2 },
  ];

  const submissions = [
    { id:'s0', challengeId:'c0', userId:'vice_king', videoId:'v10', status:'published', goldStars:8, submittedAt:inDays(-5).slice(0,10), videoLocked:true },
    { id:'s1', challengeId:'c1', userId:'vice_king', videoId:'v1', status:'published', goldStars:12, submittedAt:inDays(-1).slice(0,10), videoLocked:true },
    { id:'s2', challengeId:'c1', userId:'luna_drift', videoId:'v2', status:'published', goldStars:5, submittedAt:inDays(-1).slice(0,10), videoLocked:true },
    { id:'s3', challengeId:'c1', userId:'nino_flash', videoId:'v4', status:'pending', goldStars:0, submittedAt:inHours(-5).slice(0,10), videoLocked:true },
    { id:'s4', challengeId:'c2', userId:'malibu_max', videoId:'v3', status:'published', goldStars:20, submittedAt:inHours(-1).slice(0,10), videoLocked:true },
    { id:'s5', challengeId:'c4', userId:'sara_speed', videoId:'v5', status:'published', goldStars:2, submittedAt:inDays(-7).slice(0,10), videoLocked:true },
    { id:'s6', challengeId:'c1', userId:'you', videoId:'v8', status:'pending', goldStars:0, submittedAt:inHours(-6).slice(0,10), videoLocked:true },
    { id:'s7', challengeId:'c3', userId:'luna_drift', videoId:'v9', status:'published', goldStars:3, submittedAt:inHours(-2).slice(0,10), videoLocked:true },
  ];

  const likedBy = {}, follows = {}, goldTx = [], sponsorTx = [], notifications = [], adminLog = [], statusUps = [];
  generateSimulation(users, videos, tips, crews, challenges, submissions, follows, goldTx, adminLog, statusUps);

  // Dons libres à la cagnotte de récompenses (indépendants des Gold Stars,
  // qui soutiennent une participation précise) — juste de quoi afficher un
  // compteur et un mini palmarès crédibles dès le premier chargement.
  const donations = [
    { userId:'vice_king', amount:25, date:inDays(-6).slice(0,10) },
    { userId:'luna_drift', amount:10, date:inDays(-4).slice(0,10) },
    { userId:'nino_flash', amount:5, date:inDays(-3).slice(0,10) },
    { userId:'malibu_max', amount:50, date:inDays(-2).slice(0,10) },
    { userId:'sara_speed', amount:10, date:inDays(-1).slice(0,10) },
  ];

  return { users, challenges, videos, tips, crews, submissions, likedBy, follows, goldTx, sponsorTx, notifications, adminLog, statusUps, donations };
}
function totalDonations(db){ return db.donations.reduce((a,d)=>a+d.amount,0); }

function mkUser(username, display, country, followers, extra){
  const level = getLevelForFollowers(followers);
  return Object.assign({
    id: username, username, display, country, followers, level: level.key,
    accountType:'player', companyName:null, logo:null,
    avatar:'', banner:'', lang:'fr', badges:[], goldStars: username==='you' ? 5 : 0,
    crewId: username==='vice_king'||username==='luna_drift' ? 'crew1' : (username==='malibu_max'||username==='sara_speed' ? 'crew2' : null),
    liveLink: username==='vice_king' ? 'https://twitch.tv/viceking' : (username==='luna_drift' ? 'https://twitch.tv/lunadrift' : (username==='malibu_max' ? 'https://youtube.com/@malibumax/live' : '')),
    isLive: username==='vice_king' || username==='luna_drift' || username==='malibu_max',
    socialLinks: { instagram:'', tiktok:'', discord:'', twitch:'', youtube:'', website:'' },
    createdAt:'2026-01-01',
    characterId: CHARACTERS[0].id,
    backgroundId: '',
    wallet: { grLots: username==='you' ? [{ id:'lot_seed_you', type:'purchased', amount:15000, remaining:15000, date:'2026-01-01', sourceRef:'seed_demo' }] : [] },
    referredBy: null,
    cguAccepted:false, cguAcceptedAt:null, cguAcceptedVersion:null,
    parentalConsent:false, parentalConsentAt:null,
    trophies:0,
  }, extra);
}
function mkBrand(id, companyName, country, logo, bio, slogan, social){
  return {
    id, username:id, display:companyName, country, followers:0, level:'mains-nues',
    accountType:'brand', companyName, logo, slogan: slogan||'',
    avatar:'', banner:'', lang:'fr', badges:[], goldStars:0, wins:0, participations:0,
    earnings:0, earningsVisible:false, crewId:null, liveLink:'', bio, createdAt:'2026-01-01',
    socialLinks: { instagram:(social&&social.instagram)||'', tiktok:'', discord:'', twitch:'', youtube:'', website:(social&&social.website)||'' },
    cguAccepted:false, cguAcceptedAt:null, cguAcceptedVersion:null,
  };
}
function mkVideo(id,userId,title,thumb,category,challengeId,likes,date,durationSec){
  return { id, userId, title, description:'', category, thumbnail:thumb, embedUrl:'', lang:'fr',
    durationSec: durationSec || null, likes, comments:[], challengeId, publishedAt:date, status:'published' };
}

// localStorage peut être indisponible ou bloqué selon le contexte d'affichage
// (aperçu embarqué, navigation privée, quota dépassé...), et une valeur mise
// en cache sous l'ancien schéma peut manquer un champ ajouté depuis. Dans ces
// deux cas on continue quand même avec des données en mémoire — normalisées
// pour ne jamais planter la page — plutôt que de laisser une exception non
// rattrapée sur `const db = loadDB()` empêcher tout le reste de s'exécuter.
const DB_ARRAY_FIELDS = ['users','challenges','videos','tips','crews','submissions','goldTx','sponsorTx','notifications','adminLog','statusUps','donations','customCosmetics','cashouts'];
const DB_OBJECT_FIELDS = ['likedBy','follows'];
function normalizeDB(db){
  db = db || {};
  DB_ARRAY_FIELDS.forEach(k=>{ if(!Array.isArray(db[k])) db[k] = []; });
  DB_OBJECT_FIELDS.forEach(k=>{ if(!db[k] || typeof db[k]!=='object') db[k] = {}; });
  // Comble le personnage manquant pour les comptes créés avant cette
  // fonctionnalité (utilisateurs simulés, comptes déjà en localStorage).
  db.users.forEach(u=>{ if(u.accountType!=='brand' && !CHARACTERS.some(c=>c.id===u.characterId)) u.characterId = CHARACTERS[0].id; });
  db.users.forEach(u=>{ if(u.backgroundId==null) u.backgroundId = ''; else if(u.backgroundId && !BACKGROUNDS.some(b=>b.id===u.backgroundId)) u.backgroundId = ''; });
  // Comptes déjà en localStorage créés avant la case "Je suis en live" : on
  // reprend leur statut d'alors (avoir un lien = compté comme live) pour ne
  // pas faire disparaître silencieusement des streamers déjà affichés.
  db.users.forEach(u=>{ if(u.isLive==null) u.isLive = !!u.liveLink; });
  db.users.forEach(u=>{ if(u.trophies==null) u.trophies = 0; });
  db.users.forEach(u=>{ if(u.parentalConsent==null) u.parentalConsent = false; if(u.parentalConsentAt===undefined) u.parentalConsentAt = null; });
  db.users.forEach(u=>{ if(!u.socialLinks || typeof u.socialLinks!=='object') u.socialLinks = { instagram:'', tiktok:'', discord:'', twitch:'', youtube:'', website:'' }; });
  db.users.forEach(u=>{ if(u.socialLinks && u.socialLinks.website==null) u.socialLinks.website = ''; });
  if(typeof ensureWallet==='function') db.users.forEach(u=>{ if(u.accountType!=='brand') ensureWallet(u); });
  if(typeof ensureEconomyConfig==='function') ensureEconomyConfig(db);
  return db;
}
function loadDB(){
  let db = null;
  try{
    const raw = localStorage.getItem(DB_KEY);
    if(raw) db = JSON.parse(raw);
  }catch(e){}
  if(!db){
    try{ db = seedDB(); }catch(e){ db = {}; }
    saveDB(db);
  }
  return normalizeDB(db);
}
function saveDB(db){
  try{ localStorage.setItem(DB_KEY, JSON.stringify(db)); }catch(e){}
}

function getSession(){
  try{ return JSON.parse(localStorage.getItem(SESSION_KEY)); }catch(e){ return null; }
}
function setSession(userId){
  try{ localStorage.setItem(SESSION_KEY, JSON.stringify({ userId })); }catch(e){}
}
function clearSession(){
  try{ localStorage.removeItem(SESSION_KEY); }catch(e){}
}
// Passe `db` quand la page en a déjà chargé un : renvoie alors la même
// référence d'objet que celle contenue dans db.users, pour que muter
// currentUser() puis appeler saveDB(db) persiste bien le changement.
// Sans argument, recharge son propre snapshot (lecture seule uniquement).
function currentUser(db){
  const s = getSession(); if(!s) return null;
  const database = db || loadDB();
  return database.users.find(u => u.id === s.userId) || null;
}
