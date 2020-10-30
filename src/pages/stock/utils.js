export function addStockProduct(stock, product, delta) {
  const copy = stock.slice();
  const index = copy.findIndex(i => i.id === product.id);

  if (index !== -1) {
    // Product already exists, update delta
    copy[index].delta = Math.max(-copy[index].stock, copy[index].delta + delta);
  } else {
    // Product not in changes list, add with delta
    copy.push({ ...product, delta: Math.max(-product.stock, delta) });
  }

  return copy;
}
