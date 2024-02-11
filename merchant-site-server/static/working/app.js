// console.log("js loaded");

const wrapper = document.querySelector(".sliderWrapper");

const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 2999,
    colors: [
      {
        code: "black",
        img: "/static/img/air.png",
      },
      {
        code: "darkblue",
        img: "/static/img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 5999,
    colors: [
      {
        code: "lightgray",
        img: "/static/img/jordan.png",
      },
      {
        code: "green",
        img: "/static/img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 4999,
    colors: [
      {
        code: "lightgray",
        img: "/static/img/blazer.png",
      },
      {
        code: "green",
        img: "/static/img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 3499,
    colors: [
      {
        code: "black",
        img: "/static/img/crater.png",
      },
      {
        code: "lightgray",
        img: "/static/img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 2999,
    colors: [
      {
        code: "gray",
        img: "/static/img/hippie.png",
      },
      {
        code: "black",
        img: "/static/img/hippie2.png",
      },
    ],
  },
];

// configuring chosen product
let choosenProduct = products[0];
const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₹" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

// implement cart
const cartBtn = document.querySelector(".navCart");
const productButton = document.querySelector(".productButton");
const cart = document.querySelector(".cart");
const close = document.querySelector(".close");
let totalVal = 0;
const totalValUi = document.querySelector(".total-val");
function updateTotalValue() {
  // change value
  const amountField = document.getElementById("amountField");
  // Update the value attribute with a variable value
  amountField.value = totalVal;
  totalValUi.textContent = `Total Cost : ₹${totalVal}`;
}
productButton.addEventListener("click", () => {
  cart.style.display = "flex";
  totalVal += choosenProduct.price;
  updateTotalValue();
  addToCart(choosenProduct);
});
cartBtn.addEventListener("click", () => {
  cart.style.display = "flex";
});
close.addEventListener("click", () => {
  cart.style.display = "none";
});
let itemNum = 1;
// add to cart functionality
const cartItemsContainer = document.querySelector(".cart-items");
// Function to add product to cart
function addToCart(choosenProduct) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.classList.add("item" + itemNum);
  itemNum++;
  cartItem.innerHTML = `
          <img src="${choosenProduct.colors[0].img}" alt="${choosenProduct.title}" height="50px">
          <span>${choosenProduct.title}</span>
          <span>₹${choosenProduct.price}</span>
          <button class="delete-from-cart" ><img src="/static/img/bin.png" alt="" height="25px" width="25px"></button>`;
  cartItemsContainer.appendChild(cartItem);
  deleteItem();
}

// delete from cart
function deleteItem() {
  // Attach event listener to all delete buttons
  const deleteButtons = document.querySelectorAll(".delete-from-cart");
  // console.log(typeof(deleteButtons));
  // console.log(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.parentElement; // Getting the parent div
      console.log(item);
      let stringa = item.className.split(" ");
      let lastPart = stringa[stringa.length - 1];
      console.log(lastPart);
      reduceTotalVal(lastPart);
    });
  });
}
function reduceTotalVal(lastPart) {
  const item = document.querySelector(`.${lastPart}`);
  let text = item.innerText;
  let number = text.match(/\d+/)[0];
  // console.log(number);
  totalVal -= number;
  updateTotalValue();
  item.remove(); // Remove the item
}

// checkout btn
console.log("btn tak phonch gye");
const checkoutBtn = document.querySelector(".payButton");
checkoutBtn.addEventListener("click", () => {
  if (totalVal != 0) {
    console.log("checkout initiated");
    sendPost();
    console.log("send done");
  }
});

function sendPost() {
  const url = "http://127.0.0.1:8080/receive_data/123";
  const dataToSend = {
    orderid: 69,
    value: totalVal,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
}
