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

// I think I will change a few things. The navbar would be exactly the same, but put a "search" button beside the search textfield, so the searching would only be done and shown after pressing the button. Then I wont implement the modal, row, moving images, etc. It would now be a welcome text and details on what the website is all about. Then dont forget to add footer to it too. Use the color palette that I gave. Give me all the html css js code

document.addEventListener("DOMContentLoaded", async () => {
  const items = await fetchItems();
  if (items && items.length > 0) {
    createCarousel(items);
  }
});

// Additional functionality for modal, search, and login can be added here
