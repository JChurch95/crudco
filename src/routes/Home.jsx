import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const categories = useLoaderData();

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
          {categories && categories.length > 0 ? (
            categories.map(({ id, name, emoji }) => (
              <Link 
                key={id}
                to={`/products?category=${encodeURIComponent(name)}`} 
                className={styles.categoryCard}
              >
                <span className={styles.categoryIcon}>{emoji}</span>
                <h3>{name}</h3>
                <p>Explore {name}</p>
              </Link>
            ))
          ) : (
            <p className={styles.emptyState}>No categories available.</p>
          )}
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