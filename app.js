// --------------------
// Recipe Data
// --------------------
const recipes = [
  {
    id: 1,
    title: "Garlic Butter Pasta",
    time: 25,
    difficulty: "easy",
    description: "A quick and creamy garlic butter pasta perfect for busy evenings.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    time: 70,
    difficulty: "medium",
    description: "Classic Indian curry with tender chicken cooked in spiced tomato gravy.",
    category: "curry"
  },
  {
    id: 3,
    title: "Avocado Quinoa Salad",
    time: 20,
    difficulty: "easy",
    description: "A healthy salad with fresh veggies, quinoa, and creamy avocado.",
    category: "salad"
  },
  {
    id: 4,
    title: "Beef Bourguignon",
    time: 120,
    difficulty: "hard",
    description: "A rich French stew slow-cooked with red wine and tender beef.",
    category: "stew"
  },
  {
    id: 5,
    title: "Spicy Ramen Bowl",
    time: 35,
    difficulty: "medium",
    description: "Flavorful ramen noodles with a spicy broth and fresh toppings.",
    category: "noodles"
  },
  {
    id: 6,
    title: "Classic Margherita Pizza",
    time: 90,
    difficulty: "hard",
    description: "Homemade pizza with fresh mozzarella, basil, and tomato sauce.",
    category: "pizza"
  },
  {
    id: 7,
    title: "Vegetable Stir Fry",
    time: 30,
    difficulty: "easy",
    description: "Colorful vegetables stir-fried with soy sauce and sesame oil.",
    category: "asian"
  },
  {
    id: 8,
    title: "Lamb Rogan Josh",
    time: 80,
    difficulty: "hard",
    description: "A bold and aromatic Kashmiri curry made with slow-cooked lamb.",
    category: "curry"
  }
];

// --------------------
// DOM Selection
// --------------------
const recipeContainer = document.querySelector("#recipe-container");

// --------------------
// Create Recipe Card
// --------------------
const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>
      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>
      <p>${recipe.description}</p>
    </div>
  `;
};

// --------------------
// Render Recipes
// --------------------
const renderRecipes = (recipesArray) => {
  const recipeHTML = recipesArray
    .map(recipe => createRecipeCard(recipe))
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// --------------------
// Initialize App
// --------------------
renderRecipes(recipes);