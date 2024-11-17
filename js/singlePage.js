import apiURL from "./data.js";

const apiUrl = apiURL;
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

console.log("Product ID:", productId);

const productDetailContainer =
  document.getElementById("product-detail");

async function fetchProduct(id) {
  const apiUrl = apiURL;
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  console.log("Product ID:", productId);
  try {
    const response = await fetch(`${apiUrl}/${productId}`);
    console.log("API response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();
    console.log("Product details:", product);

    renderProduct(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    productDetailContainer.innerHTML = `<p>Error loading product. Please try again later.</p>`;
  }
}

function renderProduct(product) {
  console.log("Rendering product...");
  productDetailContainer.innerHTML = `
    <div class="product-container">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-info">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p><strong>Price:</strong> $${product.discountedPrice.toFixed(
          2
        )}</p>
        <button id="add-to-cart" data-id="${
          product.id
        }" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  `;
}

if (productId) {
  fetchProduct(productId);
} else {
  productDetailContainer.innerHTML = `<p>No product ID provided. Unable to load product details.</p>`;
}
