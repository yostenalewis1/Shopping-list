import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://cart-db-14d12-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const listAddtothecartdb = ref(database, "List");

let textEl = document.getElementById("text");
let buttonEl = document.getElementById("button");
let itemsul = document.getElementById("items");

//////// Add a new item
buttonEl.addEventListener("click", function () {
  if (textEl.value) {
    push(listAddtothecartdb, textEl.value);
    clear();
  }
});

///////// GET ITEMS FROM DB
onValue(listAddtothecartdb, function (snapshot) {
  //check if there if items or not
  if (snapshot.exists()) {
    let x = Object.entries(snapshot.val());
    itemsul.innerHTML = "";
    for (let i = 0; i < x.length; i++) {
      let currentItem = x[i];
      append(currentItem);
    }
  } else {
    itemsul.innerHTML = "there's no items here ...";
  }
});

function clear() {
  textEl.value = "";
}

function append(par) {
  let itemId = par[0];
  let itemValue = par[1];
  let newLi = document.createElement("li");
  newLi.textContent = itemValue;

  newLi.addEventListener("click", function () {
    let exactlocation = ref(database, `List/${itemId}`);
    remove(exactlocation);
  });
  itemsul.append(newLi);
}
