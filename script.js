const apiUrl = 'https://mockend.com/api/GianlucaLaRosa/mockend/';
const secondApiUrl = 'https://mockend.com/api/GianlucaLaRosa/mockend/tree/another-configuration/'

// Fetch all posts
async function fetchItems(sortingQuery) {
  const response = await fetch(`${apiUrl}bitrockers?${sortingQuery}`);
  const items = await response.json();
  displayItems(items);
}

// Display items in the cards
function displayItems(items) {
  const itemList = document.getElementById('cards');
  items.forEach(item => {
    const avatarUrl = isValidURL(item.avatar) ? item.avatar : `./assets/${item.avatar}.png`
    const div = document.createElement('div');
    div.style.backgroundColor = item.backgroundColor+11;
    div.className = 'card';
    div.innerHTML = `
      <div class="card__header">
        <div class="card__header__avatar"><img src="${avatarUrl}"></div>
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
        <button onclick="deleteItem('${item.id}')">Delete</button>
      </div>
    `;
    itemList.appendChild(div);
  });
}

// Delete an item
async function deleteItem(id) {
  await fetch(`${apiUrl}bitrockers/${id}`, {
    method: 'DELETE'
  });
  fetchItems();
}

function isValidURL(url) {
  try {
    url = new URL(url);
  } catch (e) {
    return false;
  }
  return true;
}

function ascSort() {
  const itemList = document.getElementById('cards');
  itemList.innerHTML = '';
  fetchItems("name_order=asc")
}

function descSort() {
  const itemList = document.getElementById('cards');
  itemList.innerHTML = '';
  fetchItems("name_order=desc")
}
// Initial fetch of items
fetchItems();
