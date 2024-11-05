import { myOptions } from '../../data/delivery.js';
import { myCart } from '../../data/cart.js';
import convertMoney from '../utils/money.js';
import {displayCheckout} from './checkoutHeader.js';
import {displayPayment} from './paymentSummary.js';
import { getProduct } from '../../data/products.js';


export function displayOrder() {
  let cartHTML = '';

  myCart.cartItems.forEach((cartItem) => { 
    const matchingProduct = getProduct(cartItem.productId);
    const dateString = myOptions.getDate(cartItem.deliveryOptionId);
    
    cartHTML += 
      `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
  
            <div class="cart-item-details">
              <div class="product-name js-product-name-${matchingProduct.id}">${matchingProduct.name}</div>
              <div class="product-price js-product-price-${matchingProduct.id}">$${convertMoney(matchingProduct.priceCents)}</div>
              <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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
                <span class="delete-quantity-link link-primary js-delete-quantity-link js-delete-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>
  
            <div class="delivery-options"> 
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
                ${deliveryOption(matchingProduct.id, cartItem.deliveryOptionId)}
            </div>
          </div>
        </div>`;
  }); 
  
  document.querySelector('.js-order-summary').innerHTML = cartHTML;

  document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; // read the id
      myCart.removeFromCart(productId); // update the cart 
      displayOrder(); // re-display the Order History
      displayPayment(); // re-display the Payment History
      displayCheckout(); // re-display cart quantity
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((selection) => {
    selection.addEventListener('click', () => {
      const { productId, deliveryOptionId } = selection.dataset;
      myCart.updateDeliveryOption(productId, deliveryOptionId);
      displayOrder(); // re-display the Order History
      displayPayment(); // re-display the Payment History
      displayCheckout(); // re-display cart quantity
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
  
      myCart.updateQuantity(productId, newQuantity);
  
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
  
      displayOrder(); 
      displayPayment();
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

export function deliveryOption(matchingProduct, cartItem) {
  let deliveryOptionsHTML = '';

  myOptions.deliveryOptions.forEach((deliveryOption) => {
    const deliveryOptionId = deliveryOption.id;
    const dateString = myOptions.getDate(deliveryOptionId);

    const priceString = deliveryOption.priceCents === 0 ? 
    'FREE' : `$${convertMoney(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOptionId === cartItem;
    
    deliveryOptionsHTML += `
      <div class="delivery-option js-delivery-option js-delivery-id-${matchingProduct} js-product-id-${cartItem}" data-product-id="${matchingProduct}" data-delivery-option-id="${deliveryOptionId}" >

        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct}">
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