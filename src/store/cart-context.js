import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  emptyCart: () => {},
});

export default CartContext;
