class Mushroom {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }

    createCard(id, content) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.setAttribute('data-id', id);
        gridItem.setAttribute('onclick', 'revealImage(this)');

        const cover = document.createElement('div');
        cover.classList.add('cover');
        cover.textContent = 'Click to Reveal';

        gridItem.appendChild(content);
        gridItem.appendChild(cover);

        return gridItem;
    }

    createImageCard(id) {
        const img = document.createElement('img');
        img.src = this.image;
        img.alt = this.name;
        return this.createCard(id, img);
    }

    createTextCard(id) {
        const text = document.createElement('div');
        text.textContent = this.name;
        return this.createCard(id, text);
    }
}

const mushrooms = [
    new Mushroom("Fliegenpilz", "./pilze/fliegenpilz/fliegenpilz-02.jpg"),
    new Mushroom("Gewöhnliche Stinkmorchel", "./pilze/gewoehnliche-stinkmorchel/gewoehnliche-stinkmorchel-1.jpg"),
    new Mushroom("Grüner Knollenblätterpilz", "./pilze/gruener-knollenblaetterpilz/gruener-knollenblaetterpilz-1.jpg"),
    new Mushroom("Judasohr", "./pilze/judasohr/judasohr-1.jpg"),
    new Mushroom("Schopf Tintling", "./pilze/schopf-tintling/schopf-tintling-01.jpg"),
    new Mushroom("Wiesen Champignon", "./pilze/wiesen-champignon.jpg/wiesen-champignon-1.jpg"),
    new Mushroom("Amethystfarbene Wiesenkoralle", "./pilze/amethustfarbene-wiesenkoralle/amethystfarbene-wiesenkoralle-1.jpg"),
    new Mushroom("Grünling", "./pilze/gruenling/gruenling-1.jpg")
];

// Shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generate grid items
function generateGrid() {
    const gridContainer = document.getElementById('grid-container');
    const cards = [];

    // Create cards for each mushroom
    mushrooms.forEach((mushroom, index) => {
        cards.push(mushroom.createImageCard(index));
        cards.push(mushroom.createTextCard(index));
    });

    // Shuffle the cards
    shuffle(cards);

    // Append grid items to the container
    cards.forEach(card => {
        gridContainer.appendChild(card);
    });
}

let firstCard = null;
let secondCard = null;

// Function to reveal the image or text
function revealImage(element) {
    if (firstCard && secondCard) return;

    const cover = element.querySelector('.cover');

    // Ignore clicks if the cover is already removed
    if (cover.classList.contains('hidden')) return;

    // Hide the cover, therefore uncover the card
    cover.classList.add('hidden');

    if (!firstCard) {
        firstCard = element;
    } else {
        secondCard = element;
        checkMatch();
    }
}

function checkMatch() {
    const firstId = firstCard.getAttribute('data-id');
    const secondId = secondCard.getAttribute('data-id');

    if (firstId === secondId) {
        // Match found, hide the cards
        setTimeout(() => {
            firstCard.style.visibility = 'hidden';
            secondCard.style.visibility = 'hidden';
            resetCards();
        }, 500);
    } else {
        // No match, cover the cards again
        setTimeout(() => {
            firstCard.querySelector('.cover').classList.remove('hidden');
            secondCard.querySelector('.cover').classList.remove('hidden');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

// Initialize the game
document.addEventListener('DOMContentLoaded', generateGrid);
