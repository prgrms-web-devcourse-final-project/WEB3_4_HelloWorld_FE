import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 },
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되어 있지 않습니다.' },
        { status: 500 },
      );
    }

    // Gemini‑2.0 Flash
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();

    if (!text) {
      return NextResponse.json(
        { error: '외부 API로부터 빈 응답을 받았습니다.' },
        { status: response.status },
      );
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: '응답 JSON 파싱 에러' },
        { status: 500 },
      );
    }

    let reply = '';

    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];

      if (
        candidate.content &&
        candidate.content.parts &&
        candidate.content.parts.length > 0 &&
        candidate.content.parts[0].text
      ) {
        reply = candidate.content.parts[0].text;
      }
    } else if (
      data.contents &&
      data.contents.length > 0 &&
      data.contents[0].content
    ) {
      reply = data.contents[0].content;
    } else {
      reply = '생성된 답변이 없습니다.';
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: 'API 호출 오류' }, { status: 500 });
  }
}
