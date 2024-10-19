// Select the form and inputs
const inventoryForm = document.getElementById('inventoryForm');
const inventoryList = document.getElementById('inventoryList');
const itemNameInput = document.getElementById('itemName');
const itemQuantityInput = document.getElementById('itemQuantity');
const itemPriceInput = document.getElementById('itemPrice');
const itemIndexInput = document.getElementById('itemIndex');

let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Load inventory if on the inventory page
if (inventoryList) {
    loadInventory();
}

// Listen for form submission
inventoryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = itemNameInput.value;
    const quantity = itemQuantityInput.value;
    const price = itemPriceInput.value;
    const index = itemIndexInput.value;

    if (index === '') {
        // Add new item
        inventory.push({ name, quantity, price });
    } else {
        // Update existing item
        inventory[index] = { name, quantity, price };
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();
    inventoryForm.reset();
});

// Function to load inventory
function loadInventory() {
    inventoryList.innerHTML = '';
    inventory.forEach((item, index) => {
        const inventoryItem = document.createElement('div');
        inventoryItem.classList.add('inventory-item');

        inventoryItem.innerHTML = `
            <p><strong>${item.name}</strong> - Quantity: ${item.quantity} - Price: $${item.price}</p>
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;

        inventoryList.appendChild(inventoryItem);
    });
}

// Function to edit an item
function editItem(index) {
    const item = inventory[index];
    itemNameInput.value = item.name;
    itemQuantityInput.value = item.quantity;
    itemPriceInput.value = item.price;
    itemIndexInput.value = index; // Set the index for updating
}

// Function to delete an item
function deleteItem(index) {
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory(); // Reload the inventory after deletion
}
