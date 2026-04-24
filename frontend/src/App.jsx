import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer/Footer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainPage from "./components/Pages/MainPage/MainPage";
import Leadership from "./components/Pages/Leadership/Leadership";
import Contact from "./components/Pages/Contact/Contact";
import Services from "./components/Pages/Services/Services";
import Board from "./components/Pages/Board/Board";
import About from "./components/Pages/About/About";
import { useNavigate } from "react-router-dom";
import AdminLogin from "./components/Pages/Admin/AdminLogin";
import AdminPost from "./components/Pages/Admin/AdminPost";

import AdminCreatePost from "./components/Pages/Admin/AdminCreatePost";
import AdminContacts from "./components/Pages/Admin/AdminContacts";
import AdminEditPost from "./components/Pages/Admin/AdminEditPost";
import AdminNavbar from "./components/AdminNavbar/AdminNavbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

//관리자 관련 접근하려면, 쿠키있는지 확인
const ProtectedRoute = () => {
  //상태관리
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null); //근데 이 셋유저가 필수 state인가?

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/verify-token",
          {},
          { withCredentials: true },
        );

        setIsAuthenticated(response.data.isValid);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        console.log("토큰인증에 실패했습니다", error);
        setUser(null);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

const AuthRedirectRoute = () => {
  //토큰이 있으면, 바로 /admin/posts로 리다이렉트
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null); //근데 이 셋유저가 필수 state인가?

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/verify-token",
          {},
          { withCredentials: true },
        );

        setIsAuthenticated(response.data.isValid);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        console.log("토큰인증에 실패했습니다", error);
        setUser(null);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/posts" /> : <Outlet />;
  //로그인(인증)했으면 로그인화면 접근하지말고, admin/posts 화면으로 가고, 아니면
  //outlet(자식)을 렌더링해줘, --아래 path 정의에 의하면 자식은 AdminLogin이야
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/leadership", element: <Leadership /> },
      { path: "/contact", element: <Contact /> },
      { path: "/board", element: <Board /> },
      { path: "/our-service", element: <Services /> },
      { path: "/about", element: <About /> },
    ],
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "posts", element: <AdminPost /> },
          { path: "create-post", element: <AdminCreatePost /> },
          { path: "edit-post/:id", element: <AdminEditPost /> },
          { path: "contacts", element: <AdminContacts /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
