// 날짜를 'YYYYMMDD' 으로 변환
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};

// 성별을 MALE/FEMALE로 변환하는 함수
export const mapGenderToApi = (gender: string): string => {
  if (gender === '남성') return 'MALE';
  if (gender === '여성') return 'FEMALE';

  return '';
};
export const isPastDate = (inputDateStr: string): boolean => {
  const today = new Date();
  const inputDate = new Date(inputDateStr);

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate <= today;
};
