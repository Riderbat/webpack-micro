import { App } from "@/components/App/App";
import About from "@/pages/about/About";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes =      [{
    path: "/",
    element: <App/>,
    children: [
     {
         path: '/about',
         component: <Suspense fallback="Loading..."><About/></Suspense>
     }
    ]
  },
]

export const router = createBrowserRouter(routes);

export default routes

