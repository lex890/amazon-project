import {convertMoney} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency');


console.log('Normal Number');
if (convertMoney(2095) === '20.95') {
  console.log('success');
} else {
  console.log('failed');
}

console.log('Zero Number');
if (convertMoney(0) === '0.00') {
  console.log('success');
} else {
  console.log('failed');
}

console.log('Partial Cents');
if (convertMoney(2000.5) === '20.01') {
  console.log('success');
} else {
  console.log('failed');
}

