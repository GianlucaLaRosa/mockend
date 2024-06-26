const apiUrl = 'https://mockend.com/api/GianlucaLaRosa/mockend/';

// Fetch all posts
async function fetchItems() {
  const response = await fetch(`${apiUrl}bitrockers`);
  const items = await response.json();
  displayItems(items);
}

// Display items in the cards
function displayItems(items) {
  const itemList = document.getElementById('cards');
  items.forEach(item => {
    const div = document.createElement('div');
    div.style.backgroundColor = item.backgroundColor+11;
    div.className = 'card';
    div.innerHTML = `
      <div class="card__header">
        <div class="card__header__avatar"><img src="./assets/${item.avatar}.png"></div>
        <div class="card__header__title">${item.name} ${item.surname}</div>
        <div class="card__header__hometown">from ${item.homeTown}<span>(${item.country})</span></div>
      </div>
      <div class="card__body">
        <div class="card__body__age">age: ${item.age}</div>
        <div class="card__body__funny">is a cool person: ${item.isCool}</div>
        <div class="cart__body__accident-time">Days since the last issue in PROD: ${item.accTime}</div>
        <div class="card__body__quote">favourite quote: ${item.quote}</div>
        <div class="card__body__repo">personal website: ${item.site}, access password: ${item.password}</div>
      </div>
      <div class="card__footer">
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
