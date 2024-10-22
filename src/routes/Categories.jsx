import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import styles from './Categories.module.css';

export const categories = [
  { name: "Electronics", emoji: "🔌" },
  { name: "Jewelery", emoji: "💍" },
  { name: "Men's Clothing", emoji: "👔" },
  { name: "Women's Clothing", emoji: "👗" }
];

export async function loader() {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/products`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Error loading products:', error);
    throw error;
  }
}

const Categories = () => {
  const products = useLoaderData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.categoriesGrid}>
        {categories.map(({ name, emoji }) => {
          const categoryProducts = products?.filter(product => 
            product.category.toLowerCase().replace(/[']/g, '').replace(/\s+/g, ' ').trim() === 
            name.toLowerCase().replace(/[']/g, '').replace(/\s+/g, ' ').trim()
          ) || [];

          return (
            <div key={name} className={styles.categoryCard}>
              <h2 className={styles.categoryTitle}>{name}</h2>
              <div className={styles.emojiContainer}>
                <span className={styles.emoji}>{emoji}</span>
              </div>
              <Link 
                to={`/products?category=${encodeURIComponent(name)}`}
                className={styles.categoryLink}
              >
                View {categoryProducts.length} Products
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;