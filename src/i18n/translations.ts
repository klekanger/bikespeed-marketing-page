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
    backLink: string
  }
  hero: {
    eyebrow: string
    title: string
    tagline: string
    ctaAppStore: string
    altAppStore: string
    ctaGithub: string
  }
  highlights: string[]
  whatsNew: {
    badge: string
    title: string
    body: string
    items: string[]
  }
  features: {
    title: string
    items: Feature[]
  }
  onRoad: {
    eyebrow: string
    title: string
    alt: string
  }
  gallery: {
    title: string
    captions: {
      gauge: string
      log: string
      bests: string
      map: string
      profile: string
      settings: string
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
          'A free GPS speedometer for cyclists, with route maps, ride profiles and iCloud sync. No ads, no subscriptions, open source.',
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
      backLink: 'Back to homepage',
    },
    hero: {
      eyebrow: 'Retro speedometer app',
      title: 'BikeSpeed',
      tagline: 'A simple, free GPS speedometer for your bike rides.',
      ctaAppStore: 'Download on the App Store',
      altAppStore: 'Download from App Store',
      ctaGithub: 'View on GitHub',
    },
    highlights: ['100% Free', 'No Ads', 'No Subscriptions', 'Open Source'],
    whatsNew: {
      badge: 'Version 2.0',
      title: 'Now it remembers your rides',
      body: 'Every ride records its route, keeps a height and speed profile, and follows you across your iPhones.',
      items: [
        'Route maps for every ride, with a full-screen map you can pan and zoom',
        'Height and speed profiles plotted against distance',
        'Lifetime totals and personal bests',
        'Automatic iCloud sync — nothing to set up, no account to create',
        'GPX export to Strava, Komoot or anywhere else',
        'Auto-pause, and recording that keeps going in your pocket',
      ],
    },
    features: {
      title: 'No fluff — just what you need',
      items: [
        {
          title: 'Big, easy-to-read speedometer',
          description: 'Easy to read at a glance while riding.',
        },
        {
          title: 'Metric & imperial units',
          description: 'Switch between km/h and mph.',
        },
        {
          title: 'Customize the speedometer',
          description:
            'Set a max speed — the speedometer works in the car too.',
        },
        {
          title: 'Auto-pause',
          description:
            "Distance and time stop when you do, so your average speed doesn't sag at every red light.",
        },
        {
          title: 'Climb, descent & live gradient',
          description:
            'Measured by the barometer where available, and by GPS otherwise.',
        },
        {
          title: 'Trip log with route maps',
          description:
            'Every ride is saved with its route on a map — and keeps recording with the screen locked.',
        },
        {
          title: 'Height & speed profiles',
          description:
            'See how you climbed and how fast you rode, plotted against distance.',
        },
        {
          title: 'Totals & personal bests',
          description:
            'Longest ride, fastest average, top speed and biggest climb.',
        },
        {
          title: 'iCloud sync',
          description:
            'Your rides follow you across your own iPhones. Nothing to set up.',
        },
        {
          title: 'GPX export',
          description:
            'Send any ride to Strava, Komoot or any other app you like.',
        },
      ],
    },
    onRoad: {
      eyebrow: 'Big, clear speedometer',
      title: 'Mount your phone on the handlebar',
      alt: 'BikeSpeed mounted on a bicycle handlebar, showing the speedometer while riding',
    },
    gallery: {
      title: 'See it in action',
      captions: {
        gauge: 'Speedometer',
        log: 'Ride history',
        bests: 'Personal bests',
        map: 'Ride details & route',
        profile: 'Height & speed profile',
        settings: 'Settings',
      },
    },
    openSource: {
      title: 'Free and open source',
      body: 'BikeSpeed is open source and licensed under the MIT license. The source code is on GitHub, so anyone can see how the app works, contribute improvements, or use it as inspiration for their own projects.',
      cta: 'View source on GitHub',
    },
    footer: {
      copyright: '© {year} Kurt Lekanger. Open source under the MIT license.',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: July 2026',
      sections: [
        {
          heading: 'Overview',
          body: 'BikeSpeed has no accounts, no analytics and no tracking, and we never receive your data. Your rides are stored on your iPhone and — if you are signed into iCloud — in your own private iCloud storage, which only you can read.',
        },
        {
          heading: 'Location data',
          body: "BikeSpeed uses your device's GPS to calculate speed, distance, direction and altitude while you're using the app. This location data is processed on your device and is never sent to us or to any third party.",
        },
        {
          heading: 'Trip data and iCloud sync',
          body: 'Saved rides — distance, duration, average and max speed, climb and descent, the route and its height profile — are stored in the app on your iPhone, and automatically mirrored to the private iCloud database of the Apple Account you are already signed into. That is what lets your rides appear on your other iPhones. It is private storage: only you can read it, and the developer has no access to it. If you are not signed into iCloud, everything simply stays on the device. Deleting a ride deletes it everywhere it has synced, and deleting the app removes its on-device storage.',
        },
        {
          heading: 'Street names',
          body: "To show the name of the street you're on, BikeSpeed asks Apple's mapping service what street a coordinate corresponds to, using Apple's built-in MapKit and Core Location APIs. That lookup sends the coordinate to Apple, subject to Apple's privacy policy, and happens only occasionally as you move between streets — not continuously. With no network connection the street name is simply left blank, and the rest of the app works as usual.",
        },
        {
          heading: 'GPX export',
          body: 'When you tap Export GPX on a saved ride, BikeSpeed hands that ride’s track to the iOS share sheet so you can send it to another app or service. That only ever happens when you ask for it, with the ride you picked, going where you send it.',
        },
        {
          heading: 'No analytics or tracking',
          body: 'BikeSpeed does not use analytics tools, ad tracking, or any other third-party tracking.',
        },
        {
          heading: 'No account required',
          body: "You don't need to sign up or log in to use BikeSpeed. There is no BikeSpeed account — iCloud sync uses the Apple Account your iPhone is already signed into.",
        },
        {
          heading: 'Open source',
          body: 'Because BikeSpeed is open source, you can review exactly how the app handles your data.',
        },
        {
          heading: 'Questions',
          body: 'If you have questions about this policy, open an issue on the GitHub repository.',
        },
      ],
    },
    support: {
      title: 'Support',
      intro: 'Need help with BikeSpeed? Here are some tips:',
      faq: [
        {
          question: 'How do I switch between km/h and mph?',
          answer: 'Open Settings in the app and toggle the units.',
        },
        {
          question: 'Where is my ride data stored?',
          answer:
            'On your iPhone, and — if you are signed into iCloud — mirrored to your own private iCloud storage so it reaches your other iPhones. Only you can read it; nothing is sent to the developer.',
        },
        {
          question: 'How do I get my rides onto another iPhone?',
          answer:
            'Sign both iPhones into the same Apple Account with iCloud turned on. Sync is automatic — there is nothing to switch on in BikeSpeed. Give it a minute after the first launch on the new device.',
        },
        {
          question: 'How do I export a ride?',
          answer:
            'Open the ride in the trip log and tap Export GPX. The share sheet lets you send it to Strava, Komoot, or any other app that accepts GPX files.',
        },
        {
          question: 'Why does my trip pause by itself?',
          answer:
            "That's auto-pause. It stops both distance and the clock while you're standing still, so waiting at a red light doesn't drag your average speed down. You can turn it off in Settings.",
        },
        {
          question: 'Does it keep recording if I lock the screen?',
          answer:
            'Yes. A running trip keeps recording with the screen locked or the app in the background, so you can put the phone in your pocket mid-ride.',
        },
        {
          question: 'Why do climb and gradient show “--”?',
          answer:
            'Climb and gradient are most accurate from the barometer, which needs Motion & Fitness access — allow it in iOS Settings ▸ BikeSpeed. Without it the app falls back to GPS altitude, which needs a decent signal, so the readings can stay blank indoors or under heavy tree cover.',
        },
        {
          question: 'Which iPhone do I need?',
          answer: 'BikeSpeed 2.0 requires an iPhone running iOS 18 or later.',
        },
        {
          question: 'I found a bug or have a feature request.',
          answer:
            "Please open an issue on the GitHub repository — that's the fastest way to reach the developer.",
        },
        {
          question: 'Is BikeSpeed really free?',
          answer:
            'Yes. No ads, no subscriptions and no in-app purchases — everything in the app is free to use.',
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
          'Et gratis GPS-speedometer for syklister, med kart over ruta, høydeprofil og iCloud-synk. Ingen reklame, ingen abonnementer, åpen kildekode.',
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
      backLink: 'Tilbake til forsiden',
    },
    hero: {
      eyebrow: 'Retro speedometer-app',
      title: 'BikeSpeed',
      tagline: 'Et enkelt og gratis GPS-speedometer for sykkelturene dine.',
      ctaAppStore: 'Last ned i App Store',
      altAppStore: 'Last ned fra App Store',
      ctaGithub: 'Se på GitHub',
    },
    highlights: [
      '100% gratis',
      'Ingen reklame',
      'Ingen abonnementer',
      'Åpen kildekode',
    ],
    whatsNew: {
      badge: 'Versjon 2.0',
      title: 'Nå husker appen turene dine',
      body: 'Turloggen har blitt enda bedre. For hver tur registreres rute, samt høyde- og fartsprofil. Turene synkroniseres mellom iPhonene dine via iCloud.',
      items: [
        'Kart over ruta for hver tur, med fullskjermkart du kan panorere og zoome',
        'Høyde- og fartsprofil tegnet mot distanse',
        'Totaler for alle turer og personlige rekorder',
        'Automatisk iCloud-synk – ingenting å sette opp, ingen konto å opprette',
        'Eksporter turer som GPX til Strava, Komoot eller andre apper',
        'Automatisk pause, og registrering som fortsetter i lomma',
      ],
    },
    features: {
      title: 'Ikke noe fjas – bare det du trenger',
      items: [
        {
          title: 'Stort og lettlest speedometer',
          description: 'Enkelt å lese med et raskt blikk mens du sykler.',
        },
        {
          title: 'Metriske og imperiale enheter',
          description: 'Bytt mellom km/t og mph.',
        },
        {
          title: 'Tilpass speedometeret',
          description:
            'Velg maksimal hastighet – speedometeret fungerer også fint i bilen.',
        },
        {
          title: 'Automatisk pause',
          description:
            'Tid og distanse settes automatisk på pause når du stopper, slik at røde lys ikke trekker ned snittfarten.',
        },
        {
          title: 'Stigning, nedstigning og stigningsprosent',
          description:
            'Måles med barometer når det er tilgjengelig, ellers med GPS.',
        },
        {
          title: 'Turlogg med kart over ruta',
          description:
            'Hver tur lagres med ruta tegnet på kart, og registreringen fortsetter selv når skjermen er låst.',
        },
        {
          title: 'Høyde- og fartsprofil',
          description:
            'Se hvordan du klatret og hvor fort du syklet, tegnet mot distanse.',
        },
        {
          title: 'Totaler og personlige rekorder',
          description:
            'Følg med på blant annet lengste tur, høyeste snittfart, toppfart og største stigning.',
        },
        {
          title: 'iCloud-synk',
          description:
            'Turene synkroniseres automatisk mellom iPhonene dine. Ingenting å sette opp.',
        },
        {
          title: 'GPX-eksport',
          description:
            'Eksporter turer til Strava, Komoot eller andre apper som støtter GPX.',
        },
      ],
    },
    onRoad: {
      eyebrow: 'Stort og tydelig speedometer',
      title: 'Fest mobilen på styret',
      alt: 'BikeSpeed montert på et sykkelstyre, som viser speedometeret mens du sykler',
    },
    gallery: {
      title: 'Se appen i bruk',
      captions: {
        gauge: 'Speedometer',
        log: 'Turhistorikk',
        bests: 'Personlige rekorder',
        map: 'Turdetaljer og rute',
        profile: 'Høyde- og fartsprofil',
        settings: 'Innstillinger',
      },
    },
    openSource: {
      title: 'Gratis og åpen kildekode',
      body: ' BikeSpeed er åpen kildekode og utgitt under MIT-lisensen. Kildekoden ligger på GitHub, slik at alle kan se hvordan appen fungerer, bidra med forbedringer eller bruke den som inspirasjon til egne prosjekter.',
      cta: 'Se kildekoden på GitHub',
    },
    footer: {
      copyright: '© {year} Kurt Lekanger. Åpen kildekode under MIT-lisensen.',
    },
    privacy: {
      title: 'Personvernerklæring',
      updated: 'Sist oppdatert: juli 2026',
      sections: [
        {
          heading: 'Oversikt',
          body: 'BikeSpeed har ingen konto, ingen analyse og ingen sporing, og vi mottar aldri data fra appen din. Turene dine lagres på iPhonen din og – hvis du er logget på iCloud – i din egen private iCloud-lagring, som bare du kan lese.',
        },
        {
          heading: 'Posisjonsdata',
          body: 'BikeSpeed bruker enhetens GPS til å beregne fart, distanse, retning og høyde mens du bruker appen. Posisjonsdata behandles på enheten din og sendes aldri til oss eller noen tredjepart.',
        },
        {
          heading: 'Turdata og iCloud-synkronisering',
          body: 'Lagrede turer – inkludert distanse, varighet, snitt- og maksfart, stigning, nedstigning, rute og høydeprofil – lagres på iPhonen din. Hvis du er logget på iCloud, synkroniseres de automatisk til den private iCloud-databasen som tilhører Apple-kontoen din. Det gjør at turene blir tilgjengelige på de andre iPhonene dine. Bare du har tilgang til disse dataene – utvikleren kan ikke lese dem. Hvis du ikke bruker iCloud, blir alle data liggende lokalt på enheten. Sletter du en tur, slettes den også fra synkroniserte enheter.',
        },
        {
          heading: 'Gatenavn',
          body: 'For å vise navnet på gata du er i, spør BikeSpeed Apples karttjeneste hvilken gate den aktuelle posisjonen tilhører, via Apples innebygde MapKit- og Core Location-API-er. Oppslaget sender koordinaten til Apple, underlagt Apples personvernerklæring, og skjer bare av og til mens du beveger deg mellom gater – ikke kontinuerlig. Uten nettforbindelse står gatenavnet ganske enkelt tomt, og resten av appen fungerer som vanlig.',
        },
        {
          heading: 'GPX-eksport',
          body: 'Når du trykker Eksporter GPX på en lagret tur, sender BikeSpeed turens spor til delingsmenyen i iOS, slik at du kan sende den videre til en annen app eller tjeneste. Det skjer bare når du selv ber om det, med turen du valgte, dit du sender den.',
        },
        {
          heading: 'Ingen analyse eller sporing',
          body: 'BikeSpeed bruker ingen analyseverktøy, annonsesporing eller annen sporing fra tredjeparter.',
        },
        {
          heading: 'Ingen konto nødvendig',
          body: 'Du må ikke registrere deg eller logge inn for å bruke BikeSpeed. Det finnes ingen BikeSpeed-konto – iCloud-synkroniseringen bruker Apple-kontoen iPhonen din allerede er logget på.',
        },
        {
          heading: 'Åpen kildekode',
          body: 'Siden BikeSpeed er åpen kildekode, kan du selv se nøyaktig hvordan appen behandler dataene dine.',
        },
        {
          heading: 'Spørsmål',
          body: 'Har du spørsmål om denne erklæringen, kan du opprette en sak (issue) i GitHub-repoet.',
        },
      ],
    },
    support: {
      title: 'Support',
      intro:
        'Trenger du hjelp med BikeSpeed? Her finner du svar på de vanligste spørsmålene.',
      faq: [
        {
          question: 'Hvordan bytter jeg mellom km/t og mph?',
          answer: 'Åpne Innstillinger i appen og bytt enhet.',
        },
        {
          question: 'Hvor lagres turdataene mine?',
          answer:
            'På iPhonen din, og – hvis du er logget på iCloud – synkronisert til din private iCloud-lagring slik at de når de andre iPhonene dine. Bare du kan lese dem, og ingenting sendes til utvikleren.',
        },
        {
          question: 'Hvordan får jeg turene over på en annen iPhone?',
          answer:
            'Logg begge iPhonene på samme Apple-konto med iCloud slått på. Synkroniseringen skjer automatisk – det er ingenting å slå på i BikeSpeed. Gi det et minutt etter første oppstart på den nye enheten.',
        },
        {
          question: 'Hvordan eksporterer jeg en tur?',
          answer:
            'Åpne turen i turloggen og trykk Eksporter GPX. Delingsmenyen lar deg sende den til Strava, Komoot eller en annen app som tar imot GPX-filer.',
        },
        {
          question: 'Hvorfor pauser turen seg selv?',
          answer:
            'Det er automatisk pause. Den setter både tid og distanse på pause mens du står stille, slik at venting på rødt lys ikke trekker ned snittfarten. Du kan slå den av i Innstillinger.',
        },
        {
          question: 'Fortsetter appen å registrere hvis jeg låser skjermen?',
          answer:
            'Ja. En pågående tur fortsetter registreringen selv om skjermen er låst eller appen er i bakgrunnen, så du kan legge mobilen i lomma underveis.',
        },
        {
          question: 'Hvorfor viser stigning og stigningsprosent «--»?',
          answer:
            'Stigning og stigningsprosent blir mest nøyaktig med barometeret, som krever tilgang til Bevegelse og trening – gi tilgang i Innstillinger ▸ BikeSpeed på iPhonen. Uten den bruker appen GPS-høyde i stedet, som trenger brukbart signal, så verdiene kan stå tomme innendørs eller under tett skog.',
        },
        {
          question: 'Hvilken iPhone trenger jeg?',
          answer: 'BikeSpeed 2.0 krever en iPhone med iOS 18 eller nyere.',
        },
        {
          question: 'Jeg har funnet en feil eller har et forslag.',
          answer:
            'Opprett gjerne en sak (issue) i GitHub-repoet — det er raskeste vei til utvikleren.',
        },
        {
          question: 'Er BikeSpeed virkelig gratis?',
          answer:
            'Ja. Ingen reklame, ingen abonnementer og ingen kjøp i appen – alt i appen er gratis å bruke.',
        },
      ],
      issuesCta: 'Opprett en sak på GitHub',
    },
  },
}
