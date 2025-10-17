const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const recipesContainer = document.getElementById('recipes');
const recipeDetails = document.getElementById('recipeDetails');
const backBtn = document.getElementById('backBtn');
const recipeTitle = document.getElementById('recipeTitle');
const recipeImage = document.getElementById('recipeImage');
const ingredientsList = document.getElementById('ingredients');
const instructions = document.getElementById('instructions');

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

searchBtn.addEventListener('click', fetchRecipes);

function fetchRecipes() {
  const query = searchInput.value.trim();
  if (!query) return;

  fetch(`${API_URL}${query}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        displayRecipes(data.meals);
      } else {
        alert('No recipes found.');
      }
    })
    .catch(error => console.error('Error fetching recipes:', error));
}

function displayRecipes(meals) {
  recipesContainer.innerHTML = '';
  meals.forEach(meal => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <h3>${meal.strMeal}</h3>
    `;
    card.addEventListener('click', () => showRecipeDetails(meal));
    recipesContainer.appendChild(card);
  });
}

function showRecipeDetails(meal) {
  recipeTitle.textContent = meal.strMeal;
  recipeImage.src = meal.strMealThumb;
  recipeImage.alt = meal.strMeal;
  ingredientsList.innerHTML = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      const li = document.createElement('li');
      li.textContent = `${measure} ${ingredient}`;
      ingredientsList.appendChild(li);
    }
  }
  instructions.textContent = meal.strInstructions;

  recipesContainer.classList.add('hidden');
  recipeDetails.classList.remove('hidden');
}

backBtn.addEventListener('click', () => {
  recipesContainer.classList.remove('hidden');
  recipeDetails.classList.add('hidden');
});
