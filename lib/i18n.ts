import { content, type Content } from "./content";

export type Lang = "en" | "ar" | "fr";

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "FR" },
];

const ar: Content = {
  meta: {
    title: "منامي: سجّل أحلامك وافهمها وشاركها",
    description:
      "سجّل حلمك بالصوت أو الفيديو أو النص لحظة استيقاظك. يقدّم لك منامي قراءة تأملية مستوحاة من التراث الإسلامي، وأنت من يقرر من يراها.",
  },
  a11y: {
    skipToContent: "انتقل إلى المحتوى",
    skipIntro: "تخطّي المقدمة",
    phoneHome: "شاشة التسجيل في تطبيق منامي مع تبويبات الفيديو والصوت والنص وصف قصص الأصدقاء",
    phoneHow: "تطبيق منامي ينتقل من تسجيل الحلم إلى قراءته بالذكاء الاصطناعي ثم مشاركته كقصة",
    phoneSocial: "تطبيق منامي يعرض حلماً تمت مشاركته",
    logo: "شعار منامي",
    pauseStory: "إيقاف العرض مؤقتاً",
    playStory: "تشغيل العرض",
    prev: "الشريحة السابقة",
    next: "الشريحة التالية",
    slideOf: "الشريحة {n} من {total}",
  },
  loader: {
    wordmark: "manami",
    tagline: "احلم · شارك · اكتشف",
  },
  nav: {
    links: [
      { label: "كيف يعمل", href: "#how" },
      { label: "القراءات", href: "#reading" },
      { label: "المزايا", href: "#features" },
      { label: "الأسعار", href: "#pricing" },
      { label: "الأسئلة الشائعة", href: "#faq" },
    ],
    cta: "حمّل التطبيق",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    language: "اللغة",
    themeLight: "التبديل إلى الوضع الفاتح",
    themeDark: "التبديل إلى الوضع الداكن",
    home: "الصفحة الرئيسية لمنامي",
  },
  stores: {
    appStoreTop: "حمّله من",
    appStore: "App Store",
    googlePlayTop: "احصل عليه من",
    googlePlay: "Google Play",
  },
  hero: {
    headline: "أحلامك تحاول أن تخبرك بشيء.",
    sub: "سجّل حلمك لحظة استيقاظك. يحوّله منامي إلى قراءة تتأمل فيها، وتحتفظ بها لنفسك أو تشاركها مع أصدقائك.",
    trust: "تبقى أحلامك خاصة ما لم تشاركها.",
  },
  screen: {
    tabs: ["فيديو", "صوت", "نص"],
    prompt: "بماذا حلمت؟",
    you: "أنت",
    recording: "أستمع إليك…",
    aiReading: "جارٍ قراءة الحلم…",
    readingTitle: "من الغرفة المظلمة إلى النور",
    readingLine: "انتقلت من الظلمة إلى النور.",
    posted: "تمت المشاركة في قصتك",
    friendsSaw: "عائشة وعمر شاهدا حلمك",
    friendNames: { Aisha: "عائشة", Yusuf: "يوسف", Fatima: "فاطمة", Omar: "عمر", Sara: "سارة" },
  },
  how: {
    title: "من ذكرى باهتة إلى فهم واضح",
    steps: [
      {
        title: "سجّله قبل أن يتلاشى",
        body: "اضغط مرة واحدة وتحدّث. بالصوت أو الفيديو أو النص، أيّها أسهل وعيناك نصف مفتوحتين.",
      },
      {
        title: "اقرأ ما قد يعنيه",
        body: "يقرأ منامي الرموز والمشاعر في حلمك ويكتب لك قراءته خلال ثوانٍ.",
      },
      {
        title: "شاركه أو احتفظ به",
        body: "انشر حلمك كقصة لأصدقائك المقرّبين، أو أبقِه في مذكّراتك حيث لا يراه سواك.",
      },
    ],
  },
  reading: {
    title: "حلم واحد وخمس طرق لقراءته",
    dreamLabel: "حلم تجريبي",
    dreamTitle: "من الغرفة المظلمة إلى النور",
    disclaimer: "التفسيرات تأملات مساعدة، وليست حقيقة مطلقة.",
    actions: { like: "إعجاب", save: "حفظ", comments: "التعليقات", share: "مشاركة" },
    slides: [
      {
        id: "summary",
        emoji: "🌙",
        title: "ملخص الحلم",
        quote: "انتقلت من الظلمة إلى النور — رحلة بدأتها بالفعل في حياتك اليومية.",
        body: "وقفت في غرفة مظلمة، ولمحت نوراً، ثم مشيت نحو باب مفتوح.",
      },
      {
        id: "spiritual",
        emoji: "✨",
        title: "البُعد الروحي",
        quote: "رؤية النور في المنام من أكثر العلامات المباركة في التراث الإسلامي.",
        body: "كثيراً ما يُقرأ النور على أنه هداية، وهنا يظهر في اللحظة التي تبدأ فيها البحث.",
      },
      {
        id: "emotional",
        emoji: "❤️",
        title: "البُعد العاطفي",
        quote: "عقلك الباطن مستعد، ومشاعر السكينة تؤكد ذلك.",
        body: "شعرت بالهدوء لا بالخوف، وهذا الهدوء يستحق أن تنتبه إليه.",
      },
      {
        id: "symbols",
        emoji: "💡",
        title: "الرموز الأساسية",
        body: "ثلاث صور حملت هذا الحلم.",
        symbols: [
          { name: "الغرفة المظلمة", meaning: "الحيرة · البحث · المجهول" },
          { name: "مصدر النور", meaning: "الهداية · الفضل الإلهي · الوضوح" },
          { name: "الباب المفتوح", meaning: "فرصة جديدة · دعوة · عتبة" },
        ],
      },
      {
        id: "reflection",
        emoji: "♻️",
        title: "تأمّل",
        quote: "الباب مفتوح، ولم يبقَ سوى أن تعبره.",
        body: "ما الخطوة الصغيرة التي يمكنك أن تخطوها نحوه هذا الأسبوع؟",
      },
    ],
  },
  features: {
    title: "كل ما يحتاجه الحلم، من أول ذكرى إلى آخر كلمة",
    cards: {
      capture: { title: "صوت أو فيديو أو نص", body: "سجّل حلمك بالطريقة التي تناسب استيقاظك." },
      journal: {
        title: "مذكّرات الأحلام",
        body: "كل حلم موسوم بالشعور الذي تركه فيك.",
        moods: ["هادئ", "غريب", "سعيد", "مؤثّر", "محيّر"],
      },
      eyes: { title: "لعينيّ فقط", body: "خزنة مقفلة للأحلام التي لن تنشرها أبداً." },
      stories: { title: "القصص والريلز", body: "حوّل حلمك إلى قصة قصيرة يشاهدها أصدقاؤك." },
      tag: { title: "الإشارة إلى الأصدقاء", body: "حلمت بأحدهم؟ أخبره بذلك." },
      score: { title: "نقاط الأحلام والسلسلة", body: "ابنِ عادة التذكّر.", scoreLabel: "نقاط الأحلام", streakLabel: "يوماً متتالياً" },
      reminder: { title: "تذكير الصباح", body: "تنبيه لطيف قبل أن يفلت منك الحلم." },
      dictionary: { title: "قاموس الرموز الإسلامي", body: "ابحث عمّا قد يدل عليه الماء أو النور أو الباب." },
      privacy: { title: "إعدادات الخصوصية", body: "اختر من يرى كل حلم.", options: ["الجميع", "الأصدقاء", "أنا فقط"] },
      rtl: { title: "العربية من اليمين إلى اليسار", body: "تجربة عربية كاملة، لا مجرد ترجمة مضافة.", sample: "رأيت نوراً في منامي", sampleLtr: "I saw light in my dream" },
    },
  },
  social: {
    title: "لنحلم معاً",
    sub: "اطّلع على أحلام أصدقائك وتفاعل معها، واكتشف متى رأيتم الحلم نفسه.",
    reels: [
      { title: "الحمامة البيضاء", emoji: "🕊️", quote: "السلام قادم، وروحك تعرف ذلك بالفعل.", by: "عائشة" },
      { title: "البحر عند الفجر", emoji: "🌊", quote: "ما بدا عميقاً بالأمس يحملك اليوم.", by: "عمر" },
      { title: "باب الحديقة", emoji: "🌿", quote: "شيء زرعته منذ زمن بعيد حان وقت ظهوره.", by: "فاطمة" },
      { title: "درج بلا نهاية", emoji: "🪜", quote: "ما زلت تصعد. ربما يكفيك المنظر الآن.", by: "يوسف" },
      { title: "رسالة من الوطن", emoji: "✉️", quote: "هناك من يفكر فيك. راسله أنت أولاً.", by: "سارة" },
      { title: "فوق المدينة", emoji: "🏙️", quote: "من هنا يبدو القلق أصغر بكثير.", by: "عائشة" },
    ],
    bubbles: ["❤️", "💬", "✨", "❤️", "🌙", "💬"],
  },
  privacy: {
    title: "حلمك ملكك حتى تقرر غير ذلك",
    points: [
      { title: "خاص افتراضياً", body: "لا يُشارَك شيء مما تسجله إلا إذا اخترت ذلك." },
      { title: "خزنة مقفلة", body: "احتفظ بأحلامك الأكثر خصوصية في «لعينيّ فقط»." },
      { title: "بياناتك قرارك", body: "صدّر بياناتك أو احذفها في أي وقت." },
    ],
  },
  pricing: {
    title: "ابدأ مجاناً، وارتقِ حين تريد أحلامك المزيد.",
    monthly: "شهرياً",
    yearly: "سنوياً",
    discount: "−30%",
    perMonth: "/شهر",
    forever: "للأبد",
    billedYearly: "83.88$ تُدفع سنوياً",
    billedMonthly: "تُدفع شهرياً",
    popular: "الأكثر شعبية",
    free: {
      name: "المجاني",
      cta: "ابدأ مجاناً",
      features: [
        { label: "3 تفسيرات شهرياً", included: true },
        { label: "الإدخال النصي فقط", included: true },
        { label: "مذكّرات تتسع لـ3 أحلام", included: true },
        { label: "التسجيل بالصوت والفيديو", included: false },
        { label: "ريلز الذكاء الاصطناعي", included: false },
        { label: "المشاركة الاجتماعية", included: false },
      ],
    },
    premium: {
      name: "بريميوم",
      cta: "افتح أحلام بريميوم",
      features: [
        { label: "تفسيرات غير محدودة", included: true },
        { label: "التسجيل الصوتي", included: true },
        { label: "التسجيل بالفيديو", included: true },
        { label: "سجل المذكّرات كاملاً", included: true },
        { label: "ريلز وقصص بالذكاء الاصطناعي", included: true },
        { label: "المشاركة على WhatsApp وTikTok وIG", included: true },
        { label: "قاموس رموز إسلامي متقدم", included: true },
        { label: "أولوية في معالجة الذكاء الاصطناعي", included: true },
      ],
    },
    note: "ألغِ في أي وقت، دون أي أسئلة.",
  },
  faq: {
    title: "أسئلة وأجوبة",
    items: [
      {
        q: "من يستطيع رؤية أحلامي؟",
        a: "أنت فقط، ما لم تختر غير ذلك. يمكن ضبط كل حلم على «الجميع» أو «الأصدقاء» أو «أنا فقط»، وتحفظ «لعينيّ فقط» أحلامك الأكثر خصوصية في خزنة مقفلة. ويمكنك تصدير بياناتك أو حذفها في أي وقت.",
      },
      {
        q: "كيف يفسّر الذكاء الاصطناعي أحلامي؟",
        a: "ينظر منامي في الرموز والأشخاص والمشاعر التي تصفها، ثم يكتب قراءة تضم ملخصاً وبُعداً روحياً وبُعداً عاطفياً ورموزاً أساسية وتأملاً. تعامل معها كمدخل لتفكيرك الخاص، فالتفسيرات تأملات مساعدة وليست حقيقة مطلقة.",
      },
      {
        q: "ما المصادر الإسلامية التي يعتمد عليها منامي؟",
        a: "البُعد الروحي وقاموس الرموز مستوحيان من تراث تعبير الرؤى عند علماء المسلمين. وهي ليست فتاوى دينية، لذا يُرجى الرجوع في مسائل الدين إلى عالم تثق به.",
      },
      {
        q: "هل يدعم منامي اللغة العربية؟",
        a: "نعم. يمكنك استخدام التطبيق بالعربية بتصميم كامل من اليمين إلى اليسار، وهو متاح أيضاً بالإنجليزية والفرنسية.",
      },
      {
        q: "ما الذي أحصل عليه مجاناً؟",
        a: "تشمل الخطة المجانية 3 تفسيرات شهرياً والإدخال النصي ومذكّرات تتسع لـ3 أحلام. ويضيف بريميوم تفسيرات غير محدودة، والتسجيل بالصوت والفيديو، وسجل المذكّرات كاملاً، وريلز وقصص بالذكاء الاصطناعي، والمشاركة.",
      },
      {
        q: "كيف ألغي اشتراك بريميوم؟",
        a: "ألغِ في أي وقت من إعدادات الاشتراكات في App Store أو Google Play، دون أي أسئلة. ويبقى بريميوم فعّالاً حتى نهاية الفترة المدفوعة.",
      },
    ],
  },
  cta: {
    headline: "بماذا حلمت الليلة الماضية؟",
    sub: "دوّنه قبل الفطور. لن يستغرق سوى لحظة.",
  },
  footer: {
    tagline: "احلم · شارك · اكتشف",
    links: [
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "شروط الخدمة", href: "/terms" },
      { label: "مركز المساعدة", href: "/help" },
      { label: "اتصل بنا", href: "/contact" },
    ],
    socialLabel: "منامي على {name}",
    copyright: "© 2026 منامي · صُنع بـ🌙",
  },
};

const fr: Content = {
  meta: {
    title: "Manami : enregistrez, comprenez et partagez vos rêves",
    description:
      "Enregistrez vos rêves par la voix, la vidéo ou le texte dès le réveil. Manami vous offre une lecture inspirée de la tradition islamique, et vous décidez qui peut la voir.",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    skipIntro: "Passer l'intro",
    phoneHome: "Écran de capture de Manami avec les onglets vidéo, voix et texte et une rangée de stories d'amis",
    phoneHow: "Manami passe de l'enregistrement d'un rêve à sa lecture par l'IA, puis à son partage en story",
    phoneSocial: "Manami affiche un rêve partagé",
    logo: "Logo Manami",
    pauseStory: "Mettre le diaporama en pause",
    playStory: "Lancer le diaporama",
    prev: "Diapositive précédente",
    next: "Diapositive suivante",
    slideOf: "Diapositive {n} sur {total}",
  },
  loader: {
    wordmark: "manami",
    tagline: "rêver · partager · découvrir",
  },
  nav: {
    links: [
      { label: "Comment ça marche", href: "#how" },
      { label: "Lectures", href: "#reading" },
      { label: "Fonctions", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Obtenir l'app",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    themeLight: "Passer en mode clair",
    themeDark: "Passer en mode sombre",
    home: "Accueil Manami",
  },
  stores: {
    appStoreTop: "Télécharger dans l'",
    appStore: "App Store",
    googlePlayTop: "Disponible sur",
    googlePlay: "Google Play",
  },
  hero: {
    headline: "Vos rêves essaient de vous dire quelque chose.",
    sub: "Enregistrez un rêve dès le réveil. Manami en fait une lecture à méditer, à garder pour vous ou à partager avec vos amis.",
    trust: "Vos rêves restent privés, sauf si vous les partagez.",
  },
  screen: {
    tabs: ["Vidéo", "Voix", "Texte"],
    prompt: "De quoi avez-vous rêvé ?",
    you: "Vous",
    recording: "À l'écoute…",
    aiReading: "Lecture par l'IA…",
    readingTitle: "De l'ombre à la lumière",
    readingLine: "Vous êtes passé de l'obscurité à la lumière.",
    posted: "Partagé dans votre story",
    friendsSaw: "Aisha et Omar ont vu votre rêve",
    friendNames: { Aisha: "Aisha", Yusuf: "Yusuf", Fatima: "Fatima", Omar: "Omar", Sara: "Sara" },
  },
  how: {
    title: "Du souvenir flou à la compréhension",
    steps: [
      {
        title: "Capturez-le avant qu'il s'efface",
        body: "Un geste, et parlez. Voix, vidéo ou texte : ce qui est le plus simple les yeux à moitié ouverts.",
      },
      {
        title: "Découvrez ce qu'il peut signifier",
        body: "Manami lit les symboles et les émotions de votre rêve et rédige votre lecture en quelques secondes.",
      },
      {
        title: "Partagez-le, ou non",
        body: "Publiez votre rêve en story pour vos proches, ou gardez-le dans votre journal, visible par vous seul.",
      },
    ],
  },
  reading: {
    title: "Un rêve, cinq façons de le lire",
    dreamLabel: "Exemple de rêve",
    dreamTitle: "De l'ombre à la lumière",
    disclaimer: "Les interprétations sont des pistes de réflexion, non une vérité absolue.",
    actions: { like: "J'aime", save: "Enregistrer", comments: "Commentaires", share: "Partager" },
    slides: [
      {
        id: "summary",
        emoji: "🌙",
        title: "Résumé du rêve",
        quote: "Vous êtes passé de l'obscurité à la lumière — un chemin déjà commencé dans votre vie éveillée.",
        body: "Dans une pièce sombre, vous avez aperçu une lumière, puis marché vers une porte ouverte.",
      },
      {
        id: "spiritual",
        emoji: "✨",
        title: "Regard spirituel",
        quote: "Voir de la lumière en rêve compte parmi les signes les plus bénis de la tradition islamique.",
        body: "La lumière se lit souvent comme une guidance. Ici, elle apparaît au moment où vous commencez à chercher.",
      },
      {
        id: "emotional",
        emoji: "❤️",
        title: "Dimension émotionnelle",
        quote: "Votre subconscient est prêt. Le sentiment de paix le confirme.",
        body: "Vous étiez calme plutôt qu'effrayé. Ce calme mérite votre attention.",
      },
      {
        id: "symbols",
        emoji: "💡",
        title: "Symboles clés",
        body: "Trois images portaient ce rêve.",
        symbols: [
          { name: "Pièce sombre", meaning: "incertitude · recherche · inconnu" },
          { name: "Source de lumière", meaning: "guidance · faveur divine · clarté" },
          { name: "Porte ouverte", meaning: "nouvelle chance · invitation · seuil" },
        ],
      },
      {
        id: "reflection",
        emoji: "♻️",
        title: "Réflexion",
        quote: "La porte est ouverte — il ne reste qu'à la franchir.",
        body: "Quel petit pas pourriez-vous faire dans cette direction cette semaine ?",
      },
    ],
  },
  features: {
    title: "Tout ce qu'il faut à un rêve, du premier souvenir au dernier mot",
    cards: {
      capture: { title: "Voix, vidéo ou texte", body: "Capturez un rêve comme vous vous réveillez." },
      journal: {
        title: "Journal des souvenirs",
        body: "Chaque rêve, classé selon ce qu'il vous a fait ressentir.",
        moods: ["Paisible", "Étrange", "Heureux", "Émouvant", "Confus"],
      },
      eyes: { title: "Pour mes yeux", body: "Un coffre verrouillé pour les rêves que vous ne publierez jamais." },
      stories: { title: "Stories et reels", body: "Faites d'un rêve une courte story pour vos amis." },
      tag: { title: "Identifier des amis", body: "Vous avez rêvé de quelqu'un ? Dites-le-lui." },
      score: { title: "Dream Score et série", body: "Prenez l'habitude de vous souvenir.", scoreLabel: "Dream Score", streakLabel: "jours de suite" },
      reminder: { title: "Rappel du matin", body: "Un petit signal avant que le rêve ne s'échappe." },
      dictionary: { title: "Dictionnaire des symboles islamiques", body: "Cherchez ce que l'eau, la lumière ou une porte peuvent signifier." },
      privacy: { title: "Contrôles de confidentialité", body: "Choisissez qui voit chaque rêve.", options: ["Tous", "Amis", "Moi seul"] },
      rtl: { title: "L'arabe, de droite à gauche", body: "Une vraie expérience en arabe, pas une simple traduction.", sample: "رأيت نوراً في منامي", sampleLtr: "J'ai vu une lumière en rêve" },
    },
  },
  social: {
    title: "Rêver ensemble",
    sub: "Voyez ce dont vos amis ont rêvé, réagissez et découvrez quand vous avez fait le même rêve.",
    reels: [
      { title: "La colombe blanche", emoji: "🕊️", quote: "La paix arrive — votre âme le sait déjà.", by: "Aisha" },
      { title: "L'océan à l'aube", emoji: "🌊", quote: "Ce qui semblait trop profond hier vous porte aujourd'hui.", by: "Omar" },
      { title: "La porte du jardin", emoji: "🌿", quote: "Ce que vous avez planté il y a longtemps est prêt à éclore.", by: "Fatima" },
      { title: "L'escalier sans fin", emoji: "🪜", quote: "Vous continuez à monter. La vue suffit peut-être déjà.", by: "Yusuf" },
      { title: "Une lettre du pays", emoji: "✉️", quote: "Quelqu'un pense à vous. Écrivez-lui le premier.", by: "Sara" },
      { title: "Au-dessus de la ville", emoji: "🏙️", quote: "D'ici, l'inquiétude paraît bien plus petite.", by: "Aisha" },
    ],
    bubbles: ["❤️", "💬", "✨", "❤️", "🌙", "💬"],
  },
  privacy: {
    title: "Un rêve vous appartient, jusqu'à ce que vous en décidiez autrement",
    points: [
      { title: "Privé par défaut", body: "Rien de ce que vous enregistrez n'est partagé sans votre choix." },
      { title: "Un coffre verrouillé", body: "Gardez vos rêves les plus intimes dans « Pour mes yeux »." },
      { title: "Vos données, votre choix", body: "Exportez ou supprimez vos données à tout moment." },
    ],
  },
  pricing: {
    title: "Commencez gratuitement. Passez à la suite quand vos rêves en demandent plus.",
    monthly: "Mensuel",
    yearly: "Annuel",
    discount: "−30 %",
    perMonth: "/mois",
    forever: "pour toujours",
    billedYearly: "83,88 $ facturés par an",
    billedMonthly: "Facturé chaque mois",
    popular: "Le plus populaire",
    free: {
      name: "Gratuit",
      cta: "Commencer gratuitement",
      features: [
        { label: "3 interprétations par mois", included: true },
        { label: "Saisie de texte uniquement", included: true },
        { label: "Journal limité à 3 rêves", included: true },
        { label: "Capture voix et vidéo", included: false },
        { label: "Reels par IA", included: false },
        { label: "Partage social", included: false },
      ],
    },
    premium: {
      name: "Premium",
      cta: "Débloquer Premium",
      features: [
        { label: "Interprétations illimitées", included: true },
        { label: "Capture vocale", included: true },
        { label: "Capture vidéo", included: true },
        { label: "Historique complet du journal", included: true },
        { label: "Reels et stories par IA", included: true },
        { label: "Partage sur WhatsApp, TikTok et IG", included: true },
        { label: "Dictionnaire avancé des symboles islamiques", included: true },
        { label: "Traitement IA prioritaire", included: true },
      ],
    },
    note: "Annulez à tout moment. Sans aucune question.",
  },
  faq: {
    title: "Vos questions, nos réponses",
    items: [
      {
        q: "Qui peut voir mes rêves ?",
        a: "Vous seul, sauf si vous en décidez autrement. Chaque rêve peut être réglé sur Tous, Amis ou Moi seul, et « Pour mes yeux » garde vos rêves les plus intimes dans un coffre verrouillé. Vous pouvez exporter ou supprimer vos données à tout moment.",
      },
      {
        q: "Comment l'IA interprète-t-elle mes rêves ?",
        a: "Manami examine les symboles, les personnes et les émotions que vous décrivez, puis rédige une lecture : résumé, regard spirituel, dimension émotionnelle, symboles clés et réflexion. Voyez-y un point de départ. Les interprétations sont des pistes de réflexion, non une vérité absolue.",
      },
      {
        q: "Sur quelles sources islamiques Manami s'appuie-t-il ?",
        a: "Le regard spirituel et le dictionnaire des symboles s'inspirent de la tradition d'interprétation des rêves chez les savants musulmans. Ce ne sont pas des avis religieux : pour les questions de foi, adressez-vous à un savant de confiance.",
      },
      {
        q: "Manami fonctionne-t-il en arabe ?",
        a: "Oui. L'application s'utilise en arabe avec une mise en page entièrement de droite à gauche. Elle existe aussi en anglais et en français.",
      },
      {
        q: "Qu'est-ce qui est gratuit ?",
        a: "L'offre gratuite comprend 3 interprétations par mois, la saisie de texte et un journal de 3 rêves. Premium ajoute les interprétations illimitées, la capture voix et vidéo, l'historique complet, les reels et stories par IA, et le partage.",
      },
      {
        q: "Comment annuler Premium ?",
        a: "Annulez à tout moment depuis les abonnements de l'App Store ou de Google Play, sans aucune question. Premium reste actif jusqu'à la fin de la période payée.",
      },
    ],
  },
  cta: {
    headline: "De quoi avez-vous rêvé cette nuit ?",
    sub: "Notez-le avant le petit-déjeuner. Il suffit d'un instant.",
  },
  footer: {
    tagline: "rêver · partager · découvrir",
    links: [
      { label: "Politique de confidentialité", href: "/privacy" },
      { label: "Conditions d'utilisation", href: "/terms" },
      { label: "Centre d'aide", href: "/help" },
      { label: "Contact", href: "/contact" },
    ],
    socialLabel: "Manami sur {name}",
    copyright: "© 2026 Manami · Fait avec 🌙",
  },
};

export const dictionaries: Record<Lang, Content> = { en: content, ar, fr };
