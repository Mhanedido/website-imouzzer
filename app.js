function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

function activityCard(activity) {
  return `
    <article class="card fade-in" data-category="${activity.category}">
      <a class="card-media" href="activity-details.html?id=${activity.id}" aria-label="View ${activity.title}">
        <img src="${activity.image}" alt="${activity.title}" loading="lazy">
      </a>
      <div class="card-body">
        <h3>${activity.title}</h3>
        <div class="meta">
          <span>${activity.duration}</span>
          <span>★ ${activity.rating}</span>
          <span class="price">${activity.price}</span>
        </div>
        <p>${activity.short}</p>
        <div class="card-actions">
          <a class="btn secondary" href="activity-details.html?id=${activity.id}">Details</a>
          <a class="btn" href="${bookUrl(activity.title)}" target="_blank" rel="noopener">Book Now</a>
        </div>
      </div>
    </article>
  `;
}

function articleCard(article) {
  return `
    <article class="card fade-in">
      <a class="card-media" href="article-details.html?id=${article.id}" aria-label="Read ${article.title}">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
      </a>
      <div class="card-body">
        <div class="meta"><span>${formatDate(article.date)}</span><span>${article.author}</span></div>
        <h3>${article.title}</h3>
        <p style="margin-top:12px">${article.preview}</p>
        <div class="card-actions">
          <a class="btn secondary" href="article-details.html?id=${article.id}">Read More</a>
        </div>
      </div>
    </article>
  `;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(date));
}

function hydrateLayout() {
  const data = loadSiteData();
  qsa("[data-business-name]").forEach((el) => (el.textContent = data.business.name));
  qsa("[data-business-location]").forEach((el) => (el.textContent = data.business.location));
  qsa("[data-business-email]").forEach((el) => (el.textContent = data.business.email));
  qsa("[data-instagram]").forEach((el) => (el.href = data.business.instagram));
  qsa("[data-facebook]").forEach((el) => (el.href = data.business.facebook));
  qsa("[data-whatsapp]").forEach((el) => (el.href = bookUrl("an activity")));

  const path = location.pathname.split("/").pop() || "index.html";
  qsa(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) link.classList.add("active");
  });
}

function setupNavigation() {
  const btn = qs(".menu-btn");
  const links = qs(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => links.classList.toggle("open"));
}

function setupAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.14 }
  );
  qsa(".fade-in").forEach((el) => observer.observe(el));
}

function renderFeatured() {
  const mount = qs("[data-featured-activities]");
  if (!mount) return;
  const data = loadSiteData();
  mount.innerHTML = data.activities.slice(0, 4).map(activityCard).join("");
}

function renderActivities() {
  const mount = qs("[data-activities-grid]");
  if (!mount) return;
  const data = loadSiteData();
  const categories = ["All", ...new Set(data.activities.map((item) => item.category))];
  const filters = qs("[data-filters]");
  filters.innerHTML = categories.map((cat) => `<button class="filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>`).join("");
  mount.innerHTML = data.activities.map(activityCard).join("");

  qsa("[data-filter]", filters).forEach((button) => {
    button.addEventListener("click", () => {
      qsa("[data-filter]", filters).forEach((el) => el.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.filter;
      qsa("[data-category]", mount).forEach((card) => {
        card.style.display = category === "All" || card.dataset.category === category ? "" : "none";
      });
    });
  });
}

function renderActivityDetails() {
  const mount = qs("[data-activity-detail]");
  if (!mount) return;
  const data = loadSiteData();
  const params = new URLSearchParams(location.search);
  const activity = data.activities.find((item) => item.id === params.get("id")) || data.activities[0];
  document.title = `${activity.title} | ${data.business.name}`;
  qs('meta[name="description"]')?.setAttribute("content", activity.short);

  mount.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <span class="eyebrow">${activity.category}</span>
        <h1>${activity.title}</h1>
        <p>${activity.short}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="gallery fade-in">
          ${activity.gallery.map((image) => `<figure><img src="${image}" alt="${activity.title}" loading="lazy"></figure>`).join("")}
        </div>
      </div>
    </section>
    <section class="section alt">
      <div class="container detail-layout">
        <div>
          <h2>Experience Details</h2>
          <p style="margin-top:18px">${activity.description}</p>
          <div class="facts">
            <div class="fact"><strong>Duration</strong><p>${activity.duration}</p></div>
            <div class="fact"><strong>Location</strong><p>${activity.location}</p></div>
            <div class="fact"><strong>Rating</strong><p>★ ${activity.rating}</p></div>
          </div>
          <h3>Included</h3>
          <ul>
            ${activity.included.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <aside class="booking-panel">
          <p>Starting from</p>
          <h2>${activity.price}</h2>
          <p style="margin:12px 0 18px">Book directly with our team through WhatsApp and confirm your preferred date.</p>
          <a class="btn" href="${bookUrl(activity.title)}" target="_blank" rel="noopener">Book Now</a>
        </aside>
      </div>
    </section>
  `;
}

function renderArticles() {
  const mount = qs("[data-articles-grid]");
  if (!mount) return;
  const data = loadSiteData();
  mount.innerHTML = data.articles.map(articleCard).join("");
}

function renderArticleDetails() {
  const mount = qs("[data-article-detail]");
  if (!mount) return;
  const data = loadSiteData();
  const params = new URLSearchParams(location.search);
  const article = data.articles.find((item) => item.id === params.get("id")) || data.articles[0];
  document.title = `${article.title} | ${data.business.name}`;
  qs('meta[name="description"]')?.setAttribute("content", article.preview);
  mount.innerHTML = `
    <section class="page-hero">
      <div class="container article-body">
        <span class="eyebrow">${formatDate(article.date)} · ${article.author}</span>
        <h1>${article.title}</h1>
        <p>${article.preview}</p>
      </div>
    </section>
    <article class="section">
      <div class="container article-body">
        <img src="${article.image}" alt="${article.title}" loading="lazy">
        <p>${article.content}</p>
        <p>For the best travel experience, plan your day around the ocean conditions, ask local guides for current recommendations, and leave room for slow moments between activities.</p>
      </div>
    </article>
  `;
}

function initPublicSite() {
  hydrateLayout();
  setupNavigation();
  renderFeatured();
  renderActivities();
  renderActivityDetails();
  renderArticles();
  renderArticleDetails();
  setupAnimations();
}

document.addEventListener("DOMContentLoaded", initPublicSite);