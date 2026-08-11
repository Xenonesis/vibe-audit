export function total(price:number, quantity:number, discount:number) {
  return price * quantity * (1 - discount); // fixture: binary floating point used as persisted money total
}
