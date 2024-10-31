import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import CartNotifier from "./CartNotifier";

const NavBar = () => {
  // Get authentication state and logout function from AuthContext
  const { user, token, logout } = useAuth();
  // Get cart state from CartContext
  const { cartItems } = useCart();
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Logout handler - called when user clicks logout button
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
            Mall Rats 🐀
          </Link>

          <div className={styles.navLinksContainer}>
            <ul className={styles.navLinks}>
              {/* These links are always visible regardless of auth state */}
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

              {/* Show these links only when user is NOT logged in */}
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

              {/* Show these links only when user IS logged in */}
              {user && token && (
                <>
                  <li>
                    <Link to="/dashboard" className={styles.navLink}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className={styles.button}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <CartNotifier />
          <a href="#" className={styles.socialButton}>
            <Facebook size={20} />
          </a>
          <a href="#" className={styles.socialButton}>
            <Instagram size={20} />
          </a>
          <a href="#" className={styles.socialButton}>
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
