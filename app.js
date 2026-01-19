const RecipeApp = (function () {

    console.log("RecipeApp initializing...");

    /********************
     * DATA (PRIVATE)
     ********************/
    const recipes = [
        {
            id: 1,
            title: "Pasta",
            difficulty: "easy",
            time: 20,
            ingredients: ["Pasta", "Salt", "Water", "Olive oil"],
            steps: [
                "Boil water",
                {
                    text: "Cook pasta",
                    substeps: [
                        "Add pasta to water",
                        "Stir occasionally"
                    ]
                },
                "Drain and serve"
            ]
        },
        {
            id: 2,
            title: "Biryani",
            difficulty: "hard",
            time: 60,
            ingredients: ["Rice", "Chicken", "Spices", "Onion"],
            steps: [
                "Wash rice",
                {
                    text: "Prepare masala",
                    substeps: [
                        "Fry onions",
                        {
                            text: "Add spices",
                            substeps: ["Add chili", "Add garam masala"]
                        }
                    ]
                },
                "Cook rice and mix"
            ]
        },
        {
            id: 3,
            title: "Sandwich",
            difficulty: "easy",
            time: 10,
            ingredients: ["Bread", "Butter", "Vegetables"],
            steps: ["Butter bread", "Add veggies", "Serve"]
        },
        {
            id: 4,
            title: "Pizza",
            difficulty: "medium",
            time: 40,
            ingredients: ["Dough", "Cheese", "Sauce"],
            steps: ["Prepare base", "Add toppings", "Bake"]
        }
    ];

    /********************
     * STATE
     ********************/
    let currentFilter = "all";
    let currentSort = "none";

    const container = document.getElementById("recipe-container");

    /********************
     * FILTERS (PURE)
     ********************/
    const applyFilter = (list) => {
        if (currentFilter === "quick") {
            return list.filter(r => r.time < 30);
        }
        if (currentFilter === "all") return list;
        return list.filter(r => r.difficulty === currentFilter);
    };

    /********************
     * SORTS (PURE)
     ********************/
    const applySort = (list) => {
        if (currentSort === "name") {
            return [...list].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
        if (currentSort === "time") {
            return [...list].sort((a, b) => a.time - b.time);
        }
        return list;
    };

    /********************
     * RECURSIVE STEPS
     ********************/
    const renderSteps = (steps) => {
        let html = "<ul>";
        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                html += `<div class="substeps">${renderSteps(step.substeps)}</div>`;
                html += `</li>`;
            }
        });
        html += "</ul>";
        return html;
    };

    /********************
     * CARD CREATION
     ********************/
    const createCard = (recipe) => `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <p>Difficulty: ${recipe.difficulty}</p>
            <p>Time: ${recipe.time} mins</p>

            <button class="toggle-btn" data-toggle="steps">Show Steps</button>
            <button class="toggle-btn" data-toggle="ingredients">Show Ingredients</button>

            <div class="steps-container">
                ${renderSteps(recipe.steps)}
            </div>

            <div class="ingredients-container">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    /********************
     * RENDER
     ********************/
    const updateDisplay = () => {
        let list = applyFilter(recipes);
        list = applySort(list);

        container.innerHTML = list.map(createCard).join("");
    };

    /********************
     * EVENT DELEGATION
     ********************/
    const handleToggle = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const card = e.target.closest(".recipe-card");
        const type = e.target.dataset.toggle;
        const section = card.querySelector(`.${type}-container`);

        section.classList.toggle("visible");
        e.target.textContent =
            section.classList.contains("visible")
                ? `Hide ${type}`
                : `Show ${type}`;
    };

    /********************
     * INIT
     ********************/
    const init = () => {
        updateDisplay();

        container.addEventListener("click", handleToggle);

        document.querySelectorAll("[data-filter]").forEach(btn => {
            btn.addEventListener("click", () => {
                currentFilter = btn.dataset.filter;
                document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                updateDisplay();
            });
        });

        document.querySelectorAll("[data-sort]").forEach(btn => {
            btn.addEventListener("click", () => {
                currentSort = btn.dataset.sort;
                document.querySelectorAll("[data-sort]").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                updateDisplay();
            });
        });

        console.log("RecipeApp ready!");
    };

    return { init };

})();

RecipeApp.init();
