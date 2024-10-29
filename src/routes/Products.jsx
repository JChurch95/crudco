import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Products.module.css";

export const loader = async () => {
  try {
    const categoriesUrl = `${import.meta.env.VITE_API_URL}/api/categories/`;
    const productsUrl = `${import.meta.env.VITE_API_URL}/api/products/`;

    const [categoriesResponse, productsResponse] = await Promise.all([
      fetch(categoriesUrl),
      fetch(productsUrl)
    ]);

    if (!categoriesResponse.ok || !productsResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const categories = await categoriesResponse.json();
    const products = await productsResponse.json();

    // Log responses to help with debugging
    console.log('Categories:', categories);
    console.log('Products:', products);

    return { products: products || [], categories };
  } catch (error) {
    console.error('Error loading data:', error);
    // Return empty arrays instead of throwing to prevent page crash
    return { products: [], categories: [] };
  }
};

const Products = () => {
  const { products, categories } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category_name?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <>
      <h2 className={styles.title}>Products</h2>

      <div className={styles.categoryFilter}>
        <button
          onClick={() => handleCategoryChange("all")}
          className={`${styles.filterButton} ${
            selectedCategory === "all" ? styles.active : ""
          }`}
        >
          All
        </button>

        {categories.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => handleCategoryChange(name)}
            className={`${styles.filterButton} ${
              selectedCategory === name ? styles.active : ""
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No products available {selectedCategory !== "all" ? `in ${selectedCategory}` : ""}</p>
          {selectedCategory !== "all" && (
            <button
              onClick={() => handleCategoryChange("all")}
              className={styles.filterButton}
            >
              View All Products
            </button>
          )}
        </div>
      ) : (
        <ul className={styles.productList}>
          {filteredProducts.map((product) => (
            <li key={product.id} className={styles.productCard}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productLink}
              >
                <h3 className={styles.productTitle}>{product.name}</h3>
                <img
                  src={product.image_url}
                  alt={product.name}
                  className={styles.productImage}
                />
                <div className={styles.productInfo}>
                  <p className={styles.productPrice}>
                    ${product.price?.toFixed(2)}
                  </p>
                  {product.rating_value && (
                    <div className={styles.ratingContainer}>
                      <div className={styles.rating}>
                        {"★".repeat(Math.floor(product.rating_value))}
                        {product.rating_value % 1 >= 0.5 ? "½" : ""}
                      </div>
                      <span className={styles.ratingCount}>
                        ({product.rating_count})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Products;