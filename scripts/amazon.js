import { cart } from '../data/cart.js'; // Import the initial cart
import { products } from '../data/products.js';

let getCart = cart; // Create a copy of the cart
let productsHTML = ''; // Initialize HTML to be added later 
let timeoutId; // Timer for the 'Added' message
displayCart(); // Display the number indicating the load of the cart

// Build product HTML
products.forEach((product) => {  
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
});

document.querySelector('.js-products-grid').innerHTML = productsHTML; // Insert the accumulated HTML code

// Add event listeners for add-to-cart buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // Get the product ID
    const quantitySelect = button.closest('.product-container').querySelector('.js-quantity-select');
    const quantity = Number(quantitySelect.value); // Get the selected quantity

    let matchingItem = getCart.find(item => item.productId === productId); // Find the product in the cart

    if (matchingItem) {
      matchingItem.quantity += quantity; // Update quantity if exists
    } else {
      getCart.push({ // Add new item to the cart
        productId,
        quantity
      });
    }

    displayCart(); // Update the cart display
    console.log(getCart); // For debugging

    // Show 'Added' message
    const addedToCartDiv = button.closest('.product-container').querySelector('.added-to-cart'); 
    addedToCartDiv.style.opacity = '1';
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      addedToCartDiv.style.opacity = '0';
    }, 2000);
  });
});

// Function to display the cart quantity
function displayCart() {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => totalVal + currentVal.quantity, 0);
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; // Update the displayed quantity
  localStorage.setItem('getCart', JSON.stringify(getCart)); // Save cart to local storage
}
