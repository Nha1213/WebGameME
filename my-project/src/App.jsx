import Login from "./Page/User/Login";
import Homepage from "./Page/Home/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Page/User/Register";
import ForgetPass from "./Page/User/ForgetPass";
import ChangePass from "./Page/User/ChangePass";
import MainLayOut from "./dashboard/MainLayOut";
import Player from "./dashboard/Player";
import Dashboard from "./dashboard/Dashboard";
import TeamPage from "./dashboard/TeamPage";
import Price_poor from "./dashboard/Price_poor";

const router = createBrowserRouter([
  {
    index: true,
    element: <Login />,
  },
  {
    path: "homepage",
    element: <Homepage />,
  },
  {
    path: "forget-password",
    element: <ForgetPass />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "change-password",
    element: <ChangePass />,
  },

  {
    path: "dashboard",
    element: <MainLayOut />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "player", // ❌ remove "/"
        element: <Player />,
      },
      {
        path: "team", // ❌ remove "/"
        element: <TeamPage />,
      },
      {
        path: "player",
        element: <Player />
      },
      {
        path: "pricepool",
        element: <Price_poor/>
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
