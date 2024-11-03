const mushrooms = [
    { name: "Fliegenpilz", image: "./pilze/fliegenpilz/fliegenpilz-02.jpg" },
    { name: "Gewöhnliche Stinkmorchel", image: "./pilze/gewoehnliche-stinkmorchel/gewoehnliche-stinkmorchel-1.jpg" },
    { name: "Grüner Knollenblätterpilz", image: "./pilze/gruener-knollenblaetterpilz/gruener-knollenblaetterpilz-1.jpg" },
    { name: "Judasohr", image: "./pilze/judasohr/judasohr-1.jpg" },
    { name: "Schopf Tintling", image: "./pilze/schopf-tintling/schopf-tintling-01.jpg" },
    { name: "Wiesen Champignon", image: "./pilze/wiesen-champignon.jpg/wiesen-champignon-1.jpg" },
    { name: "Amethystfarbene Wiesenkoralle", image: "./pilze/amethustfarbene-wiesenkoralle/amethystfarbene-wiesenkoralle-1.jpg" },
    { name: "Grünling", image: "./pilze/gruenling/gruenling-1.jpg" }
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
    mushrooms.forEach(({ name, image }, index) => {
        cards.push({ type: 'image', name, id: index, src: image });
        cards.push({ type: 'text', name, id: index });
    });

    // Shuffle the cards
    shuffle(cards);

    // Create grid items
    cards.forEach(({ type, src, name, id }) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.setAttribute('onclick', 'revealImage(this)');
        gridItem.setAttribute('data-id', id);

        const cover = document.createElement('div');
        cover.classList.add('cover');
        cover.textContent = 'Click to Reveal';

        if (type === 'image') {
            const img = document.createElement('img');
            img.src = src;
            img.alt = name;
            gridItem.appendChild(img);
        } else if (type === 'text') {
            const text = document.createElement('div');
            text.textContent = name;
            gridItem.appendChild(text);
        }

        gridItem.appendChild(cover);
        gridContainer.appendChild(gridItem);
    });
}

let firstCard = null;
let secondCard = null;

// Function to reveal the image or text
function revealImage(element) {
    // Prevent revealing more than two cards at a time
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
