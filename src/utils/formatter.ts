//별점 포메터 rate는 리뷰 점수 index는 star 컴포넌트 star 인덱스임
export const calculateRate = (rate: number, index: number) => {
  if (rate >= index) {
    return '100%';
  }
  if (Math.floor(index - rate) > 0) {
    return '0%';
  }
  const percentage = ((rate % 1) * 100).toFixed();

  return `${percentage}%`;
};

export const formatCash = (cash: number) => {
  return cash.toLocaleString('ko-KR');
};
