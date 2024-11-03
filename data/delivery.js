import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

class DeliveryOptions {

  deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  }, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  }, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }]

  getDeliveryOption(deliveryOptionsId) {
    return this.deliveryOptions.find(option => option.id === deliveryOptionsId) || this.deliveryOptions[0];
  }

  getDate(deliveryOptionId) {
    const today = dayjs();
  
    const deliveryOption = this.getDeliveryOption(deliveryOptionId);
    
    let deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  
    if (deliveryDate.format('dddd') === 'Saturday') { // is Weekend ?
      deliveryDate = deliveryDate.add(2, 'days');
    } else if (deliveryDate.format('dddd') === 'Sunday') {
      deliveryDate = deliveryDate.add(1, 'days');
    }
  
    const dateString = deliveryDate.format('dddd, MMMM D');
  
    return dateString;
  }
}

export const myOptions = new DeliveryOptions();
