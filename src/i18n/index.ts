import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        academy: "Academy",
        resources: "Resources",
        books: "Books",
        shop: "Shop",
        appointments: "Appointments",
        blog: "Blog",
        contact: "Contact",
        dashboard: "Dashboard"
      },
      hero: {
        tagline: "We Care About You",
        sub: "Redefining Public Health, Mental Wellness, Child Protection, & Domestic Violence Support",
        desc: "Moses Chris is an Author, Epidemiologist, Public Health Consultant, Mental Health Counsellor, and Domestic Violence Advocate carrying forward a dual mission of community healing and global education.",
        cta_book: "Book Appointment",
        cta_academy: "Explore Academy",
        cta_contact: "Contact Moses"
      },
      stats: {
        certificates: "Certificates & Credentials",
        awards: "Global Awards",
        cases: "Resolved Public & Personal Cases"
      },
      services: {
        title: "Professional Expertise",
        subtitle: "Global consulting and compassionate support in crucial domains",
        epidemiology: "Epidemiology & Outbreaks",
        mental_health: "Mental Health Counselling",
        domestic_violence: "Domestic Violence Support",
        maternal_health: "Maternal & Child Health",
        coaching: "Coaching & Consulting",
        training: "Workshops & Capacity Building"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À Propos",
        services: "Services",
        academy: "Académie",
        resources: "Ressources",
        books: "Livres",
        shop: "Boutique",
        appointments: "Rendez-vous",
        blog: "Blog",
        contact: "Contact",
        dashboard: "Tableau de Bord"
      },
      hero: {
        tagline: "Nous prenons soin de vous",
        sub: "Redéfinir la santé publique, le bien-être mental, et la protection de l'enfance",
        desc: "Moses Chris est auteur, épidémiologiste, consultant en santé publique, conseiller en santé mentale et défenseur contre la violence domestique.",
        cta_book: "Prendre RDV",
        cta_academy: "Explorer l'Académie",
        cta_contact: "Contacter Moses"
      },
      stats: {
        certificates: "Certificats et Diplômes",
        awards: "Prix Internationaux",
        cases: "Cas Résolus d'Intérêt Public & Personnel"
      },
      services: {
        title: "Expertise Professionnelle",
        subtitle: "Conseils mondiaux et soutien compatissant dans des domaines cruciaux",
        epidemiology: "Épidémiologie & Épidémies",
        mental_health: "Conseil en Santé Mentale",
        domestic_violence: "Soutien Violence Domestique",
        maternal_health: "Santé Maternelle & Infantile",
        coaching: "Coaching & Conseil",
        training: "Ateliers & Renforcement des Capacités"
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Sobre Mí",
        services: "Servicios",
        academy: "Academia",
        resources: "Recursos",
        books: "Libros",
        shop: "Tienda",
        appointments: "Citas",
        blog: "Blog",
        contact: "Contacto",
        dashboard: "Panel de Control"
      },
      hero: {
        tagline: "Nos Importas",
        sub: "Redefiniendo la Salud Pública, el Bienestar Mental y la Protección Infantil",
        desc: "Moses Chris es Autor, Epidemiólogo, Consultor de Salud Pública, Consejero de Salud Mental y Defensor contra la Violencia Doméstica.",
        cta_book: "Reservar Cita",
        cta_academy: "Explorar Academia",
        cta_contact: "Contactar a Moses"
      },
      stats: {
        certificates: "Certificados y Credenciales",
        awards: "Premios Globales",
        cases: "Casos Públicos y Personales Resueltos"
      },
      services: {
        title: "Experiencia Profesional",
        subtitle: "Consultoría global y apoyo compasivo en dominios cruciales",
        epidemiology: "Epidemiólogo & Investigación",
        mental_health: "Consejería de Salud Mental",
        domestic_violence: "Apoyo en Violencia Doméstica",
        maternal_health: "Salud Maternal e Infantil",
        coaching: "Coaching y Consultoría",
        training: "Capacitación y Talleres"
      }
    }
  },
  pt: {
    translation: {
      nav: {
        home: "Início",
        about: "Sobre",
        services: "Serviços",
        academy: "Academia",
        resources: "Recursos",
        books: "Livros",
        shop: "Loja",
        appointments: "Agendamentos",
        blog: "Blog",
        contact: "Contato",
        dashboard: "Painel"
      },
      hero: {
        tagline: "Nós Nos Importamos com Você",
        sub: "Redefinindo Saúde Pública, Saúde Mental e Apoio à Violência Doméstica",
        desc: "Moses Chris é Autor, Epidemiologista, Consultor de Saúde Pública, Conselheiro de Saúde Mental e Defensor da Justiça Social.",
        cta_book: "Agendar Consulta",
        cta_academy: "Explorar Academia",
        cta_contact: "Contatar Moses"
      },
      stats: {
        certificates: "Certificados e Credenciais",
        awards: "Prêmios Globais",
        cases: "Casos Resolvidos Públicos e Privados"
      },
      services: {
        title: "Experiência Profissional",
        subtitle: "Consultoria global e suporte compassivo em áreas cruciais",
        epidemiology: "Epidemiologia e Pesquisa",
        mental_health: "Aconselhamento Mental",
        domestic_violence: "Apoio Violência Doméstica",
        maternal_health: "Saúde Materno-Infantil",
        coaching: "Coaching & Consultoria",
        training: "Workshops e Treinamentos"
      }
    }
  },
  de: {
    translation: {
      nav: {
        home: "Startseite",
        about: "Über mich",
        services: "Dienstleistungen",
        academy: "Akademie",
        resources: "Ressourcen",
        books: "Bücher",
        shop: "Shop",
        appointments: "Termine",
        blog: "Blog",
        contact: "Kontakt",
        dashboard: "Dashboard"
      },
      hero: {
        tagline: "Wir sorgen uns um Sie",
        sub: "Neudefinition von öffentlicher Gesundheit, psychischer Wellness und Kinderschutz",
        desc: "Moses Chris ist Autor, Epidemiologe, Berater für öffentliche Gesundheit, Therapeut und Fürsprecher bei häuslicher Gewalt.",
        cta_book: "Termin buchen",
        cta_academy: "Akademie erkunden",
        cta_contact: "Moses kontaktieren"
      },
      stats: {
        certificates: "Zertifikate & Nachweise",
        awards: "Globale Auszeichnungen",
        cases: "Gelöste öffentliche & persönliche Fälle"
      },
      services: {
        title: "Berufliche Expertise",
        subtitle: "Globale Beratung und mitfühlende Unterstützung in entscheidenden Bereichen",
        epidemiology: "Epidemiologie & Ausbrüche",
        mental_health: "Psychische Beratung",
        domestic_violence: "Unterstützung bei häuslicher Gewalt",
        maternal_health: "Mütter- & Kindergesundheit",
        coaching: "Coaching & Beratung",
        training: "Workshops & Kapazitätsaufbau"
      }
    }
  },
  ig: {
    translation: {
      nav: {
        home: "Ụlọ",
        about: "Maka Anyị",
        services: "Ọrụ Anyị",
        academy: "Ụlọ Akwụkwọ",
        resources: "Akụrụngwa",
        books: "Akwụkwọ",
        shop: "Ụlọ Ahịa",
        appointments: "Nkwurịta Okwu",
        blog: "Blọọgụ",
        contact: "Kpọtụrụ Anyị",
        dashboard: "Ogige Ozi"
      },
      hero: {
        tagline: "Anyị na-eche banyere gị",
        sub: "Imegharị ahụike ọha, ọdịmma uche, nchedo ụmụaka na nkwado megide ime ihe ike n'ụlọ",
        desc: "Moses Chris bụ Onye edemede, Onye na-ahụ maka ọrịa (Epidemiologist), Onye ndụmọdụ ahụike ọha, na Onye na-akwado ikike mmadụ.",
        cta_book: "Debe Oge Nzukọ",
        cta_academy: "Chọpụta Ụlọ Akwụkwọ",
        cta_contact: "Kpọtụrụ Moses"
      },
      stats: {
        certificates: "Asambodo & Nzere",
        awards: "Ihe Nrite Mba Nile",
        cases: "Okwu Ikpe Dị Mma E Doziri"
      },
      services: {
        title: "Ọkachamara Ọrụ",
        subtitle: "Ndụmọdụ mba ụwa na nkwado ọmiko na ngalaba dị mkpa",
        epidemiology: "Ọrịa Na-efe Efe & Nchọpụta",
        mental_health: "Ndụmọdụ Ahụike Uche",
        domestic_violence: "Nkwado Ihe Ike n'Ụlọ",
        maternal_health: "Ahụike Nne & Nwa",
        coaching: "Ọzụzụ & Ndụmọdụ",
        training: "Ọmụmụ Ihe & Mwulite Ike"
      }
    }
  },
  yo: {
    translation: {
      nav: {
        home: "Ile",
        about: "Nipa Wa",
        services: "Awọn Iṣẹ",
        academy: "Ile-Ẹkọ",
        resources: "Awọn Ohun Elo",
        books: "Awọn Iwe",
        shop: "Ile-Itaja",
        appointments: "Ipade",
        blog: "Bulọọgi",
        contact: "Kan Si Wa",
        dashboard: "Pẹpẹ Iṣakoso"
      },
      hero: {
        tagline: "A Bikita Nipa Rẹ",
        sub: "Ṣiṣe Atunṣe Ilera Ara Ilu, Ilera Ọpọlọ, Idaabobo Ọmọde ati Atilẹyin Iwa-ipa ninu Ile",
        desc: "Moses Chris jẹ Onkọwe, Onimọ-jinlẹ nipa Arun (Epidemiologist), Oludamoran Ilera, ati Olugbeja Awọn Eto Eda Eniyan.",
        cta_book: "Iwe Ipade",
        cta_academy: "Ṣawari Ile-Ẹkọ",
        cta_contact: "Kan Si Moses"
      },
      stats: {
        certificates: "Awọn Iwe-ẹri & Awọn Ẹri",
        awards: "Awọn Ebun Agbaye",
        cases: "Awọn Ọran Ti A Yanju"
      },
      services: {
        title: "Imọye Ọjọgbọn",
        subtitle: "Ijumọsọrọ agbaye ati atilẹyin aanu ni awọn agbegbe pataki",
        epidemiology: "Ajakale & Iwadi Arun",
        mental_health: "Igbaninimoran Ilera Ọpọlọ",
        domestic_violence: "Atilẹyin Iwa-ipa Ile",
        maternal_health: "Ilera Iya ati Ọmọ",
        coaching: "Ikẹkọ & Ijumọsọrọ",
        training: "Idanileko & Idagbasoke Agbara"
      }
    }
  },
  ha: {
    translation: {
      nav: {
        home: "Gida",
        about: "Game da Mu",
        services: "Ayyuka",
        academy: "Kwalejin Ilimi",
        resources: "Kayan Aiki",
        books: "Littattafai",
        shop: "Shago",
        appointments: "Alƙawari",
        blog: "Shafin Yanar Gizo",
        contact: "Tuntube Mu",
        dashboard: "Gidan Gudanarwa"
      },
      hero: {
        tagline: "Muna Kula da Ku",
        sub: "Fassara Lafiyar Jama'a, Lafiyar Hankali, Kariyar Yara da Tallafin Rikicin Gida",
        desc: "Moses Chris marubuci ne, masanin ilimin cututtuka, mai ba da shawara kan lafiyar jama'a, kuma mai fafutukar kare hakkin bil'adama.",
        cta_book: "Yanke Alƙawari",
        cta_academy: "Bincika Kwaleji",
        cta_contact: "Tuntubi Moses"
      },
      stats: {
        certificates: "Takaddun Shaida & Cancanta",
        awards: "Kyaututtukan Duniya",
        cases: "Korafe-korafe da aka Sasanta"
      },
      services: {
        title: "Kwarewar Kwarewa",
        subtitle: "Shawara ta duniya da tallafi mai tausayi a bangarori masu mahimmanci",
        epidemiology: "Cutar Kwayar Cutar & Cututtuka",
        mental_health: "Shawarar Lafiyar Hankali",
        domestic_violence: "Tallafin Rikicin Cikin Gida",
        maternal_health: "Lafiyar Uwa da Yaro",
        coaching: "Koyarwa & Shawara",
        training: "Bita & Gina Ƙarfin Aiki"
      }
    }
  },
  sw: {
    translation: {
      nav: {
        home: "Mwanzo",
        about: "Kutuhusu",
        services: "Huduma",
        academy: "Chuo",
        resources: "Rasilimali",
        books: "Vitabu",
        shop: "Duka",
        appointments: "Miadi",
        blog: "Blogu",
        contact: "Wasiliana Nasi",
        dashboard: "Dashibodi"
      },
      hero: {
        tagline: "Tunakujali Wewe",
        sub: "Kufafanua Upya Afya ya Umma, Afya ya Akili, Ulinzi wa Mtoto na Ukatili wa Majumbani",
        desc: "Moses Chris ni Mwandishi, Mtaalamu wa Magonjwa ya Mlipuko (Epidemiologist), Mshauri wa Afya ya Umma, na Mtetezi wa Haki za Kibinadamu.",
        cta_book: "Weka Miadi",
        cta_academy: "Gundua Chuo",
        cta_contact: "Wasiliana na Moses"
      },
      stats: {
        certificates: "Vyeti & Sifa za Kitaaluma",
        awards: "Tuzo za Kimataifa",
        cases: "Kesi Zilizotatuliwa za Umma na Kibinafsi"
      },
      services: {
        title: "Utaalamu wa Kitaaluma",
        subtitle: "Ushauri wa kimataifa na msaada wa huruma katika nyanja muhimu",
        epidemiology: "Epidemiyolojia & Magonjwa ya Mlipuko",
        mental_health: "Ushauri wa Afya ya Akili",
        domestic_violence: "Msaada wa Ukatili wa Majumbani",
        maternal_health: "Afya ya Mama na Mtoto",
        coaching: "Ukufunzi & Ushauri",
        training: "Warsha & Kujenga Uwezo"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        about: "عن المنصة",
        services: "الخدمات",
        academy: "الأكاديمية",
        resources: "الموارد",
        books: "الكتب",
        shop: "المتجر",
        appointments: "المواعيد",
        blog: "المدونة",
        contact: "اتصل بنا",
        dashboard: "لوحة التحكم"
      },
      hero: {
        tagline: "نحن نهتم بك",
        sub: "إعادة صياغة الصحة العامة، الصحة النفسية، حماية الطفل ودعم ضحايا العنف المنزلي",
        desc: "موسى كريس مؤلف، خبير وبائيات، مستشار صحة عامة، ومرشد نفسي ومدافع عن حقوق الإنسان.",
        cta_book: "احجز موعداً",
        cta_academy: "استكشف الأكاديمية",
        cta_contact: "تواصل مع موسى"
      },
      stats: {
        certificates: "الشهادات والاعتمادات",
        awards: "جوائز عالمية",
        cases: "قضايا عامة وخاصة تم حلها"
      },
      services: {
        title: "الخبرة المهنية",
        subtitle: "استشارات عالمية ودعم إنساني في مجالات حاسمة",
        epidemiology: "علم الأوبئة والتحقيقات الصحية",
        mental_health: "الإرشاد النفسي والصحة النفسية",
        domestic_violence: "دعم ضحايا العنف الأسري",
        maternal_health: "صحة الأم والطفل",
        coaching: "التدريب والاستشارات",
        training: "ورش العمل وبناء القدرات"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
