import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const Layout = () => {
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <MainPage /> }, {}],
  },
]);

function App() {
  return (
    <>
      <div>
        {/* <RouterProvider router={router}/> */}
        <BrowserRouter>
          <Navbar />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
