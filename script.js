// site.json → 메타/연락처/히어로 배경
(async function() {
  try {
    const res = await fetch('./data/site.json', {cache:'no-store'});
    const data = await res.json();
    const t = document.getElementById('meta-title'), d = document.getElementById('meta-desc'), og = document.getElementById('meta-og');
    if (t) t.textContent = data.siteTitle || document.title;
    if (d) d.setAttribute('content', data.description || '');
    if (og) og.setAttribute('content', data.ogImage || '');
    document.querySelectorAll('[data-bind="brand"]').forEach(el => el.textContent = data.brand || '내 비즈니스');
    const tel = document.querySelector('[data-bind="telLink"]'); if (tel && data.phone) tel.setAttribute('href', 'tel:' + (data.phone||'').replaceAll('-', ''));
    const form = document.getElementById('form-embed'); if (form && data.formEmbed) form.setAttribute('src', data.formEmbed);
    const hero = document.querySelector('.hero-bg'); const ov = document.querySelector('.hero-bg .overlay');
    if (hero && data.heroImage) hero.style.backgroundImage = 'url(' + data.heroImage + ')';
    if (ov && (typeof data.heroOverlay !== 'undefined')) ov.style.background = 'rgba(0,0,0,' + data.heroOverlay + ')';
  } catch(e) { console.warn('site.json load failed', e); }
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1), el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

(function() {
  const checks = document.querySelectorAll('.calc-form input[type="checkbox"][data-price]');
  const totalEl = document.getElementById('total');
  if (!totalEl) return;
  function recalc() {
    let sum = 0; checks.forEach(c => { if (c.checked) sum += parseInt(c.getAttribute('data-price'), 10) || 0; });
    totalEl.textContent = sum.toLocaleString();
  }
  checks.forEach(c => c.addEventListener('change', recalc)); recalc();
})();

const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
