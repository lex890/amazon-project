export function convertMoney(priceCents) {
  return (priceCents / 100).toFixed(2);
}

export default convertMoney;