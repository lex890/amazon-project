import {displayOrder} from './checkout/orderSummary.js';
import {displayPayment} from './checkout/paymentSummary.js';
import {displayCheckout} from './checkout/checkoutHeader.js';
import {loadProducts} from '../data/products.js';
import {loadCart} from '../data/cart.js';

Promise.all([
  new Promise((resolve) => { 
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => { 
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  displayOrder();
  displayPayment();
  displayCheckout();
});



