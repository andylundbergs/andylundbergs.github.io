let matchedPairs = 0; // Variabel för att hålla reda på antalet matchade par

// Funktion för att kontrollera om spelet är komplett
function checkIfGameIsComplete() {
    if (matchedPairs === shufflecards.length / 2) {
        setTimeout(() => {
            window.location.href = "Grattis.html";
        }, 2000); // 2000 ms = 2 sekunders fördröjning
    }
}

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
}

// Funktionen för att shuffla korten
function shuffle(shufflecards) {
    for (let i = shufflecards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shufflecards[i], shufflecards[j]] = [shufflecards[j], shufflecards[i]];
    }
    return shufflecards;
};

//Data-id och tal

const shufflecards = [
    {
        "data-id": 1,
        "tal": "4"
    },
    {
        "data-id": 1,
        "tal": "3+1"
    },
    {
        "data-id": 2,
        "tal": "7"
    },
    {
        "data-id": 2,
        "tal": "5+2"
    },
    {
        "data-id": 3,
        "tal": "3"
    },
    {
        "data-id": 3,
        "tal": "2+1"
    },
    {
        "data-id": 4,
        "tal": "8+4"
    },
    {
        "data-id": 4,
        "tal": "12"
    },
    {
        "data-id": 5,
        "tal": "11"
    },
    {
        "data-id": 5,
        "tal": "10+1"
    },
    {
        "data-id": 6,
        "tal": "8"
    },
    {
        "data-id": 6,
        "tal": "4+4"
    }
]

var spelContainer = document.getElementById('spelcontainer');
const shuffledcards = shuffle(shufflecards);

shuffledcards.forEach(element => {

    //Skapa html object card objectet med data-id
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("item");
    cardDiv.setAttribute("data-id", element["data-id"]);

    //Skapa famsidan

    var framsidan = document.createElement("img");
    framsidan.src = 'Tassavtryck.jpg';
    framsidan.classList.add('front');

    // Skapa tal sidan
    var talDiv = document.createElement("div");
    talDiv.classList.add("baksida");
    talDiv.classList.add("back");

    var sifferDiv = document.createElement("div");
    sifferDiv.classList.add("centersiffra");
    sifferDiv.classList.add("undertitle");
    sifferDiv.innerText = element["tal"]

    talDiv.appendChild(sifferDiv);
    cardDiv.appendChild(talDiv);

    cardDiv.appendChild(framsidan);

    spelContainer.appendChild(cardDiv);

});

// kod natalie spel :

const cards = document.querySelectorAll('.item');
let firstCard = null;

// Drag är 0 från början
let drag = 0;
// Missar är 0 från början
let missar = 0;

function flipCard(event) {
    const clickedCard = event.currentTarget;

    if (isCardLocked(clickedCard)) {
        return
    }
    
    clickedCard.classList.add('flip');
    clickedCard.removeEventListener('click', flipCard);

    if (firstCard) {
        // Om det finns ett första kort valt, jämför med det klickade kortet
        if (firstCard.dataset.id !== clickedCard.dataset.id) {
            // Om korten har olika id, vänd tillbaka dem efter en fördröjning
            console.log("Korten har olika id, vänd tillbaka dem.");
            //Räknar antal missar
            missar++;
            var missardiv = document.getElementById('missar');
            missardiv.innerText = 'Missar: ' + missar;
            firstCard.classList.add('wrong');
            clickedCard.classList.add('wrong');
            setTimeout(() => {
                firstCard.classList.remove('flip');
                clickedCard.classList.remove('flip');
                firstCard.classList.remove('wrong');
                clickedCard.classList.remove('wrong');

                firstCard.addEventListener('click', flipCard);
                clickedCard.addEventListener('click', flipCard);

                firstCard = null;
            }, 1000);
        } else {
            lockCard(firstCard)
            lockCard(clickedCard)
            firstCard = null
            matchedPairs++; // Öka antalet matchade par
            checkIfGameIsComplete(); // Kontrollera om spelet är klart
        }

    } else {
        // Om det inte finns något första kort valt än, spara det klickade kortet som första kort
        firstCard = clickedCard;
        // Räknar antal drag
        drag++;
        var dragdiv = document.getElementById('drag');
        dragdiv.innerText = 'Drag: ' + drag;
    }
}


function lockCard(card) {
    card.classList.add('matched')
    /* För att få korten att bli orange vid match*/
    setTimeout(() => {
        card.classList.add('active-done')
    }, 1000);
}

function isCardLocked(card) {
    let isCardLocked = card.classList.contains('matched')
    return isCardLocked
}

// Lägg till händelselyssnare för klick på varje kort
cards.forEach(card => card.addEventListener('click', flipCard));
