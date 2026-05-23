// Bilingual translations handler
const Translations = {
  current: localStorage.getItem('hm-lang') || 'en',
  
  switch(lang) {
    this.current = lang;
    localStorage.setItem('hm-lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        // Only update direct text nodes
        const childNodes = Array.from(el.childNodes);
        const textNode = childNodes.find(n => n.nodeType === 3 && n.textContent.trim());
        if (textNode) {
          textNode.textContent = text;
        } else {
          el.textContent = text;
        }
      }
    });
    
    const langCurrent = document.querySelector('.lang-current');
    if (langCurrent) langCurrent.textContent = lang === 'en' ? 'EN' : 'اردو';
  },
  
  init() {
    this.switch(this.current);
  }
};
