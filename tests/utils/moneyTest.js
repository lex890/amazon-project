import convertMoney from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(convertMoney(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(convertMoney(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(convertMoney(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(convertMoney(2000.4)).toEqual('20.00');
  });

  it('negative number', () => {
    expect(convertMoney(-5000)).toEqual('-50.00');
  });
});