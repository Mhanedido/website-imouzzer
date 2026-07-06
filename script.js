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

updateHeader();
