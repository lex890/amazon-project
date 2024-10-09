import {displayCart} from '../../data/cart.js';

export function displayCheckout() {
  const cartQuantity = displayCart();

  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;

  document.querySelector('.js-item-quantity')
  .innerHTML = `items (${cartQuantity})`;

}


