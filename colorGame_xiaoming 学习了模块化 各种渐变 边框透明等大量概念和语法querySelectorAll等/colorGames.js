

var num_of_squares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");

var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");
init();
function init() {
	// mode butttons event listener
	setupModeButtons();

	for (var i = 0; i < squares.length; i ++){
		// add initial colors to squares
		// add click listeners to squares
		squares[i].addEventListener("click", function () {
			// grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedcolor
			// console.log(clickedColor, pickedColor);
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!"
			}

		});
	};
	reset();
}

function setupModeButtons() {
	for (var i = 0 ; i < modeButtons.length;i++){
		modeButtons[i].addEventListener("click", function () {

			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy"? num_of_squares =  3 : num_of_squares = 6;
			reset();

		})
	}

}

function reset(){

	resetButton.textContent = "New Color";
	colors = generateRandomColor(num_of_squares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length;i++){
		if (colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";}
		else {
			squares[i].style.display = "none";
		}

	}
	h1.style.background = "steelblue";
	messageDisplay.textContent = "";




}

resetButton.addEventListener("click", function () {

reset()

});

function changeColors(color) {
	//loop through all squares
	for (var i = 0 ; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}

};
function pickColor() {
	var random = Math.floor(Math.random() *  colors.length)
	return colors[random]
}

function generateRandomColor(num) {
	//make a array
	// add num random colors to arr
	//return the array
	var arr = [];
	for ( var i = 0 ; i < num; i++){
		//add random color and put into array
		arr.push(randomColor());
	}

	return arr;

};
function randomColor() {
	//create RGB
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + "," + " "+ green + "," + " " + blue + ")";


}

