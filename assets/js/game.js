var attemptsLeft = 25;
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
	updateGame(letterGuessed, positionsGuessed);
}

function updateGame(letterGuessed, positionsGuessed) {
	for (var i = 0; i < positionsGuessed.length; i++) {
		displayWord[positionsGuessed[i]] = letterGuessed;
	}
	updateElement("wordToGuess", displayWord.join(" "));
	/*updateElement("wordToGuess", "");
	for (var i = 0; i < displayWord.length; i++) {
		updatePersistentElement("wordToGuess", displayWord[i] + " ");
	}*/
	updatePersistentElement("lettersGuessed", " " + letterGuessed);
	attemptsLeft--;
	updateElement("attemptsLeft", attemptsLeft);
	updateInputValue("userInput", "");
	updateElement("gamesWon", gamesWon);
	updateElement("gamesLost", gamesLost);
	checkForWin();
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
		updateElement("gamesWon", gamesWon);
		resetGame();		
	}
}

function resetGame() {
	gameStarted = true;
	updateElement("lettersGuessed", "");
	attemptsLeft = 25;
	updateElement("attemptsLeft", attemptsLeft);
	updateElement("userInput", "");
	updateElement("wordToGuess", "");
	displayWord = [];
	getNewWord();
}

function verifyUserInput(event) {
	if (attemptsLeft == 0) {
		gamesLost++;
		resetGame();
	} else {
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