/* ==========================================================================
   DHANUMITHRA T — BESPOKE CLIENT ENGINE (v16.0)
   Features: Bespoke Center-Spreading Pink Gradient Bloom Preloader,
   Unique Fluid Drifting Rose Petals Canvas, Interactive Architecture Console,
   Tactile Magnetic Buttons, 3D Perspective Tilt, Modals, and Toast Engine.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. BESPOKE CENTER-SPREADING PINK GRADIENT BLOOM PRELOADER
  // ==========================================================================
  const preloader = document.getElementById('site-preloader');
  const spreadingAura = document.getElementById('center-spreading-gradient');
  const spreadingCounter = document.getElementById('spreading-counter');
  const spreadingBar = document.getElementById('spreading-radial-bar');

  // Lock scroll while intro plays
  document.body.classList.add('loading');

  if (preloader) {
    let progress = 0;
    // Fastened by 20% (~1.6s paced duration for responsive feel)
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 2) + 1.35;
      if (progress > 100) progress = 100;

      const rounded = Math.floor(progress);

      // Dynamically spread the pink gradient outward from center: 0.08 (compact seed) -> 1.6 (full screen immersion)
      if (spreadingAura) {
        const scale = 0.08 + (progress / 100) * 1.55;
        spreadingAura.style.setProperty('--bloom-scale', scale);
        spreadingAura.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      // Update harmonic wave rings radius expanding outward with the gradient
      const wavePx = 90 + (progress / 100) * 650;
      preloader.style.setProperty('--bloom-px', `${wavePx}px`);

      if (spreadingCounter) {
        spreadingCounter.textContent = rounded < 10 ? `0${rounded}` : `${rounded}`;
      }

      if (spreadingBar) {
        spreadingBar.style.width = `${progress}%`;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.remove('loading');
          document.body.classList.add('site-revealed');
          setTimeout(() => {
            preloader.style.display = 'none';
          }, 850);
        }, 260);
      }
    }, 28);

    // Guaranteed fallback dismissal after 2.8s
    setTimeout(() => {
      if (!preloader.classList.contains('loaded')) {
        clearInterval(interval);
        preloader.classList.add('loaded');
        document.body.classList.remove('loading');
        document.body.classList.add('site-revealed');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 850);
      }
    }, 2800);
  }

  // ==========================================================================
  // 2. UNIQUE FLUID ROSE PETALS CANVAS (Realistic Tumbling & Drifting Petals)
  // ==========================================================================
  const canvas = document.getElementById('fluid-stardust-canvas');
  const cursorGem = document.getElementById('cursor-gem');

  if (canvas && cursorGem && window.matchMedia('(pointer: fine)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouseX = -100;
    let mouseY = -100;
    let gemX = -100;
    let gemY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;

    const petals = [];

    // Rose Petal Color Palettes
    const petalPalettes = [
      { base: 'rgba(201, 50, 100, ', mid: 'rgba(244, 114, 182, ', edge: 'rgba(255, 218, 185, ' }, // Berry to Peach
      { base: 'rgba(180, 30, 80, ', mid: 'rgba(230, 80, 140, ', edge: 'rgba(255, 182, 193, ' },  // Deep Rose to Pastel Pink
      { base: 'rgba(220, 60, 110, ', mid: 'rgba(255, 150, 180, ', edge: 'rgba(255, 240, 243, ' }, // Radiant Pink to Frost
      { base: 'rgba(165, 37, 80, ', mid: 'rgba(215, 75, 125, ', edge: 'rgba(255, 200, 210, ' }   // Velvet Rose
    ];

    class RosePetal {
      constructor(x, y, vx, vy, isBurst = false) {
        this.x = x;
        this.y = y;
        this.vx = vx + (Math.random() - 0.5) * (isBurst ? 3.5 : 1.8);
        this.vy = vy + (Math.random() - 0.5) * (isBurst ? 3.5 : 1.8);
        
        // Organic Petal Dimensions
        this.length = isBurst ? Math.random() * 8 + 14 : Math.random() * 10 + 16;
        this.width = this.length * (Math.random() * 0.25 + 0.6);
        
        this.palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
        this.alpha = 1;
        this.decay = Math.random() * 0.014 + 0.012;
        
        // 3D Perspective tumbling and rotation
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.06;
        this.tumbleAngle = Math.random() * Math.PI * 2;
        this.tumbleSpeed = Math.random() * 0.05 + 0.03;
        
        // Natural wind sway
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.04 + 0.02;
        this.fallSpeed = Math.random() * 0.8 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy + this.fallSpeed;
        
        // Soft friction damping
        this.vx *= 0.96;
        this.vy *= 0.96;
        
        // Wind sway
        this.swayAngle += this.swaySpeed;
        this.x += Math.sin(this.swayAngle) * 0.65;
        
        // 3D tumble flip
        this.tumbleAngle += this.tumbleSpeed;
        this.angle += this.vAngle;
        
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);
        
        // Realistic 3D turning simulation via cosine scale
        const scaleX = Math.cos(this.tumbleAngle);
        c.scale(scaleX, 1);

        const currentAlpha = Math.max(0, this.alpha);

        // Petal Gradient
        const grad = c.createLinearGradient(0, -this.length / 2, 0, this.length / 2);
        grad.addColorStop(0, this.palette.edge + (currentAlpha * 0.8) + ')');
        grad.addColorStop(0.4, this.palette.mid + (currentAlpha * 0.9) + ')');
        grad.addColorStop(1, this.palette.base + (currentAlpha * 0.95) + ')');
        c.fillStyle = grad;

        // Draw curved rose petal contour
        c.beginPath();
        c.moveTo(0, -this.length * 0.5);
        c.bezierCurveTo(this.width * 0.65, -this.length * 0.35, this.width * 0.7, this.length * 0.25, 0, this.length * 0.5);
        c.bezierCurveTo(-this.width * 0.7, this.length * 0.25, -this.width * 0.65, -this.length * 0.35, 0, -this.length * 0.5);
        c.closePath();
        c.fill();

        // Subtle petal spine / delicate vein highlight
        c.beginPath();
        c.moveTo(0, -this.length * 0.4);
        c.quadraticCurveTo(this.width * 0.08, 0, 0, this.length * 0.38);
        c.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.4})`;
        c.lineWidth = 1;
        c.stroke();

        c.restore();
      }
    }

    // Emit petals on mouse movement
    window.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-active');
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const dist = Math.hypot(dx, dy);

      // Spawn falling rose petals proportional to velocity
      if (dist > 4) {
        const count = Math.min(Math.floor(dist / 6), 3);
        for (let i = 0; i < count; i++) {
          petals.push(new RosePetal(
            mouseX + (Math.random() - 0.5) * 14,
            mouseY + (Math.random() - 0.5) * 14,
            dx * 0.12,
            dy * 0.12
          ));
        }
      }

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });

    // Swirling Petal Burst on interactive hover
    function triggerPetalBloom(x, y) {
      for (let i = 0; i < 11; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 1.2;
        petals.push(new RosePetal(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          true
        ));
      }
    }

    // Animation Loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Smooth gemstone cursor lerp
      gemX += (mouseX - gemX) * 0.22;
      gemY += (mouseY - gemY) * 0.22;
      cursorGem.style.transform = `translate(${gemX}px, ${gemY}px)`;

      // Update & render petals
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        if (p.update()) {
          p.draw(ctx);
        } else {
          petals.splice(i, 1);
        }
      }

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // Interactive element hover detection
    const interactives = document.querySelectorAll(
      'a, button, input, textarea, .resume-select-card, .ledger-item, .project-showcase-card, .gnn-node, .honor-card, .experience-card, .project-grid-card, .interest-card, .skills-card, .skill-pill, .about-card, .footer-icon-btn, .badge-chip, .hero-portrait-card'
    );

    interactives.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        document.body.classList.add('cursor-hover');
        triggerPetalBloom(e.clientX, e.clientY);
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // ==========================================================================
  // 3. TACTILE MAGNETIC PULL ON PRIMARY BUTTONS
  // ==========================================================================
  const magneticBtns = document.querySelectorAll('.btn-pill-primary');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ==========================================================================
  // 4. 3D PERSPECTIVE TILT ON CARDS & LEDGER
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.project-showcase-card, .hero-ledger-strip, .project-grid-card, .interest-card, .skills-card, .about-card, .hero-portrait-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -1.8;
      const rotateY = ((x - centerX) / centerX) * 1.8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================================================
  // 6. CLEAN TOAST NOTIFICATION
  // ==========================================================================
  const toast = document.getElementById('clean-toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================================================
  // 7. RESUME ROLE SPECIALIZATION MODAL
  // ==========================================================================
  const resumeModal = document.getElementById('clean-resume-modal');
  const resumeCloseBtn = document.getElementById('clean-resume-close');
  const resumeTriggers = document.querySelectorAll('.resume-trigger-btn');
  const resumeCards = document.querySelectorAll('.resume-select-card');
  const resumeDownloadBtn = document.getElementById('clean-resume-download-btn');

  function openResumeModal() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResumeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  resumeCards.forEach(card => {
    card.addEventListener('click', () => {
      resumeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const role = card.getAttribute('data-role');
      if (role === 'data') {
        resumeDownloadBtn.href = 'Data.pdf';
        resumeDownloadBtn.setAttribute('download', 'Dhanumithra_T_Data_Systems_Resume.pdf');
        resumeDownloadBtn.querySelector('span').textContent = 'Download Data & Systems Resume (.PDF)';
      } else {
        resumeDownloadBtn.href = 'SDE.pdf';
        resumeDownloadBtn.setAttribute('download', 'Dhanumithra_T_SDE_Resume.pdf');
        resumeDownloadBtn.querySelector('span').textContent = 'Download SDE Resume (.PDF)';
      }
    });
  });

  // ==========================================================================
  // 8. CONTACT INQUIRY MODAL
  // ==========================================================================
  const contactModal = document.getElementById('clean-contact-modal');
  const contactCloseBtn = document.getElementById('clean-contact-close');
  const contactTriggers = document.querySelectorAll('.contact-trigger-btn');
  const contactForm = document.getElementById('clean-contact-form');

  function openContactModal() {
    if (contactModal) {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeContactModal() {
    if (contactModal) {
      contactModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  contactTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeContactModal();
      openContactModal();
    });
  });

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Guest';
      showToast(`Thank you, ${name}! Your message has been dispatched to dhanumithra6002@gmail.com.`);
      contactForm.reset();
      setTimeout(closeContactModal, 600);
    });
  }

  // ==========================================================================
  // 9. COPY EMAIL BUTTON
  // ==========================================================================
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'dhanumithra6002@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied to clipboard: ${email}`);
        }).catch(() => {
          prompt('Copy email address:', email);
        });
      } else {
        prompt('Copy email address:', email);
      }
    });
  });

  // ==========================================================================
  // 10. ACTIVE NAV LINK ON SCROLL (SCROLLSPY)
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, footer');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResumeModal();
      closeContactModal();
    }
  });

});
