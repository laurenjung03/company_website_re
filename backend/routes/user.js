const express = require("express");
const app = express();
//라우팅을 하기위해서 router필요하고, db이용하기 위해서 User를 갖고온다

const router = express.Router();
const User = require("../models/User");
//암호화위해서 bcrupt필요
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    //1.client한테 username,password가 담긴 요청이 오면,
    const { username, password } = req.body;

    //2.이미 존재하는 동일한 아이디있는지 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(401).json({ message: "이미 존재하는 유저입니다" });
    }
    //3.새로운 아이디(유저)면, 비밀번호를 암호화한다
    const hashedPassword = await bcrypt.hash(password, 10);

    //4. 그뒤에, 디비에저장
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "회원가입이 완료됐습니다" });
  } catch (error) {
    res.status(500).json({ message: "서버오류발생 실패했습니다" });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    //_id, username, password, isLoggedIn,isActive, failedLoginAttempt, createdAt, updatedAt,
    const { username, password } = req.body;

    //1. 유저 정보있는지 확인 -findOne 사용(빼먹었던 부분)
    const user = await User.findOne({ username }).select("+password");

    /**++비교점: .select("+password") */

    if (!user) {
      return res.status(401).json({ message: "해당 유저 정보가 없습니다" });
    }

    //1.5) 강의코드처럼 isLoggedIn,isActive 미리 확인(효율성위해서)
    if (!user.isActive) {
      return res
        .status(401)
        .json({ message: "해당 계정이 비활성화됨-로그인불가" });
    }
    if (user.isLoggedIn) {
      return res
        .status(401)
        .json({ message: "다른기기에서 이미 로그인되었습니다" });
    }

    //2. 받은 비번==실제 저장된비번 확인-> 틀리면 횟수하나씩 증가
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempt += 1;
      user.lastLoginAttempt = new Date();
      /**++마지막 로그인시간 업데이트
       * user.lastLoginAttempt.new Date()
       */

      if (user.failedLoginAttempt >= 5) {
        user.isActive = false;
        await user.save(); //계정비활성화된거 db에 업데이트해야되므로
        return res
          .status(401)
          .json({ message: "비밀번호5번이상 틀려서 계정이 잠김 " });
      }
      await user.save();
      /**++남은횟수 추가  */
      return res.status(401).json({
        message: "비밀번호가 틀렸습니다",
        remainingAttempts: 5 - user.failedLoginAttempt,
      });
    }

    //3. 비번 맞았으면 -> isactive, isLoggedin 여부 관리, 전에 틀렸던 횟수 초기화

    user.failedLoginAttempt = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true; //로그인 성공이니까 이것도 true로 바꾸기

    //그리고 바뀐 내용 모두 저장하기!!
    await user.save();

    /**jwt , 시크릿 키 생성하기!! 왜 여기서 해야되는가? */

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    //1. payload(담는 내용), 2.비밀키, 3. 옵션.
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    /**비번뺴고 내보내기 */
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "서버오류" });
    console.log(error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    //1.쿠키에서 토큰 꺼내오기
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "이미 로그아웃 되었습니다" });
    }
    //2. 요청된 토큰 == 저장된 토큰 같은지 확인 -> 같으면 isloggedin 상태바꾸기
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (error) {
      return res.status(401).json({ message: "토큰 인증오류 발생" });
    }

    //3. 쿠키 없애기
    res.clearCookie("token", {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
    });
    res.json({ message: "로그아웃 되었습니다" });
  } catch (error) {
    res.status(500).json({ message: "서버오류 발생" });
    console.log(error.message);
  }
});

//토큰있는지 확인하는 엔드포인트 만들기

router.post("/verify-token", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ message: "토큰이 없습니다" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      //저번에 /login에서 user:userWithoutPassword로 보냈으니까,
      // 이번에도 이름을 "user"로 해서 decoded정보 담음

      return res.status(200).json({ isValid: true, user: decoded });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ isValid: false, message: "유효하지않은토큰입니다" });
  }
});
module.exports = router;
