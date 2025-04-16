export interface UserData {
  phoneNumber: string; // 필수
  memberName: string; // 필수
  email: string; // 필수
  birthday: string; // 필수
  gender: string; // 필수
  height: string; // 필수
  weight: string; // 필수
  address: string; // 필수
  recentBench: number; // 선택
  recentSquat: number; // 선택
  recentDeadlift: number; // 선택
  profileUrl?: string; // 선택
  level?: number; // 선택
}
