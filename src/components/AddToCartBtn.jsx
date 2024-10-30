import { useCart } from "../CartContext";
import styles from "../routes/Products.module.css";
const AddToCartBtn = ({ product }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    return addToCart(product);
  };

  return (
    <button 
      type="button" 
      onClick={handleClick}
      className={styles.addToCartBtn}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartBtn;