import { convertMoney } from '../scripts/utils/money.js';

class Products {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }
  
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${convertMoney(this.priceCents)}`
  }

  extraInfoHTML() {
    return ``;
  }
}

class Clothing extends Products {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

class Appliances extends Products {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${this.warrantyLink}" target="_blank">
        Warranty
      </a>
    `;
  }
}

export let myProducts = [];

export function loadProducts(func) { // call back function
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    myProducts = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
    
      if (productDetails.type === 'appliances') {
        return new Appliances(productDetails);
      }
    
      return new Products(productDetails);
    });

    console.log('load products');
    func(); // the function to call back
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}

export function getProduct(cartId) {
  return myProducts.find((productDetails) => {
    return productDetails.id === cartId;
  });
}
