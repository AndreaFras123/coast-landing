import './style.css'
import { inject } from '@vercel/analytics';

inject();

// ========== REFERRAL SYSTEM ==========

function generateRefCode(email) {
  return btoa(email).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c]));
}

function checkReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');

  if (refCode) {
    localStorage.setItem('coast_referrer', refCode);
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }

  const referredByInput = document.getElementById('referred-by-input');
  const storedReferrer = localStorage.getItem('coast_referrer');
  if (referredByInput && storedReferrer) {
    referredByInput.value = storedReferrer;
  }
}

function showShareSection(email) {
  const shareSection = document.getElementById('share-section');
  const shareLinkInput = document.getElementById('share-link');
  const copyBtn = document.getElementById('copy-link-btn');

  if (!shareSection || !shareLinkInput) return;

  const refCode = generateRefCode(email);
  const referralLink = `https://coast.academy/?ref=${refCode}`;
  shareLinkInput.value = referralLink;
  shareSection.style.display = 'block';

  const shareText = "I just joined the Coast waitlist! Use my link to get early access to the first study system built around real exams 🎓";
  const whatsappBtn = document.getElementById('share-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + referralLink)}`;
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(referralLink).then(() => {
        copyBtn.innerText = 'Copied!';
        copyBtn.style.backgroundColor = '#4ADE80';
        setTimeout(() => { copyBtn.innerText = 'Copy'; copyBtn.style.backgroundColor = ''; }, 2000);
      });
    });
  }

  localStorage.removeItem('coast_referrer');
}

checkReferral();

// ========== SMOOTH SCROLL FOR NAV ==========

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile nav if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ========== MOBILE NAV ==========

const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ========== FORM SUBMISSION ==========

const forms = document.querySelectorAll('.email-form');

forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;
    const input = form.querySelector('input[name="email"]');
    const userEmail = input.value;

    button.disabled = true;
    button.innerText = 'Joining...';
    button.style.opacity = '0.8';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        button.innerText = "You're in! ✓";
        button.style.backgroundColor = '#4ADE80';
        button.style.opacity = '1';

        if (form.id === 'main-email-form') {
          showShareSection(userEmail);
        }

        input.value = '';
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors) {
          alert(data.errors.map(err => err.message).join(', '));
        } else {
          alert('Something went wrong. Please try again.');
        }
        button.disabled = false;
        button.innerText = originalText;
        button.style.opacity = '1';
      }
    } catch {
      alert('Something went wrong. Please try again.');
      button.disabled = false;
      button.innerText = originalText;
      button.style.opacity = '1';
    }
  });
});

// ========== FAQ ACCORDION ==========

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    // Toggle clicked
    if (!wasOpen) item.classList.add('open');
  });
});

// ========== SCROLL REVEAL ==========

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2').forEach(el => {
  revealObserver.observe(el);
});

// ========== STAT COUNTER ANIMATION ==========

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    statObserver.unobserve(el);

    const duration = 1200;
    const start = performance.now();
    (function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(animate);
    })(start);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  statObserver.observe(el);
});

// ========== NAVBAR SCROLL EFFECT ==========

let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (navbar) {
    if (scrollY > 100) {
      navbar.style.background = 'rgba(8,8,12,0.95)';
    } else {
      navbar.style.background = 'rgba(8,8,12,0.85)';
    }
  }
  lastScroll = scrollY;
}, { passive: true });
