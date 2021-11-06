const imageContainer = document.querySelector('#image-container');
const images = document.querySelectorAll('img');
let photos = [];
let ready = false;
let totalImages = 0;
let loadedImages = 0;


const imageCount = 5;
const API_KEY = "KXSv44wiKDOia4q_0rsZeL5TK28GyQ89c8KUFemAMQs";
const URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${imageCount}`;

function imageLoaded() {
    loadedImages++;
    if (totalImages === loadedImages) {
        ready = true;
    }
}


function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    loadedImages = 0;
    totalImages = photos.length;

    photos.forEach(photo => {

        // Anchor Tag
        const aTag = document.createElement('a');
        setAttributes(aTag, {
            'href': photo.links.html,
            'target': '_blank'
        })

        // Image Tag
        const img = document.createElement('img');
        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

        // Image container> (a > img)
        aTag.appendChild(img);
        imageContainer.appendChild(aTag);
    })
}

async function getPhotos() {
    try {
        const response = await fetch(URL);
        photos = await response.json();
        displayPhotos();
    } catch (err) {
        console.log("Error", err);
    }

}

window.addEventListener('scroll', () => {
    console.log("Scroll")
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();


// Intersection Observer Approach 
