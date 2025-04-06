export interface DiaryRequestBody {
  date: string; // 'YYYY-MM-DD'
  diaryRequest: {
    title: string;
    content: string;
  };
}
