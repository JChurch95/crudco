import { useState } from "react";
import { useCart } from "../CartContext";

const CartNotifier = () => {
  const [quantity, setQuantity] = useState(0);
  const { cartITems } = useCart();

  useEffect(() => {
    const getQuantity = () => {
      return cartItems.reduce((acc, current) => {
        return acc + current.quantity;
      }, 0);
    };
    setQuantity(getQuantity);
  }, [cartItems]);

  return <p>Items in Cart</p>;
};

export default CartNotifier;
