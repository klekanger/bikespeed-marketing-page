import './style.css'
import { renderPage, renderI18nList } from './layout'
import { translations } from './i18n/translations'

const sections = renderI18nList(
  'privacy.sections',
  translations.en.privacy.sections.length,
  'content-section',
  ['heading', 'body'],
)

renderPage(`
  <main id="main-content" tabindex="-1" class="page-content">
    <div class="wrap">
      <span class="backlink">
        <svg data-dc-tpl="17" viewBox="0 0 24 24" width="14" height="14" data-om-id="7a4c273d:22"><path data-dc-tpl="18" d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-om-id="7a4c273d:23"></path></svg>
        <a href='/' data-i18n="nav.backLink"></a>
      </span>
      <h1 data-i18n="privacy.title"></h1>
      <p class="page-updated" data-i18n="privacy.updated"></p>
      <div class="section-list">
        ${sections}
      </div>
    </div>
  </main>
`)
