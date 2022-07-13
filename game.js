var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//Sound for the pressed buttton
function playSound(randomcolor) {
  var audio = new Audio("sounds/" + randomcolor + ".mp3");
  audio.play();
}

// Animating the pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var random = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[random];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function () {
  var userColourChosen = $(this).attr("id");
  userClickedPattern.push(userColourChosen);
  playSound(userColourChosen);
  animatePress(userColourChosen);
  checkAnswer(userClickedPattern.length - 1);
});
