import { useState, useEffect } from "react"; // Added useEffect import
import { useCart } from "../CartContext";

const CartNotifier = () => {
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useCart(); // Fixed typo in cartItems (was cartITems)

  useEffect(() => {
    const getQuantity = () => {
      if (!cartItems) return 0; // Added safety check
      
      return cartItems.reduce((acc, current) => {
        return acc + current.quantity;
      }, 0);
    };
    
    setQuantity(getQuantity()); // Added () to call the function
  }, [cartItems]);

  return (
    <div>
      <p>Items in Cart: {quantity}</p>
    </div>
  );
};

export default CartNotifier;
