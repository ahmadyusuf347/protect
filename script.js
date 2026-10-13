gsap.registerPlugin(ScrollTrigger);

// Hero Slider Logic (3 Slides)
let currentHeroIndex = 0;
const slides = document.querySelectorAll(".hero-slide");
const contents = document.querySelectorAll(".hero-content-group");
const dots = document.querySelectorAll(".dot-indicator");
let heroInterval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove("opacity-0");
      slide.classList.add("opacity-100");
    } else {
      slide.classList.remove("opacity-100");
      slide.classList.add("opacity-0");
    }
  });

  contents.forEach((content, i) => {
    if (i === index) {
      content.classList.remove(
        "opacity-0",
        "translate-y-8",
        "pointer-events-none",
      );
      content.classList.add("opacity-100", "translate-y-0");
    } else {
      content.classList.remove("opacity-100", "translate-y-0");
      content.classList.add(
        "opacity-0",
        "translate-y-8",
        "pointer-events-none",
      );
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("bg-white/40");
      dot.classList.add("bg-white", "w-6");
    } else {
      dot.classList.remove("bg-white", "w-6");
      dot.classList.add("bg-white/40");
    }
  });
}

function nextSlide() {
  currentHeroIndex = (currentHeroIndex + 1) % slides.length;
  showSlide(currentHeroIndex);
}

function changeSlide(direction) {
  currentHeroIndex =
    (currentHeroIndex + direction + slides.length) % slides.length;
  showSlide(currentHeroIndex);
  resetTimer();
}

function currentSlide(index) {
  currentHeroIndex = index;
  showSlide(currentHeroIndex);
  resetTimer();
}

function resetTimer() {
  clearInterval(heroInterval);
  heroInterval = setInterval(nextSlide, 5000);
}

heroInterval = setInterval(nextSlide, 5000);

// Animasi Reveal saat Scroll
gsap.utils.toArray(".reveal-elem").forEach((elem) => {
  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });
});

// Navbar Background ubah saat scroll
const nav = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add(
      "bg-vernova-dark/95",
      "backdrop-blur-md",
      "border-b",
      "border-white/10",
    );
    nav.classList.remove("bg-gradient-to-b", "from-black/80", "to-transparent");
  } else {
    nav.classList.remove(
      "bg-vernova-dark/95",
      "backdrop-blur-md",
      "border-b",
      "border-white/10",
    );
    nav.classList.add("bg-gradient-to-b", "from-black/80", "to-transparent");
  }
});

// Mobile Menu Actions
const mobileBtn = document.getElementById("mobile-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");
const mobileLinks = document.querySelectorAll(".mobile-link");

function closeMobileMenu() {
  mobileMenu.classList.add("translate-x-full");
  mobileMenu.classList.remove("translate-x-0");
  document.body.style.overflow = "";
}

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenu.classList.add("translate-x-0");
  document.body.style.overflow = "hidden";
});

mobileClose.addEventListener("click", closeMobileMenu);
mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

const mobileDropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");

mobileDropdownBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const content = this.nextElementSibling;
    const icon = this.querySelector("i");

    content.classList.toggle("hidden");
    content.classList.toggle("flex");

    if (content.classList.contains("hidden")) {
      icon.style.transform = "rotate(0deg)";
    } else {
      icon.style.transform = "rotate(180deg)";
    }
  });
});
