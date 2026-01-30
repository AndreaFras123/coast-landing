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

// Form Submission Logic
const forms = document.querySelectorAll('.email-form, .footer-form');

forms.forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button');
    const originalText = button.innerText;
    const input = form.querySelector('input[name="email"]');
    
    // 1. Loading State
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
        // 2. Success State
        button.innerText = 'Joined!';
        button.style.backgroundColor = '#07A063'; // Green
        button.style.opacity = '1';
        button.style.cursor = 'default';
        input.value = ''; // Clear input
        
        // Reset after 3 seconds (optional, but good for re-use if needed)
        setTimeout(() => {
          button.innerText = 'Joined!'; // Keep success message or reset? Usually keep "Joined" to confirm
        }, 3000);
      } else {
        // Error State
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form");
        }
        // Reset button
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
