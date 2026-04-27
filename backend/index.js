const express = require("express");
require("dotenv").config();

const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload");

app.use("/api/auth", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB에 연결되었습니다"))
  .catch((error) => console.log("❌DB연결에 실패했습니다", error));

app.get("/", (req, res) => {
  res.send("Hello world!");
});
//감시시키기 포트가 리슨중임/ 전화기 앞에서 대기하기. 프로세스를 종료시키지 않고, 무한루프상태유지
//포트에 들어오는 신호감지
app.listen(PORT, () => {
  console.log("~~Server is running");
});
