import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import ForgotPassword from "../pages/ForgotPassword";
import ProtectedRoute from "../ProtectedRoute";
import PublicRoute from "../PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <PublicRoute>
            <AuthLayouts>
              <RegisterPage />
            </AuthLayouts>
          </PublicRoute>
        ),
      },
      {
        path: "email",
        element: (
          <PublicRoute>
            <AuthLayouts>
              <CheckEmailPage />
            </AuthLayouts>
          </PublicRoute>
        ),
      },
      {
        path: "password",
        element: (
          <PublicRoute>
            <AuthLayouts>
              <CheckPasswordPage />
            </AuthLayouts>
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <AuthLayouts>
              <ForgotPassword />
            </AuthLayouts>
          </PublicRoute>
        ),
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":userId",
            element: <MessagePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
