// Synthetic fixture: Missing boundary tests (empty string, huge input, negative values)
export function calculateDiscount(price: number, percentage: number): number {
  if (price < 0 || percentage < 0 || percentage > 100) {
    throw new Error("Invalid parameters");
  }
  return price * (1 - percentage / 100);
}

export function testStandardDiscount(): boolean {
  return calculateDiscount(100, 10) === 90;
}
