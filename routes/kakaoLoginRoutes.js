
const express = require('express');
const router = express.Router();
const kakaoLoginController = require('../controllers/kakaoLoginController');

// 카카오 로그인 콜백 처리 라우터
//여기도 .. router 부분
router.post('/', kakaoLoginController.kakaoCallback);

module.exports = router;
