const galleryContainer = document.getElementById("gallery-container");

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let images = [];
let currentIndex = 0;

fetch("images.json")
.then(response => response.json())
.then(data => {

    images = data.images;

    images.forEach((image, index) => {

        const card = document.createElement("div");
        card.classList.add("gallery-item");

        card.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
        `;

        card.addEventListener("click", () => {
            openModal(index);
        });

        galleryContainer.appendChild(card);

    });

});

function openModal(index){

    currentIndex = index;

    modal.style.display = "flex";
    modalImage.src = images[currentIndex].url;

}

function showNext(){

    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    modalImage.src = images[currentIndex].url;
}

function showPrevious(){

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    modalImage.src = images[currentIndex].url;
}

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {

    if(e.target === modal){
        modal.style.display = "none";
    }

});

/* Keyboard Navigation */

document.addEventListener("keydown", (e) => {

    if(modal.style.display === "flex"){

        if(e.key === "ArrowRight"){
            showNext();
        }

        if(e.key === "ArrowLeft"){
            showPrevious();
        }

        if(e.key === "Escape"){
            modal.style.display = "none";
        }

    }

});
