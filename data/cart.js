export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];

  if(!cart) {
    cart.push({
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    });
  } 
}

// Function to add items in cart
export function addCart(productId, quantity) {
  let matchingItem = cart.find(item => item.productId === productId); // Find the product entry within the cart array

    if (matchingItem) {
      matchingItem.quantity += quantity; // Update quantity if exists
    } else {
      cart.push({ // Add new item to the cart
        productId,
        quantity,
        deliveryOptionId: '1' // delivery option is set by default to 1
      });
    }

    saveToStorage();
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

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

// Function to display the cart quantity
export function displayCart() {
  const cartQuantity = cart.reduce((totalVal, currentVal) => 
    totalVal + currentVal.quantity, 0);

  return cartQuantity;
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

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}