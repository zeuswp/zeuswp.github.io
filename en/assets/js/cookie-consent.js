/**
 * Cookie Consent Management Script
 * Compliant with GDPR and German privacy regulations
 * Last updated: September 29, 2025
 */

class CookieConsent {
  constructor() {
    this.consentBanner = document.querySelector('.cookie-consent');
    this.settingsModal = document.querySelector('.cookie-settings-modal');
    this.consentGiven = false;
    this.cookieCategories = {
      necessary: {
        name: 'Notwendige Cookies',
        description: 'Diese Cookies sind für das Funktionieren der Website unbedingt erforderlich und können nicht deaktiviert werden.',
        required: true,
        enabled: true
      },
      analytics: {
        name: 'Analytische Cookies',
        description: 'Diese Cookies ermöglichen es uns, die Nutzung der Website zu analysieren und das Benutzererlebnis zu verbessern.',
        required: false,
        enabled: false
      },
      marketing: {
        name: 'Marketing Cookies',
        description: 'Diese Cookies werden verwendet, um Ihnen relevantere Werbung zu zeigen, basierend auf Ihren Interessen und Ihrem Browsing-Verhalten.',
        required: false,
        enabled: false
      },
      preferences: {
        name: 'Präferenz-Cookies',
        description: 'Diese Cookies speichern Ihre Einstellungen und Präferenzen, um Ihren Besuch angenehmer zu gestalten.',
        required: false,
        enabled: false
      }
    };

    this.init();
  }

  init() {
   
    if (!this.hasConsent()) {
      this.showBanner();
    }

   
    this.setupEventListeners();
  }

  hasConsent() {
    return localStorage.getItem('cookieConsent') === 'true';
  }

  showBanner() {
    if (this.consentBanner) {
      setTimeout(() => {
        this.consentBanner.classList.add('show');
      }, 1000);
    }
  }

  hideBanner() {
    if (this.consentBanner) {
      this.consentBanner.classList.remove('show');
    }
  }

  showSettingsModal() {
    if (this.settingsModal) {
      this.settingsModal.classList.add('show');
      document.body.style.overflow = 'hidden';
      
     
      this.updateToggleStates();
    }
  }

  hideSettingsModal() {
    if (this.settingsModal) {
      this.settingsModal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  acceptAll() {
   
    for (const category in this.cookieCategories) {
      this.cookieCategories[category].enabled = true;
    }
    
    this.savePreferences();
    this.hideBanner();
    this.hideSettingsModal();
  }

  rejectAll() {
   
    for (const category in this.cookieCategories) {
      if (!this.cookieCategories[category].required) {
        this.cookieCategories[category].enabled = false;
      }
    }
    
    this.savePreferences();
    this.hideBanner();
    this.hideSettingsModal();
  }

  savePreferences() {
   
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(this.cookieCategories));
    this.consentGiven = true;
    
   
    this.setCookiesBasedOnPreferences();
    
   
    const event = new CustomEvent('cookieConsentUpdated', {
      detail: { preferences: this.cookieCategories }
    });
    document.dispatchEvent(event);
  }

  setCookiesBasedOnPreferences() {
   
   
    console.log('Cookie preferences saved:', this.cookieCategories);
  }

  loadSavedPreferences() {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        for (const category in parsedPreferences) {
          if (this.cookieCategories[category]) {
            this.cookieCategories[category].enabled = parsedPreferences[category].enabled;
          }
        }
      } catch (e) {
        console.error('Error loading cookie preferences', e);
      }
    }
  }

  updateToggleStates() {
   
    this.loadSavedPreferences();
    
   
    const toggles = document.querySelectorAll('.cookie-category-toggle');
    toggles.forEach(toggle => {
      const category = toggle.getAttribute('data-category');
      if (this.cookieCategories[category]) {
        toggle.checked = this.cookieCategories[category].enabled;
        
       
        if (this.cookieCategories[category].required) {
          toggle.disabled = true;
          toggle.checked = true;
        } else {
          toggle.disabled = false;
        }
      }
    });
  }

  setupEventListeners() {
   
    const acceptAllButtons = document.querySelectorAll('.btn-accept-all');
    acceptAllButtons.forEach(button => {
      button.addEventListener('click', () => this.acceptAll());
    });
    
   
    const rejectAllButtons = document.querySelectorAll('.btn-reject-all');
    rejectAllButtons.forEach(button => {
      button.addEventListener('click', () => this.rejectAll());
    });
    
   
    const settingsButtons = document.querySelectorAll('.btn-cookie-settings');
    settingsButtons.forEach(button => {
      button.addEventListener('click', () => this.showSettingsModal());
    });
    
   
    const closeButtons = document.querySelectorAll('.cookie-settings-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', () => this.hideSettingsModal());
    });
    
   
    const saveButtons = document.querySelectorAll('.btn-save-preferences');
    saveButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.updatePreferencesFromToggles();
        this.savePreferences();
        this.hideSettingsModal();
        this.hideBanner();
      });
    });
    
   
    const toggles = document.querySelectorAll('.cookie-category-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('change', e => {
        const category = e.target.getAttribute('data-category');
        if (this.cookieCategories[category] && !this.cookieCategories[category].required) {
          this.cookieCategories[category].enabled = e.target.checked;
        }
      });
    });
    
   
    if (this.settingsModal) {
      this.settingsModal.addEventListener('click', e => {
        if (e.target === this.settingsModal) {
          this.hideSettingsModal();
        }
      });
    }
  }

  updatePreferencesFromToggles() {
    const toggles = document.querySelectorAll('.cookie-category-toggle');
    toggles.forEach(toggle => {
      const category = toggle.getAttribute('data-category');
      if (this.cookieCategories[category] && !this.cookieCategories[category].required) {
        this.cookieCategories[category].enabled = toggle.checked;
      }
    });
  }
}


document.addEventListener('DOMContentLoaded', () => {
  window.cookieConsent = new CookieConsent();
});