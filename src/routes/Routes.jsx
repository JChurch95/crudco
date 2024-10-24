import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from "../pages/Layout";
import Home from './Home';
import Categories, { loader as categoriesLoader } from './Categories';
import Products,{loader as productsLoader} from "./Products";
import ErrorPage from '../pages/Error';
import SingleProduct, {loader as singleProductLoader} from './SingleProduct';
import Registration, { action as registrationAction } from './Registration';
import Login, { action as loginAction } from './Login';



const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      //errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
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
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
