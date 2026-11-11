(() => {
  "use strict";

  const projects = [
    {
      id: "neon-system",
      number: "01",
      title: "Solar System Visualizer",
      subtitle: "A cinematic view of our cosmic neighbourhood.",
      description: "Explore the solar system through an interactive 3D-style experience. Adjust the view, follow planetary orbits and get closer to the details.",
      category: "visualization",
      categoryLabel: "Visualization",
      type: "Interactive experience",
      url: "https://neon-system.vercel.app/",
      featured: true,
      art: "visualizer",
      searchText: "space planets astronomy orbit solar system physics science interactive visualization"
    },
    {
      id: "rash-reflex",
      number: "02",
      title: "Rash Reflex",
      subtitle: "How fast can you react?",
      description: "A reaction-time challenge with difficulty levels, personal statistics and a leaderboard. Wait for the signal, then trust your reflexes.",
      category: "experiences",
      categoryLabel: "Experience",
      type: "Reaction-time game",
      url: "https://rashreflex.vercel.app/",
      featured: false,
      art: "reflex",
      searchText: "reaction speed test reflex game statistics performance challenge leaderboard"
    },
    {
      id: "post-top",
      number: "03",
      title: "Post Top",
      subtitle: "The Wall of the Internet.",
      description: "A minimal social space for short posts, music and unexpected discoveries. A small corner of the internet for sharing what is on your mind.",
      category: "community",
      categoryLabel: "Community",
      type: "Social experience",
      url: "https://post-top.vercel.app/",
      featured: false,
      art: "post",
      searchText: "wewrite social feed wall internet short posts music community sharing thoughts"
    },
    {
      id: "dont-blink",
      number: "04",
      title: "Don't Blink",
      subtitle: "A camera-based challenge.",
      description: "A playful test of focus that uses your camera to detect blinking. Stay alert, set a personal best and see how long you can keep going.",
      category: "experiences",
      categoryLabel: "Experience",
      type: "Camera game",
      url: "https://dont-blink.vercel.app/",
      featured: false,
      art: "blink",
      searchText: "dont blink camera challenge focus concentration webcam game leaderboard"
    }
  ];

  const grid = document.getElementById("project-grid");
  const searchInput = document.getElementById("project-search");
  const resultCount = document.getElementById("result-count");
  const emptyState = document.getElementById("empty-state");
  const sortSelect = document.getElementById("sort-projects");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const themeToggle = document.querySelector(".theme-toggle");
  let activeFilter = "all";

  const artMarkup = {
    visualizer: `
      <div class="visualizer-scene">
        <div class="planet-orbit o1"></div><div class="planet-orbit o2"></div><div class="planet-orbit o3"></div>
        <span class="sun-core"></span><span class="planet p1"></span><span class="planet p2"></span><span class="planet p3"></span>
      </div>
      <span class="visualizer-label top">SOL / SYSTEM 01</span><span class="visualizer-label bottom">ORBITAL STUDY — 001</span>`,
    reflex: `
      <div class="reflex-stage"><span class="reflex-ring"></span><span class="reflex-dot"></span><span class="reflex-ms">142 ms</span></div>`,
    post: `
      <div class="post-window"><div class="post-topline"><span>WEWRITE</span><span>PUBLIC FEED ↗</span></div><div class="post-copy"></div><div class="post-copy medium"></div><div class="post-copy short"></div><span class="post-tag">a thought, shared.</span></div>`,
    blink: `
      <div class="blink-lens"><span class="lens-ring"></span><span class="lens-aperture"></span></div>`
  };

  function createCard(project) {
    const card = document.createElement("article");
    card.className = `project-card${project.featured ? " featured-card" : ""}`;
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    card.innerHTML = `
      <div class="project-art art-${project.art}" aria-hidden="true">${artMarkup[project.art]}</div>
      <div class="project-content">
        <div class="card-topline"><span class="project-category">${project.categoryLabel}</span><span class="project-number">N° ${project.number}</span></div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-footer"><span class="project-type">${project.type}</span><a class="open-project" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${project.title} in a new tab">Open project <span aria-hidden="true">↗</span></a></div>
      </div>`;
    return card;
  }

  function sortProjects(items) {
    const mode = sortSelect.value;
    const sorted = [...items];
    if (mode === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (mode === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.number.localeCompare(b.number));
    return sorted;
  }

  function renderProjects() {
    const query = searchInput.value.trim().toLowerCase();
    const matching = projects.filter((project) => {
      const matchesCategory = activeFilter === "all" || project.category === activeFilter;
      const haystack = `${project.title} ${project.subtitle} ${project.description} ${project.categoryLabel} ${project.type} ${project.searchText}`.toLowerCase();
      return matchesCategory && (!query || haystack.includes(query));
    });

    grid.replaceChildren(...sortProjects(matching).map(createCard));
    const count = String(matching.length).padStart(2, "0");
    resultCount.innerHTML = `Showing <strong>${count}</strong> ${matching.length === 1 ? "project" : "projects"}`;
    emptyState.hidden = matching.length !== 0;
    grid.hidden = matching.length === 0;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      renderProjects();
    });
  });

  searchInput.addEventListener("input", renderProjects);
  sortSelect.addEventListener("change", renderProjects);

  document.getElementById("reset-filters").addEventListener("click", () => {
    searchInput.value = "";
    activeFilter = "all";
    filterButtons.forEach((button) => {
      const selected = button.dataset.filter === "all";
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    sortSelect.value = "featured";
    renderProjects();
    searchInput.focus();
  });

  document.getElementById("shuffle-project").addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    const available = projects.filter((project) => {
      const categoryMatch = activeFilter === "all" || project.category === activeFilter;
      const textMatch = !query || `${project.title} ${project.description} ${project.searchText}`.toLowerCase().includes(query);
      return categoryMatch && textMatch;
    });
    if (!available.length) return;
    const selected = available[Math.floor(Math.random() * available.length)];
    window.open(selected.url, "_blank", "noopener,noreferrer");
  });

  themeToggle.addEventListener("click", () => {
    const enabled = document.body.classList.toggle("dark-theme");
    themeToggle.setAttribute("aria-label", enabled ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.title = enabled ? "Switch to light theme" : "Switch to dark theme";
  });

  // Press / to jump into search, and Escape to clear it.
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      searchInput.focus();
    }
    if (event.key === "Escape" && target === searchInput) {
      searchInput.value = "";
      renderProjects();
      searchInput.blur();
    }
  });

  document.getElementById("current-year").textContent = String(new Date().getFullYear());
  renderProjects();
})();
