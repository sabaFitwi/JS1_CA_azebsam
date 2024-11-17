import apiURL from "./data.js";
console.log(apiURL);

const productDetailContainer =
  document.querySelector(".product-detail");

async function fetchProduct() {
  try {
    const response = await fetch(apiURL);
    const productDetailApi = await response.json();
    renderProduct(productDetailApi);
    console.log(productDetailApi).id;
  } catch (error) {
    console.error("Error fetching product:", error);
    productDetailContainer.innerHTML = displayError(
      "An error occurred while fetching product details. Please try again."
    );
    productDetailContainer.classList.add("error");
  }
}

function renderProduct(productUrl) {
  productUrl.forEach(function () {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const productId = params.get("id");
    const product = productUrl.find(({ id }) => id == productId);
    productDetailContainer.innerHTML = `
    <section class="banner">
      <div ${product.image}" class="bannerImage" alt="${
      product.title
    }"></div>
      <div class="banner__content">
        <h1>${product.title}</h1>
        <div class="product-info">
          <p>${product.description}</p>
          <p><strong>Price:</strong> $${product.discountedPrice.toFixed(
            2
          )}</p>
          <button id="add-to-cart" data-id="${
            product.id
          }" class="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </section>
  `;
  });

  document
    .getElementById("add-to-cart")
    .addEventListener("click", function () {
      addToCart(product.id);
    });
}

function addToCart(productId) {
  console.log(`Product ${productId} added to cart.`);
}

fetchProduct();
