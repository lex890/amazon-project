// Integration test (testing pieces of code that relies on each other.)

import {displayOrder} from '../../scripts/checkout/orderSummary.js';
import {loadFromStorage, cart} from "../../data/cart.js"; 

describe('test suite: display Order Summary', () => {
  const product1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const product2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-return-to-home-link"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: product1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: product2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
    displayOrder();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('displays the cart page', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${product1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${product2}`).innerText
    ).toContain('Quantity: 1');

  }); 

  it('removes a product', () => {
    document.querySelector(`.js-delete-quantity-link-${product1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${product1}`)
    ).toEqual(null);
    
    expect(
      document.querySelector(`.js-cart-item-container-${product2}`)
    ).not.toEqual(null);

    expect(
      cart.length
    ).toEqual(1);

    expect(
      cart[0].productId
    ).toEqual(product2);

  });
  
});