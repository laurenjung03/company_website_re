const express = require("express");
const router = express.Router();

//multer, uuid, s3client 사용

//1. 패키지 불러오기
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

//2. mic-drop ==> client s3 setting(.env 값 넣어야됨)
//내 서버-aws s3 사이의 연결 담당(상담원느낌?),
//  s3에 파일올리려면 aws와 통신해야되는데 그 연결 담당 객체
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
//3. multer 설정
const imageUpload = multer({
  storage: multer.memoryStorage(), //디스크 말고 메모리 임시저장
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

//로그인 한 사람만 upload하면 되니까 verify-token middleware 만들기
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다" });
  }
  next();
};

router.post(
  "/image",
  verifyToken,
  imageUpload.single("image"),
  async (req, res) => {
    try {
      //1. 파일 이름 정하고

      const file = req.file; /**일단 파일 가져오기!! 이거 빼먹음  */
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;

      //2. 올릴 내용 명세서 작성
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME, //어디에 저장할지??
        Key: `post-images/${fileName}`, //경로??
        ContentType: file.mimetype, //jpg?pdf?
        Body: file.buffer, //실제 파일 데이터
      };

      //3. 실제 업로드하기
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/post-images/${fileName}`;
      res.json({ imageUrl });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "이미지 업로드 중 에러발생" });
    }
  },
);

//파일 업로드하기
router.post(
  "/file",
  verifyToken,
  fileUpload.single("file"),
  async (req, res) => {
    try {
      //1. 파일 이름 -image와 달리 원래 이름을 쓴다
      const file = req.file;
      const originalName = req.body.originalName;
      const decodedFileName = decodeURIComponent(originalName);
      //2. 올릴 내용 명세서
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `post-files/${decodedFileName}`,
        ContentType: file.mimetype,
        Body: file.buffer,
        ContentDisposition: `attachment; filename*=UTF-8''${encodeURIComponent(decodedFileName)}`,
      };
      //3. 실제로 올리기
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/post-files/${decodedFileName}`;

      res.json({ fileUrl });
    } catch (error) {
      res.status(500).json({ error: "파일 업로드중 오류 발생" });
    }
  },
);

module.exports = router;
