import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorElement from "../pages/shared/ErrorElement/ErrorElement";
import SignUp from "../pages/Auth/SignUp/SignUp";
import Login from "../pages/Auth/Login/Login";
import RecommendationsForMe from "../pages/RecommendationsForMe/RecommendationsForMe";
import MyRecom from "../pages/MyRecom/MyRecom";
import Queries from "../pages/Queries/Queries";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home/Home/Home";
import AddQueries from "../pages/MyQueriesContainer/AddQueries";
import QueryDetails from "../pages/QueryDetails/QueryDetails";
import MyQueriesContainer from "../pages/MyQueriesContainer/MyQueriesContainer";
import UpdateQueries from "../pages/MyQueriesContainer/UpdateQueries";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/queries",
        element: <Queries />,
        loader: () =>
          fetch("https://boycott-product-forum-server.vercel.app/allQueries"),
      },
      {
        path: "/queries/:id",
        element: (
          <PrivateRoutes>
            <QueryDetails />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://boycott-product-forum-server.vercel.app/queries/${params.id}`
          ),
      },
      {
        path: "/addqueries",
        element: <AddQueries />,
      },
      {
        path: "/recommendedforme",
        element: (
          <PrivateRoutes>
            <RecommendationsForMe />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/myqueries",
        element: (
          <PrivateRoutes>
            <MyQueriesContainer />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-queries/:id",
        element: <UpdateQueries />,
        loader: ({ params }) =>
          fetch(
            `https://boycott-product-forum-server.vercel.app/queries/${params.id}`
          ),
      },
      {
        path: "/myrecom",
        element: (
          <PrivateRoutes>
            <MyRecom />,
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
