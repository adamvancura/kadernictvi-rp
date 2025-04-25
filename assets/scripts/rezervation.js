document.addEventListener('DOMContentLoaded', function() {
const reserveBtns = document.querySelectorAll('.reserve-btn');
const backBtn = document.getElementById('back-to-step1');
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const serviceNameElement = document.getElementById('nazev-vybrane-sluzby');
const serviceDurationElement = document.getElementById('doba-vybrane-sluzby');

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

  backBtn.addEventListener('click', function(e) {
      e.preventDefault();
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

  //Funkce pro aby jsme nemuseli každý den lozit do HTML a měnit datum pro kalendář(aby se nemohl zarezervovat den, který už proběhl)
  // Tato funkce to dělá dynamicky
  const datePicker = document.getElementById('date-picker');
  datePicker.min = new Date().toISOString().split('T')[0];

  const timeSlotsContainer = document.getElementById('time-slots-container');
  const timeSlotButtons = document.querySelectorAll('.time-slot');
  const selectedDateDisplay = document.getElementById('selected-date');
  const reservationForm = document.getElementById('reservation-form');
  const errorMsg = document.getElementById('error-msg');
  let selectedDate = '';
  let selectedTime = '';

  datePicker.addEventListener('input', function() {
      const day = new Date(this.value).getDay();
      if ([0, 6].includes(day)) {
          this.value = '';
          showError("Víkendy máme volno. Vyberte prosím pracovní den.");
          timeSlotsContainer.classList.add('hidden');
          reservationForm.classList.add('hidden');
      } else if (this.value) {
          hideError();
          selectedDate = this.value;
          selectedDateDisplay.textContent = `Vyberte čas pro ${selectedDate.split('-').reverse().join('.')}`;
          timeSlotsContainer.classList.remove('hidden');
          reservationForm.classList.add('hidden');
          selectedTime = '';
          document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
      } else {
          timeSlotsContainer.classList.add('hidden');
          reservationForm.classList.add('hidden');
      }
  });

  timeSlotButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          document.querySelectorAll('.time-slot.selected').forEach(el => el.classList.remove('selected'));
          this.classList.add('selected');
          selectedTime = this.textContent;
          reservationForm.classList.remove('hidden');
      });
  });

  function showError(msg) {
      errorMsg.textContent = msg;
      errorMsg.style.display = 'block';
  }
  function hideError() {
      errorMsg.textContent = '';
      errorMsg.style.display = 'none';
  }

  reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const surname = document.getElementById('surname').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!selectedDate || !selectedTime) {
          showError('Vyberte prosím datum a čas.');
          return;
      }
      if (!name || !surname || !phone || !email) {
          showError('Vyplňte prosím všechna pole.');
          return;
      }
      if (!/^[0-9 +()-]{9,16}$/.test(phone)) {
          showError('Zadejte platné telefonní číslo.');
          return;
      }
      hideError();

      alert(
          `Rezervace vytvořena!\n\nJméno: ${name} ${surname}\nTelefon: ${phone}\nE-mail: ${email}\nDatum: ${selectedDate.split('-').reverse().join('.')}\nČas: ${selectedTime}`
      );
      reservationForm.reset();
      reservationForm.classList.add('hidden');
      timeSlotsContainer.classList.add('hidden');
      datePicker.value = '';
      selectedTime = '';
      selectedDate = '';
  });

  function showAboutUs() {
      const aboutUsSection = document.getElementById('kontakt');
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
  }
  document.querySelector('nav a[href="#kontakt"]').addEventListener('click', function(e) {
      e.preventDefault();
      showAboutUs();
  });
  
  document.querySelector('.vyhledani-trasy').addEventListener('click', function(e) {
      if (confirm('Budete přesměrováni na Mapy.cz. Chcete pokračovat?')) {
          return true;
      } else {
          e.preventDefault();
          return false;
      }
  });



  function checkIfOpen() {
      const now = new Date();
      const hours = now.getHours();
      const day = now.getDay();
      if (day === 0 || day === 6) {
          return false;
      }

      return hours >= 11 && hours < 21;
  }


  function addOpenStatus() {
      const oteviraci = document.querySelector('.oteviraci-doba h3');
      const isOpen = checkIfOpen();
      const statusElement = document.createElement('span');
      statusElement.classList.add('open-status');
      statusElement.textContent = isOpen ? ' (Nyní otevřeno)' : ' (Nyní zavřeno)';
      statusElement.style.color = isOpen ? '#2ecc71' : '#e74c3c';
      statusElement.style.fontSize = '14px';
      statusElement.style.fontWeight = 'normal';
      oteviraci.appendChild(statusElement);
  }
  
  addOpenStatus();
});