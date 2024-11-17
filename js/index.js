import apiURL from "./data.js";

const productsContainer = document.querySelector(".all-product");
const cartInfo = document.querySelector(".cart-info");

let dataTORender = [];
let cartArray = [];

// Fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    dataTORender = data; // Assign the fetched data to dataTORender
    generateHtml();
  } catch (error) {
    console.error("Error fetching data:", error);
    productsContainer.innerHTML = `<p class="error-message">Failed to load products. Please try again later.</p>`;
  }
}

// Generate HTML from the fetched data
function generateHtml() {
  dataTORender.forEach(function (data) {
    productsContainer.innerHTML += `<div class="products">
                                         <a href="products/singlePage.html?${data.id}"> 
                                           <div style="background-image: url(${data.image})"
                                                class="image-products" alt="${data.category}"></div>
                                         </a>
                                         <h4>${data.title}</h4>
                                         <p>US $${data.price}</p>
                                         <button class="cart" data-result="${data.id}">Add to cart</button>
                                    </div>`;
  });
  setUpCartListeners(); // Set up click listeners after rendering
}

// Set up event listeners for "Add to Cart" buttons
function setUpCartListeners() {
  const addToCart = document.querySelectorAll(".cart");
  for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click", (event) => {
      const productId = event.target.dataset.result;
      if (cartArray.find((product) => product.id == productId)) {
        alert("Product is already in the cart");
      } else {
        const itemToAdd = dataTORender.find(
          (product) => product.id == productId
        );
        cartArray.push(itemToAdd);
        cartInfo.innerHTML = cartArray.length;
        localStorage.setItem("cart", JSON.stringify(cartArray));
      }
    });
  }
}

// Call fetchData to start the process
fetchData();
