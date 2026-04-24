import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // form의 기본동작이 submit하면 브라우저가 get/post(새로고침)을 한다. 새로고침되면 useState
    //로 저장된 값들이 날아가고, axios.post완료하기 전에 리셋돼니까 로그인이 안됨
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData,
        { withCredentials: true },
      );
      if (response.data) {
        navigate("/admin/posts");
      }
    } catch (error) {
      const errorMessage =
        error.response.data.message || "로그인에 실패했습니다 ";
      const remainingAttempts = error.response.data.remainingAttempts;
      setError({ message: errorMessage, remainingAttempts: remainingAttempts });
    }
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full p-10 space-y-8 rounded-2xl shadow-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
            관리자 로그인
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            관리자 전용 페이지입니다
          </p>
          <form className="mt-8 mb-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 ">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-md text-gray-700"
                >
                  아이디
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  required
                  placeholder="관리자아이디"
                  className="mt-1 px-2 block w-full py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-md text-gray-700"
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="관리자 비밀번호"
                  className="mt-1 px-2 block w-full py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
                {typeof error === "string" ? error : error.message}
                {error.remainingAttempts !== undefined && (
                  <div className="mt-1">
                    남은시도횟수: {error.remainingAttempts}
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full items-center px-4 py-3 border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-md"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
