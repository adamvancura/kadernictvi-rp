document.addEventListener('DOMContentLoaded', function() {
    const reserveBtns = document.querySelectorAll('.reserve-btn');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
  
    reserveBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        step1.classList.remove('active');
        step2.classList.add('active');
      });
    });
  });