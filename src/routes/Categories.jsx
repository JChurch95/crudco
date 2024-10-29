import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import styles from './Categories.module.css';

// Loader function to fetch categories from FastAPI backend
async function categoriesLoader() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/categories/`);
    
  if (!response.ok) {
    throw new Error(`Failed to fetch categories. Status: ${response.status}`);
  }
    
  const data = await response.json();
  return data;
}

const Categories = () => {
  const categoriesList = useLoaderData();

  if (!categoriesList || categoriesList.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Categories</h1>
        <p className={styles.emptyState}>No categories available.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categoriesGrid}>
        {categoriesList.map(({ id, name, emoji }) => (
          <div key={id} className={styles.categoryCard}>
            <h2 className={styles.categoryTitle}>{name}</h2>
            <div className={styles.emojiContainer}>
              {emoji && (
                <span className={styles.emoji}>{emoji}</span>
              )}
            </div>
            <Link
              to={`/products?category=${encodeURIComponent(name)}`}
              className={styles.categoryLink}
            >
              View Products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Categories, categoriesLoader as loader };
export default Categories;