async function fetchItems() {
  try {
    const response = await fetch("http://localhost:3000/items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const items = await response.json();
    populateTable(items);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
}

function populateTable(items) {
  const tableBody = document.getElementById("itemTable").querySelector("tbody");
  items.forEach((item) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>${item.image_url}</td>
            <td><img src="${item.image_url}" alt="${item.name}" style="width:50px; height:auto;"></td>
            <td>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
  });
}

// Placeholder functions for edit and delete actions
function editItem(itemId) {
  console.log("Edit item:", itemId);
  // Implement edit functionality
}

function deleteItem(itemId) {
  console.log("Delete item:", itemId);
  // Implement delete functionality
}

document.addEventListener("DOMContentLoaded", fetchItems);

document.getElementById("addItemForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newItem = {
    name: document.getElementById("itemName").value,
    quantity: document.getElementById("itemQuantity").value,
    description: document.getElementById("itemDescription").value,
    image_url: document.getElementById("itemImageUrl").value,
  };

  try {
    const response = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Clear form
    document.getElementById("addItemForm").reset();
    // Optionally, refresh the items table
    fetchItems();
  } catch (error) {
    console.error("Error adding item:", error);
  }
});
