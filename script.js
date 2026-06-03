const galleryContainer = document.getElementById("gallery-container");

fetch("images.json")
.then(response => response.json())
.then(data => {

    data.images.forEach(image => {

        const card = document.createElement("div");
        card.classList.add("gallery-item");

        card.innerHTML = `
            <img src="${image.url}" alt="${image.title}">
        `;

        galleryContainer.appendChild(card);

    });

})
.catch(error => {
    console.error("Error loading images:", error);
});