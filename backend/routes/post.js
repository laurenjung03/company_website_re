const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { marked } = require("marked");

const axios = require("axios");

/**post 올리기 , 수정은 관리자만 할수있어야되므로 , verifyToken 미들웨어 만들기 */

const AuthenticateToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다" });
  }

  /**!! 그 토큰이 진짜 유효한지 확인! */
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**토큰이 있다면, 토큰안의 정보를 꺼내서 다음 미들웨어/라투어에 넘겨주기  */
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: "토큰 검증이 필요" });
  }
};

router.post("/", async (req, res) => {
  try {
    /**이렇게 nextNumber를 지정해서 넣어준다  */
    /**왜냐면?client한테 받은 number는 신뢰할수없음 --서버에서 DB에 있는 마지막번호 직접 조회해서 +1하는게 안전  */

    //** *const latestPost = await Post.findOne().sort({latest:-1});--> latest:-1 이런건 없대*/
    const latestPost = await Post.findOne().sort({
      number: -1,
    }); /**number로 정렬-제일 마지막꺼찾기 */
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const { title, content, fileUrl } = req.body;
    const post = new Post({
      number: nextNumber,
      title,
      content,
      fileUrl,
    });
    await post.save();

    /**201==생성됨, 200==성공 이라고한다  */

    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ message: "서버오류 발생" });
  }
});

//전체 불러오기
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "게시글 불러오기 실패함:서버 오류", error });
  }
});
//특정 게시물 불러오기- 조회수 증가

/**let ip;
 * const response= await axios.get();
 * ip= response.data.ip
 */

router.get("/:id", async (req, res) => {
  /*id는 body가 아니라, 서버가 직접 올리는 거니까 req.params.id */
  const id = req.params.id;

  try {
    const post = await Post.findById(id);

    /**이 개인 post 불러온거면, 본거니꼐 조회수 올려야됨  */

    let ip;
    try {
      const response = await axios.get("http://api.ipify.org?format=json");
      ip = response.data.ip;
    } catch (error) {
      console.log("ip address process error");
      ip = req.ip;
    }
    const userAgent = req.headers["user-agent"];
    //ip, userAgent를 가져와야되고, 1. ip,userAgent이 다르거나, 시간이 1일이상 지났으면 조회수 올림
    // const dayBefore = post.createdAt -60*60*24*1000; 이거 아님
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); //현재시간 -1

    /**new Date하는 이유는, new를 붙이면 객체로 변환 => 날짜 비교 가능 */

    /**some()은? 배열에서 조건 맞는 요소 하나라고 있으면 참 반환
     * 로직: viewLogs중에서 같은 아이피이고, &&같은 useragent이고,&& 1일내 기록 있으면 --> 조회수 안올림
     */

    const hasRecentViews = post.viewLogs.some(
      /**log를 통해서 배열요소인 ip,userAgent,timeStamp에 접근  */
      (log) =>
        log.ip === ip &&
        log.userAgent === userAgent &&
        new Date(log.Timestamp) > oneDayAgo,
    );
    if (!hasRecentViews) {
      post.views += 1;
      post.viewLogs.push({ ip, userAgent });
      await post.save();
    }

    /**파싱안하면 content에 있는 내용이 깨지기 떄문ㅇ ㅔ marked.pars를 해준다 */
    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      console.log("마크다운 변환 실패", error);
      htmlContent = post.content;
    }

    /**파싱한 html내용이 포함되어야 하므로, 다시 resposneData 정의 */
    const responseData = {
      ...post.toObject(),
      renderedContent: htmlContent, //변환된 html
    };

    res.json(responseData);
  } catch (error) {
    return res.status(500).json({ message: "서버오류", error });
  }
});

//수정하기
router.put("/:id", async (req, res) => {
  //수정이 될만한 내용들
  const { title, content, fileUrl } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을수없다" });
    }
    post.title = title;
    post.content = content;
    post.fileUrl = fileUrl;

    await post.save();
    /**save은 인자를 받지않는다 */
    // post.save({
    //   title,
    //   content,
    //   fileUrl,
    // })
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "서버오류 " });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "해당 게시물이 존재하지 않습니다, 이미 삭제됐든가가",
      });
    }
    res.status(200).json({ message: "성공적으로 삭제됐습니다" });
  } catch (error) {
    return res.status(500).json({ message: "서버오류", error });
  }
});

module.exports = router;
