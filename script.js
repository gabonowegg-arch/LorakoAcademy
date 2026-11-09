/* Lorako Science Academy | Site interactions. No backend or data storage. */
(() => {
  'use strict';
  const menuToggle = document.getElementById('menuToggle');
  const primaryNav = document.getElementById('primaryNav');
  const form = document.getElementById('interestForm');
  const status = document.getElementById('formStatus');
  const course = document.getElementById('subjectChoice');

  const closeMenu = () => {
    if (!menuToggle || !primaryNav) return;
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  };
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      primaryNav.classList.toggle('is-open', !expanded);
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    });
    primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', (event) => {
      if (!primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
  }
  document.querySelectorAll('[data-course]').forEach(link => {
    link.addEventListener('click', () => {
      if (course) course.value = link.dataset.course;
    });
  });
  // Collect only on click. WhatsApp opens with a draft; visitors must tap Send themselves.
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = document.getElementById('studentName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const selected = course.value;
      const enquiry = document.getElementById('enquiryMessage').value.trim();
      if (!name || !phone || !selected) return;
      const lines = [
        'Hello Lorako Science Academy!',
        'I would like to express interest in your BGCSE online tuition.',
        '',
        `Name: ${name}`,
        `Phone / WhatsApp: ${phone}`,
        `Subject: ${selected}`
      ];
      if (enquiry) lines.push(`Question: ${enquiry}`);
      lines.push('', 'Please share enrollment information when available. Thank you!');
      const url = `https://wa.me/26775756957?text=${encodeURIComponent(lines.join('\n'))}`;
      if (status) status.textContent = 'WhatsApp is opening with your message. Please review it and tap Send.';
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.click();
      if (status) {
        const fallback = document.createElement('a');
        fallback.href = url;
        fallback.target = '_blank';
        fallback.rel = 'noopener noreferrer';
        fallback.textContent = 'Open the WhatsApp draft';
        fallback.style.textDecoration = 'underline';
        status.append(document.createTextNode(' If it did not open, '), fallback, document.createTextNode('.'));
      }
    });
  }
  const year = document.getElementById('copyrightYear');
  if (year) year.textContent = String(new Date().getFullYear());
})();
