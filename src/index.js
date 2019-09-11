
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
const breedArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const breedDropdown = document.getElementById('breed-dropdown');

    fetch(imgUrl)
        .then(resp => resp.json())
        .then(json => iterateOverImages(json));

    fetch(breedUrl)
        .then(resp => resp.json())
        .then(json => iterateOverBreeds(json));

    breedDropdown.addEventListener('change', filterBreed);
});

function iterateOverImages(json) {
    const dogImageContainer = document.getElementById("dog-image-container");
    json.message.forEach(element => {
        let childImage = document.createElement("img");
        childImage.setAttribute('src', element);
        // console.log(childImage);
        dogImageContainer.appendChild(childImage);
    });
}

function iterateOverBreeds(json) {
    // console.log(json);
    const dogBreedsContainer = document.getElementById("dog-breeds");
    for (breed in json.message) {
        let childItem = document.createElement("li");
        childItem.addEventListener('click', changeTextColor);
        breedArray.push(breed);
        childItem.innerText = breed;
        dogBreedsContainer.appendChild(childItem);
    };
}

function changeTextColor(event) {
    event.target.style.color = getRandomColor();
}

// courtesty of Stack Overflow
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function filterBreed(event) {
    let char = event.target.value;
    const dogBreedsContainer = document.getElementById("dog-breeds");
    console.log(char);
    if (char === "*") {
        dogBreedsContainer.innerHTML = null; 
        breedArray.forEach( (breed) => {
            let childItem = document.createElement("li");
            childItem.addEventListener('click', changeTextColor);
            breedArray.push(breed);
            childItem.innerText = breed;
            dogBreedsContainer.appendChild(childItem);
        });
    } else {
        dogBreedsContainer.innerHTML = null; 
        breedArray.forEach( (breed) => {
            if (breed[0] === char) {
                let childItem = document.createElement("li");
                childItem.addEventListener('click', changeTextColor);
                breedArray.push(breed);
                childItem.innerText = breed;
                dogBreedsContainer.appendChild(childItem);
            };
        });
    };
};