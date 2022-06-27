"use strict";

//Dom elements
const inputBar = document.querySelector('#userInput');
const resetButton = document.querySelector('#reset');
const outputBar = document.querySelector('#outputWords');
const score = document.querySelector('#score');
const countdown = document.querySelector('#timer');
const result = document.querySelector('#result');
//List of words
const words = [];
//Time variables
const startingSeconds = 60;
let time = startingSeconds * 100;
var interval;
//Booleans for the interval
let typingStarted = false;
let timerRunning = false;
let readyToStart = true;
//Words counter
let correctWords = 0;
//Characters taken by words in the output section
let charactersTaken = 0;

//Listening for Enter or Space clicks to remove words and update the counter
inputBar.addEventListener('keyup', function(e) {
    if (e.code === "Enter" || e.code === "Space"){
        if (e.code === "Enter"){
            e.target.value += " ";
        }
        if (e.target.value === outputBar.firstChild.textContent){
            ++correctWords;
            score.innerHTML = correctWords;
            //Color carousel
            let red, green, blue;
            if (correctWords < 10){
                red = 20 + correctWords * 23;
                green = 33 - correctWords * 3;
                blue = 61 - correctWords * 6;
                //Getting to red 235 90 50 from dark blue 20 33 61
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            }
            else if (correctWords < 20){
                red = 255 - 2 * correctWords;
                green = 9 * correctWords;
                blue = 5 * correctWords;
                //Getting to red-orange 235 90 50 from pure red 255 0 0
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else if (correctWords < 30) {
                red = 235;
                green = 90 + (correctWords - 10) * 11;
                //Getting yellow 235 200 50
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else if (correctWords < 40) {
                red = 235 - (correctWords - 20) * 5;
                green = 205 + (correctWords - 20) * 5;
                //Getting acid-green 180 255 50
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else if (correctWords < 50) {
                red = 180 - (correctWords - 30) * 18;
                green = 250 - (correctWords - 30) * 4;
                //Getting nice-green 0 210 50
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else if (correctWords < 60) {
                green = 210 - (correctWords - 40) * 3;
                blue = 50 + (correctWords - 40) * 15;
                //Getting light-blue 0 180 200
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else if (correctWords < 60) {
                red = (correctWords - 50) * 10;
                green = 180 - (correctWords - 50) * 18;
                //Getting purple 100 0 200
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            } else {
                red = 160 - correctWords;
                blue = 255 - correctWords;
                //Getting to black
                score.style.color = "rgb(" + red + "," + green + "," + blue + ")";
            }
        }
        charactersTaken -= (outputBar.firstChild.length - 1);
        outputBar.firstChild.remove();
        e.target.value = "";
        displayWords();
    }
    if (time <= 0){
        e.target.value = "";
        score.innerHTML = correctWords;
    }
});
//Event listener to start the timer
inputBar.addEventListener('keydown', function() {
    //Starting up the timer
    if (!typingStarted && !timerRunning && readyToStart){
        typingStarted = true;
        timerRunning = true;
        readyToStart = false;
        interval = setInterval(updateCountdown, 10);
    }
});
//Reset button event listener
resetButton.addEventListener('click', function() {
    //Display words again and hide result
    outputBar.className = "visible";
    result.className = "invisible";
    //Resetting the booleans
    typingStarted = false;
    timerRunning = false;
    readyToStart = true;
    //Resetting the time
    clearInterval(interval);
    time = startingSeconds * 100;
    countdown.innerHTML = "60:00";
    //Reset the word count
    correctWords = 0;
    score.innerHTML = correctWords;
    score.style.color = "#14213d";
    //Empty the input bar
    inputBar.value = "";
});


//Get random number function
const getRandomInt = (max) => Math.floor(Math.random() * max);
//Add words to the output section in DOM
function displayWords() {
    //60 chars per line, 2 lines => 120 chars
    while (charactersTaken < 150) {
        let currentWord = words[getRandomInt(100)];
        outputBar.appendChild(document.createTextNode(currentWord + ' '));
        charactersTaken += currentWord.length;
    }
}
//Update time function
function updateCountdown(){
    if (typingStarted && timerRunning){
        const seconds = Math.floor(time/100);
        let centiseconds = time % 100;
    
        centiseconds = centiseconds < 10 ? '0' + centiseconds : centiseconds;
        countdown.innerHTML = `${seconds}:${centiseconds}`;
        time--;
        if (time < 0){
            displayResult();
            typingStarted = false;
            timerRunning = false;
            outputBar.className = "invisible";
        }
    }
}
//Setting up the result element and its display function
function displayResult() {
    let wps = correctWords/60;
    wps = wps.toFixed(2);
    //Display results and hide words
    result.innerHTML = `Your typing speed is ${correctWords} WPM or ${wps} WPS.`;
    result.className = "visible";
}
//Setting up words
function setWords(){
    const fs = require('fs');
    // Reading data in utf-8 format 
    fs.readFile('words.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        words = data;
    })
}

//Fill in the array
setWords();
//Fill in the output section
displayWords();

//Overlay funcitons, not related to the project
const on = () => document.getElementById("overlay").style.display = "block";
const off = () => document.querySelector("#overlay", "#introduction").style.display = "none";
