const right = document.getElementById("right");
const left = document.getElementById("left");
const downloadIcon = document.getElementById("downloadIcon");
const recipeArea = document.getElementById("recipeArea");
const saveBtn = document.getElementById("saveBtn");
const yourRecipesBtn = document.getElementById("yourRecipesBtn");


// Event listeners
saveBtn.addEventListener("click", displayRecipe);
right.addEventListener("click", goRight);
left.addEventListener("click", goLeft);
downloadIcon.addEventListener("click", download);
saveBtn.addEventListener("click", saveRecipe);
yourRecipesBtn.addEventListener("click", () => window.location.href = 'your_recipes.html');

// recipeArray[2] will give the current recipe
let recipeArray = [];

// Will give a recipe that's not in recipeArray
function makeNewRecipe() {
    let newRecipe;
    do {
        newRecipe = Math.floor(Math.random() * recipes.length);
    } while (recipeArray.includes(newRecipe))
    return newRecipe;
}

// Will make an array containing 5 unique recipes
// It contains indexes for the recipes array in RECIPES.js
function makeRecipeArray() {
    let newRecipe;
    recipeArray = [];
    for (let i = 0; i < 5; i++) {
        recipeArray.push(makeNewRecipe());
    }
    displayRecipe();
}

// Side buttons
function goRight() {
    recipeArray.push(makeNewRecipe());
    recipeArray.shift();
    displayRecipe();
}

function goLeft() {
    recipeArray.unshift(makeNewRecipe());
    recipeArray.pop();
    displayRecipe();
}

// Checks if recipe is already saved, and draws button differently
function drawSaveBtn() {
    let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
    if (recipeStorage) {
        if (recipeStorage.includes(recipeArray[2])) { // If recipe is saved
            saveBtn.style.backgroundColor = "#848484";
            saveBtn.style.color = "#383838";
            saveBtn.style.cursor = "default";
            saveBtn.style.pointerEvents = "none";
        } else { // If recipe is not saved
            saveBtn.style.backgroundColor = "#C4C4C4";
            saveBtn.style.color = "black";
            saveBtn.style.cursor = "pointer";
            saveBtn.style.pointerEvents = "auto";
        }
    }
}

// Displays recipe in #recipeArea
function displayRecipe() {
    let index = recipeArray[2];
    let recipe = "";

    // Title
    recipe += "<h3>" + recipes[index].title + "</h3>";

    // Ingredients
    recipe += "<h4>Ingredients</h4><ul>";
    recipes[index].ingredients.split("\n").forEach(ingredient => recipe += "<li>" + ingredient + "</li>\n");
    recipe += "</ul>";

    // Directions
    recipe += "<h4>Directions</h4><ol>";
    recipes[index].directions.split("\n").forEach(direction => recipe += "<li>" + direction + "</li>\n");
    recipe += "</ol>";

    // Source
    recipe += "<a href=\"" + recipes[index].source + "\" target=\"_blank\">source</a>";

    recipeArea.innerHTML = recipe;

    drawSaveBtn();
}


// Creates a .txt file in memory, and downloads it
function download() {
    // Creating recipe in pure text format
    let recipe = recipes[recipeArray[2]].title + " Recipe\n\n";
    recipe += "Ingredients";
    recipes[recipeArray[2]].ingredients.split("\n").forEach(ingredient => recipe += "\n - " + ingredient);
    recipe += "\n\nDirections";
    recipes[recipeArray[2]].directions.split("\n").forEach(function(direction, i) { recipe += `\n ${i + 1}. ` + direction });

    // Creates and downloads file
    let file = document.createElement('a');
    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(recipe));
    file.setAttribute('download', recipes[recipeArray[2]].title + ".txt");
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);

}

// Saves recipe in local storage
function saveRecipe() {
    if (localStorage.getItem("recipes") === null) {
        localStorage.setItem("recipes", JSON.stringify([recipeArray[2]]));
    } else {
        let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
        if (!recipeStorage.includes(recipeArray[2])) {
            recipeStorage.push(recipeArray[2]);
        }
        localStorage.setItem("recipes", JSON.stringify(recipeStorage));
    }

    drawSaveBtn();
}