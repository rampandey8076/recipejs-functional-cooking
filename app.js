/***********************
 * DATA (DO NOT MUTATE)
 ***********************/
const recipes = [
    { title: "Pasta", difficulty: "easy", time: 20 },
    { title: "Burger", difficulty: "easy", time: 25 },
    { title: "Biryani", difficulty: "hard", time: 60 },
    { title: "Salad", difficulty: "easy", time: 10 },
    { title: "Pizza", difficulty: "medium", time: 40 },
    { title: "Curry", difficulty: "medium", time: 35 },
    { title: "Steak", difficulty: "hard", time: 50 },
    { title: "Sandwich", difficulty: "easy", time: 15 }
];

/***********************
 * STATE
 ***********************/
let currentFilter = "all";
let currentSort = "none";

/***********************
 * DOM REFERENCES
 ***********************/
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

/***********************
 * PURE FILTER FUNCTIONS
 ***********************/
const filterByDifficulty = (recipes, level) =>
    recipes.filter(r => r.difficulty === level);

const filterQuick = (recipes) =>
    recipes.filter(r => r.time < 30);

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterQuick(recipes);
        default:
            return recipes;
    }
};

/***********************
 * PURE SORT FUNCTIONS
 ***********************/
const sortByName = (recipes) =>
    [...recipes].sort((a, b) => a.title.localeCompare(b.title));

const sortByTime = (recipes) =>
    [...recipes].sort((a, b) => a.time - b.time);

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

/***********************
 * RENDER FUNCTION
 ***********************/
const renderRecipes = (recipes) => {
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p>Difficulty: ${recipe.difficulty}</p>
            <p>Time: ${recipe.time} mins</p>
        `;
        recipeContainer.appendChild(card);
    });
};

/***********************
 * UPDATE DISPLAY (CORE)
 ***********************/
const updateDisplay = () => {
    let result = recipes;
    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);

    renderRecipes(result);

    console.log(
        `Showing ${result.length} recipes | Filter: ${currentFilter} | Sort: ${currentSort}`
    );
};

/***********************
 * ACTIVE BUTTON UI
 ***********************/
const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.filter === currentFilter
        );
    });

    sortButtons.forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.sort === currentSort
        );
    });
};

/***********************
 * EVENT HANDLERS
 ***********************/
filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        currentFilter = e.target.dataset.filter;
        updateActiveButtons();
        updateDisplay();
    });
});

sortButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        currentSort = e.target.dataset.sort;
        updateActiveButtons();
        updateDisplay();
    });
});

/***********************
 * INIT
 ***********************/
updateDisplay();
