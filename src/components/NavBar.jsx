import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import CartNotifier from "./CartNotifier";

const NavBar = () => {
  const { user, token, logout } = useAuth();
  const { cartItems }= useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logout();
    if (!error) {
      navigate("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            Mall Rats
          </Link>

          <div className={styles.navLinksContainer}>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className={styles.navLink}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className={styles.navLink}>
                  Categories
                </Link>
              </li>
              {!user && !token && (
                <>
                  <li>
                    <Link to="/registration" className={styles.navLink}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className={styles.navLink}>
                      Login
                    </Link>
                  </li>
                </>
              )}
              {user && token && (
                <li>
                  <button
                    onClick={handleLogout}
                    className={
                      styles.button
                    } /* Updated to match Login button class */
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.socialLinks}>
        <li>{CartNotifier}</li>
          <button className={styles.socialButton}>
            <Facebook size={20} />
          </button>
          <button className={styles.socialButton}>
            <Instagram size={20} />
          </button>
          <button className={styles.socialButton}>
            <Linkedin size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
