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
