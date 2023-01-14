const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetails = document.querySelector(".meal-details-content");
const closeBtn = document.getElementById("recipe-close-btn");

searchBtn.addEventListener("click", getMeals);
mealList.addEventListener("click", getRecipe);
closeBtn.addEventListener("click", () => {
  mealDetails.parentElement.classList.remove("show");
});

function getMeals() {
  let searchTxt = document.getElementById("search-input").value.trim();
  fetch(`
  https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTxt}`)
    .then((res) => res.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
              <div class="meal-item" data-id="${meal.idMeal}">
                  <div class="meal-img">
                    <img src="${meal.strMealThumb}" />
                  </div>
                  <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                  </div>
            </div>
          `;
        });
        mealList.classList.remove("notfound");
      } else {
        html = "There is no results";
        mealList.classList.add("notfound");
      }
      mealList.innerHTML = html;
    });
}

function getRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        getFullRecipe(data.meals);
      });
  }
}

function getFullRecipe(meal) {
  meal = meal[0];
  let html = `
  
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instructions:</h3>
    <p>
     ${meal.strInstructions}
    </p>
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" />
  </div>
  <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
  </div>`;

  mealDetails.innerHTML = html;
  mealDetails.parentElement.classList.add("show");
}
