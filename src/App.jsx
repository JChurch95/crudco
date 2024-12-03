import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";
import { publicRoutes } from "./routes/Routes";
import styles from './App.module.css';

const router = createBrowserRouter(publicRoutes);

const App = () => {
  return (
    <>
      <div className={styles.backgroundContainer} />
      <div className={styles.contentWrapper}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;