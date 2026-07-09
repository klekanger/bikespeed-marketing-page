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
      <h1 data-i18n="privacy.title"></h1>
      <p class="page-updated" data-i18n="privacy.updated"></p>
      <div class="section-list">
        ${sections}
      </div>
    </div>
  </main>
`)
