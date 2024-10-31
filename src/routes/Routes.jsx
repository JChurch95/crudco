import { Navigate } from 'react-router-dom';
import Layout from '../pages/Layout';
import Home from './Home';
import Products, { loader as productsLoader } from './Products';
import SingleProduct, { loader as singleProductLoader } from './SingleProduct';
import Categories, { loader as categoriesLoader } from './Categories';
import Registration, { action as registrationAction } from './Registration';
import Login, { action as loginAction } from './Login';
import Dashboard, { action as dashboardAction } from './Dashboard';
import { useAuth } from '../AuthContext';

// Protected Layout wrapper component
const ProtectedLayout = ({ children }) => {
  const { user, token } = useAuth();
  
  if (!user || !token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Define public routes configuration
export const publicRoutes = [
  {
    element: <Layout />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: categoriesLoader
      },
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
      {
        path: "/categories",
        element: <Categories />,
        loader: categoriesLoader,
      },
      {
        path: "/registration",
        element: <Registration />,
        action: registrationAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      // Protected Dashboard route
      {
        path: "/dashboard",
        element: (
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        ),
        action: dashboardAction
      },
    ],
  },
];