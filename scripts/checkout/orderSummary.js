import convertMoney from '../utils/money.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {getProduct} from '../../data/products.js';
import * as deliveryModule from '../../data/deliveryOptions.js';
import * as cartModule from '../../data/cart.js';
import {displayPayment} from './paymentSummary.js';

export function displayOrder() {
  let cartHTML = '';

  cartModule.cart.forEach((cartItem) => { 
    const cartProductId = cartItem.productId;
    const matchingProduct = getProduct(cartProductId);
    
    const cartDeliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = deliveryModule.getDeliveryOption(cartDeliveryOptionId);

    const dateString = getDate(deliveryOption);
    
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
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">Delete</span>
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
        const dateString = getDate(deliveryOption);

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

    function getDate(deliveryOption) {
      const today = dayjs();
    
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
    
      return dateString;
    }

    function cartQuantity() {
      const quantityVal = cartModule.cart.reduce((totalVal, currentCart) => {
        return totalVal + currentCart.quantity;
      }, 0);

      return quantityVal;
    }
  
  
  document.querySelector('.order-summary').innerHTML = cartHTML;
  document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity();

  document.querySelectorAll('.js-delete-quantity-link').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId; // read the id
      cartModule.removeFromCart(productId); // update the cart

      const container = document.querySelector(`.js-cart-item-container-${productId}`); // select parent element to be removed
      container.remove(); //remove the selected HTML elemen
      displayOrder(); // recursion of the whole function
      displayPayment();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((selection) => {
    selection.addEventListener('click', () => {
      const { productId, deliveryOptionId } = selection.dataset;
      cartModule.updateDeliveryOption(productId, deliveryOptionId);
      displayOrder();
      displayPayment();
    });
  });


};