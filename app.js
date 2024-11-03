const imagePairs = [
    { src: "./pilze/fliegenpilz/fliegenpilz-02.jpg", id: 1 },
    { src: "./pilze/fliegenpilz/fliegenpilz-03.jpg", id: 1 },
    { src: "./pilze/gewoehnliche-stinkmorchel/gewoehnliche-stinkmorchel-1.jpg", id: 2 },
    { src: "./pilze/gewoehnliche-stinkmorchel/gewoehnliche-stinkmorchel-2.jpg", id: 2 },
    { src: "./pilze/gruener-knollenblaetterpilz/gruener-knollenblaetterpilz-1.jpg", id: 3 },
    { src: "./pilze/gruener-knollenblaetterpilz/gruener-knollenblaetterpilz-2.jpg", id: 3 },
    { src: "./pilze/judasohr/judasohr-1.jpg", id: 4 },
    { src: "./pilze/judasohr/judasohr-2.jpg", id: 4 },
    { src: "./pilze/schopf-tintling/schopf-tintling-01.jpg", id: 5 },
    { src: "./pilze/schopf-tintling/schopf-tintling-02.jpg", id: 5 },
    { src: "./pilze/wiesen-champignon.jpg/wiesen-champignon-1.jpg", id: 6 },
    { src: "./pilze/wiesen-champignon.jpg/wiesen-champignon-2.jpg", id: 6 },
    { src: "./pilze/amethustfarbene-wiesenkoralle/amethystfarbene-wiesenkoralle-1.jpg", id: 7 },
    { src: "./pilze/amethustfarbene-wiesenkoralle/amethystfarbene-wiesenkoralle-2.jpg", id: 7 },
    { src: "./pilze/gruenling/gruenling-1.jpg", id: 8 },
    { src: "./pilze/gruenling/gruenling-2.jpg", id: 8 }
];

// Function to shuffle the array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Generate grid items
function generateGrid() {
    const gridContainer = document.getElementById('grid-container');

    // Shuffle the image pairs
    shuffle(imagePairs);

    // Create grid items
    imagePairs.forEach(({ src, id }) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.setAttribute('onclick', 'revealImage(this)');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${id}`;
        img.setAttribute('data-id', id);

        const cover = document.createElement('div');
        cover.classList.add('cover');
        cover.textContent = 'Click to Reveal';

        gridItem.appendChild(img);
        gridItem.appendChild(cover);
        gridContainer.appendChild(gridItem);
    });
}

let firstImage = null;
let secondImage = null;

function revealImage(element) {
    const cover = element.querySelector('.cover');

    // Ignore clicks if the cover is already removed
    if (cover.classList.contains('hidden')) return;

    cover.classList.add('hidden');

    // Set firstImage or secondImage based on previous clicks
    if (!firstImage) {
        firstImage = element;
    } else if (!secondImage && element !== firstImage) {
        secondImage = element;
        checkMatch();
    }
}

function checkMatch() {
    const id1 = firstImage.querySelector('img').dataset.id;
    const id2 = secondImage.querySelector('img').dataset.id;

    if (id1 === id2) {
        // If images match, remove them from the grid
        setTimeout(() => {
            firstImage.style.visibility = 'hidden';
            secondImage.style.visibility = 'hidden';
            resetSelections();
        }, 500);
    } else {
        // If images don't match, cover them again
        setTimeout(() => {
            firstImage.querySelector('.cover').classList.remove('hidden');
            secondImage.querySelector('.cover').classList.remove('hidden');
            resetSelections();
        }, 1000);
    }
}

function resetSelections() {
    firstImage = null;
    secondImage = null;
}

// Initialize the game
generateGrid();


