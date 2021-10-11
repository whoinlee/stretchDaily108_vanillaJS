const searchInput = document.getElementById('search-input');
const submitForm = document.getElementById('submit-form');
const randomBtn = document.getElementById('random-btn');
const searchResult = document.getElementById('search-result');
const resultHeading = document.getElementById('result-heading');
const randomMeal = document.getElementById('random-meal');
const mealDbUrl = "https://www.themealdb.com/api/json/v1/1/";

// search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  // Clear single meal
  randomMeal.innerHTML = '';

  // Get search term
  const term = searchInput.value;

  // Check for empty
  if (term.trim()) {
    fetch(`${mealDbUrl}search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          searchResult.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h4>${meal.strMeal}</h4>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    // Clear search text
    searchInput.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// Fetch meal by ID
function getMealById(mealID) {
  fetch(`${mealDbUrl}lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Fetch random meal from API
function getRandomMeal() {
  // Clear meals and heading
  searchResult.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  /*    // <div class="single-meal"></div> */

  randomMeal.innerHTML = `

      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="random-meal-info">
        ${meal.strCategory ? `<p class='category'>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p class='area'>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
  `;
}

// Event listeners
submitForm.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', getRandomMeal);

searchResult.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});