import React from "react";
import { Link } from "react-router-dom";

function Forum() {
  const dummyPosts = [
    {
      _id: 1,
      number: 1,
      title: "첫 번째 게시물",
      views: 120,
      fileUrl: ["file1"],
      createdAt: "2023-01-01",
    },
    {
      _id: 2,
      number: 2,
      title: "두 번째 게시물",
      views: 95,
      fileUrl: [],
      createdAt: "2023-01-05",
    },
    {
      _id: 3,
      number: 3,
      title: "세 번째 게시물",
      views: 70,
      fileUrl: ["file2", "file3"],
      createdAt: "2023-01-10",
    },
    {
      _id: 4,
      number: 4,
      title: "네 번째 게시물",
      views: 50,
      fileUrl: [],
      createdAt: "2023-01-15",
    },
    {
      _id: 5,
      number: 5,
      title: "다섯 번째 게시물",
      views: 30,
      fileUrl: ["file4"],
      createdAt: "2023-01-20",
    },
  ];

  return (
    <div className="bg-white ">
      <div className="container max-w-6xl mx-auto py-12">
        {/* //업무게시판 제목 */}
        <div className="">
          <h1 className="text-center text-5xl  text-gray-800 font-bold">
            업무 게시판
          </h1>
        </div>
        {/* //전체보기 버튼 */}
        <div className="flex justify-end">
          <Link
            to="/board"
            className=" flex items-center px-6 py-3 bg-white text-gray-900 shadow-md rounded-lg"
          >
            전체보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* //게시판 내용들 5개 */}
        <div className="bg-white py-5">
          {dummyPosts.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-4 mb-4  text-gray-900  rounded-xl shadow-md hover:shadow-lg hover:bg-blue-100  transition-all duration-300"
            >
              <div>
                <div className="flex gap-5 mb-2">
                  <p>No.{item._id}</p>
                  <p>조회수: {item.views}</p>
                  {item.fileUrl.length > 0 ? (
                    <p>파일:{item.fileUrl.length}</p>
                  ) : (
                    <p>파일:0</p>
                  )}
                </div>

                <h3 className="text-gray-900 mb-2 font-bold hover:text-blue-500 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-700 mb-2">{item.createdAt}</p>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forum;
