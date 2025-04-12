import { Button, Card, CardBody, CardHeader, Image } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useToast from '@/hooks/useToast';
import fetcher from '@/utils/apiInstance';
import { PtProduct } from '@/types/pt.types';

export default function PtProductItem({ item }: { item: PtProduct }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await fetcher(`/ptProduct/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      showToast({
        title: '삭제 성공',
        description: '성공적으로 상품을 삭제 했습니다',
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['myPtProducts'] });
      showToast({
        title: '삭제 실패',
        description: '삭제가 완료되지 않았습니다',
        type: 'danger',
      });
    },
  });
  const deleteHandler = (id: number) => {
    mutate(id);
  };

  return (
    <div className="w-full ">
      <Card className="py-4 ">
        <CardHeader className="pb-0 pt-2 px-4 ">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            height={300}
            src={item.images[0]}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <div className="flex flex-col gap-2">
            <div>
              <h4 className="font-bold text-large">{item.productName}</h4>
            </div>
            <span className="text-default-500 text-md">{item.fee}</span>
            <p className="text-md">{item.ptInfo}</p>
          </div>
          <div className="flex pt-5 justify-center gap-2">
            <Button
              fullWidth
              color="primary"
              onPress={() =>
                router.push(`/mypage/pt/update/${item.ptProductId}`)
              }
            >
              수정
            </Button>
            <Button fullWidth onPress={() => deleteHandler(item.ptProductId)}>
              삭제
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
