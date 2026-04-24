import React, { useState } from "react";
import axios from "axios";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "in progress",
  });

  //handleChange로 setFormData내용 관리하기
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact",
        formData,
      );
      if (!response) {
        console.log("등록에 실패함");
      }
      if (response.status === 201) {
        alert("문의 등록 성공!");
        //잘됐으면 formData 내용 비우기
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "in progress",
        });
      }
    } catch (error) {
      console.log("접속에 실패했습니다");
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-36">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">문의하기</h1>
        <p className="text-gray-500">
          태양광 설비 설치부터 유지보수까지, 전문가와 상담하세요, 24시간 내에
          답변드립니다
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto mt-12 gap-8">
        <div className="">
          <form
            className="p-4 rounded-xl shadow-xl space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 mt-2">이름</label>
              <input
                placeholder="홍길동"
                className=" w-full rounded-xl border border-gray-200 pl-3"
                value={formData.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className="block mb-2">이메일</label>
              <input
                placeholder="example@naver.com"
                className="w-full rounded-xl border border-gray-200 pl-3"
                value={formData.email}
                name="email"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className="block mb-2">전화번호</label>
              <input
                placeholder="010-0000-0000"
                className="rounded-xl border border-gray-200 pl-3"
                value={formData.phone}
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <label className="block mb-2">문의내용</label>
              <textarea
                placeholder="문의를 작성해주세요 "
                className="w-full rounded-xl border h-40 border-gray-200 pl-3"
                value={formData.message}
                name="message"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="w-full rounded-xl  bg-blue-600 text-white text0center p-2">
              문의하기
            </button>
          </form>
        </div>

        <div>
          <div className="rounded-xl shadow-lg p-2">
            <h3 className="text-xl text-gray-600 font-semibold mb-3">
              연락처 정보
            </h3>
            {[
              {
                icon: "phone",
                title: "전화",
                info: "02-1234-5678",
                desc: "평일 09:00 - 18:00",
              },
              {
                icon: "envelope",
                title: "이메일",
                info: "support@example.com",
                desc: "24시간 접수 가능",
              },
              {
                icon: "map-marker-alt",
                title: "주소",
                info: "서울특별시 강남구 삼성동 123번지",
                desc: "본사",
              },
            ].map((item, index) => (
              <div key={index} className="text-gray-500 ml-3 mb-2">
                <p className="text-lg mb-1">{item.title}</p>
                <p>{item.info}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl ">
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
        </div>
      </div>
    </div>
  );
}

export default Contact;
