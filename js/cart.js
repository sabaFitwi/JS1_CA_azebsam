const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const shoppingCart = document.querySelector(".shopping-cart");
const orderSummary = document.querySelector(".order-summary-wrapper");
const headerOfCartPage = document.querySelector(
  ".header-of-cart-page"
);
const cart = document.querySelector(".cart-info");

let subTotalPrice = 0;
let totalUnitPrice = 0;

// Update the cart count and display cart items
cartItems.forEach(function (item) {
  subTotalPrice += item.price;
  totalUnitPrice += item.price;

  shoppingCart.innerHTML += `
    <section class="shipping-details_wrapper">
      <div class="shopping-cart_checkbox">
        <input type="checkbox" />
      </div>
      <div class="checkout-product-image">
        <h3 class="title">Product</h3>
        <div><img src="${item.image}" alt="${item.category}" /></div>
      </div>
      <div class="checkout-product_size">
        <h3 class="title">Detail</h3>
        <h2 class="title-margin">${item.category}</h2>
        <p class="title-color">${item.title}</p>
        <p>Size: S</p>
      </div>
      <div class="quantity">
        <h3 class="title">Quantity</h3>
        <div class="number-input">
          <div class="minus">-</div>
          <input class="cart-input" type="text" value="1" />
          <div class="plus">+</div>
        </div>
      </div>
      <div class="checkout-product_price">
        <h3 class="title">Price</h3>
        <a href="#" class="remove-cart" data-result="${item.id}">
          <i class="fa-regular fa-trash-can"></i> Remove
        </a>
        <p class="title-margin price-bold">US $${item.price}</p>
      </div>
    </section>
  `;
});

// Update header and cart count
headerOfCartPage.innerHTML = `<h1 class="header-of-cart-page">Shopping Cart <span class="inCart-number">(${cartItems.length})</span></h1>`;
cart.innerHTML = `(${cartItems.length})`;

// Update order summary
orderSummary.innerHTML = `
  <div class="total">
    <p>Sub Total</p>
    <p class="sub-total">US $${totalUnitPrice.toFixed(2)}</p>
  </div>
  <div class="total">
    <p>Shipping</p>
    <p>US $0.00</p>
  </div>
  <div class="total">
    <p>Total</p>
    <p class="gran-total">US $${totalUnitPrice.toFixed(2)}</p>
  </div>
`;

// Handle remove item from cart
shoppingCart.addEventListener("click", function (event) {
  if (event.target && event.target.matches(".remove-cart")) {
    const itemId = event.target.getAttribute("data-result");

    // Find the item index in the cartItems array
    const itemIndex = cartItems.findIndex(
      (item) => item.id === itemId
    );
    if (itemIndex !== -1) {
      // Remove item from the array
      cartItems.splice(itemIndex, 1);

      // Update localStorage with the new cartItems array
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Re-render the cart and order summary
      updateCart();
    }
  }
});

// Function to update the cart UI and order summary
function updateCart() {
  shoppingCart.innerHTML = "";
  subTotalPrice = 0;
  totalUnitPrice = 0;

  // Render the cart items again
  cartItems.forEach(function (item) {
    subTotalPrice += item.price;
    totalUnitPrice += item.price;

    shoppingCart.innerHTML += `
      <section class="shipping-details_wrapper">
        <div class="shopping-cart_checkbox">
          <input type="checkbox" />
        </div>
        <div class="checkout-product-image">
          <h3 class="title">Product</h3>
          <div><img src="${item.image}" alt="${item.category}" /></div>
        </div>
        <div class="checkout-product_size">
          <h3 class="title">Detail</h3>
          <h2 class="title-margin">${item.category}</h2>
          <p class="title-color">${item.title}</p>
          <p>Size: S</p>
        </div>
        <div class="quantity">
          <h3 class="title">Quantity</h3>
          <div class="number-input">
            <div class="minus">-</div>
            <input class="cart-input" type="text" value="1" />
            <div class="plus">+</div>
          </div>
        </div>
        <div class="checkout-product_price">
          <h3 class="title">Price</h3>
          <a href="#" class="remove-cart" data-result="${item.id}">
            <i class="fa-regular fa-trash-can"></i> Remove
          </a>
          <p class="title-margin price-bold">US $${item.price}</p>
        </div>
      </section>
    `;
  });

  // Update header and cart count
  headerOfCartPage.innerHTML = `<h1 class="header-of-cart-page">Shopping Cart <span class="inCart-number">(${cartItems.length})</span></h1>`;
  cart.innerHTML = `(${cartItems.length})`;

  // Update order summary
  orderSummary.innerHTML = `
    <div class="total">
      <p>Sub Total</p>
      <p class="sub-total">US $${totalUnitPrice.toFixed(2)}</p>
    </div>
    <div class="total">
      <p>Shipping</p>
      <p>US $0.00</p>
    </div>
    <div class="total">
      <p>Total</p>
      <p class="gran-total">US $${totalUnitPrice.toFixed(2)}</p>
    </div>
  `;
}
