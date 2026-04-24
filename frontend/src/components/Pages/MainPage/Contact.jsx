import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-5 mb-10 ">
          <h1 className="text-5xl font-bold">문의하기</h1>
          <p className="text-gray-600">
            궁금하신 점이 있으신가요? 언제든 문의해주세요
          </p>
        </div>
        <div className="text-center grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          {[
            {
              title: "전화 문의",
              info: "02-1234-5678",
              subInfo: "평일 09:00 - 18:00",
            },
            {
              title: "이메일 문의",
              info: "support@example.com",
              subInfo: "24시간 접수 가능",
            },
            {
              title: "위치",
              info: "서울특별시 강남구",
              subInfo: "삼성동 123번지",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 text-center  rounded-xl border border-gray-300 space-x-2"
            >
              <p className="font-semibold text-xl mb-3">{item.title}</p>
              <p className=" text-gray-500">{item.info}</p>
              <p className=" text-gray-500">{item.subInfo}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl my-10 px-20">
          {" "}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1106911986126!2d126.9768611!3d37.576011099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca37454f683b1%3A0xfa19c5217c6a0bc0!2z6rK967O16raBIOq0ke2ZlOusuA!5e0!3m2!1sko!2skr!4v1773972936245!5m2!1sko!2skr"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="w-full h-100 rounded-2xl max-4xl"
          ></iframe>
        </div>
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="bg-blue-600 text-white text-center text-xl hover:bg-blue-800 px-8 py-4 rounded-2xl"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
