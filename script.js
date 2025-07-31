function switchLanguage(lang) {
  const html = document.getElementById("html-tag");
  const body = document.body;

  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // إزالة الكلاسات القديمة وإضافة الكلاس الجديد
  body.classList.remove("lang-ar", "lang-de");
  body.classList.add(lang === "ar" ? "lang-ar" : "lang-de");

  // تغيير النصوص
  document.querySelectorAll("[data-" + lang + "]").forEach((element) => {
    element.textContent = element.getAttribute("data-" + lang);
  });

  // تغيير placeholders
  document.querySelectorAll("input, textarea").forEach((element) => {
    const placeholderAttr = "data-placeholder-" + lang;
    if (element.hasAttribute(placeholderAttr)) {
      element.placeholder = element.getAttribute(placeholderAttr);
    }
  });

  // تغيير العنوان
  const titles = {
    ar: "زوروا أرض الفراعنة",
    de: "Besuchen Sie Ägypten - Entdecken Sie den Zauber der Zivilisation",
  };
  document.title = titles[lang];
}



// Handle form submission
// document.getElementById('contactForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     // Here you would typically send the form data to a server
//     const messages = {
//         ar: "شكراً لرسالتك! سنتواصل معك قريباً",
//         de: "Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.",
//         en: "Thank you for your message! We will get back to you soon."
//     };
//     const lang = document.documentElement.lang;
//     alert(messages[lang] || messages.en);
//     e.target.reset();
// });

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize with German language
document.addEventListener("DOMContentLoaded", () => {
  switchLanguage("de");
});

// تقليب الصورة اتوماتيكا
document.querySelectorAll(".swiper").forEach((swiper) => {
  const images = swiper.querySelectorAll("img");
  let currentIndex = 0;

  function showNextImage() {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
  }

  // Initialize the first image
  images[currentIndex].classList.add("active");

  // Start the auto-flip interval
  setInterval(showNextImage, 3000); // Change image every 3 seconds
});
function toggleNav() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
