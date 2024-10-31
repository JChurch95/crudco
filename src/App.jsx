import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";
import { publicRoutes } from "./routes/Routes";

const router = createBrowserRouter(publicRoutes);

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
