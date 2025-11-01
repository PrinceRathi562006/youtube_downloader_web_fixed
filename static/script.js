// ===============================================
// 🎬 YouTube Downloader | Made by Prince ❤️
// Responsive • SEO Friendly • AdSense Ready
// ===============================================

console.log("🚀 YouTube Downloader Ready | Made by Prince ❤️");

// When DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const elementsToHide = [
    ".options",
    ".message",
    ".video-details",
    ".video-thumbnail",
    ".video-title"
  ];

  // Hide all video-related sections on load
  elementsToHide.forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) el.style.display = "none";
  });

  // Auto-year for footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

// Hide all video info when typing a new link
const inputField = document.querySelector("input[name='link']");
if (inputField) {
  inputField.addEventListener("input", () => {
    const elementsToHide = [
      ".options",
      ".message",
      ".video-details",
      ".video-thumbnail",
      ".video-title"
    ];
    elementsToHide.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.style.display = "none";
    });
  });
}

// Scroll reveal for About section
const revealElements = document.querySelectorAll(".about-section p, .about-section h2, .about-section li");
revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
});
window.addEventListener("scroll", () => {
  const triggerPoint = window.innerHeight * 0.9;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
});

// Back to Top button
const backToTop = document.createElement("button");
backToTop.innerHTML = "⬆";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

const style = document.createElement("style");
style.textContent = `
#backToTop {
  position: fixed;
  bottom: 30px;
  right: 25px;
  background: #ff0000;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 5px 15px rgba(255, 0, 0, 0.4);
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.4s ease;
  z-index: 9999;
}
#backToTop:hover {
  background: #cc0000;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8);
  transform: scale(1.1);
}`;
document.head.appendChild(style);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = "1";
    backToTop.style.transform = "translateY(0)";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.transform = "translateY(50px)";
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Glow effect on input
if (inputField) {
  inputField.addEventListener("focus", () => {
    inputField.style.boxShadow = "0 0 12px rgba(255, 0, 0, 0.5)";
  });
  inputField.addEventListener("blur", () => {
    inputField.style.boxShadow = "none";
  });
}

// Button click animations
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mousedown", () => (btn.style.transform = "scale(0.95)"));
  btn.addEventListener("mouseup", () => (btn.style.transform = "scale(1)"));
  btn.addEventListener("mouseover", () => (btn.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.4)"));
  btn.addEventListener("mouseout", () => (btn.style.boxShadow = "none"));
});

// Show loader when fetching
const form = document.querySelector("form[action='/']");
if (form) {
  form.addEventListener("submit", () => {
    const btn = form.querySelector("button");
    const message = document.querySelector(".message");
    const videoDetails = document.querySelector(".video-details");
    const optionsSection = document.querySelector(".options");
    const videoTitle = document.querySelector(".video-title");
    const videoThumbnail = document.querySelector(".video-thumbnail");

    if (btn) {
      btn.textContent = "Fetching...";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Fetch Video";
        btn.disabled = false;
      }, 5000);
    }

    // Hide old data before loading new
    [message, videoDetails, optionsSection, videoTitle, videoThumbnail].forEach((el) => {
      if (el) el.style.display = "none";
    });

    // Simulate showing data again after load
    setTimeout(() => {
      if (videoDetails) videoDetails.style.display = "block";
      if (optionsSection) optionsSection.style.display = "block";
      if (videoTitle) videoTitle.style.display = "block";
      if (videoThumbnail) videoThumbnail.style.display = "block";
    }, 2500);
  });
}

// Console info
console.log(
  "%c📈 SEO Optimized YouTube Downloader | Fast • Secure • AdSense Friendly • Made by Prince ❤️",
  "color: red; font-size: 14px; font-weight: bold;"
);
