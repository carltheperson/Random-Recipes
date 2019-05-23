const recipeBlockArea = document.getElementById("recipeBlockArea");
const backBtn = document.getElementById("backBtn");
const closeBtns = document.getElementsByClassName("close");
const recipeContainers = document.getElementsByClassName("recipe-block")

backBtn.addEventListener("click", () => window.location.href = 'index.html')

function addCloseEventlistener() {
	let recipeBlocks = [];
	let recipeBlocksIndex = [];

	for (let i = 0; i < closeBtns.length; i++) {
		recipeBlocks.push(recipeContainers[i]);
		recipeBlocksIndex.push(i);

		closeBtns[i].addEventListener("click", () => removeRecipeBlock(recipeBlocks[i])); // Html block
		closeBtns[i].addEventListener("click", () => removeRecipe(recipeBlocksIndex[i])); // Local storage
	}
	
}


function drawRecipes() {
	let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
	let recipeBlocks = "";
	recipeStorage.forEach(recipe => {
		recipeBlocks += "<div class=\"recipe-block\">" +
		"<input type='image' src='img/close.svg' class='close'>"
		+ "<h2>"+ recipes[recipe].title + "</h2></div>";
	});

	recipeBlockArea.innerHTML = recipeBlocks;
	addCloseEventlistener()
}

// Removes recipe html block
function removeRecipeBlock(block) {
	block.parentNode.removeChild(block);
}

// Removes Recipe from local storage
function removeRecipe(index) {
	let recipeStorage = JSON.parse(localStorage.getItem("recipes"));
	recipeStorage.splice(index, 1);
	localStorage.setItem("recipes", JSON.stringify(recipeStorage));
}