/* ============ THE GAMER RICH — internationalisation ============
   Traduit le chrome (nav, boutons, titres de section) dans 6 langues.
   Le contenu généré par les utilisateurs (titres de défis, vidéos...)
   reste dans sa langue d'origine — une vraie plateforme multilingue
   nécessiterait des champs traduits ou un pipeline de traduction côté
   serveur, hors de portée de ce prototype statique. */

const LANGS = [
  { code:'fr', label:'Français', flag:'🇫🇷' },
  { code:'en', label:'English', flag:'🇬🇧' },
  { code:'es', label:'Español', flag:'🇪🇸' },
  { code:'zh', label:'中文', flag:'🇨🇳' },
  { code:'ru', label:'Русский', flag:'🇷🇺' },
  { code:'hi', label:'हिन्दी', flag:'🇮🇳' },
];

const I18N = {
  fr:{
    nav_home:'Accueil', nav_challenges:'Défis', nav_videos:'Vidéos et astuces', nav_leaderboard:'Classements',
    nav_community:'Communauté', nav_profile:'Mon profil', nav_settings:'Paramètres', nav_admin:'Admin',
    nav_create_challenge:'Lancer un défi',
    btn_login:'Connexion', btn_register:"S'inscrire", btn_participate:'Participer', btn_follow:'Suivre',
    btn_following:'Suivi ✓', btn_like:"J'aime", btn_share:'Partager', btn_report:'Signaler', btn_comment:'Commenter',
    btn_view_all:'Tout voir →', btn_pay_publish:'Payer et publier',
    demo_banner:'Version démo — données fictives, aucun paiement réel, aucune connexion aux serveurs GTA 6',
    hero_reward:'Récompense confirmée', hero_participants:'Participants', hero_time_left:'Temps restant', hero_duration:'Durée du défi',
    section_active_challenges:'Défis actifs — choisis le tien', section_challenge_videos:'Vidéos du défi principal',
    section_top10:'Top 10 joueurs', section_next_challenge:'Prochain défi', section_community:'Communauté',
    challenges_title:'Défis', tab_all:'Tous', tab_active:'En cours', tab_upcoming:'À venir', tab_closed:'Terminés',
    tier_standard:'Standard', tier_yacht:'Prime Yacht',
    videos_title:'Vidéos et astuces', publish_btn:'+ Publier',
    leaderboard_title:'Classements', community_title:'Communauté & crews', create_crew:'+ Créer un crew',
    profile_presentation:'Présentation', profile_videos:'Vidéos', profile_tips:'Astuces', profile_palmares:'Palmarès',
    login_title:'Connexion', register_title:'Créer un compte', settings_title:'Paramètres',
    create_challenge_title:'Lancer un défi', lang_select:'Langue',
  },
  en:{
    nav_home:'Home', nav_challenges:'Challenges', nav_videos:'Videos & tips', nav_leaderboard:'Leaderboards',
    nav_community:'Community', nav_profile:'My profile', nav_settings:'Settings', nav_admin:'Admin',
    nav_create_challenge:'Launch a challenge',
    btn_login:'Log in', btn_register:'Sign up', btn_participate:'Join', btn_follow:'Follow',
    btn_following:'Following ✓', btn_like:'Like', btn_share:'Share', btn_report:'Report', btn_comment:'Comment',
    btn_view_all:'View all →', btn_pay_publish:'Pay & publish',
    demo_banner:'Demo build — mock data, no real payments, no connection to GTA 6 servers',
    hero_reward:'Confirmed reward', hero_participants:'Participants', hero_time_left:'Time left', hero_duration:'Challenge length',
    section_active_challenges:'Active challenges — pick yours', section_challenge_videos:'Featured challenge videos',
    section_top10:'Top 10 players', section_next_challenge:'Next challenge', section_community:'Community',
    challenges_title:'Challenges', tab_all:'All', tab_active:'Active', tab_upcoming:'Upcoming', tab_closed:'Closed',
    tier_standard:'Standard', tier_yacht:'Yacht Prime',
    videos_title:'Videos & tips', publish_btn:'+ Publish',
    leaderboard_title:'Leaderboards', community_title:'Community & crews', create_crew:'+ Create a crew',
    profile_presentation:'About', profile_videos:'Videos', profile_tips:'Tips', profile_palmares:'Track record',
    login_title:'Log in', register_title:'Create an account', settings_title:'Settings',
    create_challenge_title:'Launch a challenge', lang_select:'Language',
  },
  es:{
    nav_home:'Inicio', nav_challenges:'Retos', nav_videos:'Vídeos y trucos', nav_leaderboard:'Clasificaciones',
    nav_community:'Comunidad', nav_profile:'Mi perfil', nav_settings:'Ajustes', nav_admin:'Admin',
    nav_create_challenge:'Lanzar un reto',
    btn_login:'Iniciar sesión', btn_register:'Registrarse', btn_participate:'Participar', btn_follow:'Seguir',
    btn_following:'Siguiendo ✓', btn_like:'Me gusta', btn_share:'Compartir', btn_report:'Reportar', btn_comment:'Comentar',
    btn_view_all:'Ver todo →', btn_pay_publish:'Pagar y publicar',
    demo_banner:'Versión demo — datos ficticios, sin pagos reales, sin conexión a los servidores de GTA 6',
    hero_reward:'Recompensa confirmada', hero_participants:'Participantes', hero_time_left:'Tiempo restante', hero_duration:'Duración del reto',
    section_active_challenges:'Retos activos — elige el tuyo', section_challenge_videos:'Vídeos del reto principal',
    section_top10:'Top 10 jugadores', section_next_challenge:'Próximo reto', section_community:'Comunidad',
    challenges_title:'Retos', tab_all:'Todos', tab_active:'En curso', tab_upcoming:'Próximos', tab_closed:'Finalizados',
    tier_standard:'Estándar', tier_yacht:'Prime Yacht',
    videos_title:'Vídeos y trucos', publish_btn:'+ Publicar',
    leaderboard_title:'Clasificaciones', community_title:'Comunidad y crews', create_crew:'+ Crear un crew',
    profile_presentation:'Presentación', profile_videos:'Vídeos', profile_tips:'Trucos', profile_palmares:'Palmarés',
    login_title:'Iniciar sesión', register_title:'Crear una cuenta', settings_title:'Ajustes',
    create_challenge_title:'Lanzar un reto', lang_select:'Idioma',
  },
  zh:{
    nav_home:'首页', nav_challenges:'挑战', nav_videos:'视频与技巧', nav_leaderboard:'排行榜',
    nav_community:'社区', nav_profile:'我的主页', nav_settings:'设置', nav_admin:'管理后台',
    nav_create_challenge:'发起挑战',
    btn_login:'登录', btn_register:'注册', btn_participate:'参加', btn_follow:'关注',
    btn_following:'已关注 ✓', btn_like:'点赞', btn_share:'分享', btn_report:'举报', btn_comment:'评论',
    btn_view_all:'查看全部 →', btn_pay_publish:'支付并发布',
    demo_banner:'演示版本 — 数据为模拟，无真实支付，不连接 GTA 6 服务器',
    hero_reward:'已确认奖金', hero_participants:'参与人数', hero_time_left:'剩余时间', hero_duration:'挑战时长',
    section_active_challenges:'进行中的挑战 — 选择你的挑战', section_challenge_videos:'主挑战精选视频',
    section_top10:'玩家排行榜前十', section_next_challenge:'下一个挑战', section_community:'社区精选',
    challenges_title:'挑战', tab_all:'全部', tab_active:'进行中', tab_upcoming:'即将开始', tab_closed:'已结束',
    tier_standard:'标准', tier_yacht:'游艇尊享',
    videos_title:'视频与技巧', publish_btn:'+ 发布',
    leaderboard_title:'排行榜', community_title:'社区与战队', create_crew:'+ 创建战队',
    profile_presentation:'简介', profile_videos:'视频', profile_tips:'技巧', profile_palmares:'战绩',
    login_title:'登录', register_title:'创建账号', settings_title:'设置',
    create_challenge_title:'发起挑战', lang_select:'语言',
  },
  ru:{
    nav_home:'Главная', nav_challenges:'Челленджи', nav_videos:'Видео и советы', nav_leaderboard:'Рейтинги',
    nav_community:'Сообщество', nav_profile:'Мой профиль', nav_settings:'Настройки', nav_admin:'Админка',
    nav_create_challenge:'Создать челлендж',
    btn_login:'Войти', btn_register:'Регистрация', btn_participate:'Участвовать', btn_follow:'Подписаться',
    btn_following:'Подписан ✓', btn_like:'Нравится', btn_share:'Поделиться', btn_report:'Пожаловаться', btn_comment:'Комментировать',
    btn_view_all:'Смотреть все →', btn_pay_publish:'Оплатить и опубликовать',
    demo_banner:'Демо-версия — тестовые данные, без реальных платежей, без подключения к серверам GTA 6',
    hero_reward:'Подтверждённая награда', hero_participants:'Участники', hero_time_left:'Осталось времени', hero_duration:'Длительность челленджа',
    section_active_challenges:'Активные челленджи — выбери свой', section_challenge_videos:'Видео главного челленджа',
    section_top10:'Топ-10 игроков', section_next_challenge:'Следующий челлендж', section_community:'Сообщество',
    challenges_title:'Челленджи', tab_all:'Все', tab_active:'Активные', tab_upcoming:'Скоро', tab_closed:'Завершены',
    tier_standard:'Стандарт', tier_yacht:'Прайм Yacht',
    videos_title:'Видео и советы', publish_btn:'+ Опубликовать',
    leaderboard_title:'Рейтинги', community_title:'Сообщество и группы', create_crew:'+ Создать группу',
    profile_presentation:'О себе', profile_videos:'Видео', profile_tips:'Советы', profile_palmares:'Достижения',
    login_title:'Войти', register_title:'Создать аккаунт', settings_title:'Настройки',
    create_challenge_title:'Создать челлендж', lang_select:'Язык',
  },
  hi:{
    nav_home:'होम', nav_challenges:'चैलेंज', nav_videos:'वीडियो और टिप्स', nav_leaderboard:'लीडरबोर्ड',
    nav_community:'कम्युनिटी', nav_profile:'मेरी प्रोफ़ाइल', nav_settings:'सेटिंग्स', nav_admin:'एडमिन',
    nav_create_challenge:'चैलेंज बनाएं',
    btn_login:'लॉगिन', btn_register:'साइन अप करें', btn_participate:'भाग लें', btn_follow:'फॉलो करें',
    btn_following:'फॉलो किया ✓', btn_like:'लाइक', btn_share:'शेयर करें', btn_report:'रिपोर्ट करें', btn_comment:'कमेंट करें',
    btn_view_all:'सभी देखें →', btn_pay_publish:'भुगतान करें और प्रकाशित करें',
    demo_banner:'डेमो संस्करण — काल्पनिक डेटा, कोई वास्तविक भुगतान नहीं, GTA 6 सर्वर से कोई कनेक्शन नहीं',
    hero_reward:'पुष्टि किया इनाम', hero_participants:'प्रतिभागी', hero_time_left:'शेष समय', hero_duration:'चैलेंज की अवधि',
    section_active_challenges:'सक्रिय चैलेंज — अपना चुनें', section_challenge_videos:'मुख्य चैलेंज के वीडियो',
    section_top10:'टॉप 10 खिलाड़ी', section_next_challenge:'अगला चैलेंज', section_community:'कम्युनिटी',
    challenges_title:'चैलेंज', tab_all:'सभी', tab_active:'चल रहे', tab_upcoming:'आगामी', tab_closed:'समाप्त',
    tier_standard:'स्टैंडर्ड', tier_yacht:'यॉट प्राइम',
    videos_title:'वीडियो और टिप्स', publish_btn:'+ प्रकाशित करें',
    leaderboard_title:'लीडरबोर्ड', community_title:'कम्युनिटी और क्रू', create_crew:'+ क्रू बनाएं',
    profile_presentation:'परिचय', profile_videos:'वीडियो', profile_tips:'टिप्स', profile_palmares:'उपलब्धियां',
    login_title:'लॉगिन', register_title:'खाता बनाएं', settings_title:'सेटिंग्स',
    create_challenge_title:'चैलेंज बनाएं', lang_select:'भाषा',
  },
};

function getLang(){ return localStorage.getItem('tgr_lang') || 'fr'; }
function setLang(code){ localStorage.setItem('tgr_lang', code); location.reload(); }
function t(key){
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.fr[key] || key;
}
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.dataset.i18n);
  });
  document.documentElement.lang = getLang();
}
