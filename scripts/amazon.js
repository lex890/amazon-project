import { myCart } from '../data/cart.js'; // Import the myCart class
import { myProducts } from '../data/products.js';

let timeoutId; // Timer for the 'Added' message
document.querySelector('.js-cart-quantity').innerHTML = myCart.displayCart(); // Display the number indicating the load of the cart
document.querySelector('.js-products-grid').innerHTML = myProducts.productsHTML; // Insert the accumulated HTML code

// Add event listeners for add-to-cart buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId; // Get the product ID
    const productQuantity = Number(button.closest('.product-container').querySelector('.js-quantity-select').value); // find the closest element
    console.log(productQuantity);
    myCart.addCart(productId, productQuantity); // Add to cart
    myCart.showAdded(button, timeoutId); // Show Added Message

    document.querySelector('.js-cart-quantity').innerHTML = myCart.displayCart(); // Display the number indicating the load of the cart
  });
});

