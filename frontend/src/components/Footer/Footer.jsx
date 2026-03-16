import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { RiKakaoTalkLine } from "react-icons/ri";

function Footer() {
  const scrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 ">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl mb-4 font-bold">회사소개</h3>
              <p className="text-gray-300">
                저희 회사는 최고의 서비스를 제공합니다
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 font-bold">빠른 링크</h3>
              <ul className="space-y-4">
                <li>
                  {" "}
                  <Link to="/" onClick={scrolltoTop}>
                    홈{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/about" onClick={scrolltoTop}>
                    회사정보{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/leadership" onClick={scrolltoTop}>
                    임원소개{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/board">업무게시판 </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/our-service" onClick={scrolltoTop}>
                    제공기술{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/contact" onClick={scrolltoTop}>
                    문의{" "}
                  </Link>{" "}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl mb-4 font-bold">연락처</h3>
              <ul className="space-y-2 text-gray-400">
                <li>서울특별시 강남구</li>
                <li>삼성동123</li>
                <li>전화: 02-933</li>
                <li>이메일: inf@example.com</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl mb-4 font-bold">소셜미디어</h3>
              <div className="flex gap-4">
                <CiLinkedin />
                <RiKakaoTalkLine />
                <CiTwitter />
                <FaInstagram />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
