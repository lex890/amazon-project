displayCheckout();
displayOrder();

// Use event delegation
document.querySelector('.order-summary').addEventListener('click', (event) => {
  // Check if the clicked element has the class 'js-delete-quantity-link'
  if (event.target.classList.contains('js-delete-quantity-link')) {
    const productId = event.target.dataset.productId;
    console.log(productId);
    
    getCart = getCart.filter(item => item.productId !== String(productId));
    displayCheckout();
    displayOrder();
    console.log(getCart);
  }
});

function displayCheckout() {
  const cartQuantity = getCart.reduce((totalVal, currentVal) => {
    return totalVal + currentVal.quantity;
  }, 0);

  document.querySelector('.return-to-home-link').innerHTML = cartQuantity;
  localStorage.setItem('getCart', JSON.stringify(getCart));
}

function displayOrder() {
  let cartHTML = '';

  getCart.forEach((product) => { 
    let matchingItem = products.find(item => item.id === product.productId);
    cartHTML += 
      `<div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>
  
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">
  
            <div class="cart-item-details">
              <div class="product-name">${matchingItem.name}</div>
              <div class="product-price">$${(matchingItem.priceCents / 100).toFixed(2)}</div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${product.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingItem.id}">Delete</span>
              </div>
            </div>
  
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
  });
  document.querySelector('.order-summary').innerHTML = cartHTML;
}
