import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";
const menuItems = [
  { path: "/", label: "홈" },
  { path: "/about", label: "회사정보" },
  { path: "/leadership", label: "임원소개" },
  { path: "/board", label: "업무게시판" },
  { path: "/our-service", label: "제공기술" },
  { path: "/contact", label: "문의하기" },
];
const MenuItem = ({ path, label }) => (
  <li>
    {/* //이동시킬거니까 링크로 */}
    <Link to={path} className="hover:text-blue-600">
      {label}
    </Link>
  </li>
);

function Navbar() {
  const [language, setLanguage] = useState("ko");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 bg-white text-black z-50 w-full p-4 shadow-md">
      <div className="container mx-auto   flex justify-between items-center">
        {/* nav가 전체 네비게이션 이고, 그안에 {회사이름, 소개버튼들, 언어 } 선택하려고 둔건가?  */}
        <h1 className="text-2xl ml-12 ">ABC Company</h1>

        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex gap-8 text-lg">
            {/* ul 안에있는 요소들을 모으기 위해서 unorder list를쓰는건가 */}
            {menuItems.map((item) => (
              <MenuItem key={item.path} {...item} />
            ))}
          </ul>
        </div>
        <select
          value={language}
          className="hidden lg:block border rounded-md p-1 font-bold hover:border-blue-500"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="ko">한국어</option>
          <option value="en">영어</option>
        </select>
        {/* 크기 작아졌을때 메뉴버튼 */}
        {/* <button> {isOpen ? <HiX /> : <HiMenu />} </button> */}
        <button className="lg:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {/* 모바일 버전 패널 만들기 */}

      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-100 text-black-900 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 gap-y-4">
          <button
            onClick={toggleMenu}
            className="flex justify-end w-full text-2xl"
          >
            <HiX />
          </button>
          <ul className="space-y-4 text-xl pt-8 flex flex-col items-start w-full">
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                {...item}
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </ul>
          <select
            onClick={(e) => {
              setLanguage(e.target.value);
            }}
            className="mt-8 px-3 border rounded-mdflex items-start w-full"
          >
            <option value="ko">한국어</option>
            <option value="en">영어</option>
          </select>
        </div>
      </div>

      {/* 만약 isopen=true이면 패널이 보이도록, 
      만약 false라면 translate-x-0, translate-x-full로 위치 안보이게 (toggleMenu활용해서)
      그리고 그안에 1. hix 버튼이 있고, 2. 그 아래에 MenuItems들이 들어있어서 맵으로 전개하기 , 
      3.그리고 맵전개할때  다른화면으로 이동하면 패널 안보이개하기  */}

      <div className="lg:hidden fixed top-0 right-0 bg-yellow"></div>
    </nav>
  );
}

export default Navbar;
