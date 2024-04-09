import { BaseProduct } from "./models";

export function calculateSubTotal(cartItems: BaseProduct[]): number {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

export function calculateShipping(cartItems: BaseProduct[]): number {
  return cartItems.reduce(
    (total, item) => total + item.price * 0.25 * item.quantity,
    0
  );
}

export function calculateTotalCost(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}

export function updateProductQuantity(
  cartItems: BaseProduct[],
  productId: string,
  newQuantity: number
): BaseProduct[] {
  return cartItems.map((item) =>
    item.id === productId ? { ...item, quantity: newQuantity } : item
  );
}
