// Step 1: Get the parts of the page we want to change.
// document.getElementById() finds an element by its id in the HTML.
var startBtn = document.getElementById("startBtn");
var nameOut = document.getElementById("nameOut");
var scoreOut = document.getElementById("scoreOut");
var message = document.getElementById("message");
var stamp = document.getElementById("stamp");

// Step 2: This FUNCTION checks the score and returns a remark.
// A function is a reusable block of code. We give it a score,
// and it gives back a word like "Excellent" or "Failed".
function evaluateScore(score) {
  // Step 2a: Validation - is the score valid?
  // isNaN() means "is Not a Number". It catches letters like "abc".
  // We also catch zero, negative numbers, and scores above 100.
  if (isNaN(score) || score <= 0 || score > 100) {
    return "Invalid score";
  }

  // Step 2b: Conditional branching - pick the remark
  if (score >= 90) {
    return "Excellent"; // 90 to 100
  } else if (score >= 75) {
    return "Passed"; // 75 to 89
  } else {
    return "Failed"; // below 75
  }
}

// Step 3: This function writes the result on the webpage.
// nameText and scoreText go on the two lines,
// text goes in the message, and stampText goes inside the stamp.
// stampClass is the CSS class that gives the stamp its color.
function showResult(nameText, scoreText, text, stampText, stampClass) {
  nameOut.textContent = nameText;
  scoreOut.textContent = scoreText;
  message.textContent = text;

  // Hide the old stamp first, so the animation can play again
  stamp.className = "stamp hidden";

  // If there is a stamp to show, show it
  if (stampText !== "") {
    stamp.textContent = stampText;
    stamp.className = "stamp slam " + stampClass;
  }
}

// Step 4: This is the main program. It runs when the button is clicked.
function startProgram() {
  // Step 4a: Welcome message using alert()
  alert("Welcome to the Quiz Checker!");

  // Step 4b: Ask for the name using prompt()
  var name = prompt("Please enter your name:");

  // Validation: prompt() gives null if the user presses Cancel,
  // and "" (empty text) if they press OK without typing.
  // trim() removes extra spaces, so "   " also counts as empty.
  if (name === null || name.trim() === "") {
    showResult(
      "",
      "",
      "Name is required. Please try again.",
      "Invalid",
      "invalid",
    );
    return; // stop the program here
  }
  name = name.trim();

  // Step 4c: Ask for the score using prompt()
  var scoreInput = prompt("Hi " + name + "! Please enter your score (1-100):");

  // Validation: empty score or Cancel
  if (scoreInput === null || scoreInput.trim() === "") {
    showResult(
      name,
      "",
      "Score is required. Please try again.",
      "Invalid",
      "invalid",
    );
    return;
  }

  // Step 4d: Ask if the user wants to continue using confirm()
  // confirm() gives true if OK is pressed, false if Cancel is pressed.
  var proceed = confirm("Do you want to continue and see your result?");

  if (!proceed) {
    showResult(
      name,
      scoreInput,
      "You cancelled, so there is no result.",
      "",
      "",
    );
    return;
  }

  // Step 4e: Turn the typed text into a number.
  // prompt() always gives text, so we convert it with Number().
  var score = Number(scoreInput);

  // Step 4f: Use our function to get the remark
  var remark = evaluateScore(score);

  // Step 4g: Show the final result on the webpage
  if (remark === "Excellent") {
    showResult(
      name,
      score,
      "Great work, " + name + "!",
      "Excellent",
      "excellent",
    );
  } else if (remark === "Passed") {
    showResult(
      name,
      score,
      "Good job, " + name + ". You passed.",
      "Passed",
      "passed",
    );
  } else if (remark === "Failed") {
    showResult(
      name,
      score,
      "Below 75. Keep studying and try again.",
      "Failed",
      "failed",
    );
  } else {
    showResult(
      name,
      scoreInput,
      "Score must be a number from 1 to 100.",
      "Invalid",
      "invalid",
    );
  }
}

// Step 5: Run startProgram when the button is clicked
startBtn.addEventListener("click", startProgram);
