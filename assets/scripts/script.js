/*tvorba slideru s obrázky*/
const images = [
    "assets/images/woman-3288365_1280.jpg",
    "assets/images/shutterstock_711308113.jpg",
    "assets/images/kadernictvisedvemababama.jpg",
    "assets/images/p08f711h.jpg",
    "assets/images/Hair-washing-Blow-dry.jpg"
];

let currentImageIndex = 0;
const headerImage = document.querySelector(".header-image");
const periods = document.querySelectorAll(".period");

function updateImage() {
    headerImage.style.backgroundImage = `url(${images[currentImageIndex]})`;
    updatePeriods();
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

function updatePeriods() {
    periods.forEach((period, index) => {
        period.classList.toggle("active", index === currentImageIndex);
    });
}

setInterval(updateImage, 4000);

updateImage();



/*tvorba navigation menu*/
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 0) {
            navbar.classList.add("zmenseny-navbar");
        } else {
            navbar.classList.remove("zmenseny-navbar");
        }
    });

    const domu = document.querySelector('.navbar-links a[href="#home"]');
    domu.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});


/*galerie*/
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close-gallery');
const prevBtn = document.querySelector('.left');
const nextBtn = document.querySelector('.right');

let currentIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        galleryModal.style.display = 'flex';
        modalImg.src = img.src;
        currentIndex = index;
        document.body.classList.add('no-scroll')
    });
});

closeBtn.addEventListener('click', () => {
    galleryModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('.gallery-img');
    modalImg.src = img.src;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('.gallery-img');
    modalImg.src = img.src;
});


/*recenze*/
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.recenze-slider');
    const dots = document.querySelectorAll('.dot');
    let currentRecenze = 0;

    const casPrepinaniFourSeconds = 4000;

    setInterval(() => {
        currentRecenze = (currentRecenze + 1) % 5;
        slider.style.left = currentRecenze * -100 + '%';
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentRecenze);
        });
    }, casPrepinaniFourSeconds);
});