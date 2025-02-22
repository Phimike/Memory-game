const gameBoard = document.getElementById("game-board");
const moveCounter = document.getElementById("move-counter");
const resetButton = document.getElementById("reset-game");

const images = [
    "images/aladdin.jpg", "images/blaze.jpg", "images/Cars1.jpg", "images/dinasaur.jpg",
    "images/olof.jpg", "images/spot.jpg"
];
let cards = [];
let flippedCards = [];
let moves = 0;

function generateCards() {
    const pairs = 6; // 6 pairs for 4x4 grid
    let cardSet = [];
    for (let i = 0; i < pairs; i++) {
        const img = images[i % images.length];
        cardSet.push(img, img);
    }
    cardSet = shuffleArray(cardSet);
    gameBoard.innerHTML = "";
    cardSet.forEach(imgSrc => createCard(imgSrc));
}

function createCard(imgSrc) {
    const card = document.createElement("div");
    card.classList.add("card");
    const img = document.createElement("img");
    img.src = imgSrc;
    card.appendChild(img);
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moves++;
    moveCounter.textContent = moves;
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => card.classList.remove("flipped"));
            flippedCards = [];
        }, 1000);
    }
}

function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

resetButton.addEventListener("click", () => {
    moves = 0;
    moveCounter.textContent = moves;
    generateCards();
});

generateCards();
