export type Locale = 'en' | 'nb'

export interface Feature {
  title: string
  description: string
}

export interface Dictionary {
  meta: {
    home: { title: string; description: string }
    privacy: { title: string; description: string }
    support: { title: string; description: string }
  }
  a11y: {
    skipToContent: string
  }
  nav: {
    privacy: string
    support: string
    languageLabel: string
    footerLabel: string
  }
  hero: {
    eyebrow: string
    title: string
    tagline: string
    ctaAppStore: string
    ctaGithub: string
  }
  highlights: string[]
  features: {
    title: string
    items: Feature[]
  }
  gallery: {
    title: string
    captions: {
      gauge: string
      trip: string
      settings: string
      log: string
    }
  }
  openSource: {
    title: string
    body: string
    cta: string
  }
  footer: {
    copyright: string
  }
  privacy: {
    title: string
    updated: string
    sections: { heading: string; body: string }[]
  }
  support: {
    title: string
    intro: string
    faq: { question: string; answer: string }[]
    issuesCta: string
  }
}

export const translations: Record<Locale, Dictionary> = {
  en: {
    meta: {
      home: {
        title: 'BikeSpeed — Free GPS Speedometer for Cyclists',
        description:
          'A simple, free GPS speedometer for cyclists. No ads, no subscriptions, open source.',
      },
      privacy: {
        title: 'Privacy Policy — BikeSpeed',
        description: 'How BikeSpeed handles your data.',
      },
      support: {
        title: 'Support — BikeSpeed',
        description: 'Get help with BikeSpeed.',
      },
    },
    a11y: {
      skipToContent: 'Skip to content',
    },
    nav: {
      privacy: 'Privacy Policy',
      support: 'Support',
      languageLabel: 'Language',
      footerLabel: 'Footer',
    },
    hero: {
      eyebrow: 'Retro speedometer app',
      title: 'BikeSpeed',
      tagline: 'A simple, free GPS speedometer for your bike rides.',
      ctaAppStore: 'Download on the App Store',
      ctaGithub: 'View on GitHub',
    },
    highlights: ['100% Free', 'No Ads', 'No Subscriptions', 'Open Source'],
    features: {
      title: 'Everything you need, nothing you don’t',
      items: [
        {
          title: 'Big, easy-to-read speedometer',
          description:
            'A clear, glanceable display designed to be read at a glance while riding.',
        },
        {
          title: 'Metric & imperial units',
          description:
            'Switch freely between km/h and mph, whatever you’re used to.',
        },
        {
          title: 'Trip logging',
          description:
            'Every ride is logged with average speed, max speed, distance and duration.',
        },
        {
          title: 'Detailed per-trip stats',
          description:
            'Dig into the numbers for any past ride, whenever you want.',
        },
        {
          title: 'Elevation profile',
          description:
            'See the elevation profile for every ride you’ve recorded.',
        },
        {
          title: 'Real-time altitude',
          description: 'Your current altitude above sea level, updated live.',
        },
      ],
    },
    gallery: {
      title: 'See it in action',
      captions: {
        gauge: 'Speedometer',
        trip: 'Trip tracking',
        settings: 'Settings',
        log: 'Ride history',
      },
    },
    openSource: {
      title: 'Free and open source',
      body: 'BikeSpeed is open source and licensed under the MIT license. The source code is on GitHub, so anyone can see how the app works, contribute improvements, or use it as inspiration for their own projects.',
      cta: 'View source on GitHub',
    },
    footer: {
      copyright: '© {year} BikeSpeed. Open source under the MIT license.',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: 'Overview',
          body: 'BikeSpeed does not collect, store, or share any personal data. Everything the app generates stays on your device.',
        },
        {
          heading: 'Location data',
          body: 'BikeSpeed uses your device’s GPS to calculate speed, distance and altitude while you’re using the app. This location data is processed entirely on your device and is never sent to us or any third party.',
        },
        {
          heading: 'Trip data',
          body: 'Ride logs — average speed, max speed, distance, duration and elevation — are stored locally in the app and are never uploaded anywhere. Deleting the app deletes this data.',
        },
        {
          heading: 'No analytics or tracking',
          body: 'BikeSpeed does not use analytics SDKs, advertising identifiers, or any third-party tracking.',
        },
        {
          heading: 'No account required',
          body: 'You don’t need to sign up or log in to use BikeSpeed.',
        },
        {
          heading: 'Open source',
          body: 'Because BikeSpeed is open source, you can review exactly how the app handles data on GitHub.',
        },
        {
          heading: 'Questions',
          body: 'If you have questions about this policy, open an issue on the GitHub repository.',
        },
      ],
    },
    support: {
      title: 'Support',
      intro: 'Need help with BikeSpeed? Here’s how to get it.',
      faq: [
        {
          question: 'How do I switch between km/h and mph?',
          answer: 'Open Settings in the app and toggle the units.',
        },
        {
          question: 'Where is my ride data stored?',
          answer:
            'All ride history is stored locally on your device — nothing is uploaded anywhere.',
        },
        {
          question: 'I found a bug or have a feature request.',
          answer:
            'Please open an issue on the GitHub repository — that’s the fastest way to reach the developer.',
        },
        {
          question: 'Is BikeSpeed really free?',
          answer: 'Yes. No ads, no subscriptions, no in-app purchases — ever.',
        },
      ],
      issuesCta: 'Open an issue on GitHub',
    },
  },
  nb: {
    meta: {
      home: {
        title: 'BikeSpeed — Gratis GPS-speedometer for syklister',
        description:
          'Et enkelt og gratis GPS-speedometer for syklister. Ingen reklame, ingen abonnementer, åpen kildekode.',
      },
      privacy: {
        title: 'Personvernerklæring — BikeSpeed',
        description: 'Slik behandler BikeSpeed dataene dine.',
      },
      support: {
        title: 'Support — BikeSpeed',
        description: 'Få hjelp med BikeSpeed.',
      },
    },
    a11y: {
      skipToContent: 'Hopp til innhold',
    },
    nav: {
      privacy: 'Personvern',
      support: 'Support',
      languageLabel: 'Språk',
      footerLabel: 'Bunntekst',
    },
    hero: {
      eyebrow: 'Retro speedometer-app',
      title: 'BikeSpeed',
      tagline: 'Et enkelt, gratis GPS-speedometer for sykkelturene dine.',
      ctaAppStore: 'Last ned i App Store',
      ctaGithub: 'Se på GitHub',
    },
    highlights: [
      '100% gratis',
      'Ingen reklame',
      'Ingen abonnementer',
      'Åpen kildekode',
    ],
    features: {
      title: 'Alt du trenger, ingenting du ikke trenger',
      items: [
        {
          title: 'Stort og lettlest speedometer',
          description:
            'En tydelig visning som er enkel å lese med et raskt blikk mens du sykler.',
        },
        {
          title: 'Metriske og imperiale enheter',
          description:
            'Bytt fritt mellom km/t og mph, akkurat som du foretrekker.',
        },
        {
          title: 'Loggfør sykkelturer',
          description:
            'Hver tur logges med gjennomsnittsfart, maksfart, distanse og varighet.',
        },
        {
          title: 'Detaljert statistikk per tur',
          description:
            'Dykk ned i tallene for enhver tidligere tur, når du vil.',
        },
        {
          title: 'Høydeprofil',
          description: 'Se høydeprofilen for alle turer du har registrert.',
        },
        {
          title: 'Høyde over havet i sanntid',
          description: 'Din nåværende høyde over havet, oppdatert i sanntid.',
        },
      ],
    },
    gallery: {
      title: 'Se appen i bruk',
      captions: {
        gauge: 'Speedometer',
        trip: 'Turlogging',
        settings: 'Innstillinger',
        log: 'Turhistorikk',
      },
    },
    openSource: {
      title: 'Gratis og åpen kildekode',
      body: 'BikeSpeed er åpen kildekode og lisensiert under MIT-lisensen. Kildekoden ligger på GitHub, slik at alle kan se hvordan appen fungerer, bidra med forbedringer eller bruke den som inspirasjon til egne prosjekter.',
      cta: 'Se kildekoden på GitHub',
    },
    footer: {
      copyright: '© {year} BikeSpeed. Åpen kildekode under MIT-lisensen.',
    },
    privacy: {
      title: 'Personvernerklæring',
      updated: 'Sist oppdatert: juli 2026',
      sections: [
        {
          heading: 'Oversikt',
          body: 'BikeSpeed samler ikke inn, lagrer eller deler personopplysninger. Alt appen genererer blir værende på din enhet.',
        },
        {
          heading: 'Posisjonsdata',
          body: 'BikeSpeed bruker enhetens GPS til å beregne fart, distanse og høyde mens du bruker appen. Posisjonsdataene behandles utelukkende lokalt på enheten din og sendes aldri til oss eller noen tredjepart.',
        },
        {
          heading: 'Turdata',
          body: 'Turlogger — gjennomsnittsfart, maksfart, distanse, varighet og høydeprofil — lagres lokalt i appen og lastes aldri opp noe sted. Sletter du appen, slettes også disse dataene.',
        },
        {
          heading: 'Ingen analyse eller sporing',
          body: 'BikeSpeed bruker ingen analyseverktøy, reklame-ID-er eller sporing fra tredjeparter.',
        },
        {
          heading: 'Ingen konto nødvendig',
          body: 'Du trenger ikke registrere deg eller logge inn for å bruke BikeSpeed.',
        },
        {
          heading: 'Åpen kildekode',
          body: 'Siden BikeSpeed er åpen kildekode, kan du selv se nøyaktig hvordan appen behandler data på GitHub.',
        },
        {
          heading: 'Spørsmål',
          body: 'Har du spørsmål om denne erklæringen, kan du opprette en sak (issue) i GitHub-repoet.',
        },
      ],
    },
    support: {
      title: 'Support',
      intro: 'Trenger du hjelp med BikeSpeed? Her er hvordan du får det.',
      faq: [
        {
          question: 'Hvordan bytter jeg mellom km/t og mph?',
          answer: 'Åpne Innstillinger i appen og bytt enhet.',
        },
        {
          question: 'Hvor lagres turdataene mine?',
          answer:
            'All turhistorikk lagres lokalt på enheten din — ingenting lastes opp noe sted.',
        },
        {
          question: 'Jeg har funnet en feil eller har et forslag.',
          answer:
            'Opprett gjerne en sak (issue) i GitHub-repoet — det er raskeste vei til utvikleren.',
        },
        {
          question: 'Er BikeSpeed virkelig gratis?',
          answer:
            'Ja. Ingen reklame, ingen abonnementer, ingen kjøp i appen — aldri.',
        },
      ],
      issuesCta: 'Opprett en sak på GitHub',
    },
  },
}
