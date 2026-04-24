import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminContacts = () => {
  //1. 문의글들 관리
  const [contacts, setContacts] = useState([]);

  //1. 불러오는건 useEffect쓰기
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("http://localhost:4000/api/contact", {
        withCredentials: true,
      });
      if (!response) {
        console.log("불러올수없습니다");
      }
      setContacts(response.data);
    };
    fetchContacts();
  }, []);

  //2. 필터링 관리
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");

  const changeType = (e) => {
    setSearchType(e.target.value);
  };
  const changeTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const changeStatus = (e) => {
    setSearchStatus(e.target.value);
  };
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      //contact은 개별 문의글 하나 행
      //1. 선택된필터에 해당하는 값 꺼내기
      const value = contact[searchType].toLowerCase(); // lauren, hong,hong2 등
      //2. "lauren,hong,hong2" 값들이 searchTerm에 작성한 "h"와 일치하는지
      const matchSearch = value.includes(searchTerm.toLowerCase());

      //3. 상태 필터 확인
      const matchStatus =
        contact.status === searchStatus || searchStatus === "all";

      return matchSearch && matchStatus;
    });
  }, [searchType, searchStatus, searchTerm, contacts]);

  //3. 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const totalPages = Math.ceil(filteredContacts.length / pageNumber);
  const start = (currentPage - 1) * pageNumber;

  const paginatedContacts = useMemo(() => {
    return filteredContacts.slice(start, start + pageNumber);
  }, [contacts, currentPage, pageNumber, filteredContacts]);

  //4. 수정,삭제하기 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/contact/${selectedContact._id}`,
        { status: newStatus },
        { withCredentials: true },

        //지금 상태로는 백엔드만 바뀌었으니까, 프론트도 바뀔수있도록 해야한다
        setContacts(
          contacts.map((contact) =>
            contact._id === selectedContact._id
              ? { ...contact, status: newStatus }
              : contact,
          ),
        ),
      );

      setIsModalOpen(false);
      Swal.fire("수정완료!", "상태가 성공적으로 수정됐습니다", "success");
    } catch (error) {
      Swal.fire("수정실패", "상태변경에 실패했습니다", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/contact/${id}`,
          { withCredentials: true },
        );
        setContacts(
          contacts.filter((contact) => {
            return contact._id !== id;
          }),
        );
      } catch (error) {
        Swal.fire("삭제실패", error);
      }
    }
  };
  return (
    <div className="p-4 mx-auto max-w-350">
      <h1 className="text-4xl font-bold mt-6 mb-4">문의 관리</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            onChange={(e) => changeType(e)}
          >
            <option value="name">이름</option>
            <option value="email">이메일</option>
            <option value="phone">전화번호</option>
            <option value="message">문의내용</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full border rounded px-3 py-2 text-base"
              onChange={(e) => changeTerm(e)}
            />
          </div>
          <select
            className="border rounded px-3 py-2 text-base"
            onChange={(e) => changeStatus(e)}
          >
            <option value="all">전체 상태</option>
            <option value="pending">대기중</option>
            <option value="in progress">진행중</option>
            <option value="completed">완료</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-base font-bold text-gray-600">
            페이지당 표시:{" "}
          </label>
          <select
            className="border rounded px-3 py-2"
            onClick={(e) => setPageNumber(e.target.value)}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{`${size}개`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-lg font-bold text-gray-600">
          총 {filteredContacts.length}개의 문의
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-lg font-bold">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">번호</th>
              <th className="px-4 py-3 text-left">이름</th>
              <th className="px-4 py-3 text-left">이메일</th>
              <th className="px-4 py-3 text-left">휴대폰</th>
              <th className="px-4 py-3 text-left">문의 내용</th>
              <th className="px-4 py-3 text-left">상태</th>
              <th className="px-4 py-3 text-center">관리</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((contact, index) => (
              <tr key={contact.id} className="border-b">
                <td className="px-4 py-3 text-center">
                  {(currentPage - 1) * pageNumber + (index + 1)}
                </td>
                <td className="px-4 py-3">{contact.name}</td>
                <td className="px-4 py-3">{contact.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{contact.phone}</td>
                <td className="px-4 py-3">{contact.message}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      contact.status === "pending"
                        ? "bg-blue-100 text-blue-800"
                        : contact.status === "in progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-200 text-green-800"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        setIsModalOpen(!isModalOpen);
                        setSelectedContact(contact);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(contact._id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {paginatedContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-lg bg-white shadow-md"
          >
            <div className="text-lg font-bold">번호: {contact.id}</div>
            <div>이름: {contact.name}</div>
            <div>이메일: {contact.email}</div>
            <div>휴대폰: {contact.phone}</div>
            <div>내용: {contact.message}</div>
            <div>
              상태:
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  contact.status === "대기중"
                    ? "bg-blue-100 text-blue-800"
                    : contact.status === "진행중"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }`}
              >
                {contact.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setSelectedContact(contact);
                }}
              >
                수정
              </button>
              <button
                className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(contact._id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className="px-3 py-1">
          {currentPage} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
      {/* 모달창 */}
      {isModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">문의 상태 수정</h2>
            <div className="mb-4">
              <p className="font-medium mb-2">
                현재상태:{" "}
                {selectedContact.status === "in progress"
                  ? "진행중"
                  : selectedContact.status === "pending"
                    ? "대기중"
                    : "완료"}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleStatusUpdate("pending")}
                  className="w-full px-4 py-2 bg-blue-200 rounded hover:bg-blue-300"
                >
                  대기중
                </button>
                <button
                  onClick={() => handleStatusUpdate("in progress")}
                  className="w-full px-4 py-2 bg-yellow-200 rounded hover:bg-b-yellow-300"
                >
                  진행중
                </button>
                <button
                  onClick={() => handleStatusUpdate("complete")}
                  className="w-full px-4 py-2 bg-green-200 rounded hover:bg-green-300"
                >
                  완료
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
