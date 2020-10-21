export const total = list =>
  list.reduce((carry, { price, quantity }) => carry + price * quantity, 0);

export const totalCount = list =>
  list.reduce((carry, { quantity }) => carry + quantity, 0);
