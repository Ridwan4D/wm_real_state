const swiper = new Swiper(".mySwiper_1", {
    slidesPerView: "auto", // Default for large screens
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