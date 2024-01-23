interface Product {
  id: string;
  price: number;
  quantity: number;
}

export function calculateSubTotal(products: Product[]): number {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

export function calculateShipping(products: Product[]): number {
  return products.reduce(
    (total, product) => total + product.price * 0.25 * product.quantity,
    0
  );
}

export function calculateTotalCost(subtotal: number, shipping: number): number {
  return subtotal + shipping;
}

export function updateProductQuantity(
  products: Product[],
  productId: string,
  newQuantity: number
): Product[] {
  return products.map((product) =>
    product.id === productId ? { ...product, quantity: newQuantity } : product
  );
}
