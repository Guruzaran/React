import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import "./App.css";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppdata = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };
    fetchAppdata();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
