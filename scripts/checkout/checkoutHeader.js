import {cartQuantity} from '../../data/cart.js';

export function displayCheckout() {
  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity()} items`;

  document.querySelector('.js-item-quantity')
  .innerHTML = `items (${cartQuantity()})`;

}


