// Theme switcher
const Theme = {
  current: localStorage.getItem('hm-theme') || 'light',
  
  switch(theme) {
    this.current = theme;
    localStorage.setItem('hm-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F0F0F' : '#E63946');
  },
  
  toggle() {
    this.switch(this.current === 'light' ? 'dark' : 'light');
  },
  
  init() {
    this.switch(this.current);
  }
};
