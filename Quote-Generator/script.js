


// Get Quotes
const URL = "https://type.fit/api/quotes";
let quote = [];

async function getQuotes() {
    try {
        const data = await fetch(URL);
        const quotes = await data.json();
        console.log(quotes);
    } catch (err) {
        console.log("Error", err);
    }
}

// On Load
// window.addEventListener()
getQuotes();