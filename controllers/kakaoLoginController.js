// kakaoLoginController.js
const axios = require('axios');

exports.kakaoCallback = async (req, res) => {
  const { code } = req.body.params;

  try {
    // 액세스 토큰 요청
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
        redirect_uri: 'http://192.168.200.101:3000/callback', // 웹뷰의 redirect URI와 동일해야 함
        code: code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // 사용자 정보 요청
    const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = userResponse.data.id;

    // 클라이언트에 사용자 ID 전송
    res.json({ userId: userId });
    console.log({ userId: userId });
  } catch (error) {
    console.error('Error during Kakao authentication:', error);
    res.status(500).send('Authentication failed');
  }
};
