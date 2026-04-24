import React from "react";
import { useState } from "react";

function Board() {
  const dummyPosts = [
    {
      _id: 1,
      number: 1,
      title: "첫 번째 게시물",
      createdAt: "2023-11-01T10:00:00",
      views: 10,
    },
    {
      _id: 2,
      number: 2,
      title: "두 번째 게시물",
      createdAt: "2023-11-02T11:30:00",
      views: 20,
    },
    {
      _id: 3,
      number: 3,
      title: "세 번째 게시물",
      createdAt: "2023-11-03T14:00:00",
      views: 30,
    },
    {
      _id: 4,
      number: 4,
      title: "네 번째 게시물",
      createdAt: "2023-11-04T16:45:00",
      views: 40,
    },
    {
      _id: 5,
      number: 5,
      title: "다섯 번째 게시물",
      createdAt: "2023-11-05T09:15:00",
      views: 50,
    },
  ];
  // 문의가 전체 몇페이지 있는지,한페이지당 몇개의 아이템들이 있는지,
  //나중에 백엔드 연결하면 사용
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  const indexOfLastPost = currentPage * setItemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div className="container mx-auto py-32">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-gray-800"> 업무 게시판</h2>
      </div>
      <div className=" p-6">
        <table className="min-w-full border max-w-6xl mx-auto border-gray-200">
          <thead className=" bg-gray-50">
            <tr className="text-md">
              <th className="px-4 py-3 w-[10%]">번호</th>
              <th className="px-4 py-3 w-[10%]">제목</th>
              <th className="px-4 py-3 w-[20%]">작성일</th>
              <th className="px-4 py-3 w-[20%]"> 조회수</th>
            </tr>
          </thead>
          <tbody>
            {dummyPosts.map((item, index) => (
              <tr key={index} className="divide divide-y-0 text-center">
                <td className="px-4 py-3 w-[10%] text-md">{item.number}</td>
                <td className="px-4 py-3 w-[10%] text-md">{item.title}</td>
                <td className=" px-4 py-3 w-[20%] text-md">{item.createdAt}</td>
                <td className=" px-4 py-3 w-[20%] text-md">{item.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Board;
