import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            Crud Co.
          </Link>
          
          <div className={styles.navLinksContainer}>
            <ul className={styles.navLinks}>
              <li>
                <Link to="/" className={styles.navLink}>Home</Link>
              </li>
              <li>
                <Link to="/products" className={styles.navLink}>Products</Link>
              </li>
              <li>
                <Link to="/categories" className={styles.navLink}>Categories</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons on the right */}
        <div className={styles.socialLinks}>
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