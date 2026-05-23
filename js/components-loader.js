// HM CARPETS - COMPONENTS LOADER
// Powered by Orve Solutions

const ComponentsLoader = {
  isInnerPage: window.location.pathname.includes('/pages/'),
  
  getPaths() {
    if (this.isInnerPage) {
      return {
        HOME: '../index.html',
        PAGES: '.',
        ASSETS: '../assets',
        COMPONENTS: '../components',
        CSS: '../css',
        JS: '../js'
      };
    }
    return {
      HOME: 'index.html',
      PAGES: 'pages',
      ASSETS: 'assets',
      COMPONENTS: 'components',
      CSS: 'css',
      JS: 'js'
    };
  },
  
  processTemplate(html) {
    const paths = this.getPaths();
    return html
      .replace(/\{\{HOME\}\}/g, paths.HOME)
      .replace(/\{\{PAGES\}\}/g, paths.PAGES)
      .replace(/\{\{ASSETS\}\}/g, paths.ASSETS)
      .replace(/\{\{COMPONENTS\}\}/g, paths.COMPONENTS)
      .replace(/\{\{CSS\}\}/g, paths.CSS)
      .replace(/\{\{JS\}\}/g, paths.JS);
  },
  
  async loadComponent(name, targetSelector) {
    try {
      const paths = this.getPaths();
      const url = paths.COMPONENTS + '/' + name + '.html';
      console.log('[Loader] Fetching: ' + url);
      const response = await fetch(url);
      
      if (!response.ok) throw new Error('Failed to load ' + name + ': ' + response.status);
      
      let html = await response.text();
      html = this.processTemplate(html);
      
      const target = document.querySelector(targetSelector);
      if (target) {
        target.innerHTML = html;
        console.log('[Loader] OK ' + name + ' loaded into ' + targetSelector);
        return true;
      }
      console.warn('[Loader] Target ' + targetSelector + ' not found');
      return false;
    } catch (err) {
      console.error('[Loader] Error loading ' + name + ':', err);
      return false;
    }
  },
  
  setActiveNav() {
    const pageName = document.body.dataset.page || 'home';
    document.querySelectorAll('[data-page="' + pageName + '"]').forEach(link => {
      link.classList.add('active');
    });
  },
  
  async init() {
    console.log('[Loader] Starting component load...');
    
    const headerLoaded = await this.loadComponent('header', '#header-placeholder');
    const footerLoaded = await this.loadComponent('footer', '#footer-placeholder');
    
    this.setActiveNav();
    
    console.log('[Loader] Components ready. Dispatching event...');
    document.dispatchEvent(new CustomEvent('componentsLoaded', {
      detail: { headerLoaded, footerLoaded }
    }));
    
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader && !preloader.classList.contains('hidden')) {
        preloader.remove();
        console.log('[Loader] Preloader hidden by failsafe');
      }
    }, 1500);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ComponentsLoader.init());
} else {
  ComponentsLoader.init();
}
