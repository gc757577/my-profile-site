// ===== 프로젝트 데이터 (실제 프로젝트로 교체하세요) =====
const projects = [
  {
    title: 'AI 문서 요약 봇',
    description: '긴 문서와 회의록을 붙여넣으면 핵심만 요약해 주는 LLM 기반 도구입니다.',
    tags: ['LLM', 'Python', 'API'],
    link: '#',
    emoji: '📝',
  },
  {
    title: '업무 자동화 워크플로',
    description: '반복되는 메일 분류와 보고서 작성을 자동화해 주 5시간을 절약했습니다.',
    tags: ['자동화', 'JavaScript', 'Webhook'],
    link: '#',
    emoji: '⚙️',
  },
  {
    title: '아이디어 프로토타입 랩',
    description: '아이디어를 하루 안에 동작하는 웹 프로토타입으로 만드는 실험 모음입니다.',
    tags: ['프로토타입', 'Tailwind', 'Web'],
    link: '#',
    emoji: '🚀',
  },
];

const escapeHTML = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ===== 프로젝트 카드 렌더링 =====
function renderProjects() {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = projects
    .map(
      (p) => `
    <article class="reveal group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900">
      <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-2xl" aria-hidden="true">${p.emoji}</div>
      <h3 class="text-xl font-bold text-slate-900 dark:text-white">${escapeHTML(p.title)}</h3>
      <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">${escapeHTML(p.description)}</p>
      <ul class="mt-4 flex flex-wrap gap-2">
        ${p.tags.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join('')}
      </ul>
      <a href="${escapeHTML(p.link)}" class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:gap-2 dark:text-blue-400" style="transition: gap .2s">자세히 보기 <span aria-hidden="true">→</span></a>
    </article>`
    )
    .join('');
}

// ===== 다크모드 =====
function initTheme() {
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  });
}

// ===== 모바일 메뉴 =====
function initMobileMenu() {
  const btn = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

// ===== 스크롤: 헤더 배경 + 현재 섹션 강조 =====
function initScroll() {
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = document.querySelectorAll('.nav-link');
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
}

// ===== 등장 애니메이션 =====
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// ===== 이메일 복사 =====
function initCopy() {
  const toast = document.getElementById('toast');
  let timer;
  document.getElementById('copy-email').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('gc757577@gmail.com');
      toast.textContent = '이메일이 복사되었습니다';
    } catch (e) {
      toast.textContent = '복사에 실패했습니다. 직접 선택해 주세요';
    }
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2000);
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
renderProjects();
initTheme();
initMobileMenu();
initScroll();
initReveal();
initCopy();
