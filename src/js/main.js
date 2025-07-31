(function () {
  "use strict";

  const APIKEY = `a3b4e59d-0fd5-4a80-a2e3-38da6aca72c4`;
  const BASE_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";

  function getRecipeSearch(query = "") {
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

  const showRecipebyId = async (id) => {
    try {
      const response = await fetch(endPoints.recipeById(id));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();

      if (!data) {
        console.warn("No data found for this recipe ID.");
        return;
      }

      console.log({ data });
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  showRecipebyId(`5ed6604591c37cdc054bc886`);
})();
