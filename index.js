let myEmojis = []
let opponentEmojis = []
const emojiList = ["📎","🌮","🪴","📚","💸","🚙","💍","🏠"]
let myPoints = 0;
let opponentPoints = 0;
const limit = 15;

const resetGameBtn = document.getElementById("reset-game-btn");
const addEmojiBtn = document.getElementById("add-emoji-btn");
const myPointsElement = document.getElementById("my-score");
const emojiContainer = document.getElementById("my-emoji-container");
const submitGameBtn = document.getElementById("submit-game-btn");
const opponentScoreElement = document.getElementById("opponent-score");
const opponentEmojiElement = document.getElementById("opponent-emoji-container");
const winnerMessage = document.getElementById("winner-message");

//On page load
document.addEventListener("DOMContentLoaded", function() {
    resetGameBtn.style.display = "none"; 
})


//Add Emoji button
addEmojiBtn.addEventListener("click", function() {
    let newEmoji = randomEmoji()
    myEmojis.push(newEmoji);
    myPoints += returnEmojiValue(newEmoji);
    renderMyEmojis()
    renderPoints()
    if (isBust()) {
        calculateWinner();
    }
})

function renderPoints() {
    myPointsElement.innerHTML = `<span>Points: ${myPoints}</span>`;
}

function renderMyEmojis() {
    emojiContainer.innerHTML = "";
    for (let i = 0; i < myEmojis.length; i++) {
        emojiContainer.innerHTML += `<span>${myEmojis[i]}</span>`
    }
}

function randomEmoji() {
    let index = Math.floor(Math.random() * 8);
    let returnEmoji = emojiList[index];
    return returnEmoji;
}

function returnEmojiValue(inputEmoji) {
    if (inputEmoji == "📎") {
        return 1;
    } else if (inputEmoji == "🌮") {
        return 2;
    } else if (inputEmoji == "🪴") {
        return 3;
    } else if (inputEmoji == "📚") {
        return 4;
    } else if (inputEmoji == "💸") {
        return 5;
    } else if (inputEmoji == "🚙") {
        return 7;
    } else if (inputEmoji == "💍") {
        return 10;
    } else if (inputEmoji == "🏠") {
        return 15;
    } else {
        return 0;
    }
}

function isBust() {
    return myPoints > limit;
}

//Submit Game button
submitGameBtn.addEventListener("click", function() {
    generateOpponentEmojis();
    renderOpponentEmojis();
    renderOpponentScore();
    calculateWinner();
    addEmojiBtn.disabled = true;
    submitGameBtn.disabled = true;
}) 

function calculateWinner() {
    if (myPoints > 15 || myPoints < opponentPoints) {
        winnerMessage.innerHTML = `<span>Oh no, you lost!</span>`
    } else if (myPoints > opponentPoints) {
        winnerMessage.innerHTML = `<span>Congratulations, you won!</span>`
    } else {
        winnerMessage.innerHTML = `<span>Looks like a tie. Participation medals all around!</span>`
    } 
    resetGameBtn.style.display = "inline-block";
}

function renderOpponentScore() {
    opponentScoreElement.innerHTML = "";
    opponentScoreElement.innerHTML = `<span>Points: ${opponentPoints}</span>`
}

function generateOpponentEmojis() {
    let score = 0;
    let nextEmoji = randomEmoji();
    while (returnEmojiValue(nextEmoji) + score <= limit && opponentEmojis.length < 3) {
        opponentEmojis.push(nextEmoji);
        score += returnEmojiValue(nextEmoji);
        opponentPoints = score;
        nextEmoji = randomEmoji();
    }
}

function renderOpponentEmojis() {
    opponentEmojiElement.innerHTML = "";
    for (let i = 0; i < opponentEmojis.length; i++) { 
        opponentEmojiElement.innerHTML += `<span>${opponentEmojis[i]}</span>`
    }
}

//Reset Game button
resetGameBtn.addEventListener("click", function() {
    reset();
})

function reset() {
    emojiContainer.innerHTML = `<span>🗑️</span>`;
    myPoints = 0;
    opponentPoints = 0;
    myEmojis = [];
    opponentEmojis = [];
    myPointsElement.innerHTML = `<span>Points: 0</span>`
    opponentScoreElement.innerHTML = `<span>Points: ?</span>`;
    opponentEmojiElement.innerHTML = `<span>❓❓❓</span>`;
    addEmojiBtn.disabled = false;
    submitGameBtn.disabled = false;
    winnerMessage.innerText = "";
    resetGameBtn.style.display = "none"; 
}