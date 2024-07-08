export function feeCalculator(
  pricePer: number,
  quantity: number,
  shippingCharge: number,
) {
  // Authorize.net per-transaction fee
  const percentageFee = 2.9 / 100; // 2.9%
  const fixedFee = 0.3; // $0.30

  const subtotal = pricePer * quantity + shippingCharge;

  // Calculate the adjusted amount to cover fees
  const adjustedAmount = (subtotal + fixedFee) / (1 - percentageFee);

  // Round to 2 decimal places
  const total = Math.round(adjustedAmount * 100) / 100;

  let fees = total - subtotal;

  return { total, subtotal, fees };
}
