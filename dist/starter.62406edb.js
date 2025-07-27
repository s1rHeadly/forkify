const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const showRecipe = async ()=>{
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=a3b4e59d-0fd5-4a80-a2e3-38da6aca72c4`);
        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.log('Error:', error);
    }
};
const init = async ()=>{
    await showRecipe();
};
window.addEventListener('DOMContentLoaded', init);

//# sourceMappingURL=starter.62406edb.js.map
