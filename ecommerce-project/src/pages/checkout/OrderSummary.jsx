import dayjs from "dayjs";
import { formatMoney } from "../../utils/money.js";
import { DeliveryOptions } from "./DeliveryOptions.jsx";
import axios from "axios";
import { useState } from "react";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          const [updateQuantity, setUpdateQuantity] = useState(false);
          const [quantity, setQuantity] = useState(cartItem.quantity);

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };
          const changeQuantity = (event) => {
            setQuantity(Number(event.target.value));
          };

          const updateCartItem = async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              quantity: quantity,
            });
            await loadCart();
          };

          const enableUpdate = () => {
            if (updateQuantity) {
              updateCartItem();
            }
            setUpdateQuantity(!updateQuantity);
          };

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMS).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      {updateQuantity ? (
                        <input
                          type="text"
                          className="quantity-text"
                          value={quantity}
                          onChange={changeQuantity}
                        />
                      ) : (
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      )}
                    </span>
                    <span
                      className="update-quantity-link link-primary"
                      onClick={enableUpdate}
                    >
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
