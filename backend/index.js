const express= require("express");
const app= express();

const PORT=3000;

//
app.get("/", (req,res)=>{
    res.send("Hello world!")
})
//감시시키기 포트가 리슨중임/ 전화기 앞에서 대기하기. 프로세스를 종료시키지 않고, 무한루프상태유지
//포트에 들어오는 신호감지
app.listen(PORT, ()=>{
    console.log("~~Server is running")
})