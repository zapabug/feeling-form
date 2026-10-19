// Shared questionnaire engine. A business folder defines window.FORM in its
// own form-data.js (texts, tasks, questions, pickups) and includes this file.
// Answers stay in the browser (draft) until sent: WhatsApp opens with the
// answers typed and NO number - the person picks the chat themselves.
(function () {
  const F = window.FORM;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const t = (s) => (s || '').trim();

  // --- page text ---
  document.title = F.pageTitle;
  $('title').textContent = F.title;
  $('byline').textContent = F.byline;
  $('intro').innerHTML = F.introHtml;
  $('hint').innerHTML = F.hintHtml;
  $('whoLabel').textContent = F.whoLabel;
  $('who').placeholder = F.whoPlaceholder;
  $('tasksTitle').textContent = F.tasksTitle;
  $('tasksIntro').textContent = F.tasksIntro;
  $('questionsTitle').textContent = F.questionsTitle;
  $('send').textContent = F.ui.send;
  $('copy').textContent = F.ui.copy;

  // --- task cards ---
  F.tasks.forEach(([title, now], i) => {
    const n = i + 1;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="task-title">${n}. ${esc(title)}</div>
      <div class="task-now">${now ? esc(now) : '&nbsp;'}</div>
      <div class="row">
        <div><label for="t${n}who">${esc(F.ui.who)}</label><input type="text" id="t${n}who" data-key="t${n}who" placeholder="${esc(F.ui.whoPh)}"></div>
        <div><label for="t${n}time">${esc(F.ui.time)}</label><input type="text" id="t${n}time" data-key="t${n}time" placeholder="${esc(F.ui.timePh)}"></div>
      </div>
      <label>${esc(F.ui.auto)}</label>
      <div class="choices">${F.ui.choices.map((c) => `<label><input type="radio" name="t${n}auto" value="${esc(c)}" data-key="t${n}auto"> ${esc(c)}</label>`).join('')}</div>
      <label for="t${n}notes">${esc(F.ui.notes)}</label>
      <input type="text" id="t${n}notes" data-key="t${n}notes" placeholder="${esc(F.ui.notesPh)}">`;
    $('tasks').appendChild(card);
  });

  // --- open questions ---
  F.questions.forEach((q) => {
    $('questions').insertAdjacentHTML('beforeend',
      `<label for="${q.key}">${esc(q.label)}</label><textarea id="${q.key}" data-key="${q.key}"></textarea>`);
  });

  // --- pickup rows (optional section) ---
  const pickupsEl = $('pickups');
  function addPickup(p = {}) {
    const P = F.pickups;
    const div = document.createElement('div');
    div.className = 'pickup';
    div.innerHTML = `
      <div class="row">
        <div><label>${esc(P.name)}</label><input type="text" data-p="name" placeholder="${esc(P.namePh)}"></div>
        <div><label>${esc(P.time)}</label><input type="text" data-p="time" placeholder="${esc(P.timePh)}"></div>
      </div>
      <label>${esc(P.where)}</label>
      <input type="text" data-p="where" placeholder="${esc(P.wherePh)}">
      <button type="button" class="link" data-remove>${esc(P.remove)}</button>`;
    div.querySelectorAll('[data-p]').forEach((el) => { el.value = p[el.dataset.p] || ''; });
    div.querySelector('[data-remove]').addEventListener('click', () => { div.remove(); saveDraft(); });
    pickupsEl.appendChild(div);
  }
  if (F.pickups) {
    $('pickupsTitle').textContent = F.pickups.title;
    $('pickupsIntro').textContent = F.pickups.intro;
    $('addPickup').textContent = F.pickups.add;
    $('noPickupLabel').textContent = F.pickups.noPickupLabel;
    $('addPickup').addEventListener('click', () => addPickup());
  } else {
    $('pickupsSection').remove();
  }

  // --- draft storage (per browser; never required) ---
  function collect() {
    const data = {};
    document.querySelectorAll('[data-key]').forEach((el) => {
      if (el.type === 'radio') { if (el.checked) data[el.dataset.key] = el.value; }
      else data[el.dataset.key] = el.value;
    });
    data.pickups = [...pickupsEl.querySelectorAll('.pickup')].map((row) => {
      const p = {};
      row.querySelectorAll('[data-p]').forEach((el) => { p[el.dataset.p] = el.value; });
      return p;
    });
    return data;
  }
  function saveDraft() {
    try { localStorage.setItem(F.storeKey, JSON.stringify(collect())); } catch (e) { /* private mode: fine */ }
  }
  function loadDraft() {
    try { return JSON.parse(localStorage.getItem(F.storeKey) || '{}'); } catch (e) { return {}; }
  }
  const draft = loadDraft();
  document.querySelectorAll('[data-key]').forEach((el) => {
    const v = draft[el.dataset.key];
    if (v === undefined) return;
    if (el.type === 'radio') el.checked = el.value === v;
    else el.value = v;
  });
  if (F.pickups) (Array.isArray(draft.pickups) && draft.pickups.length ? draft.pickups : [{}]).forEach(addPickup);
  document.addEventListener('input', saveDraft);
  document.addEventListener('change', saveDraft);

  // --- the message: only what was filled in ---
  function message() {
    const d = collect();
    const lines = [`*${F.messageTitle}*`];
    if (t(d.who)) lines.push(`${F.ui.filledBy}: ${t(d.who)}`);
    lines.push('');
    F.tasks.forEach(([title], i) => {
      const n = i + 1;
      const parts = [t(d[`t${n}who`]), t(d[`t${n}time`]), t(d[`t${n}auto`])].filter(Boolean);
      const notes = t(d[`t${n}notes`]);
      if (!parts.length && !notes) return;
      lines.push(`${n}. ${title}: ${parts.join(' · ')}${notes ? `${parts.length ? ' · ' : ''}"${notes}"` : ''}`);
    });
    const answered = F.questions.filter((q) => t(d[q.key]));
    if (answered.length) {
      lines.push('');
      answered.forEach((q) => lines.push(`*${q.short}:* ${t(d[q.key])}`));
    }
    if (F.pickups) {
      const rows = d.pickups.filter((p) => t(p.name) || t(p.where) || t(p.time));
      if (rows.length || t(d.noPickup)) {
        lines.push('', `*${F.pickups.title}:*`);
        rows.forEach((p) => lines.push(`- ${[t(p.name), t(p.where), t(p.time)].filter(Boolean).join(' · ')}`));
        if (t(d.noPickup)) lines.push(`${F.pickups.noPickupShort}: ${t(d.noPickup)}`);
      }
    }
    return lines.join('\n');
  }
  window.formMessage = message; // for testing

  const setStatus = (s) => { $('status').textContent = s; };
  $('send').addEventListener('click', () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message())}`;
    // very long links can be cut off by WhatsApp - then copying is safer
    if (url.length > 6000) { setStatus(F.ui.tooLong); return; }
    setStatus(F.ui.opening);
    window.open(url, '_blank', 'noopener');
  });
  $('copy').addEventListener('click', async () => {
    const text = message();
    try {
      await navigator.clipboard.writeText(text);
      setStatus(F.ui.copied);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); setStatus(F.ui.copied); } catch (e2) { setStatus(F.ui.copyFailed); }
      ta.remove();
    }
  });
})();
