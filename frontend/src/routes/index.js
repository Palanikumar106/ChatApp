import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import HomePage from "../pages/HomePage";
import Message from "../components/Message";
import Authlayout from "../layout";
import Chatbot from "../components/Chatbot";
import ForgotPassword from "../pages/ForgotPassword";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "register",
        element: (
          <Authlayout>
            <RegisterPage />
          </Authlayout>
        ),
      },
      {
        path: "email",
        element: (
          <Authlayout>
            <CheckEmail />
          </Authlayout>
        ),
      },
      {
        path: "password",
        element: (
          <Authlayout>
            <CheckPassword />
          </Authlayout>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Authlayout>
            <ForgotPassword />
          </Authlayout>
        ),
      },
      {
        path: "/",
        element: <HomePage />,
        children: [
          {
            path: "/:userId",
            element: <Message />,
          },
          {
            path:'/chatbot/:userId',
            element:<Chatbot/>
          },
        ],
      },
    ],
  },
]);

export default routes;
