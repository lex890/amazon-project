import * as deliveryModule from '../../data/deliveryOptions.js';
import * as cartModule from '../../data/cart.js';
import convertMoney from '../utils/money.js';
import {displayCheckout} from './checkoutHeader.js';
import {displayPayment} from './paymentSummary.js';
import {getProduct} from '../../data/products.js';


export function displayOrder() {
  let cartHTML = '';

  cartModule.cart.forEach((cartItem) => { 
    const cartProductId = cartItem.productId;
    const matchingProduct = getProduct(cartProductId);
    const cartDeliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = deliveryModule.getDeliveryOption(cartDeliveryOptionId);
    const dateString = deliveryModule.getDate(cartItem.deliveryOptionId);
    
    cartHTML += 
      `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
  
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${convertMoney(matchingProduct.priceCents)}</div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input value="${cartItem.quantity}" type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options"> 
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>`;
        
  }); 

    function deliveryOptionHTML(matchingProduct, cartItem) {
      let deliveryOptionsHTML = '';

      deliveryModule.deliveryOptions.forEach((deliveryOption) => {
        const dateString = deliveryModule.getDate(deliveryOption.id);

        const priceString = deliveryOption.priceCents === 0 ? 
        'FREE' : `$${convertMoney(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        
        deliveryOptionsHTML += `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}" >

            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>`;
        });
        
      return deliveryOptionsHTML;
    };
  
  document.querySelector('.order-summary').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; // read the id
      cartModule.removeFromCart(productId); // update the cart 
      displayOrder(); // re-display the Order History
      displayPayment(); // re-display the Payment History
      displayCheckout();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((selection) => {
    selection.addEventListener('click', () => {
      const { productId, deliveryOptionId } = selection.dataset;
      cartModule.updateDeliveryOption(productId, deliveryOptionId);
      displayOrder(); // re-display the Order History
      displayPayment(); // re-display the Payment History
      displayCheckout();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    const productId = link.dataset.productId;
  
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  
    const handleSave = () => {
      const newQuantity = Number(quantityInput.value);
  
      if (isNaN(newQuantity) || newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
  
      cartModule.updateQuantity(productId, newQuantity);
  
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
  
      displayOrder(); // re-display the Order History
      displayCheckout();
    };
  
    // Add click event to the link
    link.addEventListener('click', handleSave);
  
    // Add keydown event to the quantity input
    quantityInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleSave();
      }
    });
  });
  
};