import fetcher from '@/utils/apiInstance';

export const getPtList = async () => {
  const response = await fetcher('/ptProduct', {
    method: 'GET',
  });

  return response;
};
