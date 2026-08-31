// Synthetic fixture: Unit test testing only the happy path, zero error checks
export function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

// AI-generated test: only tests 4/2 = 2, never tests b === 0 or negative numbers
export function testDivideHappyPath(): boolean {
  const result = divide(4, 2);
  return result === 2;
}
