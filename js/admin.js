document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Select logout button using class name
  const logoutButton = document.querySelector(".logout-button");
  console.log("Logout button:", logoutButton);

  if (!logoutButton) {
    console.error("Logout button not found");
    return;
  }

  logoutButton.addEventListener("click", function () {
    console.log("Logout clicked");
    window.location.href = "index.html";
  });

  // Fetch and display items
  fetchItems();

  // Ensure the addItemForm is correctly referenced
  const addItemForm = document.getElementById("addItemForm");
  addItemForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addNewItem();
  });
});

function fetchItems() {
  fetch("http://localhost:3000/items")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Items fetched:", data);
      displayItems(data);
    })
    .catch((error) => console.error("Error fetching items:", error));
}

function fetchUsername() {
    fetch("http://localhost:3000/users")
}

function displayItems(items) {
  // Update the table body ID to match the HTML structure
  const tableBody = document.querySelector("#itemTable tbody");
  tableBody.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${item.description}</td>
              <td>${item.image_url}</td>
              <td><img src="${item.image_url}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
              <td>
                  <button onclick="editItem(${item.id})">Edit</button>
                  <button onclick="deleteItem(${item.id})">Delete</button>
              </td>
          `;
    tableBody.appendChild(row);
  });
}

function editItem(itemId) {
  // Implement item edit functionality
}

function deleteItem(itemId) {
  // Implement item delete functionality
}

function addNewItem() {
  const itemName = document.getElementById("itemName").value;
  const itemQuantity = document.getElementById("itemQuantity").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemImageUrl = document.getElementById("itemImageUrl").value;

  const itemData = {
    name: itemName,
    quantity: itemQuantity,
    description: itemDescription,
    image_url: itemImageUrl,
  };

  fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item added:", data);
      // Optionally, clear the form fields
      addItemForm.reset();
      // Optionally, refresh the items list
      fetchItems();
    })
    .catch((error) => console.error("Error adding item:", error));
}
