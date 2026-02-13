import './style.css'
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

console.log('Coast landing page loaded');

// ========== REFERRAL SYSTEM ==========

// Generate a simple referral code from email (base64, URL-safe)
function generateRefCode(email) {
  return btoa(email).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c]));
}

// Decode referral code back to email (for debugging)
function decodeRefCode(code) {
  try {
    const padded = code.replace(/-/g, '+').replace(/_/g, '/');
    return atob(padded);
  } catch {
    return null;
  }
}

// Check for referral code in URL on page load
function checkReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');
  
  if (refCode) {
    // Store the referrer code in localStorage
    localStorage.setItem('coast_referrer', refCode);
    console.log('Referral detected:', refCode);
    
    // Clean URL without refreshing (optional, keeps URL clean)
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
  
  // Set the hidden input if referrer exists
  const referredByInput = document.getElementById('referred-by-input');
  const storedReferrer = localStorage.getItem('coast_referrer');
  
  if (referredByInput && storedReferrer) {
    referredByInput.value = storedReferrer;
  }
}

// Show share section with referral link
function showShareSection(email) {
  const shareSection = document.getElementById('share-section');
  const shareLinkInput = document.getElementById('share-link');
  const copyBtn = document.getElementById('copy-link-btn');
  
  if (!shareSection || !shareLinkInput) return;
  
  // Generate referral link
  const refCode = generateRefCode(email);
  const referralLink = `https://coast.academy/?ref=${refCode}`;
  
  shareLinkInput.value = referralLink;
  shareSection.style.display = 'block';
  
  // Set up social share links
  const shareText = "I just joined the Coast waitlist! Use my link to skip the queue and get early access to AI-powered exam prep 🎓";
  
  const whatsappBtn = document.getElementById('share-whatsapp');
  
  if (whatsappBtn) {
    whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + referralLink)}`;
  }
  
  // Copy button functionality
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(referralLink).then(() => {
        copyBtn.innerText = 'Copied!';
        copyBtn.style.backgroundColor = '#07A063';
        setTimeout(() => {
          copyBtn.innerText = 'Copy';
          copyBtn.style.backgroundColor = '';
        }, 2000);
      });
    });
  }
  
  // Clear the referrer from localStorage (they've signed up, no longer need it)
  localStorage.removeItem('coast_referrer');
}

// Run referral check on page load
checkReferral();

// ========== JOIN BETA BUTTON ==========

const joinBtns = document.querySelectorAll('.btn-primary, .feature-btn'); 
const emailInput = document.getElementById('email-input');

if (emailInput) {
  joinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.tagName === 'A' && btn.getAttribute('href') === '#join') {
        e.preventDefault();
        
        emailInput.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });

        setTimeout(() => {
          emailInput.focus();
        }, 500);
      }
    });
  });
}

// ========== FORM SUBMISSION ==========

const forms = document.querySelectorAll('.email-form, .footer-form');

forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;
    const input = form.querySelector('input[name="email"]');
    const userEmail = input.value;
    
    // Loading State
    button.disabled = true;
    button.innerText = 'Saving...';
    button.style.opacity = '0.8';
    button.style.cursor = 'wait';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success State
        button.innerText = 'Joined!';
        button.style.backgroundColor = '#07A063';
        button.style.opacity = '1';
        button.style.cursor = 'default';
        
        // Show share section for main form
        if (form.id === 'main-email-form') {
          showShareSection(userEmail);
        }
        
        input.value = '';
        
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form");
        }
        button.disabled = false;
        button.innerText = originalText;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
      button.disabled = false;
      button.innerText = originalText;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
  });
});

// ========== HERO VIDEO ==========

const heroVideo = document.getElementById('hero-video');
const heroPlayBtn = document.getElementById('hero-play-btn');

if (heroVideo && heroPlayBtn) {
  // If video fails to autoplay, show play button
  heroVideo.play().catch(() => {
    heroPlayBtn.classList.add('visible');
  });

  heroPlayBtn.addEventListener('click', () => {
    heroVideo.play();
    heroPlayBtn.classList.remove('visible');
  });
}

// ========== UI SHOWCASE TABS ==========

const showcaseTabs = document.querySelectorAll('.showcase-tab');
const showcaseScreens = document.querySelectorAll('.showcase-screen');

if (showcaseTabs.length > 0) {
  showcaseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-screen');

      showcaseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      showcaseScreens.forEach(screen => {
        screen.classList.toggle('active', screen.getAttribute('data-screen') === target);
      });
    });
  });
}

// ========== THEME TOGGLE (showcase dark/light) ==========

const themeToggle = document.getElementById('theme-toggle');
const showcaseSection = document.querySelector('.ui-showcase-section');
let isDarkPreview = false;

if (themeToggle && showcaseSection) {
  themeToggle.addEventListener('click', () => {
    isDarkPreview = !isDarkPreview;
    themeToggle.classList.toggle('dark', isDarkPreview);
    showcaseSection.classList.toggle('dark-preview', isDarkPreview);

    // Swap images for screens that have dark variants
    showcaseScreens.forEach(screen => {
      const lightSrc = screen.getAttribute('data-light');
      const darkSrc = screen.getAttribute('data-dark');

      if (isDarkPreview && darkSrc) {
        screen.src = darkSrc;
      } else if (lightSrc) {
        screen.src = lightSrc;
      }
    });
  });
}

// ========== FULL VIDEO SECTION ==========

const fullVideo = document.getElementById('full-video');
const fullVideoPlay = document.getElementById('full-video-play');

if (fullVideo && fullVideoPlay) {
  fullVideoPlay.addEventListener('click', () => {
    fullVideo.play();
    fullVideoPlay.classList.add('hidden');
  });

  fullVideo.addEventListener('pause', () => {
    fullVideoPlay.classList.remove('hidden');
  });

  fullVideo.addEventListener('ended', () => {
    fullVideoPlay.classList.remove('hidden');
  });

  // Allow clicking video to pause/play
  fullVideo.addEventListener('click', () => {
    if (fullVideo.paused) {
      fullVideo.play();
      fullVideoPlay.classList.add('hidden');
    } else {
      fullVideo.pause();
    }
  });
}

// ========== FAQ ACCORDION ==========

const faqCategories = document.querySelectorAll('.faq-category');
const faqGroups = document.querySelectorAll('.faq-content-group');

if (faqCategories.length > 0) {
  faqCategories.forEach(category => {
    category.addEventListener('click', () => {
      faqCategories.forEach(c => c.classList.remove('active'));
      category.classList.add('active');

      const targetId = category.getAttribute('data-target');
      faqGroups.forEach(group => group.classList.remove('active'));

      const targetGroup = document.getElementById(targetId);
      if (targetGroup) {
        targetGroup.classList.add('active');
      }
    });
  });
}
