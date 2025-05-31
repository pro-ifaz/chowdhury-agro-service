const firebaseConfig = {
  apiKey: "AIzaSyCvGEZTFKPhmvVnvsg6hbu9xKkb8I_BbTg",
  authDomain: "chowdhury-agro-service-f91dd.firebaseapp.com",
  databaseURL: "https://chowdhury-agro-service-f91dd-default-rtdb.firebaseio.com",
  projectId: "chowdhury-agro-service-f91dd",
  storageBucket: "chowdhury-agro-service-f91dd.firebasestorage.app",
  messagingSenderId: "61632086736",
  appId: "1:61632086736:web:3b44eb36f16414e0ce54d5",
  measurementId: "G-VDQYF27GB7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function addItem() {
  const name = document.getElementById('itemName').value.trim();
  const qty = parseInt(document.getElementById('itemQty').value);

  if (!name || isNaN(qty)) return;

  const newItem = {
    name: name,
    qty: qty,
    timestamp: Date.now()
  };

  db.ref('stock').push(newItem);
}

db.ref('stock').on('value', (snapshot) => {
  const tableBody = document.querySelector('#stockTable tbody');
  const historyList = document.getElementById('historyList');
  tableBody.innerHTML = '';
  historyList.innerHTML = '';

  const items = snapshot.val();
  for (let key in items) {
    const item = items[key];
    const row = `<tr><td>${item.name}</td><td>${item.qty}</td></tr>`;
    tableBody.innerHTML += row;

    const history = `<li>${item.name} এর পরিমাণ ${item.qty} যোগ করা হয়েছে</li>`;
    historyList.innerHTML += history;
  }
});
