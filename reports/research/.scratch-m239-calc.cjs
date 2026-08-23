function calc(price, cost, feePct, payPct, feeFlat){
  const feePctR = feePct/100, payPctR = payPct/100;
  const fees = price*(feePctR+payPctR) + feeFlat;
  const profit = price - cost - fees;
  const marginPct = price>0 ? profit/price*100 : 0;
  return {price, fees: +fees.toFixed(4), profit: +profit.toFixed(4), marginPct: +marginPct.toFixed(2)};
}
console.log('Payhip fee only (5%, no fixed, no processing isolated):', calc(9, 0, 5, 0, 0));
console.log('Payhip + PayPal stack (5% + 3.49% + $0.49, PayPal US micropayment std domestic rate):', calc(9, 0, 5, 3.49, 0.49));
console.log('Payhip + PayPal stack (5% + 3.5% + $0.30, PAID-TEST.md approximation):', calc(9, 0, 5, 3.5, 0.30));
console.log('With 20% coupon (7.20 price), same fee stack as PAID-TEST.md:', calc(7.20, 0, 5, 3.5, 0.30));
