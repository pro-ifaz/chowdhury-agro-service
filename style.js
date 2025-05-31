const stock = {};
const history = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty)) {
    alert('জিনিসের নাম ও পরিমাণ সঠিকভাবে দিন।');
    return;
  }

  stock[name] = (stock[name] || 0) + qty;
  history.unshift(`${new Date().toLocaleString()} - ${qty} ${name} যোগ হয়েছে।`);

  updateTable();
  updateHistory();

  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
}

function removeItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty)) {
    alert('জিনিসের নাম ও পরিমাণ সঠিকভাবে দিন।');
    return;
  }

  if (!stock[name] || stock[name] < qty) {
    alert('এই পরিমাণে স্টকে এই জিনিস নেই।');
    return;
  }

  stock[name] -= qty;
  if (stock[name] === 0) delete stock[name];
  history.unshift(`${new Date().toLocaleString()} - ${qty} ${name} বাদ দেয়া হয়েছে।`);

  updateTable();
  updateHistory();

  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
}

function updateTable() {
  const tbody = document.getElementById('stockTable').querySelector('tbody');
  tbody.innerHTML = '';
  for (const item in stock) {
    const row = `<tr><td>${item}</td><td>${stock[item]}</td></tr>`;
    tbody.innerHTML += row;
  }
}

function updateHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  history.slice(0, 10).forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    list.appendChild(li);
  });
}
