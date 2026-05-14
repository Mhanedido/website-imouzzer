const DEFAULT_DATA = {
  business: {
    name: "Imsouane Escape",
    location: "Imsouane, Morocco",
    whatsapp: "212600000000",
    email: "hello@imsouaneescape.com",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/"
  },
  activities: [
    {
      id: "surf-lessons",
      title: "Surf Lessons",
      category: "Ocean",
      price: "$45",
      duration: "2 hours",
      rating: "4.9",
      location: "Cathedral Point",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1531722569936-825d3dd91b15?auto=format&fit=crop&w=1400&q=80"
      ],
      short: "Private and small-group surf coaching for all levels with local instructors.",
      description: "Learn to read the waves, improve your pop-up, and enjoy Imsouane's long mellow rides with experienced local coaches. Sessions are adapted to your level, from first-time surfers to intermediate riders refining technique.",
      included: ["Board and wetsuit", "Certified local coach", "Warm-up and safety briefing", "Photo tips after the session"]
    },
    {
      id: "boat-trip",
      title: "Coastal Boat Trip",
      category: "Tours",
      price: "$35",
      duration: "90 minutes",
      rating: "4.8",
      location: "Imsouane Harbor",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=1400&q=80"
      ],
      short: "A calm ocean cruise past cliffs, fishing boats, and sunset viewpoints.",
      description: "Discover the coastline from the water with a relaxed boat tour led by local captains. Expect wide Atlantic views, hidden coves, and a peaceful pace that suits couples, families, and photographers.",
      included: ["Licensed captain", "Life jackets", "Harbor pickup", "Mint tea on request"]
    },
    {
      id: "quad-adventure",
      title: "Quad Adventure",
      category: "Adventure",
      price: "$60",
      duration: "2.5 hours",
      rating: "4.7",
      location: "Argan Hills",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=80"
      ],
      short: "Ride through argan trails, ocean tracks, and scenic viewpoints.",
      description: "Follow rugged routes between ocean air and argan countryside on a guided quad tour. The route balances safe instruction with enough open terrain to feel adventurous and memorable.",
      included: ["Quad bike", "Helmet", "Guide", "Fuel and safety briefing"]
    },
    {
      id: "yoga-retreat",
      title: "Sunset Yoga",
      category: "Wellness",
      price: "$25",
      duration: "75 minutes",
      rating: "4.9",
      location: "Beach View Terrace",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1529693662653-9d480530a697?auto=format&fit=crop&w=1400&q=80"
      ],
      short: "Gentle movement, breathwork, and ocean views at golden hour.",
      description: "Slow down after a day by the water with a guided yoga session designed for travelers. The class blends mobility, breath, and restorative poses while the sun drops behind the Atlantic.",
      included: ["Yoga mat", "Instructor", "Herbal tea", "Beginner-friendly flow"]
    }
  ],
  articles: [
    {
      id: "best-time-imsouane",
      title: "Best Time to Visit Imsouane",
      author: "Imsouane Escape Team",
      date: "2026-04-18",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      preview: "A practical guide to seasons, surf conditions, quiet months, and sunset weather.",
      content: "Imsouane is beautiful throughout the year, but each season has its own rhythm. Spring and autumn are ideal for warm days, calmer crowds, and reliable surf. Summer brings long sunny evenings and a lively village atmosphere, while winter is best for experienced surfers chasing stronger Atlantic swells."
    },
    {
      id: "what-to-pack",
      title: "What to Pack for a Coastal Adventure",
      author: "Nadia Amrani",
      date: "2026-03-28",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80",
      preview: "Simple essentials for surf days, boat trips, quad tours, and relaxed beach evenings.",
      content: "Pack light, breathable layers, reef-safe sunscreen, a reusable bottle, and a windbreaker for evenings. For activities, bring secure sandals, swimwear, and a small dry bag. Most equipment is provided for booked experiences, so focus on comfort and sun protection."
    },
    {
      id: "local-food-guide",
      title: "A Short Guide to Local Food",
      author: "Youssef Lahlou",
      date: "2026-02-11",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=80",
      preview: "Where fresh fish, tagines, amlou, and slow breakfasts shape the travel experience.",
      content: "Food in Imsouane is relaxed, generous, and shaped by the harbor. Try grilled fish after a morning surf, amlou with fresh bread at breakfast, and a warm tagine shared at sunset. Ask your host for daily recommendations because the best meals often follow the catch of the day."
    }
  ]
};

function loadSiteData() {
  const saved = localStorage.getItem("tourismSiteData");
  if (!saved) return structuredClone(DEFAULT_DATA);

  try {
    return { ...structuredClone(DEFAULT_DATA), ...JSON.parse(saved) };
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

function saveSiteData(data) {
  localStorage.setItem("tourismSiteData", JSON.stringify(data));
}

function bookUrl(activityName = "an activity") {
  const data = loadSiteData();
  const message = encodeURIComponent(`Hello, I want to book ${activityName}`);
  return `https://wa.me/${data.business.whatsapp}?text=${message}`;
}