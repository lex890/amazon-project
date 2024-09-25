export let cart = JSON.parse(localStorage.getItem('getCart')) || [];

// Function to add items in cart
export function addCart(productId, quantity, getCart) {
  let matchingItem = getCart.find(item => item.productId === productId); // Find the product in the cart

    if (matchingItem) {
      matchingItem.quantity += quantity; // Update quantity if exists
    } else {
      getCart.push({ // Add new item to the cart
        productId,
        quantity
      });
    }
}

// Function to display the cart quantity
export function displayCart(getCart) {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => totalVal + currentVal.quantity, 0);
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity; // Update the displayed quantity
  localStorage.setItem('getCart', JSON.stringify(getCart)); // Save cart to local storage
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
  localStorage.setItem('getCart', JSON.stringify(cart));

  return cart;
}

export function numberOfCheckout(getCart) {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => {
    return totalVal + currentVal.quantity;
  }, 0);
  
  document.querySelector('.return-to-home-link').innerHTML = cartQuantity;
}