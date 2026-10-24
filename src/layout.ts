import {
  applyTranslations,
  getLocale,
  setLocale,
  type Locale,
} from "./i18n/locale";

export const GITHUB_ICON_PATH =
  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

// Language dot colours are GitHub's own for Swift and Kotlin.
const REPOS = {
  ios: {
    name: "BikeSpeed",
    url: "https://github.com/klekanger/BikeSpeed",
    langColor: "#F05138",
  },
  android: {
    name: "BikeSpeed-Android",
    url: "https://github.com/klekanger/BikeSpeed-Android",
    langColor: "#A97BFF",
  },
} as const;

/** One card per app repo. `path` is appended to each repo URL, e.g. "/issues". */
export function renderRepoCards(path = ""): string {
  const cards = (Object.keys(REPOS) as (keyof typeof REPOS)[])
    .map((platform) => {
      const repo = REPOS[platform];
      return `
        <a class="repo-card" href="${repo.url}${path}" target="_blank" rel="noopener">
          <svg class="repo-card-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
            <path d="${GITHUB_ICON_PATH}"/>
          </svg>
          <span class="repo-card-text">
            <span class="repo-card-name"><span class="repo-card-owner">klekanger/</span><wbr><span class="repo-card-repo">${repo.name}</span></span>
            <span class="repo-card-meta">
              <span class="repo-card-lang" style="--lang: ${repo.langColor}" aria-hidden="true"></span>
              <span data-i18n="openSource.repos.${platform}"></span>
            </span>
          </span>
          <svg class="repo-card-arrow" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      `;
    })
    .join("");
  return `<div class="repo-cards">${cards}</div>`;
}

export function renderHeader(): string {
  return `
    <a class="skip-link" href="#main-content" data-i18n="a11y.skipToContent"></a>
    <header class="site-header">
      <div class="header-inner">
        <a href="index.html" class="wordmark">
          <img
            class="wordmark-icon"
            src="/wordmark-64.webp"
            srcset="/wordmark-64.webp 2x, /wordmark-96.webp 3x"
            alt=""
            aria-hidden="true"
            width="32"
            height="32"
          />
          BikeSpeed
        </a>
        <div class="lang-selector" role="group" data-i18n-attr="aria-label:nav.languageLabel">
          <button type="button" data-locale="en" aria-label="English">EN</button>
          <button type="button" data-locale="nb" aria-label="Norwegian">NO</button>
        </div>
      </div>
    </header>
  `;
}

export function renderFooter(): string {
  return `
    <footer class="site-footer">
      <div class="wrap footer-inner">
        <nav class="footer-links" data-i18n-attr="aria-label:nav.footerLabel">
          <a href="privacy.html" data-i18n="nav.privacy"></a>
          <a href="support.html" data-i18n="nav.support"></a>
          <a href="${REPOS.ios.url}" target="_blank" rel="noopener">GitHub (iOS)</a>
          <a href="${REPOS.android.url}" target="_blank" rel="noopener">GitHub (Android)</a>
        </nav>
        <p class="footer-copy" data-i18n="footer.copyright"></p>
      </div>
    </footer>
  `;
}

function updateActiveButtons(
  buttons: NodeListOf<HTMLButtonElement>,
  locale: Locale,
): void {
  buttons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.locale === locale);
    btn.setAttribute("aria-pressed", String(btn.dataset.locale === locale));
  });
}

export function initLayout(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".lang-selector button",
  );
  updateActiveButtons(buttons, getLocale());

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const locale = btn.dataset.locale as Locale;
      setLocale(locale);
    });
  });

  document.addEventListener("bikespeed:localechange", (e) => {
    updateActiveButtons(buttons, (e as CustomEvent<Locale>).detail);
  });
}

function initReveal(): void {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
}

export function renderPage(content: string): void {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML =
    `${renderHeader()}${content}${renderFooter()}`;
  initLayout();
  applyTranslations();
  initReveal();
}

export function renderI18nList(
  basePath: string,
  count: number,
  className: string,
  fields: readonly [string, string],
): string {
  return Array.from(
    { length: count },
    (_, i) => `
      <div class="${className}">
        <h2 data-i18n="${basePath}.${i}.${fields[0]}"></h2>
        <p data-i18n="${basePath}.${i}.${fields[1]}"></p>
      </div>
    `,
  ).join("");
}
