import { NextRequest, NextResponse } from 'next/server';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!;

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get('query');
    const start = searchParams.get('start') || '1';
    const display = searchParams.get('display') || '10';

    if (!query) {
      return NextResponse.json({ error: '쿼리 없음' }, { status: 400 });
    }

    const res = await fetch(
      `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=${display}&start=${start}`,
      {
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET,
        },
      },
    );

    const rawText = await res.text();

    // 여기서 파싱 시도
    let data;

    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error(' JSON 파싱 실패:', parseError);

      return NextResponse.json({ error: 'JSON 파싱 실패' }, { status: 500 });
    }

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.errorMessage || 'Naver API 호출 실패' },
        { status: res.status },
      );
    }

    return NextResponse.json(data.items);
  } catch (err) {
    console.error(' 서버 내부 에러:', err);

    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
};
