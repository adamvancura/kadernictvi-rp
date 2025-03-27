document.addEventListener('DOMContentLoaded', function() {
  const reserveBtns = document.querySelectorAll('.reserve-btn');
  const backBtn = document.getElementById('back-to-step1');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const serviceNameElement = document.getElementById('nazev-vybrane-sluzby');
  const serviceDurationElement = document.getElementById('doba-vybrane-sluzby');

  history.replaceState({ step: 1 }, '', '');

  reserveBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const serviceName = this.getAttribute('data-service');
          const serviceDuration = this.parentNode.querySelector('.duration').textContent;

          serviceNameElement.textContent = serviceName;
          serviceDurationElement.textContent = serviceDuration;

          step1.classList.remove('active');
          step2.classList.add('active');
          history.pushState({ step: 2 }, '', '');
      });
  });

  backBtn.addEventListener('click', function() {
      step2.classList.remove('active');
      step1.classList.add('active');
      history.pushState({ step: 1 }, '', '');
  });

  window.addEventListener('popstate', function(event) {
      if (event.state && event.state.step === 1) {
          step2.classList.remove('active');
          step1.classList.add('active');
      } else if (event.state && event.state.step === 2) {
          step1.classList.remove('active');
          step2.classList.add('active');
      }
  });
});