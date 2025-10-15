// 데이터 로드 & 바인딩
(async function() {
  try {
    const res = await fetch('./data/site.json', {cache: 'no-store'});
    const data = await res.json();
    // 제목/메타
    document.getElementById('meta-title').textContent = data.siteTitle || document.title;
    document.getElementById('meta-desc').setAttribute('content', data.description || '');
    document.getElementById('meta-og').setAttribute('content', data.ogImage || '');

    // 바인딩 텍스트
    document.querySelectorAll('[data-bind="brand"]').forEach(el => el.textContent = data.brand || '내 비즈니스');
    document.querySelectorAll('[data-bind="address"]').forEach(el => el.textContent = '주소: ' + (data.address || ''));
    // 링크
    const tel = document.querySelector('[data-bind="telLink"]');
    if (tel && data.phone) tel.setAttribute('href', 'tel:' + (data.phone || '').replaceAll('-', ''));
    const kakao = document.querySelector('[data-bind="kakaoLink"]');
    if (kakao && data.kakaoLink) kakao.setAttribute('href', data.kakaoLink);
    const email = document.querySelector('[data-bind="emailLink"]');
    if (email && data.email) {
      email.setAttribute('href', 'mailto:' + data.email);
      email.textContent = (data.email || '이메일로 문의');
    }

    // 임베드
    const form = document.getElementById('form-embed');
    if (form && data.formEmbed) form.setAttribute('src', data.formEmbed);
    const map = document.getElementById('map-embed');
    if (map && data.mapEmbed) map.setAttribute('src', data.mapEmbed);
  } catch (e) {
    console.warn('site.json 로드 실패', e);
  }
})();

// 합계 계산기
(function() {
  const checks = document.querySelectorAll('.calc-form input[type="checkbox"][data-price]');
  const totalEl = document.getElementById('total');
  function recalc() {
    let sum = 0;
    checks.forEach(c => { if (c.checked) sum += parseInt(c.getAttribute('data-price'), 10) || 0; });
    totalEl.textContent = sum.toLocaleString();
  }
  checks.forEach(c => c.addEventListener('change', recalc));
  recalc();
})();

// 유틸
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
