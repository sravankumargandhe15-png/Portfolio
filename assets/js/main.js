// Gandhe Sravan Kumar - Portfolio Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Theme Management ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function applyTheme(isLight) {
    if (isLight) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  const savedTheme = localStorage.getItem('sravan_portfolio_theme');
  const initialLight = savedTheme ? savedTheme === 'light' : false;
  applyTheme(initialLight);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyLight = document.documentElement.classList.contains('light');
      const newLight = !isCurrentlyLight;
      applyTheme(newLight);
      localStorage.setItem('sravan_portfolio_theme', newLight ? 'light' : 'dark');
    });
  }

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- Hero Video Audio Reel Controller ---
  const heroVideo = document.getElementById('hero-background-video');
  const playReelBtn = document.getElementById('play-reel-btn');
  const reelIcon = document.getElementById('reel-icon');
  const reelLabel = document.getElementById('reel-label');

  if (heroVideo && playReelBtn) {
    // Ensure video starts playing muted automatically
    heroVideo.muted = true;
    heroVideo.play().catch(e => {
      console.log('Autoplay muted handled:', e);
    });

    playReelBtn.addEventListener('click', () => {
      if (heroVideo.muted) {
        // Unmute and play
        heroVideo.muted = false;
        heroVideo.play().catch(e => console.log('Audio playback request:', e));
        if (reelIcon) reelIcon.setAttribute('data-lucide', 'volume-2');
        if (reelLabel) reelLabel.textContent = 'MUTE AUDIO';
        showToast('Playing audio greeting: "Hi, I\'m Sravan Kumar..."');
      } else {
        // Mute
        heroVideo.muted = true;
        if (reelIcon) reelIcon.setAttribute('data-lucide', 'play');
        if (reelLabel) reelLabel.textContent = 'PLAY REEL';
      }
      if (window.lucide) window.lucide.createIcons();
    });

    heroVideo.addEventListener('ended', () => {
      heroVideo.currentTime = 0;
      heroVideo.play();
    });
  }

  // --- Skills Filter Tabs ---
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillGroups = document.querySelectorAll('.skill-group-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter');

      skillTabs.forEach(t => {
        t.classList.remove('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/20');
        t.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');
      });

      tab.classList.add('bg-cyan-500', 'text-slate-950', 'shadow-lg', 'shadow-cyan-500/20');
      tab.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');

      skillGroups.forEach(group => {
        if (category === 'all' || group.getAttribute('data-category') === category) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  // --- PDF & Certificate Modal Viewer ---
  const certModal = document.getElementById('cert-modal');
  const certModalClose = document.getElementById('cert-modal-close');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalMeta = document.getElementById('cert-modal-meta');
  const certModalIframe = document.getElementById('cert-modal-iframe');
  const certModalDownload = document.getElementById('cert-modal-download');
  const certModalVerifyBtn = document.getElementById('cert-modal-verify-btn');

  function openCertModal(title, issuer, meta, pdfUrl, verifyUrl) {
    if (!certModal) return;
    certModalTitle.textContent = title;
    certModalIssuer.textContent = issuer;
    certModalMeta.textContent = meta || '';
    certModalIframe.src = pdfUrl;
    certModalDownload.href = pdfUrl;

    if (verifyUrl && verifyUrl.trim() !== '') {
      certModalVerifyBtn.href = verifyUrl;
      certModalVerifyBtn.classList.remove('hidden');
    } else {
      certModalVerifyBtn.classList.add('hidden');
    }

    certModal.classList.remove('modal-hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.add('modal-hidden');
    certModalIframe.src = '';
    document.body.style.overflow = '';
  }

  if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });

  document.querySelectorAll('.view-cert-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Certificate';
      const issuer = btn.getAttribute('data-issuer') || 'Official Credential';
      const meta = btn.getAttribute('data-meta') || '';
      const pdfUrl = btn.getAttribute('data-pdf') || '';
      const verifyUrl = btn.getAttribute('data-verify') || '';
      openCertModal(title, issuer, meta, pdfUrl, verifyUrl);
    });
  });

  // --- Copy to Clipboard Tooltip/Toast ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 bg-cyan-500 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm transition-all duration-300 transform translate-y-4 opacity-0';
    toast.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    }, 50);

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-4', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  document.querySelectorAll('.copy-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied';
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`${label} copied to clipboard!`);
        }).catch(err => {
          console.error('Clipboard error:', err);
        });
      }
    });
  });

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('sender-message')?.value || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending message...`;
        if (window.lucide) window.lucide.createIcons();
      }

      setTimeout(() => {
        if (formStatus) {
          formStatus.classList.remove('hidden');
          formStatus.innerHTML = `
            <div class="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
              <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0"></i>
              <div>
                <p class="font-semibold text-emerald-200">Thank you, ${name || 'there'}! Your message has been prepared.</p>
                <p class="mt-1 text-slate-300 text-xs">You can also directly email Sravan at <a href="mailto:sravankumargandhe15@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}" class="text-cyan-400 underline font-medium">sravankumargandhe15@gmail.com</a>.</p>
              </div>
            </div>
          `;
          if (window.lucide) window.lucide.createIcons();
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i data-lucide="send" class="w-5 h-5"></i> Send Message`;
          if (window.lucide) window.lucide.createIcons();
        }
        contactForm.reset();
      }, 700);
    });
  }
});
