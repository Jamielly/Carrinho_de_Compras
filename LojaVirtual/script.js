// Ativar o carousel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

function showCurrentItem() {
  carouselItems.forEach(item => item.style.display = 'none');
  carouselItems[currentItem].style.display = 'block';
}

function changeItem() {
  currentItem++;
  if (currentItem >= carouselItems.length) {
    currentItem = 0;
  }
  showCurrentItem();
}

setInterval(changeItem, 3000); // Altera o item a cada 3 segundos

// Efeito suave de rolagem para os links de navegação
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute('href'));
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  });
});
