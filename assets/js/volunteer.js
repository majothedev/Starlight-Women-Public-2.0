(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');
  const themeToggle = document.getElementById('theme-toggle');
  const langToggle = document.getElementById('lang-toggle');
  const volunteerForm = document.getElementById('volunteer-form');
  const formMessage = document.getElementById('form-message');
  const submitButton = volunteerForm ? volunteerForm.querySelector('.volunteer-form__submit') : null;
  const root = document.documentElement;
  const formEndpoint = 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_SCRIPT_ID/exec';

  const translations = {
    en: {
      formTitle: 'Become a Volunteer',
      formIntro: 'Help us empower women worldwide.',
      formDescription: 'Share your skills, time, and compassion to support women and girls through meaningful community work.',
      langLabel: 'Deutsch',
      sectionPersonal: 'PERSONAL INFORMATION',
      requiredNotice: 'This section is compulsory.',
      labelFirstName: 'First Name',
      labelLastName: 'Last Name',
      labelEmail: 'Email',
      labelPhone: 'Phone',
      labelDob: 'Date of Birth',
      labelAddress: 'Address',
      labelCountry: 'Country',
      sectionOccupation: 'OCCUPATION',
      labelCompany: 'Company',
      labelPosition: 'Position',
      sectionInterests: 'VOLUNTEER INTERESTS',
      labelDepartment: 'Department',
      optionSelect: 'Select a department',
      optionChildren: 'Children & Youths',
      optionSeniors: 'Seniors',
      optionHunger: 'Homelessness & Hunger',
      optionDisability: 'Disability services',
      optionHealth: 'Health and Wellness',
      labelSkills: 'Skills',
      labelExperience: 'Experience',
      skillsPlaceholder: 'Tell us about your relevant skills',
      experiencePlaceholder: 'Share your volunteer or professional experience',
      dayMonday: 'Monday',
      dayTuesday: 'Tuesday',
      dayWednesday: 'Wednesday',
      dayThursday: 'Thursday',
      dayFriday: 'Friday',
      dayWeekend: 'Weekend',
      sectionAvailability: 'AVAILABILITY',
      labelHours: 'Hours Per Week',
      labelStartDate: 'Start Date',
      sectionDocuments: 'DOCUMENTS',
      labelCv: 'Upload CV',
      labelPortfolio: 'Upload Portfolio',
      sectionAdditional: 'ADDITIONAL INFORMATION',
      labelComments: 'Comments',
      policyText: 'I agree to the policies',
      submitText: 'Submit Application',
      formSuccess: 'Thank you! Your application has been submitted.',
      formError: 'Please fill in all required fields before submitting.',
      daysError: 'Please select at least one availability day.',
      policyError: 'You must agree to the policies before submitting.'
    },
    de: {
      formTitle: 'Werden Sie ehrenamtlich tätig',
      formIntro: 'Helfen Sie uns, Frauen weltweit zu stärken.',
      formDescription: 'Teilen Sie Ihre Fähigkeiten, Zeit und Ihr Mitgefühl, um Frauen und Mädchen durch sinnvolle Gemeinschaftsarbeit zu unterstützen.',
      langLabel: 'English',
      sectionPersonal: 'PERSÖNLICHE ANGABEN',
      requiredNotice: 'Dieser Abschnitt ist verpflichtend.',
      labelFirstName: 'Vorname',
      labelLastName: 'Nachname',
      labelEmail: 'E-Mail',
      labelPhone: 'Telefon',
      labelDob: 'Geburtsdatum',
      labelAddress: 'Adresse',
      labelCountry: 'Land',
      sectionOccupation: 'BERUFSANGABEN',
      labelCompany: 'Unternehmen',
      labelPosition: 'Position',
      sectionInterests: 'EHRENAMTLICHE INTERESSEN',
      labelDepartment: 'Bereich',
      optionSelect: 'Wählen Sie einen Bereich',
      optionChildren: 'Kinder & Jugendliche',
      optionSeniors: 'Senioren',
      optionHunger: 'Obdachlosigkeit & Hunger',
      optionDisability: 'Behindertenhilfe',
      optionHealth: 'Gesundheit und Wohlbefinden',
      labelSkills: 'Fähigkeiten',
      labelExperience: 'Erfahrung',
      skillsPlaceholder: 'Erzählen Sie uns von Ihren relevanten Fähigkeiten',
      experiencePlaceholder: 'Teilen Sie Ihre ehrenamtliche oder berufliche Erfahrung mit',
      dayMonday: 'Montag',
      dayTuesday: 'Dienstag',
      dayWednesday: 'Mittwoch',
      dayThursday: 'Donnerstag',
      dayFriday: 'Freitag',
      dayWeekend: 'Wochenende',
      sectionAvailability: 'VERFÜGBARKEIT',
      labelHours: 'Stunden pro Woche',
      labelStartDate: 'Startdatum',
      sectionDocuments: 'UNTERLAGEN',
      labelCv: 'Lebenslauf hochladen',
      labelPortfolio: 'Portfolio hochladen',
      sectionAdditional: 'ZUSÄTZLICHE INFORMATIONEN',
      labelComments: 'Kommentare',
      policyText: 'Ich akzeptiere die Richtlinien',
      submitText: 'Bewerbung senden',
      formSuccess: 'Vielen Dank! Ihre Bewerbung wurde eingereicht.',
      formError: 'Bitte füllen Sie alle Pflichtfelder aus, bevor Sie senden.',
      daysError: 'Bitte wählen Sie mindestens einen Verfügbarkeits-Tag aus.',
      policyError: 'Sie müssen den Richtlinien zustimmen, bevor Sie senden.'
    }
  };

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'true');
        themeToggle.setAttribute('aria-label', 'Activate light mode');
        themeToggle.querySelector('.theme-toggle__icon').textContent = '☀️';
        themeToggle.querySelector('.theme-toggle__label').textContent = 'Light';
      }
    } else {
      root.classList.remove('dark');
      if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', 'false');
        themeToggle.setAttribute('aria-label', 'Activate dark mode');
        themeToggle.querySelector('.theme-toggle__icon').textContent = '🌙';
        themeToggle.querySelector('.theme-toggle__label').textContent = 'Dark';
      }
    }
  }

  function saveTheme(theme) {
    try {
      window.localStorage.setItem('starlight-theme', theme);
    } catch (error) {
      // Ignore private mode storage errors.
    }
  }

  function applyLanguage(language) {
    const content = translations[language] || translations.en;
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      const key = element.getAttribute('data-i18n');
      if (content[key]) {
        element.textContent = content[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
      const key = element.getAttribute('data-i18n-placeholder');
      if (content[key]) {
        element.placeholder = content[key];
      }
    });

    const selectedOption = document.querySelector('select[name="department"] option[selected]');
    if (selectedOption) {
      selectedOption.textContent = content.optionSelect;
    }

    if (langToggle) {
      langToggle.querySelector('[data-i18n="langLabel"]').textContent = content.langLabel;
    }
  }

  function getPreferredTheme() {
    try {
      const stored = window.localStorage.getItem('starlight-theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch (error) {
      // Ignore private mode.
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message || '';
    formMessage.className = 'volunteer-form__message';
    if (type) {
      formMessage.classList.add('is-' + type);
    }
  }

  function clearFieldError(field) {
    if (!field) return;
    field.closest('.volunteer-form__field')?.classList.remove('is-invalid');
  }

  function validateVolunteerForm() {
    const currentLanguage = document.documentElement.lang === 'de' ? 'de' : 'en';
    const content = translations[currentLanguage] || translations.en;
    const requiredFields = volunteerForm ? volunteerForm.querySelectorAll('input[required], textarea[required], select[required]') : [];
    const dayCheckboxes = volunteerForm ? volunteerForm.querySelectorAll('input[type="checkbox"][name="days"]') : [];
    const policiesCheckbox = volunteerForm ? volunteerForm.querySelector('input[name="policies"]') : null;
    let isValid = true;

    volunteerForm.querySelectorAll('.volunteer-form__field').forEach(function (field) {
      field.classList.remove('is-invalid');
    });

    requiredFields.forEach(function (field) {
      const value = field.value ? field.value.trim() : '';
      if (!value) {
        isValid = false;
        field.closest('.volunteer-form__field')?.classList.add('is-invalid');
      }
    });

    const hasSelectedDay = Array.from(dayCheckboxes).some(function (checkbox) {
      return checkbox.checked;
    });

    if (!hasSelectedDay) {
      isValid = false;
      const dayGroup = volunteerForm ? volunteerForm.querySelector('.volunteer-form__checkbox-group') : null;
      if (dayGroup) {
        dayGroup.classList.add('is-invalid');
      }
    } else {
      const dayGroup = volunteerForm ? volunteerForm.querySelector('.volunteer-form__checkbox-group') : null;
      if (dayGroup) {
        dayGroup.classList.remove('is-invalid');
      }
    }

    if (!policiesCheckbox || !policiesCheckbox.checked) {
      isValid = false;
      policiesCheckbox?.closest('.volunteer-form__checkbox')?.classList.add('is-invalid');
    } else {
      policiesCheckbox?.closest('.volunteer-form__checkbox')?.classList.remove('is-invalid');
    }

    if (!isValid) {
      const firstInvalid = volunteerForm ? volunteerForm.querySelector('.volunteer-form__field.is-invalid, .volunteer-form__checkbox.is-invalid, .volunteer-form__checkbox-group.is-invalid') : null;
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setFormMessage(content.formError, 'error');
      return false;
    }

    setFormMessage(content.formSuccess, 'success');
    return true;
  }

  function serializeVolunteerForm() {
    const payload = {};

    if (!volunteerForm) return payload;

    volunteerForm.querySelectorAll('input, textarea, select').forEach(function (field) {
      if (!field.name) return;

      if (field.type === 'checkbox') {
        if (field.name === 'days') {
          if (!payload.days) {
            payload.days = [];
          }
          if (field.checked) {
            payload.days.push(field.value);
          }
        } else if (field.name === 'policies') {
          payload.policies = field.checked ? 'accepted' : 'not-accepted';
        }
        return;
      }

      if (field.type === 'file') {
        payload[field.name] = field.files && field.files[0] ? field.files[0].name : '';
        return;
      }

      payload[field.name] = field.value;
    });

    return payload;
  }

  function submitVolunteerForm() {
    if (!volunteerForm || !formEndpoint) {
      setFormMessage(document.documentElement.lang === 'de' ? 'Das Formular konnte nicht gesendet werden.' : 'The form could not be submitted.', 'error');
      return;
    }

    const currentLanguage = document.documentElement.lang === 'de' ? 'de' : 'en';
    const content = translations[currentLanguage] || translations.en;
    const payload = serializeVolunteerForm();

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
    }

    fetch(formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Request failed');
        }
        return response.json().catch(function () {
          return {};
        });
      })
      .then(function () {
        setFormMessage(content.formSuccess, 'success');
        volunteerForm.reset();
      })
      .catch(function () {
        setFormMessage(currentLanguage === 'de' ? 'Die Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' : 'Your application could not be sent. Please try again later.', 'error');
      })
      .finally(function () {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = content.submitText;
        }
      });
  }

  if (!header || !menuToggle || !mobileMenu || !themeToggle) return;

  applyTheme(getPreferredTheme());
  applyLanguage('en');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  }

  function isMenuOpen() {
    return mobileMenu.classList.contains('is-open');
  }

  menuToggle.addEventListener('click', function () {
    isMenuOpen() ? closeMenu() : openMenu();
  });

  themeToggle.addEventListener('click', function () {
    const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    saveTheme(nextTheme);
  });

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      const nextLanguage = document.documentElement.lang === 'de' ? 'en' : 'de';
      applyLanguage(nextLanguage);
    });
  }

  if (volunteerForm) {
    volunteerForm.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
      });
      field.addEventListener('change', function () {
        clearFieldError(field);
      });
    });

    const dayGroup = volunteerForm.querySelector('.volunteer-form__checkbox-group');
    if (dayGroup) {
      dayGroup.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
          dayGroup.classList.remove('is-invalid');
        });
      });
    }

    const policiesCheckbox = volunteerForm.querySelector('input[name="policies"]');
    if (policiesCheckbox) {
      policiesCheckbox.addEventListener('change', function () {
        policiesCheckbox.closest('.volunteer-form__checkbox')?.classList.remove('is-invalid');
      });
    }

    volunteerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!validateVolunteerForm()) {
        return;
      }
      submitVolunteerForm();
    });
  }

  if (submitButton) {
    ['mousedown', 'touchstart'].forEach(function (eventName) {
      submitButton.addEventListener(eventName, function () {
        submitButton.classList.add('is-pressed');
      });
    });

    ['mouseup', 'mouseleave', 'touchend', 'touchcancel'].forEach(function (eventName) {
      submitButton.addEventListener(eventName, function () {
        submitButton.classList.remove('is-pressed');
      });
    });
  }

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isMenuOpen()) {
      closeMenu();
      menuToggle.focus();
    }
  });

  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', function (event) {
    if (event.matches && isMenuOpen()) closeMenu();
  });

  const SCROLL_THRESHOLD = 8;
  let ticking = false;

  function updateHeaderState() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  }, { passive: true });

  updateHeaderState();
})();
