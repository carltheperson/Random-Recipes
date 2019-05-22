const right = document.getElementById("right");
const left = document.getElementById("left");
const downloadIcon = document.getElementById("downloadIcon");
const recipeArea = document.getElementById("recipeArea");
const saveBtn = document.getElementById("saveBtn"); 
const yourRecipesBtn = document.getElementById("yourRecipesBtn"); 

saveBtn.addEventListener("click", displayRecipe);
right.addEventListener("click", goRight);
left.addEventListener("click", goLeft);

let recipeArray = [];

function makeNewRecipe() {
	let newRecipe;
	do {
		newRecipe = Math.floor(Math.random()*recipes.length);
	} while (recipeArray.includes(newRecipe))
	return newRecipe;
}

function makeRecipeArray() {
	let newRecipe;
	recipeArray = [];
	for (let i = 0; i < 5; i++){
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

function displayRecipe() {
	let index = recipeArray[2];
	let recipe = "";
	
	recipe += "<h3>" + recipes[index].title + "</h3>";

	// Ingredients
	recipe += "<h4>Ingredients</h4><ul>";
	recipes[index].ingredients.split("\n").forEach(ingredient => recipe += "<li>" + ingredient + "</li>\n");
	recipe += "</ul>";

	// Directions
	recipe += "<h4>Directions</h4><ol>";
	recipes[index].directions.split("\n").forEach(direction => recipe += "<li>" + direction + "</li>\n");
	recipe += "</ol>";

	recipeArea.innerHTML = recipe;
}