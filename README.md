# Business forms

Static pages (GitHub Pages) for businesses zapa works with: a report and a
questionnaire per business. Answers never reach a server: the questionnaire
opens WhatsApp with the answers typed (no phone number in the page) or copies
them, and keeps a draft in the visitor's browser.

## Layout

- `assets/style.css`, `assets/form.js` - shared look and questionnaire engine
- `<business>/index.html` - start page with links
- `<business>/relatorio.html` - report (hand-written HTML)
- `<business>/questionario.html` - questionnaire shell (same for every business)
- `<business>/form-data.js` - everything specific: texts, tasks, questions,
  optional pickups section (`pickups: null` to drop it), `storeKey`

## A new business

1. Copy `feeling/` to `<new>/`.
2. Edit `<new>/form-data.js` (new `storeKey`!) and rewrite or delete `relatorio.html`.
3. Commit and push; the link is `https://<user>.github.io/<repo>/<new>/`.

The root page lists nothing, and every page is `noindex`, but the repo is
public: anything committed here can be read by anyone.
