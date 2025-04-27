const swiper = new Swiper(".mySwiper_1", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: ".swiper_1_button_next",
    prevEl: ".swiper_1_button_prev",
  },
  pagination: {
    el: ".swiper_1_pagination",
    clickable: true,
  },
  initialSlide: 1,
  grabCursor: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    641: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: "auto",
    },
  },
});

function setupImageCompare(slide) {
  // Only set up image comparison if it hasn't been set up yet
  if (slide.querySelector('.image_compare_parent')) {
    return;
  }

  // Create the HTML content for the image comparison
  const imageCompareHtml = `
    <div class="image_compare_parent position-absolute h-100 w-100">
      <div class="compare_image_container h-100 position-relative d-flex">
        <img class="compare_image before_image position-absolute"
             src="./asset/image/slider_2.jpg" alt="slide">
        <img class="compare_image after_image position-absolute"
             src="./asset/image/slider_1.jpg" alt="slide">
      </div>

      <div class="divider_line"></div>
      <div class="divide_icon_container">
        <div class="d-flex justify-content-center align-items-center gap-2">
          <img src="./asset/image/divider_left_arr.svg" alt="divider"
               class="divider_left_img">
          <img src="./asset/image/divider_right_arr.svg" alt="divider"
               class="divider_right_img">
        </div>
      </div>

      <input type="range" class="slide_range position-absolute" min="0" max="100">
    </div>
  `;

  // Append the HTML to the slide using insertAdjacentHTML
  slide.insertAdjacentHTML('beforeend', imageCompareHtml);

  // Access the newly inserted elements
  const slideRange = slide.querySelector('.slide_range');
  const beforeImage = slide.querySelector('.before_image');
  const dividerLine = slide.querySelector('.divider_line');
  const dividerIcon = slide.querySelector('.divide_icon_container');
  // const compareImage = slide.querySelector('.compare_image');

  beforeImage.style.width = '50%';

  // Add input event listener for range slider
  slideRange.addEventListener('input', (e) => {
    const slideValue = e.target.value + "%";
    beforeImage.style.width = slideValue;
    dividerLine.style.left = slideValue;
    dividerIcon.style.left = slideValue;
  });
}

function clearInactiveSlides() {
  // Get all slides
  const slides = document.querySelectorAll('.mySwiper_1 .swiper-slide');

  // Loop through each slide and remove image comparison content for inactive slides
  slides.forEach(slide => {
    if (!slide.classList.contains('swiper-slide-active')) {
      const imageCompareParent = slide.querySelector('.image_compare_parent');
      if (imageCompareParent) {
        imageCompareParent.remove();
      }
    }
  });
}

// On Swiper slide change, setup image comparison for active slide and clear inactive slides
swiper.on('slideChangeTransitionStart', () => {
  const activeSlide = document.querySelector('.mySwiper_1 .swiper-slide-active');
  console.log('Active slide changed:', activeSlide);

  // Setup image comparison for the active slide
  setupImageCompare(activeSlide);

  // Clear image comparison from inactive slides
  clearInactiveSlides();
});

// Trigger image comparison setup for the initial active slide on page load
document.addEventListener('DOMContentLoaded', () => {
  const activeSlide = document.querySelector('.mySwiper_1 .swiper-slide-active');
  if (activeSlide) {
    setupImageCompare(activeSlide); // Setup image comparison on the first active slide
  }
});
