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
swiper = new Swiper(".mySwiper_1", {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,
    navigation: {
        nextEl: ".swiper_1_button_next",
        prevEl: ".swiper_1_button_prev",
    },
    pagination: {
        el: ".swiper_1_pagination",
        clickable: true,
    },
    initialSlide: 4,
    grabCursor: true,
});
