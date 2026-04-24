const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

//미들웨어 필요
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다" });
  }

  try {
    //jwt.verify로 토큰이 있는지 확인하고, req.user에 토큰정보 담고,  있으면 다음으로넘기기
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("서버오류발생", error);
    res.status(401).json({ message: "유효하지 않은 토큰입니다" });
  }
};

//새로운 문의글 작성하기
router.post("/", async (req, res) => {
  //프론트에서 작성해서 post요청 보내면 디비에 저장하기

  try {
    const { name, email, phone, message, status } = req.body;
    const contact = new Contact({ name, email, phone, message, status });
    await contact.save();
    res.status(201).json({ message: "문의가 성공적으로 등록됐습니다" });
  } catch (error) {
    res.status(500).json({ message: "서버오류 발생 " });
  }
});

//문의글 불러오기(전체), authenticate이 필요
router.get("/", authenticateToken, async (req, res) => {
  try {
    //Contact.find에 더해서 sort도 해야됨
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 오류 발생 " });
  }
});

//개별 문의글 불러오기, authenticate필요
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "해당 문의를 찾을수없습니다" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    //상태만 뽑기
    const { status } = req.body;

    //해당 문의글 찾아서,
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!contact) {
      return res.status(404).json({ message: "해당 문의글이 없습니다" });
    }

    // const newContact = new Contact({...contact, status:nowStatus});-> 이렇게 되면 새문서가 생기는거
    res.json({ message: "문의 상태 수정이 성공했습니다", contact });
  } catch (error) {
    res.status(500).json({ message: "서버 오류" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "이미 삭제됐거나 없는 문의입니다" });
    }
    res.status(200).json({ message: "문의글 삭제 성공" });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
});
module.exports = router;
