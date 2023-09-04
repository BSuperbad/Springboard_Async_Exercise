// Part 1: Number Facts

let baseURL = 'http://numbersapi.com'

// 1.
let number = 23;
async function favNumber() {
    const res = await axios.get(`${baseURL}/${number}?json`);
    console.log(res.data.text)
}
favNumber()


// 2.
let numbers = [];
async function multNumberData() {
    for (let i = 0; i < 10; i++) {
        const res = await axios.get(`${baseURL}/${i}?json`);
        console.log(res.data.text)
    }
}

multNumberData()

// 3. 
async function fourFacts() {
    for (let i = 1; i < 5; i++) {
        const res = await axios.get(`${baseURL}/${number}?json`);
        $('body').append(`<p>${res.data.text}</p>`)
    }
}
fourFacts()