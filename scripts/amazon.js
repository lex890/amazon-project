import * as cartModule from '../data/cart.js'; // Import the initial cart
import { products } from '../data/products.js';
import { convertMoney } from './utils/money.js';

let timeoutId; // Timer for the 'Added' message
document.querySelector('.js-cart-quantity').innerHTML = cartModule.displayCart(); // Display the number indicating the load of the cart

let productsHTML = ''; // Initialize HTML to be added later 
products.forEach((product) => {  // Display every product to the main menu
  updateMenu(product);
});

document.querySelector('.js-products-grid').innerHTML = productsHTML; // Insert the accumulated HTML code

// Add event listeners for add-to-cart buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // Get the product ID
    const productQuantity = Number(button.closest('.product-container').querySelector('.js-quantity-select').value); // find the closest element
    console.log(productQuantity);
    cartModule.addCart(productId, productQuantity); // Add to cart
    cartModule.showAdded(button, timeoutId); // Show Added Message

    document.querySelector('.js-cart-quantity').innerHTML = cartModule.displayCart(); // Display the number indicating the load of the cart
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
        $${convertMoney(product.priceCents)}
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