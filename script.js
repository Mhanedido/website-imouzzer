const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => link.getAttribute("href"))
  .filter((href) => href && href.startsWith("#"))
  .map((href) => document.querySelector(href))
  .filter(Boolean);
const page = document.body.dataset.page;
const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 30);
}

function closeMenu() {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  updateHeader();

  if (motionOK) {
    const heroMedia = document.querySelector(".hero-media");
    const scrollOffset = Math.min(window.scrollY * 0.08, 38);

    if (heroMedia) {
      heroMedia.style.setProperty("--parallax-y", `${scrollOffset}px`);
      heroMedia.style.transform = `scale(1.06) translate3d(0, ${scrollOffset}px, 0)`;
    }
  }

  if (!sections.length) return;

  const current = sections.findLast((section) => {
    return section.getBoundingClientRect().top <= 130;
  });

  if (!current) return;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
});

navLinks.forEach((link) => {
  link.classList.toggle("active", link.dataset.pageLink === page);
});

document.querySelectorAll(".booking-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Request sent";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      event.currentTarget.reset();
    }, 1800);
  });
});

if (motionOK) {
  const revealItems = document.querySelectorAll(
    ".section-heading, .activity-card, .route-card, .about-panel, .stats-panel, .post-card, .booking-form, .contact-layout > div"
  );

  revealItems.forEach((item) => item.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  document.documentElement.style.scrollBehavior = "auto";
}

updateHeader();
