/* ============ THE GAMER RICH — économie GR ============
   Ce site n'a pas de serveur (site statique, localStorage comme seule
   persistance) : il n'y a donc pas de vrai prestataire de paiement, pas de
   vraie base de données transactionnelle, pas de vrais webhooks signés. Tout
   ce fichier simule fidèlement ce que ferait un backend — journal
   d'écritures, vérification systématique avant tout débit, "transaction"
   tout-ou-rien, idempotence par identifiant unique — en le centralisant ici
   plutôt que de laisser chaque page manipuler les soldes directement. C'est
   la même logique que canPurchase/purchaseItem dans wardrobe.js, appliquée
   à un système à deux monnaies.

   RÈGLE : les Gold Stars existantes (soutien communautaire, classement des
   défis) ne sont JAMAIS touchées par ce fichier. Les GR sont une monnaie
   strictement séparée, réservée aux achats de personnalisation. Aucune
   fonction ici ne convertit l'une vers l'autre. */

const GR_PER_EUR = 100;                 // tarif de référence : 1 € = 100 GR (achat uniquement, jamais un taux de rachat)

/* ---------- icône GR (SVG fourni, intégré tel quel) ----------
   Un <symbol> partagé + <use> semblait plus léger, mais les dégradés
   référencés en url(#id) à l'intérieur d'un <symbol> réutilisé ne se
   résolvent pas de façon fiable une fois clonés par <use> (bug connu,
   comportement incohérent selon les navigateurs) : le rendu tombait sur un
   simple disque sombre, sans le dégradé ni le monogramme. On intègre donc le
   SVG complet à chaque appel, avec des id de dégradé uniques à chaque
   instance pour ne jamais entrer en collision si l'icône apparaît plusieurs
   fois sur la même page (nav + fiches boutique + portefeuille...). */
let _grIconSeq = 0;
function grIconHtml(size){
  size = size || 18;
  const id = 'gri'+(_grIconSeq++);
  return `<svg class="gr-icon" width="${size}" height="${size}" viewBox="0 0 512 512" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="${id}r" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FF36C8"/><stop offset=".48" stop-color="#8855FF"/><stop offset="1" stop-color="#00E5FF"/></linearGradient>
      <linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#45236E"/><stop offset="1" stop-color="#100B26"/></linearGradient>
      <linearGradient id="${id}l" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#ADF5FF"/></linearGradient>
    </defs>
    <circle cx="256" cy="264" r="226" fill="#10091F"/>
    <circle cx="256" cy="252" r="226" fill="url(#${id}r)"/>
    <circle cx="256" cy="252" r="212" fill="url(#${id}f)"/>
    <circle cx="256" cy="252" r="190" fill="none" stroke="url(#${id}r)" stroke-width="3"/>
    <path d="M83 201A181 181 0 0 1 201 79" fill="none" stroke="#FF83E3" stroke-width="6" stroke-linecap="round"/>
    <path d="M311 425A181 181 0 0 0 432 307" fill="none" stroke="#00E5FF" stroke-width="6" stroke-linecap="round"/>
    <g fill="url(#${id}l)">
      <path d="M226 178H153L119 212V290L153 324H232V246H179V273H202V294H165L149 278V224L165 208H214L226 196Z"/>
      <path fill-rule="evenodd" d="M260 178H341L374 211V246L349 271L390 324H351L315 277H290V324H260ZM290 208V247H330L344 233V222L330 208Z"/>
    </g>
    <path d="M226 127L256 108L286 127L256 146Z" fill="#D0BAFF"/>
    <path d="M201 368H240L256 383L272 368H311" fill="none" stroke="url(#${id}r)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
// Conservée pour compat (n'est plus nécessaire : chaque icône est
// maintenant autonome) — ne fait plus rien.
function injectGRSprite(){}
function grAmountHtml(amount, size){
  return `<span class="gr-amount" role="text" aria-label="${fmtNum(amount)} GR">${grIconHtml(size)}<b>${fmtNum(amount)}</b> GR</span>`;
}
function eurFromCents(cents){ return (cents/100).toLocaleString('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2}) + ' €'; }
function grToEurLabel(gr){ return eurFromCents(Math.round(gr / GR_PER_EUR * 100)); }

/* ---------- configuration des packs (côté "serveur", modifiable en admin) ----------
   Un pack a un id stable. Modifier son prix ici ne change JAMAIS une
   commande déjà enregistrée : chaque ligne du journal fige elle-même le
   montant et le prix payés au moment de l'achat. */
// stripeLink : URL d'un vrai Stripe Payment Link (créé côté tableau de bord
// Stripe, en mode TEST), collée depuis le panneau admin — vide par défaut,
// auquel cas le pack retombe sur le paiement simulé existant. Voir
// STRIPE_TEST_MODE_README plus bas pour les limites de ce mode.
function defaultGRPacks(){
  return [
    { id:'gr-100',   gr:100,   priceCents:100,  active:true, stripeLink:'' },
    { id:'gr-500',   gr:500,   priceCents:500,  active:true, stripeLink:'' },
    { id:'gr-1000',  gr:1000,  priceCents:1000, active:true, stripeLink:'' },
    { id:'gr-2000',  gr:2000,  priceCents:2000, active:true, stripeLink:'' },
    { id:'gr-5000',  gr:5000,  priceCents:5000, active:true, stripeLink:'' },
    { id:'gr-10000', gr:10000, priceCents:10000, active:true, stripeLink:'' },
  ];
}
// Les packs Gold Stars existaient déjà en dur (GOLD_PACKS, data.js) sans être
// configurables depuis l'admin — on les fait migrer ici sous la même forme
// que les packs GR, sans inventer de nouveau taux (on reprend GOLD_STAR_PRICE_EUR).
function defaultGoldPacksConfig(){
  return GOLD_PACKS.map(p=> ({ id:'gold-'+p.stars, stars:p.stars, priceCents: Math.round(p.stars*GOLD_STAR_PRICE_EUR*100), active:true, stripeLink:'' }));
}
function ensureEconomyConfig(db){
  if(!Array.isArray(db.grPacks) || !db.grPacks.length) db.grPacks = defaultGRPacks();
  if(!Array.isArray(db.goldPacksConfig) || !db.goldPacksConfig.length) db.goldPacksConfig = defaultGoldPacksConfig();
  db.grPacks.forEach(p=>{ if(typeof p.stripeLink!=='string') p.stripeLink=''; });
  db.goldPacksConfig.forEach(p=>{ if(typeof p.stripeLink!=='string') p.stripeLink=''; });
  if(!db.priceOverrides || typeof db.priceOverrides!=='object') db.priceOverrides = {};
  if(!Array.isArray(db.walletLedger)) db.walletLedger = [];
  if(!Array.isArray(db.refundCases)) db.refundCases = [];
  if(!db.affiliateConfig) db.affiliateConfig = { enabled:false, rate:0.05 }; // désactivé tant que non paramétré explicitement
  if(!Array.isArray(db.affiliateLedger)) db.affiliateLedger = [];
}

/* ---------- portefeuille GR par utilisateur ---------- */
function defaultWallet(){ return { grLots: [] }; }
function ensureWallet(u){
  if(!u || u.accountType==='brand') return;
  if(!u.wallet) u.wallet = defaultWallet();
  if(!Array.isArray(u.wallet.grLots)) u.wallet.grLots = [];
}
function grBalance(user){
  if(!user || user.accountType==='brand') return 0; // les marques n'ont pas de portefeuille GR
  ensureWallet(user);
  return user.wallet.grLots.reduce((a,l)=>a+Math.max(0,l.remaining),0);
}
function grBalanceBreakdown(user){
  if(!user || user.accountType==='brand') return { purchased:0, gifted:0, total:0 };
  ensureWallet(user);
  const purchased = user.wallet.grLots.filter(l=>l.type==='purchased').reduce((a,l)=>a+l.remaining,0);
  const gifted = user.wallet.grLots.filter(l=>l.type==='gifted').reduce((a,l)=>a+l.remaining,0);
  return { purchased, gifted, total: purchased+gifted };
}
function addGRLot(user, amount, type, sourceRef){
  ensureWallet(user);
  const lot = { id:'lot_'+Date.now()+'_'+Math.random().toString(36).slice(2,7), type, amount, remaining:amount, date:new Date().toISOString().slice(0,10), sourceRef };
  user.wallet.grLots.push(lot);
  return lot;
}
// Règle de consommation documentée : GR offerts d'abord, puis GR achetés du
// plus ancien au plus récent (FIFO). L'origine de chaque GR dépensé est
// conservée (lotsConsumed) pour permettre un remboursement correct et le
// calcul d'une éventuelle commission d'affiliation.
function spendGR(user, amount){
  ensureWallet(user);
  const bal = grBalance(user);
  if(bal < amount) return { ok:false, missing: amount-bal };
  const order = user.wallet.grLots.filter(l=>l.remaining>0).slice().sort((a,b)=>{
    if(a.type!==b.type) return a.type==='gifted' ? -1 : 1;
    return new Date(a.date) - new Date(b.date);
  });
  let left = amount; const consumed = [];
  for(const lot of order){
    if(left<=0) break;
    const take = Math.min(lot.remaining, left);
    lot.remaining -= take; left -= take;
    if(take>0) consumed.push({ lotId:lot.id, type:lot.type, amount:take });
  }
  return { ok:true, consumed };
}
function refundGRConsumption(user, consumed){
  ensureWallet(user);
  (consumed||[]).forEach(c=>{
    const lot = user.wallet.grLots.find(l=>l.id===c.lotId);
    if(lot) lot.remaining += c.amount;
    else user.wallet.grLots.push({ id:'lot_'+Date.now()+'_r', type:c.type, amount:c.amount, remaining:c.amount, date:new Date().toISOString().slice(0,10), sourceRef:'refund' });
  });
}

/* ---------- journal des mouvements (jamais de suppression, que des écritures) ---------- */
function addLedgerEntry(db, entry){
  ensureEconomyConfig(db);
  const e = Object.assign({
    id:'ldg_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),
    date:new Date().toISOString().slice(0,10),
    time:new Date().toISOString(),
  }, entry);
  db.walletLedger.push(e);
  return e;
}
function userLedger(db, userId){
  ensureEconomyConfig(db);
  return db.walletLedger.filter(e=>e.userId===userId).slice().reverse();
}

/* ---------- recharge : simulation fidèle d'un flux prestataire ----------
   1) createRechargeIntent : crée une écriture "pending" + un identifiant
      unique de paiement (providerTxId) — rien n'est crédité.
   2) confirmRecharge : appelée uniquement par la "confirmation serveur"
      simulée (jamais par le simple retour sur une page de succès), vérifie
      l'identifiant unique pour ne créditer qu'une seule fois même si la
      confirmation arrive deux fois ou en double, crédite le lot GR/Gold et
      passe l'écriture à "success".
   3) failRecharge / cancelRecharge : passent l'écriture à l'état correspondant,
      ne créditent jamais rien. */
function createRechargeIntent(db, user, kind, packId){
  ensureEconomyConfig(db);
  const packs = kind==='gr' ? db.grPacks : db.goldPacksConfig;
  const pack = packs.find(p=>p.id===packId && p.active);
  if(!pack) return { ok:false, reason:'Pack introuvable ou retiré de la vente.' };
  const providerTxId = 'demo_'+kind+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
  const entry = addLedgerEntry(db, {
    userId:user.id, unit: kind==='gr'?'GR':'GOLD', type:'recharge', status:'pending',
    amount: kind==='gr' ? pack.gr : pack.stars, priceCents: pack.priceCents,
    providerTxId, detail: kind==='gr' ? `Recharge ${pack.gr} GR` : `Recharge ${pack.stars} ★`,
    packSnapshot: Object.assign({}, pack),
  });
  saveDB(db);
  return { ok:true, entry, providerTxId };
}
function findLedgerByProviderTx(db, providerTxId){
  return db.walletLedger.find(e=>e.providerTxId===providerTxId);
}
function confirmRecharge(db, providerTxId){
  ensureEconomyConfig(db);
  const entry = findLedgerByProviderTx(db, providerTxId);
  if(!entry) return { ok:false, reason:'Paiement inconnu.' };
  // Idempotence : une confirmation déjà traitée (doublon, notification en
  // double ou en désordre) ne crédite jamais deux fois.
  if(entry.status==='success') return { ok:true, entry, alreadyProcessed:true };
  if(entry.status!=='pending') return { ok:false, reason:`Paiement déjà en état "${entry.status}".` };
  const user = db.users.find(u=>u.id===entry.userId);
  if(!user) return { ok:false, reason:'Utilisateur introuvable.' };
  if(entry.unit==='GR'){
    const lot = addGRLot(user, entry.amount, 'purchased', entry.id);
    entry.lotId = lot.id;
  } else {
    user.goldStars = (user.goldStars||0) + entry.amount; // Gold Stars : mécanisme inchangé, simple compteur
  }
  entry.status = 'success';
  saveDB(db);
  return { ok:true, entry };
}
function failRecharge(db, providerTxId, reason){
  const entry = findLedgerByProviderTx(db, providerTxId);
  if(!entry || entry.status!=='pending') return { ok:false };
  entry.status = 'failed'; entry.failReason = reason || 'Paiement refusé.';
  saveDB(db);
  return { ok:true, entry };
}
function cancelRecharge(db, providerTxId){
  const entry = findLedgerByProviderTx(db, providerTxId);
  if(!entry || entry.status!=='pending') return { ok:false };
  entry.status = 'cancelled';
  saveDB(db);
  return { ok:true, entry };
}


/* ---------- affiliation (désactivée tant que non configurée) ----------
   Ne verse jamais de commission sur une simple recharge, uniquement sur
   l'achat final d'un objet, une seule fois, calculée sur la part réellement
   financée par des GR ACHETÉS (jamais les GR offerts, jamais les Gold
   Stars). Mise en attente jusqu'à validation, annulée si l'achat est
   remboursé. Aucun versement réel tant que db.affiliateConfig.enabled n'est
   pas activé explicitement (paramétrage non fourni dans ce prototype). */
function maybeRecordAffiliateCommission(db, user, item, priceGR, consumed, purchaseLedgerId){
  ensureEconomyConfig(db);
  if(!db.affiliateConfig.enabled) return null;
  if(!user.referredBy) return null;
  const purchasedGRSpent = (consumed||[]).filter(c=>c.type==='purchased').reduce((a,c)=>a+c.amount,0);
  if(purchasedGRSpent<=0) return null;
  const eurValue = purchasedGRSpent / GR_PER_EUR;
  const commissionEur = Math.round(eurValue * db.affiliateConfig.rate * 100) / 100;
  const rec = {
    id:'aff_'+Date.now(), referrerId:user.referredBy, buyerId:user.id, purchaseLedgerId,
    grBaseAmount:purchasedGRSpent, commissionCents: Math.round(commissionEur*100),
    status:'pending', date:new Date().toISOString().slice(0,10),
  };
  db.affiliateLedger.push(rec);
  return rec;
}
function cancelAffiliateCommissionFor(db, purchaseLedgerId){
  ensureEconomyConfig(db);
  db.affiliateLedger.filter(a=>a.purchaseLedgerId===purchaseLedgerId && a.status==='pending').forEach(a=> a.status='cancelled');
}

/* ---------- attribution manuelle de crédits (admin) ----------
   Toujours un motif, toujours une trace d'audit (le journal des mouvements
   lui-même sert de trace — jamais un ajustement silencieux du solde). */
function adminGrantCredits(db, admin, userId, unit, amount, reason){
  ensureEconomyConfig(db);
  if(!reason || !reason.trim()) return { ok:false, reason:'Un motif est obligatoire pour toute attribution manuelle.' };
  const user = db.users.find(u=>u.id===userId);
  if(!user) return { ok:false, reason:'Utilisateur introuvable.' };
  if(unit==='GR'){
    ensureWallet(user);
    addGRLot(user, amount, 'gifted', 'admin_grant');
  } else {
    user.goldStars = (user.goldStars||0) + amount;
  }
  addLedgerEntry(db, { userId, unit, type:'gift', status:'success', amount, detail:'Attribution manuelle admin', reason, grantedBy:admin });
  saveDB(db);
  return { ok:true };
}

/* ---------- remboursement d'une recharge ----------
   Si les GR de cette recharge précise sont encore disponibles (lot pas ou
   peu dépensé), on les retire directement. S'ils ont déjà été dépensés
   (remaining insuffisant), impossible de les reprendre sans casser le
   solde d'autres achats déjà validés : on ouvre un dossier de traitement
   contrôlé au lieu de forcer un solde négatif ou de trafiquer l'historique. */
function refundRecharge(db, admin, ledgerEntryId, reason){
  ensureEconomyConfig(db);
  const entry = db.walletLedger.find(e=>e.id===ledgerEntryId);
  if(!entry || entry.type!=='recharge' || entry.status!=='success') return { ok:false, reason:'Recharge introuvable ou non remboursable.' };
  const user = db.users.find(u=>u.id===entry.userId);
  if(!user) return { ok:false, reason:'Utilisateur introuvable.' };

  if(entry.unit==='GOLD'){
    if((user.goldStars||0) < entry.amount){
      db.refundCases.push({ id:'case_'+Date.now(), ledgerEntryId, userId:user.id, unit:'GOLD', requested:entry.amount, available:user.goldStars||0, status:'a_traiter', openedBy:admin, date:new Date().toISOString().slice(0,10), reason });
      entry.status = 'refund_en_cours';
      saveDB(db);
      return { ok:true, manualCase:true };
    }
    user.goldStars -= entry.amount;
    entry.status = 'remboursee';
    saveDB(db);
    return { ok:true };
  }

  const lot = user.wallet.grLots.find(l=>l.id===entry.lotId);
  const available = lot ? lot.remaining : 0;
  if(available < entry.amount){
    db.refundCases.push({ id:'case_'+Date.now(), ledgerEntryId, userId:user.id, unit:'GR', requested:entry.amount, available, status:'a_traiter', openedBy:admin, date:new Date().toISOString().slice(0,10), reason });
    entry.status = 'refund_en_cours';
    saveDB(db);
    return { ok:true, manualCase:true };
  }
  lot.remaining -= entry.amount;
  entry.status = 'remboursee';
  saveDB(db);
  return { ok:true };
}

