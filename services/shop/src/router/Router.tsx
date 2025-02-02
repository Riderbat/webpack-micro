import { App } from "@/components/App/App";
import Shop from "@/pages/shop/Shop";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/shop',
            component: <Suspense fallback="Loading..."><Shop/></Suspense>
        }
      ]
    },
  ]

export const router = createBrowserRouter(routes);

export default routes