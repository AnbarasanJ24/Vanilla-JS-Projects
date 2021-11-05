const imageCount = 2;
const API_KEY = "KXSv44wiKDOia4q_0rsZeL5TK28GyQ89c8KUFemAMQs";
const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imageCount}`;

async function getPhotos() {
    try {
        const response = await fetch(URL);
        const images = await response.json();
        console.log("image ", images);

    } catch (err) {
        console.log("Error", err);
    }

}

getPhotos();