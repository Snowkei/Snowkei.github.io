(() => {
  const root = document.documentElement;
  const nodes = Array.from(document.querySelectorAll('[data-en]'));
  const zhHtml = new Map(nodes.map((n) => [n, n.innerHTML]));

  const applyLang = (lang) => {
    const en = lang === 'en';
    root.lang = en ? 'en' : 'zh-CN';
    for (const n of nodes) {
      const next = en ? n.dataset.en : zhHtml.get(n);
      if (n.innerHTML !== next) n.innerHTML = next;
    }
    const label = document.getElementById('langLabel');
    if (label) label.textContent = en ? '中' : 'EN';
    document.title = en ? 'Snowkei · frontend, AI, self-hosting' : '常无鱼以观其喵 · Snowkei';
  };

  let lang = localStorage.getItem('lang');
  if (!lang) {
    lang = /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  applyLang(lang);

  document.getElementById('langBtn')?.addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', lang);
    applyLang(lang);
  });

  const themeBtn = document.getElementById('themeBtn');
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') root.dataset.theme = storedTheme;
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) root.dataset.theme = 'light';

  themeBtn?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0a0e13' : '#fbfbfa');
  });

  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
