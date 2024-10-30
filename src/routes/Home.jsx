import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Mall Rats</h1>
        <p className={styles.heroSubtitle}>Your Local Skate Plug</p>
        <Link to="/products" className={styles.heroButton}>
          Explore Our Products
        </Link>
      </section>

      {/* Featured Categories */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          <Link to="/products?category=Electronics" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>🔌</span>
            <h3>Electronics</h3>
            <p>Discover our tech collection</p>
          </Link>
          <Link to="/products?category=Jewelery" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>💍</span>
            <h3>Jewelery</h3>
            <p>Elegant accessories</p>
          </Link>
          <Link to="/products?category=Men's Clothing" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>👔</span>
            <h3>Men's Clothing</h3>
            <p>Stylish menswear</p>
          </Link>
          <Link to="/products?category=Women's Clothing" className={styles.categoryCard}>
            <span className={styles.categoryIcon}>👗</span>
            <h3>Women's Clothing</h3>
            <p>Trendy fashion</p>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Us?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🚚</span>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>⚡</span>
            <h3>Fast Delivery</h3>
            <p>2-3 business days</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>💯</span>
            <h3>Quality Products</h3>
            <p>Satisfaction guaranteed</p>
          </div>
          <div className={styles.featureCard}>
            <span className={styles.featureIcon}>🔒</span>
            <h3>Secure Payment</h3>
            <p>Safe & encrypted</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;