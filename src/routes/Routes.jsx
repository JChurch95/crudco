import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from "../pages/Layout";
import Home from './Home';
import Categories, { loader as categoriesLoader } from './Categories';
import Products,{loader as productsLoader} from "./Products";
import ErrorPage from '../pages/Error';
import SingleProduct, {loader as singleProductLoader} from './SingleProduct';


const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
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
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
