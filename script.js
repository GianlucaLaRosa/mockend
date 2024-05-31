const apiUrl = 'https://mockend.com/api/GianlucaLaRosa/mockend/';

// Fetch all posts
async function fetchItems() {
  const response = await fetch(`${apiUrl}posts`);
  const items = await response.json();
  displayItems(items);
}

// Display items in the cards
function displayItems(items) {
  const itemList = document.getElementById('cards');
  itemList.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="card__title">${item.title}</div>
      <div>
        <button onclick="updateItem('${item._id}')">Edit</button>
        <button onclick="deleteItem('${item._id}')">Delete</button>
      </div>
    `;
    itemList.appendChild(div);
  });
}

// Add a new item
async function addItem() {
  const newItemInput = document.getElementById('newItem');
  const newItem = { name: newItemInput.value };

  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  });

  newItemInput.value = '';
  fetchItems();
}

// Update an item
async function updateItem(id) {
  const newName = prompt('Enter new name:');
  if (newName) {
    await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
    });
    fetchItems();
  }
}

// Delete an item
async function deleteItem(id) {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  fetchItems();
}

// Initial fetch of items
fetchItems();
