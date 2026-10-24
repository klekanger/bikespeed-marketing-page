import './style.css'
import { renderPage, renderI18nList, renderRepoCards } from './layout'
import { translations } from './i18n/translations'

const faqItems = renderI18nList(
  'support.faq',
  translations.en.support.faq.length,
  'faq-item',
  ['question', 'answer'],
)

renderPage(`
  <main id="main-content" tabindex="-1" class="page-content">
    <div class="wrap">
      <span class="backlink">
        <svg data-dc-tpl="17" viewBox="0 0 24 24" width="14" height="14" data-om-id="7a4c273d:22"><path data-dc-tpl="18" d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-om-id="7a4c273d:23"></path></svg>
        <a href='/' data-i18n="nav.backLink"></a>
      </span>
      <h1 data-i18n="support.title"></h1>
      <p class="page-updated" data-i18n="support.intro"></p>
      <div class="faq-list">
        ${faqItems}
      </div>
      <div class="support-cta">
        <p data-i18n="support.issuesCta"></p>
        ${renderRepoCards('/issues')}
      </div>
    </div>
  </main>
`)
