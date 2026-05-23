// =============================================
// HM CARPETS - PAGE-SPECIFIC SCRIPTS
// (Init logic moved to init.js)
// =============================================

// HERO SLIDER
const HeroSlider = {
  currentSlide: 0,
  totalSlides: 3,
  autoplayInterval: null,
  autoplayDelay: 6000,
  
  init() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return;
    
    this.slides = document.querySelectorAll('.hero-slide');
    this.dots = document.querySelectorAll('.hero-dot');
    this.prevBtn = document.getElementById('heroPrev');
    this.nextBtn = document.getElementById('heroNext');
    
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i)));
    
    let startX = 0;
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) (diff > 0 ? this.next() : this.prev());
    });
    
    slider.addEventListener('mouseenter', () => this.pauseAutoplay());
    slider.addEventListener('mouseleave', () => this.startAutoplay());
    this.startAutoplay();
  },
  
  goTo(i) {
    this.slides[this.currentSlide]?.classList.remove('active');
    this.dots[this.currentSlide]?.classList.remove('active');
    this.currentSlide = (i + this.totalSlides) % this.totalSlides;
    this.slides[this.currentSlide]?.classList.add('active');
    this.dots[this.currentSlide]?.classList.add('active');
  },
  
  next() { this.goTo(this.currentSlide + 1); this.resetAutoplay(); },
  prev() { this.goTo(this.currentSlide - 1); this.resetAutoplay(); },
  startAutoplay() { this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay); },
  pauseAutoplay() { clearInterval(this.autoplayInterval); },
  resetAutoplay() { this.pauseAutoplay(); this.startAutoplay(); }
};

// COUNTER
const Counter = {
  init() {
    const counters = document.querySelectorAll('.counter, .hero-stat-num');
    if (!counters.length) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(c => observer.observe(c));
  },
  
  animate(el) {
    const target = parseInt(el.dataset.target || el.dataset.count || 0);
    const duration = 2000, stepTime = 30;
    const increment = target / (duration / stepTime);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, stepTime);
  }
};

// GALLERY
const Gallery = {
  currentImageIndex: 0,
  visibleImages: [],
  
  init() {
    const filters = document.querySelectorAll('.gallery-filter');
    const items = document.querySelectorAll('.gallery-item');
    if (!filters.length || !items.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const cat = filter.dataset.filter;
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        items.forEach(item => {
          if (cat === 'all' || item.dataset.category === cat) item.classList.remove('hidden');
          else item.classList.add('hidden');
        });
      });
    });
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        this.visibleImages = Array.from(items).filter(i => !i.classList.contains('hidden'));
        this.currentImageIndex = this.visibleImages.indexOf(item);
        this.openLightbox(item);
      });
    });
    
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightboxClose')?.addEventListener('click', () => this.closeLightbox());
    document.getElementById('lightboxPrev')?.addEventListener('click', () => this.navigate(-1));
    document.getElementById('lightboxNext')?.addEventListener('click', () => this.navigate(1));
    
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) this.closeLightbox(); });
    
    document.addEventListener('keydown', e => {
      if (!lightbox?.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
  },
  
  openLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    if (!lightbox || !img) return;
    
    img.src = item.dataset.image || item.querySelector('img').src;
    img.alt = item.querySelector('h4').textContent;
    if (caption) caption.textContent = `${item.querySelector('.gallery-category').textContent} — ${item.querySelector('h4').textContent}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  closeLightbox() {
    document.getElementById('lightbox')?.classList.remove('active');
    document.body.style.overflow = '';
  },
  
  navigate(d) {
    if (!this.visibleImages.length) return;
    this.currentImageIndex = (this.currentImageIndex + d + this.visibleImages.length) % this.visibleImages.length;
    this.openLightbox(this.visibleImages[this.currentImageIndex]);
  }
};

// TESTIMONIALS
const Testimonials = {
  currentSlide: 0, totalSlides: 5, autoplayInterval: null, autoplayDelay: 7000,
  
  init() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    this.cards = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.test-dot');
    this.totalSlides = this.cards.length;
    
    document.getElementById('testPrev')?.addEventListener('click', () => this.prev());
    document.getElementById('testNext')?.addEventListener('click', () => this.next());
    this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i)));
    
    let startX = 0;
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) (diff > 0 ? this.next() : this.prev());
    });
    
    slider.addEventListener('mouseenter', () => this.pauseAutoplay());
    slider.addEventListener('mouseleave', () => this.startAutoplay());
    this.startAutoplay();
  },
  
  goTo(i) {
    this.cards[this.currentSlide]?.classList.remove('active');
    this.dots[this.currentSlide]?.classList.remove('active');
    this.currentSlide = (i + this.totalSlides) % this.totalSlides;
    this.cards[this.currentSlide]?.classList.add('active');
    this.dots[this.currentSlide]?.classList.add('active');
  },
  
  next() { this.goTo(this.currentSlide + 1); this.resetAutoplay(); },
  prev() { this.goTo(this.currentSlide - 1); this.resetAutoplay(); },
  startAutoplay() { this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay); },
  pauseAutoplay() { clearInterval(this.autoplayInterval); },
  resetAutoplay() { this.pauseAutoplay(); this.startAutoplay(); }
};

// MAP TABS
const MapTabs = {
  init() {
    const tabs = document.querySelectorAll('.map-tab');
    const contents = document.querySelectorAll('.map-content');
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`map-${tab.dataset.map}`)?.classList.add('active');
      });
    });
  }
};

// CONTACT FORM
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const msg = `*New Inquiry from HM Carpets Website*%0A%0A*Name:* ${data.get('name')}%0A*Phone:* ${data.get('phone')}%0A*Email:* ${data.get('email') || 'Not provided'}%0A*City:* ${data.get('city') || 'Not provided'}%0A*Interested In:* ${data.get('interest')}%0A%0A*Message:*%0A${data.get('message')}`;
  
  const submitBtn = form.querySelector('.form-submit');
  const originalHTML = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    window.open(`https://wa.me/923256881111?text=${msg}`, '_blank');
    submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)';
    showToast('Message sent! Opening WhatsApp...', 'success');
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }, 1000);
  return false;
}

// TOAST
function showToast(message, type = 'info') {
  document.querySelector('.toast')?.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 4000);
}

// CATALOG FILTERS (Products page)
const CatalogFilter = {
  init() {
    const filters = document.querySelectorAll('.catalog-filter');
    const cards = document.querySelectorAll('.catalog-card');
    if (!filters.length || !cards.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const cat = filter.dataset.filter;
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        cards.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          if (cat === 'all' || categories.includes(cat)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
};

// FAQ ACCORDION
const FAQ = {
  init() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;
    
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }
};
