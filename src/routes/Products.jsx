import { useLoaderData, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { categories } from "./Categories";

export const loader = async () => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/products`;
  const data = await fetch(apiUrl).then((response) => response.json());
  return data;
};

const Products = () => {
  const products = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  // Update selected category when URL parameter changes
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
            product.category.toLowerCase() === selectedCategory.toLowerCase()
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

        {categories.map(({ name }) => (
          <button
            key={name}
            onClick={() => handleCategoryChange(name)}
            className={`${styles.filterButton} ${
              selectedCategory === name ? styles.active : ""
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <ul className={styles.productList}>
        {filteredProducts.map((product) => {
          return (
            <li key={product.id} className={styles.productCard}>
              <Link
                to={`/products/${product.id}`}
                className={styles.productLink}
              >
                <h3 className={styles.productTitle}>{product.title}</h3>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Products;