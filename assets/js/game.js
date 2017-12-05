var attemptsLeft = 6;
var missedCount = 0;
var gamesWon = 0;
var gamesLost = 0;
var wordToGuess = "";
var displayWord = [];
var gameWon = true;

function getNewWord() {

	var wordList = [
		"APPLAUDING",
		"GREYHOUNDS",
		"INTERESTING",
		"FOOTBALL",
		"LIGHTNING",
		"BOOTCAMP",
		"DISTURBING",
		"DISASTER",
		"HORTICULTURE",
		"MOONSHINERS"
	];
	var randomWordSelection = Math.floor(Math.random() * ((wordList.length - 1) - 0 + 1) + 0);
    wordToGuess = wordList[randomWordSelection];
    displayWordToGuess(wordToGuess);
}

function displayWordToGuess(wordArray) {
	for (var i = 0; i < wordArray.length; i++) {
		displayWord.push("_ ");
	}
	updateElement("wordToGuess", displayWord.join(""));
	updateElement("instructions", "Below is your new word to guess");	
}

function letterGuess(letterGuessed) {
	var positionsGuessed = [];
	for (var i = 0; i < wordToGuess.length; i++) {
		if (wordToGuess[i] == letterGuessed) {
			positionsGuessed.push(i);
		} else {
			console.log("Nope");
		}
	}
	if (positionsGuessed.length < 1) {
		attemptsLeft--;	
		missedCount++;
		updateImgSrc("gameImage", "assets/images/image" + missedCount + ".jpg");	
	}
	updateGame(letterGuessed, positionsGuessed);
}

function updateGame(letterGuessed, positionsGuessed) {
	for (var i = 0; i < positionsGuessed.length; i++) {
		displayWord[positionsGuessed[i]] = letterGuessed;
	}
	updateElement("wordToGuess", displayWord.join(" "));
	updatePersistentElement("lettersGuessed", " " + letterGuessed);
	updateElement("attemptsLeft", attemptsLeft);
	if (attemptsLeft == 0) {
		playSound("lose.mp3");
		gamesLost++;
		updateInputValue("userInput", "");
		resetGame();
	} else {
		updateInputValue("userInput", "");
		updateElement("gamesWon", gamesWon);
		updateElement("gamesLost", gamesLost);
		checkForWin();
	}
}

function checkForWin() {
	var wordCount = 0;
	for (var i = 0; i < displayWord.length; i++) {
		if (displayWord[i] == "_ ") {
			wordCount++;
		}
	}
	if (wordCount == 0) {
		gameWon = true;
		gamesWon++;
		playSound("gong.mp3");
		updateElement("gamesWon", gamesWon);
		resetGame();		
	}
}

function resetGame() {
	gameStarted = true;
	updateElement("lettersGuessed", "");
	attemptsLeft = 6;
	updateElement("attemptsLeft", attemptsLeft);
	updateElement("userInput", "");
	updateElement("wordToGuess", "");
	updateElement("gamesLost", gamesLost);
	updateImgSrc("gameImage", "assets/images/imageStart.jpg");
	document.getElementById("instructions").style.color = "#000000";
	document.getElementById("instructions").style.fontWeight = "normal";
	missedCount = 0;
	displayWord = [];
	getNewWord();
}

function verifyUserInput(event) {
	var letterToUpper = document.getElementById("userInput").value.toUpperCase();
	if (event.keyCode >= 0 && event.keyCode <= 57) {
		updateElement("error", "You did not type a letter Please Try Again");
	} else if (event.keyCode >= 65 && event.keyCode <= 90) {
	    letterGuess(letterToUpper);
	} else if (event.keyCode >= 97 && event.keyCode <= 122) {
	    letterGuess(letterToUpper);
	} else {
		updateElement("error", "You did not type a letter Please Try Again");
	}
}

function updateElement(element, value) {
	var targetDiv =document.getElementById(element);
	targetDiv.innerHTML = value;
}

function updatePersistentElement(element, value) {
	var targetDiv = document.getElementById(element);
	targetDiv.innerHTML = targetDiv.innerText += value;
}

function updateInputValue(id, value) {
	var targetDiv = document.getElementById(id);
	targetDiv.value = value;
}

function playSound(file) {
	var audio = new Audio("assets/sounds/" + file);
	audio.play();
}

function updateImgSrc(id, value) {
	var targetImg = document.getElementById(id);
	targetImg.src = value;
}