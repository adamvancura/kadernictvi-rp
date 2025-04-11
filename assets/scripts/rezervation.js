document.addEventListener("DOMContentLoaded", function () {
    const reserveBtns = document.querySelectorAll(".reserve-btn");
    const backBtn = document.getElementById("back-to-step1");
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const serviceNameElement = document.getElementById("nazev-vybrane-sluzby");;

  let currentDate = new Date();

  history.replaceState({ step: 1 }, '', '');

  function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      currentMonthDisplay.textContent = new Date(year, month).toLocaleString('cs-CZ', { month: 'long', year: 'numeric' });

      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      calendarDays.innerHTML = '';

      for (let i = 1; i < firstDayOfMonth; i++) {
          calendarDays.appendChild(document.createElement('div'));
      }

      for (let day = 1; day <= daysInMonth; day++) {
          const dayBtn = document.createElement('button');
          dayBtn.textContent = day;

          if (
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear()
          ) {
              dayBtn.classList.add('today');
          }

          dayBtn.addEventListener('click', () => selectDate(year, month, day));
          calendarDays.appendChild(dayBtn);
      }
  }

  function selectDate(year, month, day) {
      const selectedDate = new Date(year, month, day);

      selectedDateDisplay.textContent = `Vybraný den: ${selectedDate.toLocaleDateString('cs-CZ')}`;
      timeSlotsContainer.classList.remove('hidden');
  }

  prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
      timeSlotsContainer.classList.add('hidden');
  });

  nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
      timeSlotsContainer.classList.add('hidden');
  });

  reserveBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const serviceName = this.getAttribute('data-service');
          const serviceDuration = this.parentNode.querySelector('.duration').textContent;

          serviceNameElement.textContent = serviceName;
          serviceDurationElement.textContent = serviceDuration;

          step1.classList.remove('active');
          step2.classList.add('active');
          history.pushState({ step: 2 }, '', '');
          renderCalendar();
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

  renderCalendar();
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
  
  function highlightCurrentDay() {
    const today = new Date().getDay();
    const daysMap = {
      1: 'Pondělí',
      2: 'Úterý',
      3: 'Středa',
      4: 'Čtvrtek',
      5: 'Pátek',
      6: 'Sobota',
      0: 'Neděle'
    };
    
    const todayName = daysMap[today];
    const dobaItems = document.querySelectorAll('.doba-item');
    
    dobaItems.forEach(item => {
      const dayName = item.querySelector('span:first-child').textContent;
      if (dayName === todayName) {
        item.classList.add('current-day');
      }
    });
  }
  
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
  
  document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentDay();
    addOpenStatus();
  });