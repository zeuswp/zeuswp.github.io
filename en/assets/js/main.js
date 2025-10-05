document.addEventListener('DOMContentLoaded', function() {
 
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('show');
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
    });
  }

 
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
       
        if (nav.classList.contains('show')) {
          nav.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: targetPosition - headerHeight - 20,
            behavior: 'smooth'
          });
        }
      }
    });
  });

 
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkVisibility() {
    animateElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (elementPosition.top < windowHeight * 0.85) {
        element.classList.add('visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('resize', checkVisibility);
  
 
  checkVisibility();

 
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      window.location.href="thanks.html";
    });
  });

 
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }
  
 
  document.querySelectorAll('[data-open-modal]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });
  
  document.querySelectorAll('[data-close-modal]').forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.closest('.modal').id;
      closeModal(modalId);
    });
  });
  
 
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });

 
  window.modalFunctions = {
    openModal,
    closeModal
  };

 
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
     
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
      
      setTimeout(() => {
        window.location.href = 'thanks.html';
      }, 1500);
    });
  }
});


function createFloatingElements() {
  const container = document.querySelector('.floating-elements');
  if (!container) return;
  
  for (let i = 0; i < 5; i++) {
    const floatEl = document.createElement('div');
    floatEl.className = 'float-el';
    
   
    const size = Math.random() * 200 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    floatEl.style.width = `${size}px`;
    floatEl.style.height = `${size}px`;
    floatEl.style.left = `${posX}%`;
    floatEl.style.top = `${posY}%`;
    
   
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    floatEl.style.animationDelay = `${delay}s`;
    floatEl.style.animationDuration = `${duration}s`;
    
    container.appendChild(floatEl);
  }
}


createFloatingElements();