export const fetchNaverShopping = async (
  query: string,
  start = 1,
  display = 5,
) => {
  const res = await fetch(
    `/api/naver/search?query=${encodeURIComponent(query)}&start=${start}&display=${display}`,
  );

  if (!res.ok) throw new Error('네이버 쇼핑 API 실패');

  return res.json();
};
