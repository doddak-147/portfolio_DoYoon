const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
const themeKey = 'portfolio-theme-v2';

const applyTheme = (dark) => {
  document.body.classList.toggle('dark', dark);
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.setAttribute('aria-label', dark ? '밝은 화면으로 전환' : '어두운 화면으로 전환');
  themeColor?.setAttribute('content', dark ? '#161b25' : '#ffffff');
};

try {
  applyTheme(localStorage.getItem(themeKey) === 'dark');
} catch {
  applyTheme(false);
}

themeToggle?.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  applyTheme(dark);
  try {
    localStorage.setItem(themeKey, dark ? 'dark' : 'light');
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
});
