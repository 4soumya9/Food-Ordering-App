import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./components/About";
// import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import "./index.css";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";

const Contact = lazy(() => import("./components/Contact"));



const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<h1>Loading... </h1>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        // resId will be dynamic , before dynamic data  ":" is required
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
   
    ],
  },
]);

// create root using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));
// passing react element inside root
root.render(<RouterProvider router={appRouter} />);

// In Server-side routing or rendering (SSR), every change in URL, http request is made to server to fetch the webpage,
//  and replace the current webpage with the older one.

// In Client-side routing or rendering (CSR), during the first load, the webapp is loaded from server to client,
// after which whenever there is a change in URL,
// the router library navigates the user to the new page without sending any request to backend. All Single Page Applications uses client-side routing.
