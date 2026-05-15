(function () {
  'use strict';

  // ─── DOM ──────────────────────────────────────────────────────────
  var $ = function (id) { return document.getElementById(id); };

  var growthDisp    = $('growth-display');
  var growthNum     = $('growth-num');
  var growthArrow   = $('growth-arrow');
  var growthUnit    = $('growth-unit');
  var growthCaption = $('growth-caption');

  var statTotal   = $('stat-total');
  var statEntries = $('stat-entries');
  var statGrowth  = $('stat-growth');

  var ledger      = $('ledger');
  var ledgerEmpty = $('ledger-empty');

  // ─── Formatters ───────────────────────────────────────────────────
  var moneyFmt = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  var moneyExact = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function arrowFor(n) {
    if (typeof n !== 'number' || !isFinite(n)) return '';
    if (n > 0) return '↗'; // ↗
    if (n < 0) return '↘'; // ↘
    return '→';            // →
  }
  function stateFor(n) {
    if (typeof n !== 'number' || !isFinite(n)) return 'empty';
    if (n > 0) return 'positive';
    if (n < 0) return 'negative';
    return 'zero';
  }
  function fmtPctNumber(n) {
    var sign = n > 0 ? '+' : (n < 0 ? '−' : '');
    return sign + Math.abs(n).toFixed(2);
  }

  // "2 hours ago" / "3 days ago" / "May 4" (>30d falls back to date)
  function relativeOrAbsolute(iso) {
    if (!iso) return '';
    var t = Date.parse(iso);
    if (isNaN(t)) return '';
    var now = Date.now();
    var diff = Math.max(0, Math.floor((now - t) / 1000));

    if (diff < 60)     return 'moments ago';
    if (diff < 3600)   { var m = Math.floor(diff / 60);    return m + ' minute' + (m === 1 ? '' : 's') + ' ago'; }
    if (diff < 86400)  { var h = Math.floor(diff / 3600);  return h + ' hour'   + (h === 1 ? '' : 's') + ' ago'; }
    if (diff < 172800) return 'yesterday';
    if (diff < 30 * 86400) {
      var d = Math.floor(diff / 86400);
      return d + ' days ago';
    }
    // Older than 30 days: absolute date
    var dt = new Date(t);
    var nowYear = new Date().getFullYear();
    return dt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dt.getFullYear() === nowYear ? undefined : 'numeric'
    });
  }

  // ─── Fetch helpers (graceful) ─────────────────────────────────────
  async function loadJson(url) {
    try {
      var r = await fetch(url);
      if (!r.ok) {
        console.warn('Failed to fetch', url, r.status);
        return null;
      }
      return await r.json();
    } catch (err) {
      console.warn('Error loading', url, err);
      return null;
    }
  }

  // ─── Renderers ────────────────────────────────────────────────────
  function renderGrowth(growth) {
    var v = (growth && typeof growth.value === 'number' && isFinite(growth.value))
      ? growth.value : null;

    // Hero
    if (v === null) {
      growthDisp.dataset.state = 'empty';
      growthArrow.textContent = '';
      growthNum.textContent   = '—'; // —
      growthUnit.textContent  = '';
      growthCaption.textContent = 'Awaiting first update';
    } else {
      growthDisp.dataset.state = stateFor(v);
      growthArrow.textContent  = arrowFor(v);
      growthNum.textContent    = fmtPctNumber(v);
      growthUnit.textContent   = '%';

      var when = growth.updatedAt ? relativeOrAbsolute(growth.updatedAt) : '';
      growthCaption.textContent = when ? ('Last updated ' + when) : 'Last updated —';
    }

    // Stat-band copy of growth (smaller, color-matched)
    if (v === null) {
      statGrowth.dataset.state = 'empty';
      statGrowth.textContent = '—';
    } else {
      statGrowth.dataset.state = stateFor(v);
      statGrowth.textContent = arrowFor(v) + ' ' + fmtPctNumber(v) + ' %';
    }
  }

  function renderActivity(items) {
    var arr = Array.isArray(items) ? items.slice() : [];

    // Sort by date desc, regardless of source order
    arr.sort(function (a, b) {
      var ta = Date.parse(a && a.date) || 0;
      var tb = Date.parse(b && b.date) || 0;
      return tb - ta;
    });

    // Totals
    var total = 0;
    for (var i = 0; i < arr.length; i++) {
      var amt = Number(arr[i] && arr[i].amount);
      if (isFinite(amt)) total += amt;
    }
    statTotal.textContent = arr.length ? moneyFmt.format(total) : '—';
    statEntries.textContent = String(arr.length);

    // Wipe prior rendered entries
    var prior = ledger.querySelectorAll('.entry');
    for (var p = 0; p < prior.length; p++) prior[p].remove();

    if (arr.length === 0) {
      ledgerEmpty.style.display = '';
      return;
    }
    ledgerEmpty.style.display = 'none';

    var frag = document.createDocumentFragment();
    for (var j = 0; j < arr.length; j++) {
      var e = arr[j] || {};
      var li = document.createElement('li');
      li.className = 'entry';

      var head = document.createElement('div');
      head.className = 'entry-head';

      var name = document.createElement('span');
      name.className = 'entry-name';
      name.textContent = (typeof e.name === 'string' && e.name.trim()) ? e.name.trim() : 'Unnamed';

      var when = document.createElement('span');
      when.className = 'entry-when';
      when.textContent = relativeOrAbsolute(e.date);

      head.append(name, when);

      var amount = document.createElement('div');
      amount.className = 'entry-amount';
      var amtNum = Number(e.amount);
      amount.textContent = isFinite(amtNum) ? moneyExact.format(amtNum) : '—';

      li.append(head, amount);

      if (typeof e.note === 'string' && e.note.trim()) {
        var note = document.createElement('p');
        note.className = 'entry-note';
        note.textContent = '“' + e.note.trim() + '”'; // “ ”
        li.append(note);
      }

      frag.append(li);
    }
    ledger.append(frag);
  }

  // ─── Boot ─────────────────────────────────────────────────────────
  async function init() {
    var results = await Promise.all([
      loadJson('./data/growth.json'),
      loadJson('./data/investments.json')
    ]);
    renderGrowth(results[0]);
    renderActivity(results[1]);
  }

  init();
})();
