import {displayOrder} from './checkout/orderSummary.js';
import {displayPayment} from './checkout/paymentSummary.js';
import {displayCheckout} from './checkout/checkoutHeader.js';
import {loadProducts} from '../data/products.js';

// import '../data/backend-practice.js';

loadProducts(() => { // another call back function for http request
  displayOrder();
  displayPayment();
  displayCheckout();
});
 
