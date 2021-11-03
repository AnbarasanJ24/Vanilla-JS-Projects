const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote-text');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');


const URL = "https://type.fit/api/quotes";
let quotes = [];

function newQuote() {
    showLoader();
    const index = Math.floor(Math.random() * quotes.length);
    const quote = quotes[index];

    author.textContent = quote.author || 'Unknown';

    // check Quote Length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    hideLoader();
}

async function getQuotes() {
    showLoader();
    try {
        const data = await fetch(URL);
        quotes = await data.json();
        newQuote();
        // console.log(quotes);
    } catch (err) {
        console.log("Error", err);
    }
    hideLoader();
}


function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet/?text=${quoteText.textContent}- ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}


function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);




// On Load
getQuotes();