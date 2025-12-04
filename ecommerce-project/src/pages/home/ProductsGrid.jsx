import { formatMoney } from "../../utils/money.js";
import axios from "axios";
import { useState } from "react";
import { Product } from "./Product.jsx";

export function ProductsGrid({ products, loadCart }) {
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}
