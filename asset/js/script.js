const counts = document.querySelectorAll(".counter_number");
const speed = 100;
let isCounting = false;

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("property-video");
  const playBtn = document.getElementById("play-btn");
  const videoContainer = document.querySelector(".video-container");

  if (!video || !playBtn || !videoContainer) {
    console.error("Missing one of the required elements");
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

  videoContainer.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playBtn.style.opacity = "0";
      videoContainer.style.zIndex = "9991";
    } else {
      video.pause();
      playBtn.style.opacity = "1";
      videoContainer.style.zIndex = "9989";
    }
  });

  // When video ends, show play button again
  video.addEventListener("ended", function () {
    playBtn.style.opacity = "1";
    videoContainer.style.zIndex = "9989";
  });
});

/** =============================
 * script for slider
============================= */


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
      slidesPerView: "auto",
    },
  },
});

/** =============================
 * script for counter and 
============================= */

function formatNumberWithCommas(number) {
  return number.toLocaleString();
}

function resetCounters() {
  counts.forEach((counter) => (counter.innerText = "0"));
}

function startCounter(counter, index, callback) {
  const target = Number(counter.getAttribute("data-target"));
  let count = 0;
  const increment = target / speed;

  const interval = setInterval(() => {
    count += increment;

    if (count >= target) {
      clearInterval(interval);
      if (index === 2) {
        counter.innerText = formatNumberWithCommas(target) + "+";
      } else {
        counter.innerText = target + "K+";
      }

      if (callback) callback();
    } else {
      if (index === 2) {
        counter.innerText = formatNumberWithCommas(Math.floor(count)) + "+";
      } else {
        counter.innerText = Math.floor(count) + "K+";
      }
    }
  }, 8);
}

const container = document.querySelector(".counter_container");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isCounting) {
        isCounting = true;
        resetCounters();

        // Start counting sequence
        startCounter(counts[0], 0, () => {
          startCounter(counts[1], 1, () => {
            startCounter(counts[2], 2, () => {
              // Wait before allowing re-trigger
              setTimeout(() => {
                isCounting = false;
              }, 1000);
            });
          });
        });
      }
    });
  },
  { threshold: 0.5 }
);

if (container) {
  observer.observe(container);
}



// ============ text animation ===============
const textElement = document.getElementById("counterText");
const words = textElement.innerText.split(' ');

// Wrap each word inside a <span>
textElement.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

// Animation
gsap.registerPlugin(ScrollTrigger);

gsap.to("#counterText span", {
  scrollTrigger: {
    trigger: "#counter_section", // section to watch
    start: "top 80%",            // when top of section hits 80% of viewport
    toggleActions: "restart none none none", // restart the animation every time user enters
  },
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.1, // delay between each word
  ease: "power2.out"
});



