const shop = document.getElementById("shop");

const shopItemData = [
  {
    id: 1,
    imgSrc: "./images/img-1.jpg",
    title: "Casual Shirt",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing.",
    price: "$ 45",
  },
  {
    id: 2,
    imgSrc: "./images/img-2.jpg",
    title: "Formal Shirt",
    description: "Duis aute irure dolor in reprehenderit in voluptate.",
    price: "$ 55",
  },
  {
    id: 3,
    imgSrc: "./images/img-3.jpg",
    title: "Jeans",
    description: "Excepteur sint occaecat cupidatat non proident.",
    price: "$ 60",
  },
  {
    id: 4,
    imgSrc: "./images/img-4.jpg",
    title: "Sneakers",
    description:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: "$ 75",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemData
    .map((item) => {
      let { id, imgSrc, price, description, title } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div id=product-id-${id} class="item">
        <img width="220" src=${imgSrc} alt="" />
        <div class="details">
          <h3>${title}</h3>
          <p>${description}</p>
          <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})"class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
        `;
    })
    .join(""));
};

generateShop();

const increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
  update(selectedItem);
};

const decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return
  if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
  update(selectedItem);
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.querySelector(".cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
