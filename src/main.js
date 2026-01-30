import './style.css'

console.log('Coast landing page loaded');

// Handle "Join Beta" button click & Feature Buttons
const joinBtns = document.querySelectorAll('.btn-primary, .feature-btn'); 
const emailInput = document.getElementById('email-input');

if (emailInput) {
  joinBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Only prevent default if it's an anchor link jumping to #join
      if (btn.tagName === 'A' && btn.getAttribute('href') === '#join') {
        e.preventDefault();
        
        // Smooth scroll to the input
        emailInput.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });

        // Focus the input after a small delay
        setTimeout(() => {
          emailInput.focus();
        }, 500);
      }
    });
  });
}

// FAQ Tab Logic
const faqCategories = document.querySelectorAll('.faq-category');
const faqGroups = document.querySelectorAll('.faq-content-group');

if (faqCategories.length > 0) {
  faqCategories.forEach(category => {
    category.addEventListener('click', () => {
      // 1. Remove active class from all categories
      faqCategories.forEach(c => c.classList.remove('active'));
      // 2. Add active class to clicked category
      category.classList.add('active');

      // 3. Get target ID
      const targetId = category.getAttribute('data-target');

      // 4. Hide all content groups
      faqGroups.forEach(group => group.classList.remove('active'));

      // 5. Show target content group
      const targetGroup = document.getElementById(targetId);
      if (targetGroup) {
        targetGroup.classList.add('active');
      }
    });
  });
}
