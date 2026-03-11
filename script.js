/* ══════════════════════════════════════════════════════════
   ARNGREN — Griph-Art Style Interactions & Animations
   ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Cache DOM Elements ───
  const header = document.getElementById('mainHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuLinks = document.querySelectorAll('.menu-link');
  const productsCarousel = document.getElementById('productsCarousel');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');

  // ═══════════════════════════════════════════════════════════
  // 1. HEADER SCROLL EFFECT
  // ═══════════════════════════════════════════════════════════
  let lastScrollY = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Add "scrolled" class for compact header
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // ═══════════════════════════════════════════════════════════
  // 2. FULL-SCREEN MENU OVERLAY
  // ═══════════════════════════════════════════════════════════
  const openMenu = () => {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Stagger animate menu links
    menuLinks.forEach((link, i) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(40px)';
      setTimeout(() => {
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 150 + i * 80);
    });
  };

  const closeMenu = () => {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openMenu);
  menuCloseBtn.addEventListener('click', closeMenu);

  // Close menu on link click with smooth scroll
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });

  // ═══════════════════════════════════════════════════════════
  // 3. PRODUCT CAROUSEL
  // ═══════════════════════════════════════════════════════════
  const scrollAmount = 320;

  if (carouselPrev && carouselNext && productsCarousel) {
    carouselPrev.addEventListener('click', () => {
      productsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    carouselNext.addEventListener('click', () => {
      productsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Touch/drag scrolling for mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    productsCarousel.addEventListener('mousedown', (e) => {
      isDown = true;
      productsCarousel.style.cursor = 'grabbing';
      startX = e.pageX - productsCarousel.offsetLeft;
      scrollLeft = productsCarousel.scrollLeft;
    });

    productsCarousel.addEventListener('mouseleave', () => {
      isDown = false;
      productsCarousel.style.cursor = 'grab';
    });

    productsCarousel.addEventListener('mouseup', () => {
      isDown = false;
      productsCarousel.style.cursor = 'grab';
    });

    productsCarousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - productsCarousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      productsCarousel.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    productsCarousel.style.cursor = 'grab';
  }

  // ═══════════════════════════════════════════════════════════
  // 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  // ═══════════════════════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ═══════════════════════════════════════════════════════════
  // 5. SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════
  // 6. PRODUCT CARD HOVER TILT EFFECT
  // ═══════════════════════════════════════════════════════════
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `translateY(-15px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ═══════════════════════════════════════════════════════════
  // 7. CATEGORY CARD PARALLAX IMAGES
  // ═══════════════════════════════════════════════════════════
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    const img = card.querySelector('.category-card-img');
    if (!img) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      img.style.transform = `translateY(-50%) translate(${x * 20}px, ${y * 20}px)`;
    });

    card.addEventListener('mouseleave', () => {
      img.style.transform = 'translateY(-50%)';
    });
  });

  // ═══════════════════════════════════════════════════════════
  // 8. HERO SCROLL ARROWS (Cycle hero images concept)
  // ═══════════════════════════════════════════════════════════
  const heroImages = [
    'images/hero_gadgets.png',
    'images/product_drone.png',
    'images/product_vr.png',
    'images/product_ebike.png'
  ];

  let heroIndex = 0;
  const heroImgEl = document.querySelector('.hero-image img');
  const heroScrollLeft = document.getElementById('heroScrollLeft');
  const heroScrollRight = document.getElementById('heroScrollRight');

  const switchHeroImage = (direction) => {
    if (!heroImgEl) return;

    heroIndex = (heroIndex + direction + heroImages.length) % heroImages.length;

    heroImgEl.style.opacity = '0';
    heroImgEl.style.transform = 'scale(1.05)';

    setTimeout(() => {
      heroImgEl.src = heroImages[heroIndex];
      heroImgEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      heroImgEl.style.opacity = '1';
      heroImgEl.style.transform = 'scale(1)';
    }, 300);
  };

  if (heroScrollLeft) {
    heroScrollLeft.addEventListener('click', () => switchHeroImage(-1));
  }
  if (heroScrollRight) {
    heroScrollRight.addEventListener('click', () => switchHeroImage(1));
  }

  // ═══════════════════════════════════════════════════════════
  // 9. MAGNETIC BUTTONS (Subtle mouse-follow effect)
  // ═══════════════════════════════════════════════════════════
  const magneticBtns = document.querySelectorAll('.btn-explore, .carousel-arrow, .scroll-arrow');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s ease';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease';
    });
  });

  // ═══════════════════════════════════════════════════════════
  // 10. PARALLAX SCROLL EFFECT FOR HERO
  // ═══════════════════════════════════════════════════════════
  const heroSection = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (heroSection && heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      if (scrolled < heroHeight) {
        const parallax = scrolled * 0.3;
        heroContent.style.transform = `translateY(${parallax}px)`;
        heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  // 11. NEWSLETTER FORM MICRO-INTERACTION
  // ═══════════════════════════════════════════════════════════
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    const submitBtn = newsletterForm.querySelector('button');
    newsletterForm.addEventListener('submit', () => {
      submitBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        submitBtn.style.transform = 'scale(1)';
      }, 200);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // 12. COUNTER ANIMATION FOR STATS (if visible)
  // ═══════════════════════════════════════════════════════════
  // Stats are in the ticker now, but this pattern could be reused

  // ═══════════════════════════════════════════════════════════
  // INITIAL STATE
  // ═══════════════════════════════════════════════════════════
  // Trigger initial scroll check
  onScroll();

  console.log('⚡ ARNGREN — Initialized successfully');
});
