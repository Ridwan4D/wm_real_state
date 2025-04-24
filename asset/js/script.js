document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('property-video');
    const playBtn = document.getElementById('play-btn');
    const videoContainer = document.querySelector('.video-container');


    if (!video || !playBtn || !videoContainer) {
        console.error('Missing one of the required elements');
        return;
    }

    videoContainer.addEventListener("mouseover", () => {
        videoContainer.style.zIndex = "9991";
    });

    videoContainer.addEventListener("mouseout", () => {
        if (video.paused) {
            videoContainer.style.zIndex = "9989";
        }
    });

    videoContainer.addEventListener('click', function () {
        if (video.paused) {
            video.play();
            playBtn.style.opacity = '0';
            videoContainer.style.zIndex = "9991";
        } else {
            video.pause();
            playBtn.style.opacity = '1';
            videoContainer.style.zIndex = "9989";
        }
    });

    // When video ends, show play button again
    video.addEventListener('ended', function () {
        playBtn.style.opacity = '1';
        videoContainer.style.zIndex = "9989";
    });
});



/** =============================
 * script for slider
============================= */
const swiper = new Swiper(".mySwiper_1", {
    slidesPerView: 'auto', // Default for large screens
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
            slidesPerView: 'auto',
        }
    }
});


// Fixed Swiper Configuration
const swiper_2 = new Swiper(".mySwiper_2", {
    spaceBetween: 32,
    loop: true,
    navigation: {
        nextEl: ".swiper_2_button_next",
        prevEl: ".swiper_2_button_prev",
    },
    pagination: {
        el: ".swiper_2_pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 2,
        },
        600: {
            slidesPerView: 'auto',
        }
    }
    
});

