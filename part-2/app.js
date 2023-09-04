// Part 2
let baseURL = 'https://deckofcardsapi.com/api/deck'

// 1.
async function singleCard() {
    const res = await axios.get(`${baseURL}/new/draw`);
    console.log(`${res.data.cards[0].value.toLowerCase()} of ${res.data.cards[0].suit.toLowerCase()}`)
}

singleCard()

// 2. 
const deck = {
    async init() {
        let res = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
        this.deckId = res.data.deck_id;
    },
    async draw() {
        let res = await axios.get(`${baseURL}/${this.deckId}/draw/?count=2`)
        console.log(`${res.data.cards[0].value.toLowerCase()} of ${res.data.cards[0].suit.toLowerCase()}`)
        console.log(`${res.data.cards[1].value.toLowerCase()} of ${res.data.cards[1].suit.toLowerCase()}`)

    }
}

async function drawTwoSameDeck() {
    await deck.init();
    deck.draw()
}

drawTwoSameDeck()

// 3. 

$(document).ready(function () {
    const deckButton = $('#deck-button');
    const cardDiv = $('#card-container');
    let deckId;
    let remainingCards;

    deckButton.click(async function () {
        cardDiv.html('')
        if (!deckId) {
            let res = await axios.get(`${baseURL}/new/draw/`);
            deckId = res.data.deck_id;
            remainingCards = res.data.remaining;
        } else {
            if (remainingCards > 0) {
                let res = await axios.get(`${baseURL}/${deckId}/draw/`);
                let card = res.data.cards[0];
                remainingCards = res.data.remaining;
                const cardImage = `<img src="${card.image}" alt="${card.value.toLowerCase()} of ${card.suit.toLowerCase()}">`;
                cardDiv.append(cardImage);
            } else {
                cardDiv.html('Deck is Empty!');
                deckId = null;
            }
        }
    });
})