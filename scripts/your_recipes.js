const recipeBlockArea = document.getElementById("recipeBlockArea");
const backBtn = document.getElementById("backBtn");
const recipeContainers = document.getElementsByClassName("recipe-block")
const recipeDisplayArea = document.getElementsByClassName("recipe-display-area");
const recipeBtns = document.getElementsByClassName("recipe-btn");
const closeBtns = document.getElementsByClassName("close");

let recipeBlocksToIndex = []; // Array with the recipeContainers indexes corresponding to the ones in RECIPES.js
backBtn.addEventListener("click", () => {currentRecipe = null; window.location.href = 'index.html'});


function addRecipeBlockEventlisteners() {

	// Close Buttons
	let recipeBlocks = [];

	for (let i = 0; i < closeBtns.length; i++) {
		recipeBlocks.push(recipeContainers[i]);

		recipeBtns[i].addEventListener("click", () => {displayFullRecipe(i, recipeDisplayArea[i])});

		closeBtns[i].addEventListener("click", () => {displayFullRecipe(i, recipeDisplayArea[i]); removeRecipeBlock(recipeBlocks[i]); recipeDisplayArea[i].style.display = "none"}); // Html block
		closeBtns[i].addEventListener("click", () => removeRecipe(i)); // Local storage
		
	}
	
}


function drawRecipes() {
	let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
	let recipeBlocks = "";
	recipeStorage.forEach(recipe => {
		recipeBlocks += "<div class='recipe-block'>" +
		"<input type='image' src='img/close.svg' value='' class='close'>" + 
		"<button class='recipe-btn'>" + recipes[recipe].title + "</button></div>" + 
		"<div class='recipe-display-area'></div>";
		recipeBlocksToIndex.push(recipe);
	});

	recipeBlockArea.innerHTML = recipeBlocks;

	if (recipeStorage.length === 0) {
		recipeBlockArea.innerHTML = "<h2>You have no saved recipes</h2>";
	}

	addRecipeBlockEventlisteners();
}

function addCloseEventlisteners (index, block) {
	let closeBtn = document.getElementById("openCloseBtn");

	closeBtn.addEventListener("click", () => removeRecipeBlock(block)); // Html block
	closeBtn.addEventListener("click", () => removeRecipe(index)); // Local storage

	let recipeBtn = document.getElementById("openRecipeBtn");

	recipeBtn.addEventListener("click", () => {displayFullRecipe(index, block); console.log("using this")});
}

function displayFullRecipe(index, displayArea) {
	if (!displayArea.innerHTML.includes("Ingredients")) {
		let recipe = displayArea.innerHTML;

		// Ingredients
		recipe += "<h4>Ingredients</h4><ul>";
		recipes[recipeBlocksToIndex[index]].ingredients.split("\n").forEach(ingredient => recipe += "<li>" + ingredient + "</li>\n");
		recipe += "</ul>";
	
		// Directions
		recipe += "<h4>Directions</h4><ol>";
		recipes[recipeBlocksToIndex[index]].directions.split("\n").forEach(direction => recipe += "<li>" + direction + "</li>\n");
		recipe += "</ol>";
	
		displayArea.innerHTML = recipe;
	} else {
		displayArea.innerHTML = "";
	}

}

// Removes recipe html block
let removedBlocks = 0;
function removeRecipeBlock(block) {
	block.parentNode.removeChild(block);
	removedBlocks ++;
	if (removedBlocks === recipeBlocksToIndex.length){
		recipeBlockArea.innerHTML = "<h2>You have no saved recipes</h2>";
	}
}

// Removes Recipe from local storage
function removeRecipe(index) {
	let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
	recipeStorage = recipeStorage.filter( (recipe) => {return recipe != recipeBlocksToIndex[index]});
	localStorage.setItem("recipes", JSON.stringify(recipeStorage));
}