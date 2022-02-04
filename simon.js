console.log("Welcome to Simon Game")

let orangeButton = document.getElementById("orange");
let blueButton = document.getElementById("blue");
let redButton = document.getElementById("red");
let yellowButton = document.getElementById("yellow");
let buttons = document.getElementsByClassName("panel");
let audioElement = new Audio(`sounds/1.mp3`)

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#centre").click(function () {
    if (!started) {
        $(".Start").text("Level " + level);
        $("#centre").text("Start Again!")
        nextSequence();
        started = true;
    }
});
$(".panel").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 2000);
        }
    } else {
        playSound("wrong");
        $("#centre").text("Restart")
        $("body").addClass("game-over");
        $(".centre").text("Restart")
        $(".Start").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $(".Start").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 1000);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
 
}
