import * as deliveryModule from '../../data/deliveryOptions.js';
import { myCart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import convertMoney from '../utils/money.js';

export function displayPayment() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  myCart.cartItems.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    productPriceCents += matchingProduct.priceCents * cartItem.quantity;

    const deliveryOptionId = deliveryModule.getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOptionId.priceCents;
  });

  const noTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = noTaxCents * 0.1;
  const totalCents = noTaxCents + taxCents;

  const displayPayment = 
  `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-item-quantity">Items ():</div>
            <div class="payment-summary-money">$${convertMoney(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convertMoney(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convertMoney(noTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${convertMoney(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${convertMoney(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary"> Place your order </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = displayPayment;
};