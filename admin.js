let adminData = loadSiteData();

function refreshAdmin() {
  const businessForm = document.querySelector("[data-business-form]");
  if (businessForm) {
    Object.entries(adminData.business).forEach(([key, value]) => {
      const input = businessForm.elements[key];
      if (input) input.value = value;
    });
  }

  const activitySelect = document.querySelector("[name='activityId']");
  if (activitySelect) {
    activitySelect.innerHTML = adminData.activities.map((activity) => `<option value="${activity.id}">${activity.title}</option>`).join("");
    populateActivityForm(adminData.activities[0]?.id);
  }

  const articleSelect = document.querySelector("[name='articleId']");
  if (articleSelect) {
    articleSelect.innerHTML = adminData.articles.map((article) => `<option value="${article.id}">${article.title}</option>`).join("");
    populateArticleForm(adminData.articles[0]?.id);
  }

  renderAdminTables();
}

function populateActivityForm(id) {
  const form = document.querySelector("[data-activity-form]");
  const activity = adminData.activities.find((item) => item.id === id);
  if (!form || !activity) return;
  Object.entries(activity).forEach(([key, value]) => {
    const input = form.elements[key];
    if (!input) return;
    input.value = Array.isArray(value) ? value.join("\n") : value;
  });
}

function populateArticleForm(id) {
  const form = document.querySelector("[data-article-form]");
  const article = adminData.articles.find((item) => item.id === id);
  if (!form || !article) return;
  Object.entries(article).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });
}

function renderAdminTables() {
  const activityRows = document.querySelector("[data-activity-rows]");
  if (activityRows) {
    activityRows.innerHTML = adminData.activities.map((item) => `
      <tr>
        <td><strong>${item.title}</strong><br>${item.category}</td>
        <td>${item.price}</td>
        <td>${item.duration}</td>
      </tr>
    `).join("");
  }

  const articleRows = document.querySelector("[data-article-rows]");
  if (articleRows) {
    articleRows.innerHTML = adminData.articles.map((item) => `
      <tr>
        <td><strong>${item.title}</strong><br>${item.author}</td>
        <td>${item.date}</td>
      </tr>
    `).join("");
  }
}

function setupAdmin() {
  hydrateLayout();
  setupNavigation();
  refreshAdmin();

  document.querySelector("[name='activityId']")?.addEventListener("change", (event) => populateActivityForm(event.target.value));
  document.querySelector("[name='articleId']")?.addEventListener("change", (event) => populateArticleForm(event.target.value));

  document.querySelector("[data-business-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    adminData.business = {
      name: form.name.value,
      location: form.location.value,
      whatsapp: form.whatsapp.value,
      email: form.email.value,
      instagram: form.instagram.value,
      facebook: form.facebook.value
    };
    saveSiteData(adminData);
    refreshAdmin();
    alert("Business settings saved.");
  });

  document.querySelector("[data-activity-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = {
      id: form.id.value || form.title.value.toLowerCase().replaceAll(" ", "-"),
      title: form.title.value,
      category: form.category.value,
      price: form.price.value,
      duration: form.duration.value,
      rating: form.rating.value,
      location: form.location.value,
      image: form.image.value,
      gallery: form.gallery.value.split("\n").filter(Boolean),
      short: form.short.value,
      description: form.description.value,
      included: form.included.value.split("\n").filter(Boolean)
    };
    const index = adminData.activities.findIndex((item) => item.id === next.id);
    if (index >= 0) adminData.activities[index] = next;
    saveSiteData(adminData);
    refreshAdmin();
    alert("Activity saved.");
  });

  document.querySelector("[data-article-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const next = {
      id: form.id.value || form.title.value.toLowerCase().replaceAll(" ", "-"),
      title: form.title.value,
      author: form.author.value,
      date: form.date.value,
      image: form.image.value,
      preview: form.preview.value,
      content: form.content.value
    };
    const index = adminData.articles.findIndex((item) => item.id === next.id);
    if (index >= 0) adminData.articles[index] = next;
    saveSiteData(adminData);
    refreshAdmin();
    alert("Article saved.");
  });

  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("Reset all content to the demo database?")) return;
    localStorage.removeItem("tourismSiteData");
    adminData = loadSiteData();
    refreshAdmin();
  });
}

document.addEventListener("DOMContentLoaded", setupAdmin);