const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");

let mood = "SUBMIT";
let tmp;

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#b91c1c";
  }
}

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  const newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newpro.count <= 100
  ) {
    if (mood === "SUBMIT") {
      if (newpro.count > 0) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      mood = "SUBMIT";
      submit.innerHTML = "SUBMIT";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(datapro));
  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
   </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  document.getElementById("productCount").innerText = `(${datapro.length})`;
  let btnclear = document.getElementById("clearAll");
  if (datapro.length > 0) {
    btnclear.style.display = "block";
  } else {
    btnclear.style.display = "none";
  }
  getTotal();
}

showData();

function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}

function clearAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let SearchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    SearchMood = "title";
  } else {
    SearchMood = "category";
  }
  search.placeholder = "Search By " + SearchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (SearchMood == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
        `;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
       </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
