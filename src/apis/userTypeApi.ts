const fetchWithCredentials = async (endpoint: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      credentials: 'include',
    },
  );

  return res;
};

//  일반 사용자 확인
export const checkMember = async () => {
  return await fetchWithCredentials('/member/check');
};

//  트레이너, 사장님인지 확인
export const checkTrainer = async () => {
  return await fetchWithCredentials('/trainer/check');
};
