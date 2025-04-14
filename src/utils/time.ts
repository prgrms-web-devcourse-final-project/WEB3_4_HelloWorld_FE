// utils/time.ts

/**
 * "HH:mm" 형식의 문자열을 분(minute) 단위 숫자로 변환합니다.
 * 예: "06:30" => 390
 */
export const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);

  return hours * 60 + minutes;
};

/**
 * 현재 시간을 분(minute) 단위로 반환합니다.
 * 예: 오전 10시 15분 → 615
 */
export const getCurrentMinutes = (): number => {
  const now = new Date();

  return now.getHours() * 60 + now.getMinutes();
};

/**
 * 현재 시각이 헬스장 운영 시간(start~end) 사이인지 여부를 반환합니다.
 */
export const isGymOpenNow = (startTime: string, endTime: string): boolean => {
  const current = getCurrentMinutes();
  const start = parseTimeToMinutes(startTime);
  const end = parseTimeToMinutes(endTime);

  return current >= start && current < end;
};
