import './style.css'
import { renderPage, renderI18nList } from './layout'
import { translations } from './i18n/translations'

const faqItems = renderI18nList(
  'support.faq',
  translations.en.support.faq.length,
  'faq-item',
  ['question', 'answer'],
)

renderPage(`
  <main class="page-content">
    <div class="wrap">
      <h1 data-i18n="support.title"></h1>
      <p class="page-updated" data-i18n="support.intro"></p>
      ${faqItems}
      <div class="support-cta">
        <a
          class="btn btn-primary"
          href="https://github.com/klekanger/BikeSpeed/issues"
          target="_blank"
          rel="noopener"
          data-i18n="support.issuesCta"
        ></a>
      </div>
    </div>
  </main>
`)
