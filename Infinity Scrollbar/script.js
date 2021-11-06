const imageContainer = document.querySelector('#image-container');

let data = [];
let ready = false;
let totalImages = 0;
let loadedImages = 0;


const imageCount = 2;
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
    totalImages = data.length;

    data.forEach(photo => {

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
        data = await response.json();
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



function createImageElement(photo) {
    // Anchor Tag
    const aTag = document.createElement('a');
    setAttributes(aTag, {
        'href': photo.links.html,
        'target': '_blank'
    })

    // Image Tag
    const img = document.createElement('img');
    setAttributes(img, {
        'data-src': photo.urls.regular,
        'alt': photo.alt_description,
        'title': photo.alt_description
    });

    // Image container> (a > img)
    aTag.appendChild(img);
    imageContainer.appendChild(aTag);
}

function preloadImage(image) {
    const src = image.getAttribute("data-src");
    if (!src) return;

    image.src = src;
}
const imageOptions = {
    threshold: 0.2
}
const imageObserver = new IntersectionObserver((entries, imageObserver) => {
    console.log(entries)
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Entry", entry);
            preloadImage(entry.target);
            imageObserver.unobserve(entry.target);
        }
    })
}, imageOptions);

// async function getPhotos() {
//     try {
//         const response = await fetch(URL);
//         data = await response.json();
//         data.forEach(createImageElement);
//         const images = document.querySelectorAll("img");
//         images.forEach(image => imageObserver.observe(image));
//     } catch (err) {
//         console.log("Error", err);
//     }

// }

// getPhotos();