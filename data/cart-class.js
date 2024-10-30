class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if(!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }];
  
      this.saveToStorage();
    } 
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addCart(productId, productQuantity) {
    let matchingItem = this.cartItems.find(item => item.productId === productId); // Find the product entry within the cart array
  
      if (matchingItem) {
        matchingItem.quantity += productQuantity; // Update quantity if exists
      } else {
        this.cartItems.push({ // Add new item to the cart
          productId: productId,
          quantity: productQuantity,
          deliveryOptionId: '1' // delivery option is set by default to 1
        });
      }
      this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }

  displayCart() {
    const cartQuantity = this.cartItems.reduce((totalVal, currentVal) => 
      totalVal + currentVal.quantity, 0);
  
    return cartQuantity;
  }

  showAdded(button, timeoutId) {
    const addedToCartDiv = button.closest('.product-container').querySelector('.added-to-cart'); // check the closest parent container
      addedToCartDiv.style.opacity = '1';
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        addedToCartDiv.style.opacity = '0';
      }, 2000);
  }

  removeFromCart(productId) {
    const tempCart = [];
    this.cartItems.forEach((entry) => {
      if (entry.productId !== productId) {
        tempCart.push(entry);
      }
    });
  
    if (tempCart.length === 0) {
      localStorage.clear();
      this.cartItems = [];
    } else {
      this.cartItems = tempCart;
      saveToStorage();
    }
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);