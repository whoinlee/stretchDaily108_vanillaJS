const searchInput = document.getElementById('search-input');
const resultHeading = document.getElementById('result-heading');
const randomMeal = document.getElementById('random-meal');
const resultMeals = document.getElementById('result-meals');
const submitForm = document.getElementById('submit-form');
const randomBtn = document.getElementById('random-btn');

submitForm.addEventListener('submit', searchMeal);
randomBtn.addEventListener('click', getRandomMeal);
resultMeals.addEventListener('click', e => {
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

const mealDbUrl = "https://www.themealdb.com/api/json/v1/1/";


//-- search meal by search term
async function searchMeal(e) {
    e.preventDefault();

    //-- clear single meal
    randomMeal.innerHTML = '';

    //-- get search term
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        const data = await (await fetch(`${mealDbUrl}search.php?s=${searchTerm}`)).json();
        // console.log(data);
        resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        if (data.meals) {
            resultHeading.innerHTML = `<h2>search results for '${searchTerm}':</h2>`;
            resultMeals.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h4>${meal.strMeal}</h4>
                    </div>
                </div>
            `).join('');
        }
        //-- clear search text
        searchInput.value = '';
    } else {
        alert('Please enter a search term');
    }
};

//-- fetch random meal from API
async function getRandomMeal() {
    //-- clear meals and heading
    resultMeals.innerHTML = '';
    resultHeading.innerHTML = '';
    const data = await (await fetch(`${mealDbUrl}random.php`)).json();
    const meal = data.meals[0];
    addMealToDOM(meal);
};

//-- fetch meal by ID
async function getMealById(mealID) {
    const data = await (await fetch(`${mealDbUrl}lookup.php?i=${mealID}`)).json();
    const meal = data.meals[0];
    addMealToDOM(meal);
};

//-- add meal to DOM
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