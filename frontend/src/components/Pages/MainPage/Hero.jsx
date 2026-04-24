import React from "react";
import HeroImage from "../../../assets/Image1.jpg";

function Hero() {
  return (
    <div className="relative min-h-[110vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container  mx-auto  px-6 sm:px-6 py:28 ">
        <div className="flex flex-col lg:flex-row mt-28 justify-between items-start gap-10">
          <div className="flex-1 text-center lg:text-left lg:py-20 ml-12 font-semibold">
            <h1 className="lg:text-6xl text-5xl  text-gray-900 leading-tight">
              태양광 설비 전문가와 함께
              <span className=" block mt-4 text-blue-700 font-medium ">
                미래를 만들어갑니다.
              </span>
            </h1>
            <p className="mt-12 text-lg lg:text-xl ">
              안전하고 효율적인 태양광 설비 설치부터 유지보수까지, 전문가들이
              함께합니다.
            </p>
            <div className="flex gap-6 mt-12 justify-center lg:justify-start ">
              <button className="px-8 py-4 bg-blue-600 text-xl text-white rounded-lg font-semibold hover:bg-blue-500">
                상담신청하기
              </button>
              <button className="border px-8 py-4 bg-white text-lg text-blue-600 rounded-lg font-semibold hover:bg-gray-200">
                더 알아보기
              </button>
            </div>
          </div>

          <div className="flex-1">
            <img
              src={HeroImage}
              className="rounded-xl shadow-lg hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
      {/* 4개 수치들 */}
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 mx-auto gap-8 ">
          {[
            { number: "1200+", label: "설치완료" },
            { number: "98+", label: "고객만족도" },
            { number: "15년+", label: "업계경력" },
            { number: "24/7", label: "기술지원" },
          ].map((status) => (
            <div className="text-center space-y-4">
              <div className="text-blue-700 text-4xl font-semibold">
                {status.number}
              </div>
              <div className="text-gray-900  ">{status.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
