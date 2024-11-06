import { myCart } from '../data/cart.js'; // Import the myCart class
import { myProducts } from '../data/products.js';
 // Timer for the 'Added' message
let timeoutId;

function renderProductsGrid() {
  let productsHTML = '';

  myProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>
  
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
  
        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>
  
        <div class="product-price">
          ${product.getPrice()}
        </div>
  
        <div class="product-quantity-container">
          <select class="js-quantity-select">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}
  
        <div class="product-spacer"></div>
  
        <div class="added-to-cart js-added-to-cart" style="opacity: 0;">
          <img src="images/icons/checkmark.png">
          Added
        </div>
  
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
      `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML; // Insert the accumulated HTML code

  function updateCartQuantity() {
    return document.querySelector('.js-cart-quantity').innerHTML = myCart.displayCart();
  }
  
  updateCartQuantity();

  // Add event listeners for add-to-cart buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // Get the product ID
    const productQuantity = Number(button.closest('.product-container').querySelector('.js-quantity-select').value); // find the closest element
    myCart.addCart(productId, productQuantity); // Add to cart
    myCart.showAdded(button, timeoutId); // Show Added Message
    // redisplaying and modifying the DOM
    document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity(); // Display the number indicating the load of the cart
  });
});

};







renderProductsGrid();
