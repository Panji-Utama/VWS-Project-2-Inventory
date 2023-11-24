async function fetchItems() {
  try {
    const response = await fetch("http://localhost:3000/items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

function createCarousel(items) {
  const carouselTrack = document.querySelector(".carousel-track");
  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "carousel-item";
    itemDiv.innerHTML = `
            <img src="${item.image_url}" alt="${item.name}">
            <p>${item.name}</p>
        `;
    carouselTrack.appendChild(itemDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const items = await fetchItems();
  if (items && items.length > 0) {
    createCarousel(items);
  }
});

// Additional functionality for modal, search, and login can be added here
