// ==============================
// NAVBAR SCROLL
// ==============================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ==============================
// SCROLL REVEAL ANIMATION
// ==============================
const revealElements = document.querySelectorAll(
  ".story-content, .story-image, .menu-header, .menu-card, .space-heading, .space-photo, .visit-content, .visit-image, .hours-inner, .reservation-heading, .reservation-form-wrap, .reviews-header, .reviews-slider, .location-heading, .location-content"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

// ==============================
// PAGE LOAD
// ==============================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ==============================
// WHATSAPP CONTACT
// ==============================
const whatsappNumber = "201000000000";

function openWhatsApp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ==============================
// RESERVATION FORM
// ==============================
const reservationForm = document.getElementById("reservationForm");

if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("bookingName").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    const guests = document.getElementById("bookingGuests").value;
    const notes = document.getElementById("bookingNotes").value.trim();

    if (!name || !phone || !date || !time || !guests) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date.");
      return;
    }

    const message =
`Hello ODEN CAFÉ! I'd like to request a reservation.

Name: ${name}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}
Special Requests: ${notes || "None"}

Please confirm my reservation.`;

    openWhatsApp(message);
  });
}

// ==============================
// REVIEWS SLIDER
// ==============================
const reviewSlides = document.querySelectorAll(".review-slide");
const reviewPrev = document.getElementById("reviewPrev");
const reviewNext = document.getElementById("reviewNext");
const reviewCurrent = document.getElementById("reviewCurrent");

let currentReview = 0;

function showReview(index) {
  if (!reviewSlides.length) return;

  currentReview = (index + reviewSlides.length) % reviewSlides.length;

  reviewSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentReview);
  });

  if (reviewCurrent) {
    reviewCurrent.textContent = String(currentReview + 1).padStart(2, "0");
  }
}

if (reviewPrev) {
  reviewPrev.addEventListener("click", () => {
    showReview(currentReview - 1);
  });
}

if (reviewNext) {
  reviewNext.addEventListener("click", () => {
    showReview(currentReview + 1);
  });
}

showReview(0);