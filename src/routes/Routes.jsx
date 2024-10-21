import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Layout from "../pages/Layout";

const Routes = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
