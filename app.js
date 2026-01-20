(() => {
  const recipes = [
    {
      id: 1,
      title: "Garlic Pasta",
      time: 25,
      difficulty: "easy",
      ingredients: ["Pasta", "Garlic", "Olive Oil"],
      steps: ["Boil pasta", ["Heat oil", "Add garlic"], "Mix together"]
    },
    {
      id: 2,
      title: "Chicken Curry",
      time: 70,
      difficulty: "hard",
      ingredients: ["Chicken", "Spices", "Onion"],
      steps: ["Marinate chicken", ["Cook onions", ["Add spices", "Add chicken"]]]
    },
    {
      id: 3,
      title: "Salad Bowl",
      time: 15,
      difficulty: "easy",
      ingredients: ["Lettuce", "Tomato"],
      steps: ["Chop veggies", "Mix"]
    },
    {
      id: 4,
      title: "Veg Stir Fry",
      time: 30,
      difficulty: "medium",
      ingredients: ["Vegetables", "Soy Sauce"],
      steps: ["Heat pan", ["Add veggies", "Stir fry"]]
    },
    {
      id: 5,
      title: "Beef Stew",
      time: 90,
      difficulty: "hard",
      ingredients: ["Beef", "Potatoes"],
      steps: ["Brown beef", ["Add water", ["Simmer long"]]]
    },
    {
      id: 6,
      title: "Omelette",
      time: 10,
      difficulty: "easy",
      ingredients: ["Eggs", "Salt"],
      steps: ["Beat eggs", "Cook"]
    },
    {
      id: 7,
      title: "Pancakes",
      time: 20,
      difficulty: "medium",
      ingredients: ["Flour", "Milk"],
      steps: ["Mix batter", "Cook"]
    },
    {
      id: 8,
      title: "Biryani",
      time: 120,
      difficulty: "hard",
      ingredients: ["Rice", "Chicken"],
      steps: ["Cook rice", ["Layer chicken", ["Dum cook"]]]
    }
  ];

  const container = document.querySelector("#recipe-container");
  const counter = document.querySelector("#counter");
  const searchInput = document.querySelector("#search");

  let state = {
    filter: "all",
    sort: null,
    search: "",
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
  };

  const renderSteps = steps =>
    `<ul>${steps.map(s =>
      Array.isArray(s) ? renderSteps(s) : `<li>${s}</li>`
    ).join("")}</ul>`;

  const createCard = r => `
    <div class="recipe-card">
      <span class="favorite ${state.favorites.includes(r.id) ? "active" : ""}" data-id="${r.id}">♥</span>
      <h3>${r.title}</h3>
      <div class="recipe-meta">
        <span>⏱ ${r.time} min</span>
        <span class="difficulty ${r.difficulty}">${r.difficulty}</span>
      </div>
      <button class="btn toggle-steps">Show Steps</button>
      <button class="btn toggle-ingredients">Show Ingredients</button>
      <div class="recipe-details hidden steps">${renderSteps(r.steps)}</div>
      <div class="recipe-details hidden ingredients">
        <ul>${r.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      </div>
    </div>`;

  const updateDisplay = () => {
    let list = [...recipes];

    if (state.filter === "favorites") {
      list = list.filter(r => state.favorites.includes(r.id));
    } else if (state.filter === "quick") {
      list = list.filter(r => r.time < 30);
    } else if (["easy","medium","hard"].includes(state.filter)) {
      list = list.filter(r => r.difficulty === state.filter);
    }

    if (state.search) {
      list = list.filter(r =>
        r.title.toLowerCase().includes(state.search) ||
        r.ingredients.join(" ").toLowerCase().includes(state.search)
      );
    }

    if (state.sort === "name") {
      list = [...list].sort((a,b) => a.title.localeCompare(b.title));
    }
    if (state.sort === "time") {
      list = [...list].sort((a,b) => a.time - b.time);
    }

    counter.textContent = `Showing ${list.length} of ${recipes.length} recipes`;
    container.innerHTML = list.map(createCard).join("");
  };

  document.body.addEventListener("click", e => {
    if (e.target.classList.contains("favorite")) {
      const id = Number(e.target.dataset.id);
      state.favorites = state.favorites.includes(id)
        ? state.favorites.filter(f => f !== id)
        : [...state.favorites, id];
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      updateDisplay();
    }

    if (e.target.classList.contains("toggle-steps")) {
      e.target.nextElementSibling.nextElementSibling.classList.toggle("hidden");
    }

    if (e.target.classList.contains("toggle-ingredients")) {
      e.target.nextElementSibling.classList.toggle("hidden");
    }

    if (e.target.dataset.filter) {
      state.filter = e.target.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      updateDisplay();
    }

    if (e.target.dataset.sort) {
      state.sort = e.target.dataset.sort;
      updateDisplay();
    }
  });

  let debounce;
  searchInput.addEventListener("input", e => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      state.search = e.target.value.toLowerCase();
      updateDisplay();
    }, 300);
  });

  updateDisplay();
})();