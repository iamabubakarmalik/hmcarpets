// =============================================
// HM CARPETS - PAGE INITIALIZATION
// Runs AFTER components are loaded
// =============================================

document.addEventListener('componentsLoaded', () => {
  console.log('[Init] componentsLoaded event received');
  
  // Init theme & language
  if (typeof Theme !== 'undefined') {
    Theme.init();
    console.log('[Init] Theme initialized');
  }
  if (typeof Translations !== 'undefined') {
    Translations.init();
    console.log('[Init] Translations initialized');
  }
  
  // Init AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 50
    });
  }
  
  // Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Hide preloader (primary location — after everything is set up)
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.remove();
      console.log('[Init] Preloader hidden');
    }
  }, 800);
  
  // Header Scroll Effect
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
    
    if (window.scrollY > 400) scrollTopBtn?.classList.add('show');
    else scrollTopBtn?.classList.remove('show');
  });
  
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');
  const navMobileClose = document.getElementById('navMobileClose');
  const navMobileOverlay = document.getElementById('navMobileOverlay');
  
  const openMenu = () => {
    hamburger?.classList.add('active');
    navMobile?.classList.add('active');
    navMobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  const closeMenu = () => {
    hamburger?.classList.remove('active');
    navMobile?.classList.remove('active');
    navMobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  hamburger?.addEventListener('click', () => {
    if (navMobile?.classList.contains('active')) closeMenu();
    else openMenu();
  });
  
  navMobileClose?.addEventListener('click', closeMenu);
  navMobileOverlay?.addEventListener('click', closeMenu);
  
  document.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Theme Toggle
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    if (typeof Theme !== 'undefined') Theme.toggle();
  });
  
  // Language Toggle
  document.getElementById('langToggle')?.addEventListener('click', () => {
    if (typeof Translations !== 'undefined') {
      Translations.switch(Translations.current === 'en' ? 'ur' : 'en');
    }
  });
  
  // Init page-specific features
  if (typeof HeroSlider !== 'undefined') HeroSlider.init();
  if (typeof Counter !== 'undefined') Counter.init();
  if (typeof Gallery !== 'undefined') Gallery.init();
  if (typeof Testimonials !== 'undefined') Testimonials.init();
  if (typeof MapTabs !== 'undefined') MapTabs.init();
  
  // Active nav link on scroll (home page only)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) current = section.getAttribute('id');
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
      });
    });
  }
  
  console.log('%c HM Carpets ', 'background: #E63946; color: #fff; padding: 8px 16px; border-radius: 4px; font-weight: bold; font-size: 14px;', '✨ Powered by Orve Solutions');
});

// Ultimate failsafe — if componentsLoaded never fires, hide preloader after 5 seconds
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.remove();
    console.warn('[Init] Preloader force-hidden by ultimate failsafe');
  }
}, 5000);

// Init catalog & FAQ on relevant pages
document.addEventListener('componentsLoaded', () => {
  if (typeof CatalogFilter !== 'undefined') CatalogFilter.init();
  if (typeof FAQ !== 'undefined') FAQ.init();
});
