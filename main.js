const right = document.getElementById("right");
const left = document.getElementById("left");
const downloadIcon = document.getElementById("downloadIcon");
const recipeArea = document.getElementById("recipeArea");
const saveBtn = document.getElementById("saveBtn"); 
const yourRecipesBtn = document.getElementById("yourRecipesBtn"); 

saveBtn.addEventListener("click", displayRecipe);
right.addEventListener("click", goRight);
left.addEventListener("click", goLeft);
downloadIcon.addEventListener("click", download);

let recipeArray = [];
// recipeArray[2] will give the current recipe

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

function download() {
	// Creating recipe in text format
	let recipe = recipes[recipeArray[2]].title + " Recipe\n\n";

	recipe += "Ingredients";
	recipes[recipeArray[2]].ingredients.split("\n").forEach(ingredient => recipe += "\n - " + ingredient);

	recipe += "\n\nDirections";
	recipes[recipeArray[2]].directions.split("\n").forEach(function (direction, i) {recipe += `\n ${i + 1}. ` + direction});

	// Creating and downloading file
	let file = element = document.createElement('a');
	file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(recipe));
	file.setAttribute('download', recipes[recipeArray[2]].title + ".txt");
	file.style.display = 'none';
	document.body.appendChild(file);
	file.click();
	document.body.removeChild(file);

}