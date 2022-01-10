let myEmojis = []
let opponentEmojis = []
const emojiList = ["📎","🌮","🪴","📚","💸","🚙","💍","🏠"]
let myPoints = 0;
let opponentPoints = 0;
const limit = 15;

//Add Emoji button
document.getElementById("add-emoji-btn").addEventListener("click", function() {
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
    const myPointsElement = document.getElementById("my-score");
    myPointsElement.innerHTML = `<span>Points: ${myPoints}</span>`;
}

function renderMyEmojis() {
    const emojiContainer = document.getElementById("my-emoji-container");
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
document.getElementById("submit-game-btn").addEventListener("click", function() {
    generateOpponentEmojis();
    renderOpponentEmojis();
    renderOpponentScore();
    calculateWinner();
    document.getElementById("add-emoji-btn").disabled = true;
    document.getElementById("submit-game-btn").disabled = true;
}) 

function calculateWinner() {
    const winnerMessage = document.getElementById("winner-message");
    if (myPoints > 15 || myPoints < opponentPoints) {
        winnerMessage.innerHTML = `<span>Oh no, you lost!</span>`
    } else if (myPoints > opponentPoints) {
        winnerMessage.innerHTML = `<span>Congratulations, you won!</span>`
    } else {
        winnerMessage.innerHTML = `<span>Looks like a tie. Participation medals all around!</span>`
    }
}

function renderOpponentScore() {
    const opponentScoreElement = document.getElementById("opponent-score");
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
    const opponentEmojiElement = document.getElementById("opponent-emoji-container");
    opponentEmojiElement.innerHTML = "";
    for (let i = 0; i < opponentEmojis.length; i++) { 
        opponentEmojiElement.innerHTML += `<span>${opponentEmojis[i]}</span>`
    }
}