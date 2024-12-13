import {myCart} from "../../data/cart.js"; 

describe('test suite: addCart', () => {
  beforeEach(() => {
    spyOn(myCart.localStorage, 'setItem');
  });

  it('adds a new product to the cart', () => {
    spyOn(myCart.localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    myCart.addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(myCart.cart.length).toEqual(1);
    expect(myCart.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart.cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(myCart.cart[0].quantity).toEqual(1);
    expect(myCart.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(myCart.cartItems));

  });
  
  it('adds an existing product to the cart', () => {
    spyOn(myCart.localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    myCart.addCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(myCart.cart.length).toEqual(1);
    expect(myCart.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(myCart.cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(myCart.cart[0].quantity).toEqual(2);
    expect(myCart.localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(myCart.cartItems));

  });
  
});