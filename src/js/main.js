import { wordss } from './dataWords.js';

const element = {
    spaceLetters: document.querySelector(".game_body_letters"),
    wordFrom: document.querySelector(".wordFrom"),
    lettersGuess: document.querySelector(".game_lettersGuess"),
    gameOver: document.querySelector('.game_over'),
    bodyDraw: document.querySelectorAll('.the-stand, .the-hang, .the-rope, .the-man')
};

let { spaceLetters, wordFrom, lettersGuess, gameOver, bodyDraw } = element;

// variables
let alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase();

const words = wordss;

let counter = 1;
let drawCounter = 1;
let BodyDrawHiddenCount = 0;
let RandomWordFromList;

// function
function StartGame() {
    selectWord();
    initializeLetters();
    initializeGuessLetters(RandomWordFromList);
    check(RandomWordFromList, counter, drawCounter, BodyDrawHiddenCount);
};

StartGame();

function selectWord() {
    let KeyWords = Object.keys(words);
    let RandomNumber = Math.floor(Math.random() * KeyWords.length);
    let randomCategory = KeyWords[RandomNumber];
    wordFrom.textContent = randomCategory;
    selectRandomWord(randomCategory)
};

function selectRandomWord(RandomKeyWords) {
    let listRandomKeyWords = words[`${RandomKeyWords}`];
    let RandomNumberFromList = Math.floor(Math.random() * listRandomKeyWords.length);
    RandomWordFromList = listRandomKeyWords[RandomNumberFromList];
    console.log(listRandomKeyWords);
    console.log(RandomWordFromList);
};

function createLetter(letter) {
    let div = document.createElement("div");

    div.className = "game_body_letters_letter";
    div.textContent = letter;
    spaceLetters.append(div);

    return div
};

function initializeLetters() {
    Array.from(alphabet).forEach((letter) => {
        createLetter(letter);
    });
};

function initializeGuessLetters(word) {
    for (let i = 0; i < word.length; i++) {
        let div = document.createElement("div");
        div.className = "element_letter_Guess_Value";
        initializeLastAndFirstGuessLetters(div, i, word)
        lettersGuess.append(div);
    };
};

function initializeLastAndFirstGuessLetters(div, i, word) {
    if (i == 0 || i == word.length - 1) {
        let FirstText = document.createTextNode(word.charAt(i));
        div.append(FirstText.nodeValue);
    };
};

function check(word, count1, count2, count3) {

    let listBodyDraw = Array.from(bodyDraw);
    let guessLettersArray = Array.from(document.querySelectorAll(".element_letter_Guess_Value"));
    let keyBord = document.querySelectorAll(".game_body_letters_letter");

    CkeckClick(word, count1, count2, count3, listBodyDraw, guessLettersArray, keyBord);

};

function CkeckClick(word, count1, count2, count3, listBodyDraw, guessLettersArray, keyBord) {
    keyBord.forEach((e) => {
        e.addEventListener("click", () => {
            let clickedLetter = e.textContent.toUpperCase();
            let targetLetter = word[count2].toUpperCase()
            if (count1 >= 1 && count1 < word.length - 1 && clickedLetter == targetLetter) {
                guessLettersArray[count1].textContent = clickedLetter;
                count2++
                count1++;
            } else {
                if (count3 <= listBodyDraw.length - 1) {
                    listBodyDraw[count3].style = "diplay:'block'";
                    count3++;
                } else {
                    gameOver.style = "diplay:'block'";
                };
            };
        });
    });
}