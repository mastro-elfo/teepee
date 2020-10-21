export function addStockProduct(stock, product, delta) {
  const copy = stock.slice();
  const index = copy.findIndex(i => i.id === product.id);

  if (index !== -1) {
    copy[index].stock = Math.max(0, copy[index].stock + delta);
  } else {
    copy.push({ ...product, stock: Math.max(0, product.stock + delta) });
  }

  return copy;
}
