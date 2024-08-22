import { createBrowserRouter, Params } from "react-router-dom";
import RootLayout from "./RootLayout.tsx";
import { CategoryPage } from "./Pages/Category/index.tsx";
import HomePage from "./Pages/Search/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: () => null,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
        loader: ({ params }: { params: Params<"categoryName"> }) => ({
          categoryName: params.categoryName,
        }),
      },
    ],
  },
]);