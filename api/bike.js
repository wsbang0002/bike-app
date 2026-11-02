// Vercel 함수: 서울 따릉이 실시간 대여정보를 대신 불러와 돌려준다.
// 인증키는 코드에 쓰지 않고 Vercel 환경변수 SEOUL_API_KEY에서 읽는다.
export default {
  async fetch(request) {
    const key = process.env.SEOUL_API_KEY;
    if (!key) {
      return Response.json({ error: 'SEOUL_API_KEY 환경변수가 없습니다.' }, { status: 500 });
    }
    try {
      const url = `http://openapi.seoul.go.kr:8088/${key}/json/bikeList/1/1000/`;
      const res = await fetch(url);
      const data = await res.json();
      return Response.json(data);
    } catch (e) {
      return Response.json({ error: '따릉이 데이터를 불러오지 못했습니다.' }, { status: 500 });
    }
  },
};
