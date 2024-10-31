import { Form } from "react-router-dom";
import styles from "./Dashboard.module.css";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const apiURL = `${import.meta.env.VITE_API_URL}/products/create`;
  const jsonData = Object.fromEntries(formData.entries());

  const data = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${sessionStorage.getItem('sb-access-token')}`,
    },
    body: JSON.stringify(jsonData),
  }).then((response) => response.json());

  return true;
};

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Product</h1>
      <div className={styles.formContainer}>
        <Form action="/dashboard" method="POST">
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Name:
              <input 
                type="text" 
                name="name" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Brand ID:
              <input 
                type="number" 
                name="brand_id" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Category ID:
              <input 
                type="number" 
                name="category_id" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Price:
              <input 
                type="number" 
                name="price" 
                step="0.01" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Description:
              <input 
                type="text" 
                name="description" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Subcategory ID:
              <input 
                type="number" 
                name="subcategory_id" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Image URL:
              <input 
                type="text" 
                name="image_url" 
                className={styles.input}
                required 
              />
            </label>
          </div>

          <button type="submit" className={styles.button}>
            Add Product
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;