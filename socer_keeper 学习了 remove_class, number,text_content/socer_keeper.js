var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
// var h1 = document.querySelector("h1");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var span1 = document.getElementById("span1");
var span2 = document.getElementById("span2");
var winningScore = 5;
var reset_button = document.getElementById("reset");
var max_value = document.getElementById("max_value");
var max_val_display = document.querySelector("p span");
p1.addEventListener("click", function () {

	p1Score ++;
	if (!gameOver){span1.textContent = p1Score;}
	if (p1Score == winningScore){
		gameOver = true;
		span1.classList.add("winner");
	}

});
p2.addEventListener("click", function () {

	p2Score ++;
	if (!gameOver){span2.textContent = p2Score;}
	if (p2Score == winningScore){
		gameOver = true;
		span2.classList.add("winner");
	}
});
reset_button.addEventListener("click", function(){
	reset();

});
function reset(){
	gameOver = false;
	span1.textContent = 0;

	span2.textContent = 0;
	span1.classList.remove("winner")
	span2.classList.remove("winner")
	p1Score = 0;
	p2Score = 0;
};
max_value.addEventListener("change",function () {
	max_val_display.textContent = Number(max_value.value);
	winningScore = Number(max_value.value);
	reset();

})