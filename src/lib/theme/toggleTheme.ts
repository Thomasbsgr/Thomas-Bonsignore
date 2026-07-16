export function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark');
  const nextTheme = isDark ? 'light' : 'dark';

  root.classList.remove(isDark ? 'dark' : 'light');
  root.classList.add(nextTheme);
  localStorage.setItem('theme', nextTheme);
}

export function getTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  return stored === 'dark' ? 'dark' : 'light';
}
