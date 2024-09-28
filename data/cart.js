export let cart = JSON.parse(localStorage.getItem('getCart')) || [];

if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

// Function to add items in cart
export function addCart(productId, quantity, getCart) {
  let matchingItem = getCart.find(item => item.productId === productId); // Find the product in the cart

    if (matchingItem) {
      matchingItem.quantity += quantity; // Update quantity if exists
    } else {
      getCart.push({ // Add new item to the cart
        productId,
        quantity,
        deliveryOptionId: '1' // delivery option is set by default to 1
      });
    }
    saveToStorage();
}

// Function to display the cart quantity
export function displayCart(getCart) {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => totalVal + currentVal.quantity, 0);
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; // Update the displayed quantity
  saveToStorage(); // Save cart to local storage
}
// Function to show Added to Cart Message
export function showAdded(button, timeoutId) {
  const addedToCartDiv = button.closest('.product-container').querySelector('.added-to-cart'); // check the closest parent container
    addedToCartDiv.style.opacity = '1';
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      addedToCartDiv.style.opacity = '0';
    }, 2000);
}

export function removeFromCart(productId) {
  const tempCart = [];
  cart.forEach((entry) => {
    if (entry.productId !== productId) {
      tempCart.push(entry);
    }
  });

  cart = tempCart;
  saveToStorage();

  return cart;
}

export function numberOfCheckout(getCart) {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => {
    return totalVal + currentVal.quantity;
  }, 0);

  document.querySelector('.return-to-home-link').innerHTML = cartQuantity;
}

export function saveToStorage() {
  localStorage.setItem('getCart', JSON.stringify(cart));
}