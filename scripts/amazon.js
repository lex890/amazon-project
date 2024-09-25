import * as cartModule from '../data/cart.js'; // Import the initial cart
import { products } from '../data/products.js';

let getCart = cartModule.cart; // Create a copy of the cart
let productsHTML = ''; // Initialize HTML to be added later 
let timeoutId; // Timer for the 'Added' message
cartModule.displayCart(getCart); // Display the number indicating the load of the cart

// Display every product to the main menu
products.forEach((product) => {  
  updateMenu(product);
});

document.querySelector('.js-products-grid').innerHTML = productsHTML; // Insert the accumulated HTML code

// Add event listeners for add-to-cart buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // Get the product ID
    const quantitySelect = button.closest('.product-container').querySelector('.js-quantity-select'); // find the closest element
    const quantity = Number(quantitySelect.value); // Get the selected quantity

    cartModule.addCart(productId, quantity, getCart); // Add to cart
    cartModule.displayCart(getCart); // Update the cart display
    cartModule.showAdded(button, timeoutId); // Show Added Message
  });
});

function updateMenu(product) {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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
}