import React, { useState } from "react";
import Header from "./components/Layout/Header";
import FoodList from "./components/Food/FoodList";
import { useInView } from "react-intersection-observer";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderPopup from "./components/Layout/OrderPopup";
import Footer from "./components/Layout/Footer";

function App() {
  const [inntersectionRef, isVisible] = useInView();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const cartOpenHandeler = (value) => {
    setIsCartOpen(value);
  };

  const orderClickHandeler = () => {
    setIsOrderPlaced(true);
    setInterval(() => {
      setIsOrderPlaced(false);
    }, 3000);
  };

  return (
    <CartProvider>
      <div ref={inntersectionRef}></div>
      {isCartOpen && <Cart clickHandeler={cartOpenHandeler} onOrderClick={orderClickHandeler} />}
      <Header isIntersecting={!isVisible} clickHandeler={cartOpenHandeler} />
      {isOrderPlaced && <OrderPopup />}
      <FoodList />
      <Footer />
    </CartProvider>
  );
}

export default App;
