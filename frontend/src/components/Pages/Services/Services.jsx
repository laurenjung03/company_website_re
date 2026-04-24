import React from "react";

function Services() {
  const servicesList = [
    {
      id: 1,
      title: "맞춤형 소프트웨어 개발",
      description: "고객의 요구사항에 맞는 최적화된 솔루션을 제공합니다.",
      icon: "💻",
    },
    {
      id: 2,
      title: "클라우드 서비스",
      description: "안정적이고 확장 가능한 클라우드 인프라 구축 및 관리",
      icon: "☁️",
    },
    {
      id: 3,
      title: "보안 솔루션",
      description: "최신 보안 기술을 적용한 안전한 시스템 구축",
      icon: "🔒",
    },
    {
      id: 4,
      title: "기술 컨설팅",
      description: "전문가의 분석을 통한 최적의 기술 전략 수립",
      icon: "📊",
    },
  ];
  const process = [
    {
      step: "01",
      title: "요구사항 분석",
      desc: "고객의 니즈와 목표를 정확히 파악",
    },
    {
      step: "02",
      title: "설계 및 기획",
      desc: "최적의 솔루션 설계와 개발 계획 수립",
    },
    {
      step: "03",
      title: "개발 및 테스트",
      desc: "체계적인 개발과 품질 검증 진행",
    },
    {
      step: "04",
      title: "배포 및 유지보수",
      desc: "안정적인 서비스 운영과 지속적인 개선",
    },
  ];

  return (
    <div className="container mx-auto py-32">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-3">
          우리의 서비스
        </h2>
        <p className="text-gray-600 ">
          {" "}
          혁신적인 기술로 비즈니스의 성공을 지원합니다
        </p>
      </div>
      <div className="mt-12 max-w-5xl mx-auto  px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servicesList.map((item, index) => (
          <div
            key={index}
            className="p-4 shadow-xl rounded-xl hover:-translate-y-1"
          >
            <div className="">
              <h1 className="text-4xl mb-2">{item.icon}</h1>
              <p className="text-lg font-semibold mb-1">{item.title}</p>
              <p className="text-lg"> {item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 md:max-w-4xl mx-auto text-center mt-24">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          왜 우리를 선택해야 할까요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-gray-50 rounded-xl shadow-md px-6 py-3">
            <p className="text-gray-700 font-semibold mb-1">10년+ 경험</p>
            <p className="text-gray-500">다양한 산업 분야의 프로젝트 경험</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-md px-6 py-3">
            <p className="text-gray-700 font-semibold mb-1">전문가 팀</p>
            <p className="text-gray-500">숙련된 개발자와 컨설턴트로 구성</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-md px-6 py-3">
            <p className="text-gray-700 font-semibold mb-1">24/7 지원</p>
            <p className="text-gray-500">연중무휴 기술 지원 서비스</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            프로젝트 진행 프로세스{" "}
          </h1>
        </div>

        <div className="mt-12 max-w-5xl mx-auto  px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {process.map((item, index) => (
            <div
              key={index}
              className="p-4 shadow-xl rounded-xl hover:-translate-y-1"
            >
              <div className="">
                <h1 className="text-4xl font-semibold text-indigo-600 mb-2">
                  {item.step}
                </h1>
                <p className="text-lg font-semibold mb-1">{item.title}</p>
                <p className="text-lg"> {item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <div className="p-6 mt-12 bg-indigo-600 text-center space-y-2 max-w-3xl mx-auto rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-white ">
          프로젝트를 시작할 준비가 되셨나요?
        </h1>
        <p className="text-white">
          전문가와 상담하고 최적의 솔루션을 찾아보세요
        </p>
        <button className="px-4 py-2 bg-white text-blue-700 rounded-xl ">
          무료 상담 신청하기
        </button>
      </div>
    </div>
  );
}

export default Services;
