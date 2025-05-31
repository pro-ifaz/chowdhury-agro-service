const stock = {};
const history = [];

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty)) return alert('সঠিকভাবে তথ্য দিন।');

  stock[name] = (stock[name] || 0) + qty;
  history.unshift(`${new Date().toLocaleString()} - ${name} (${qty}) যোগ করা হয়েছে।`);

  updateTable();
  updateHistory();

  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
}

function removeItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty)) return alert('সঠিকভাবে তথ্য দিন।');

  if (!stock[name] || stock[name] < qty) {
    return alert('এই পরিমাণে জিনিস স্টকে নেই।');
  }

  stock[name] -= qty;
  if (stock[name] === 0) delete stock[name];
  history.unshift(`${new Date().toLocaleString()} - ${name} (${qty}) বাদ দেয়া হয়েছে।`);

  updateTable();
  updateHistory();

  document.getElementById('itemName').value = '';
  document.getElementById('itemQty').value = '';
}

function updateTable() {
  const tbody = document.getElementById('stockTable').querySelector('tbody');
  tbody.innerHTML = '';
  for (let key in stock) {
    let row = `<tr><td>${key}</td><td>${stock[key]}</td></tr>`;
    tbody.innerHTML += row;
  }
}

function updateHistory() {
  const ul = document.getElementById('historyList');
  ul.innerHTML = '';
  history.slice(0, 10).forEach(entry => {
    ul.innerHTML += `<li>${entry}</li>`;
  });
}
