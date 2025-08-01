(function () {
  'use strict';

  // info
  const APIKEY = `a3b4e59d-0fd5-4a80-a2e3-38da6aca72c4`;
  const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

  // vars
  const recipeContainer = document.querySelector('.recipe');

  // functions

  //renderSpinner function
  function renderSpinner(parentElement) {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="assets/img/icons.svg#icon-loader"></use>
          </svg>
        </div>`;

    parentElement.innerHTML = '';
    parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  function getRecipeSearch(query = '') {
    return `${BASE_URL}?search=${query}&key=${APIKEY}`;
  }

  function getRecipeID(id) {
    return `${BASE_URL}/${id}?key=${APIKEY}`;
  }

  // endpoints map with assigned functions
  const endPoints = {
    recipesBySearch: getRecipeSearch,
    recipeById: getRecipeID,
  };

  // Main Recipe Fetch Request
  async function showRecipebyId(id) {
    renderSpinner(recipeContainer);
    try {
      const response = await fetch(endPoints.recipeById(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();

      if (!data) {
        console.warn('No data found for this recipe ID.');
        return;
      }

      let { recipe } = data;

      recipe = {
        id: recipe.id ?? 'no-id',
        title: recipe.title ?? 'No title',
        cookingTime: recipe.cooking_time ?? 0,
        imageUrl: recipe.image_url ?? '',
        ingredients: recipe.ingredients ?? [],
        publisher: recipe.publisher ?? 'Unknown',
        servings: recipe.servings ?? 0,
        sourceUrl: recipe.source_url ?? '',
      };

      console.log({ recipe });

      // render html

      const markup = ` <figure class="recipe__fig">
      <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
                 <svg class="recipe__info-icon">
           <use href="assets/img/icons.svg#icon-clock"></use>
         </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
                 <svg class="recipe__info-icon">
                 <use href="assets/img/icons.svg#icon-users"></use>
                </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
                       <svg>
             <use href="assets/img/icons.svg#icon-minus-circle"></use>
           </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
                       <svg>
             <use href="assets/img/icons.svg#icon-plus-circle"></use>
           </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
               <svg>
         <use href="assets/img/icons.svg#icon-user"></use>
       </svg>
      </div>
      <button class="btn--round">
               <svg class="">
         <use href="assets/img/icons.svg#icon-bookmark-fill"></use>
       </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${
        recipe.ingredients.length
          ? recipe.ingredients
              .map(({ quantity, unit, description }) => {
                return `<li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="assets/img/icons.svg#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${quantity ?? ''}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${unit ?? ''}</span>
                    ${description}
                  </div>
                </li>`;
              })
              .join('')
          : ''
      }
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
                 <svg class="search__icon">
           <use href="assets/img/icons.svg#icon-arrow-right"></use>
         </svg>
      </a>
    </div>`;

      //clear the container
      recipeContainer.innerHTML = '';
      //add the content to the container
      recipeContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      const spinner = recipeContainer.querySelector('.spinner');
      if (spinner) {
        spinner.remove();
      }
    }
  }

  //initalise app
  function init() {
    showRecipebyId(`5ed6604591c37cdc054bc886`);
  }

  //call the main app function
  window.addEventListener('DOMContentLoaded', init);
})();
