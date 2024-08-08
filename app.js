
// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const kakaoLoginRoute = require('./routes/kakaoLoginRoutes');
const app = express();
const port = 3000; // 서버 포트 설정

//새로 추가했어 
app.use(cors()); // CORS 설정
app.use(bodyParser.json()); // JSON 데이터 파싱

// 카카오 로그인 라우터 사용

// 원본이랑 다른 부분-1
// 원래 app.use('/',require('./routes/kakaoLoginRoutes');)
// 이게 맞나..? 일단 작동은 잘 됬어
//http://192.168.10.107:3000/callback 기준으로 봤을때~
app.use('/callback', kakaoLoginRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
