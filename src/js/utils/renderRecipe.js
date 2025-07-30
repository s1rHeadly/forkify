// Icons are referenced directly in the HTML using href attributes
import icons from 'url:../../img/icons.svg';

console.log(icons);
export function renderRecipeHTML(recipe) {
  const {
    id = 'no id',
    title = 'no title',
    publisher = 'no publisher',
    imageUrl = '',
    sourceUrl = '',
    cookingTime = '',
    ingredients = [],
    servings = 0,
  } = recipe || {};
  return `
  
  <figure class="recipe__fig" data-recipeI="${id}">
  <img src="${imageUrl}" alt="Tomato" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${servings}</span>
    <span class="recipe__info-text">${
      servings.length < 2 ? 'serving' : 'servings'
    }</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
   ${
     ingredients.length
       ? ingredients
           .map(ing => {
             const { quantity, unit, description } = ing;
             return `
                  <li class="recipe__ingredient">
                      <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
                  <div class="recipe__quantity">${
                    quantity !== null ? quantity : ''
                  }</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${unit}</span>
                  ${description}
                  </div>
                </li>
                 `;
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
    <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${sourceUrl}"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="#icon-arrow-right"></use>
    </svg>
  </a>
</div>

`;
}
