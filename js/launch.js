/* ============ Pré-lancement : liste d'attente ============
   Avant LAUNCH_DATE, toutes les pages renvoient vers rejoindre.html (la
   page d'inscription à la liste). À partir de LAUNCH_DATE, le vrai site
   s'ouvre tout seul et rejoindre.html renvoie vers l'accueil.

   Chargé dans le <head> de chaque page, avant tout affichage, pour que le
   visiteur ne voie jamais le vrai site "clignoter" avant la redirection.

   Tant que WAITLIST_FORM n'est pas rempli, rien n'est bloqué : on ne ferme
   pas le site derrière un formulaire qui ne transmettrait les e-mails nulle
   part.

   Accès admin : bouton "Accéder à la plateforme" en bas de rejoindre.html.
   Le bon code ouvre le vrai site sur ce navigateur (?apercu=off pour
   revenir à la vue visiteur). Seule l'empreinte SHA-256 du code figure ici,
   jamais le code lui-même — le dépôt est public. Ce n'est pas une vraie
   protection (un code à 8 chiffres se retrouve par essais), juste une porte
   discrète en attendant un serveur. */
const LAUNCH_DATE = new Date('2026-11-01T00:00:00+01:00');

// Google Forms : identifiant du formulaire (dans son lien public, entre
// /d/e/ et /viewform) et nom du champ e-mail (entry.123456789).
const WAITLIST_FORM = { formId:'', emailField:'' };

// Lien CSV de l'onglet "Compteur" du Google Sheet, publié seul sur le web
// (jamais l'onglet des réponses : il contient les e-mails). Cellule B1 =
// nombre d'inscrits (formule). Vide = compteur masqué.
const WAITLIST_STATS_CSV = '';

/* ---------- Dons ----------
   1. Le donateur choisit un montant, un pseudo (ou "rester anonyme") et
      valide : la promesse de don part dans un 2e Google Form avec une
      référence unique — sans pseudo s'il est anonyme, pour que l'anonymat
      tienne même dans le tableau publié.
   2. Il est envoyé sur le Stripe Payment Link du montant choisi, avec la
      même référence (client_reference_id, visible dans Stripe).
   3. Quand Stripe confirme le paiement, l'admin tape "oui" dans la colonne
      "Payé" de la ligne qui porte cette référence. Seules ces lignes
      apparaissent dans la liste des donateurs et comptent dans le total :
      une promesse non payée n'est jamais affichée. */
const DONATION_FORM = { formId:'', refField:'', pseudoField:'', amountField:'', anonField:'' };

// Onglet des réponses du formulaire de dons, publié en CSV. Colonnes
// attendues : Horodateur, Référence, Pseudo, Montant, Anonyme, Payé.
const DONORS_CSV = '';

// Un Stripe Payment Link à prix fixe par bouton de montant. "libre" = lien
// où le client choisit le montant (bouton "Autre montant", masqué si vide).
const DONATION_AMOUNTS = [5, 10, 25, 50, 100];
const DONATION_LINKS = { 5:'', 10:'', 25:'', 50:'', 100:'', libre:'' };

// Répartition publique des dons — doit toujours faire 100 %.
const DONATION_SPLIT = [
  { pct:75, label:'Redistribués directement en défis joueurs', color:'var(--gold)' },
  { pct:10, label:'Développement de la plateforme', color:'var(--purple)' },
  { pct:10, label:'Marketing', color:'var(--pink)' },
  { pct:3,  label:'Frais bancaires', color:'var(--cyan)' },
  { pct:2,  label:'Achat de cadeaux pour les joueurs', color:'var(--orange)' },
];

const PREVIEW_KEY = 'tgr_apercu';
const ADMIN_CODE_HASH = 'b26f8898a5b0549a88569192ac7128950bf29b82ce4ddc1e48516e5b071c9c3b'; // sha256('tgr:' + code)

function isLaunched(){ return new Date() >= LAUNCH_DATE; }
function waitlistReady(){ return !!(WAITLIST_FORM.formId && WAITLIST_FORM.emailField); }
async function unlockPreview(code){
  const bytes = new TextEncoder().encode('tgr:' + code);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(digest), b=> b.toString(16).padStart(2,'0')).join('');
  if(hex!==ADMIN_CODE_HASH) return false;
  try{ localStorage.setItem(PREVIEW_KEY, '1'); }catch(e){}
  return true;
}
function hasPreviewAccess(){
  try{ return localStorage.getItem(PREVIEW_KEY)==='1'; }catch(e){ return false; }
}

(function(){
  try{
    if(new URLSearchParams(location.search).get('apercu')==='off') localStorage.removeItem(PREVIEW_KEY);
  }catch(e){}
  const onWaitlistPage = /rejoindre\.html$/.test(location.pathname);
  if(!onWaitlistPage && waitlistReady() && !isLaunched() && !hasPreviewAccess()){
    location.replace('rejoindre.html');
  }
})();
