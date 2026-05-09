// MENU TOGGLE
function toggleMenu(){
  const nav = document.getElementById("nav");
  if(nav.style.display === "flex"){
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}

// DATA (Activities)
const activities = [
  {
    title: "Desert Trip",
    img: "activity-desert.jpg"
  },
  {
    title: "Mountain Hiking",
    img: "activity-mountain.jpg"
  },
  {
    title: "City Tour",
    img: "activity-city.jpg"
  }
];

// DATA (Stays)
const stays = [
  {
    title: "Luxury Riad",
    img: "stay-riad.jpg"
  },
  {
    title: "Hotel View",
    img: "stay-hotel.jpg"
  }
];

// RENDER ACTIVITIES
const actContainer = document.getElementById("activitiesList");

activities.forEach(a=>{
  actContainer.innerHTML += `
    <div class="card">
      <img src="${a.img}" />
      <h3>${a.title}</h3>
    </div>
  `;
});

// RENDER STAYS
const stayContainer = document.getElementById("staysList");

stays.forEach(s=>{
  stayContainer.innerHTML += `
    <div class="card">
      <img src="${s.img}" />
      <h3>${s.title}</h3>
    </div>
  `;
});