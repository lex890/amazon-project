import * as cartModule from '../data/cart.js';
import {products, getProduct} from '../data/products.js';
import convertMoney from './utils/money.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from '../data/deliveryOptions.js';

let getCart = cartModule.cart;
displayOrder();
cartModule.numberOfCheckout(getCart);

document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const updatedCart = cartModule.removeFromCart(productId);
    cartModule.numberOfCheckout(updatedCart);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

function displayOrder() {
  let cartHTML = '';

  getCart.forEach((product) => { 
    let matchingItem = products.find(item => item.id === product.productId);
    cartHTML += 
      `<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">
  
            <div class="cart-item-details">
              <div class="product-name">${matchingItem.name}</div>
              <div class="product-price">$${convertMoney(matchingItem.priceCents)}</div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${product.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItem.id}">Delete</span>
              </div>
            </div>
  
            <div class="delivery-options"> 
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
                ${deliveryOption(matchingItem, product)}
            </div>
          </div>
        </div>`;
  });
  document.querySelector('.order-summary').innerHTML = cartHTML;
  
}

function deliveryOption(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();

    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0 ? 
    'FREE' : `$${convertMoney(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

  deliveryOptionsHTML += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}" >

      <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>
  `;
  
  });
  return deliveryOptionsHTML;
};

document.querySelectorAll('.js-delivery-option').forEach((selection) => {
  selection.addEventListener('click', () => {
    const { productId, deliveryOptionId } = selection.dataset; // access HTML custom attribute 'data-set'/
    cartModule.updateDeliveryOption(productId, deliveryOptionId);
  });
});

