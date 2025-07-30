import { renderRecipeHTML } from './utils/renderRecipe.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async () => {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();

    console.log({ data });

    // destructure the data.recipe
    const {
      id,
      title,
      publisher,
      image_url: imageUrl,
      source_url: sourceUrl,
      cooking_time: cookingTime,
      ingredients,
      servings,
    } = data.recipe;

    // create a new recipe object from the data above
    const recipe = {
      id,
      title,
      publisher,
      imageUrl,
      sourceUrl,
      cookingTime,
      ingredients,
      servings,
    };
    const html = renderRecipeHTML(recipe);
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', html); // Uncomment when you want to render
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
  }
};

// evoke to test only
showRecipe();
