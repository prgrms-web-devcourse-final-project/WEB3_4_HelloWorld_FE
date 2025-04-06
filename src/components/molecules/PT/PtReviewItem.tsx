import Star from '../StarGroup';

import LevelBadge from '@/components/atoms/LevelBadge';

export default function PtReviewItem() {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <LevelBadge level={1} />
          <p className="text-mono_600 text-lg font-semibold">마동석</p>
          <span className="text-mono_400 text-sm">2025.04.03</span>
        </div>
        <div>
          <Star h={'h-4'} rate={4.2} readonly={true} w={'h-4'} />
        </div>
      </div>
      <div>
        <span className="text-mono_600 text-sm">
          처음에는 PT 받을까 말까 고민이 많았는데, 나피티 트레이너님 덕분에 정말
          잘한 선택이 되었습니다! 3개월 동안 PT를 받으면서 체중은 7kg 감량하고,
          근육량은 2kg 늘었어요. 특히 잘못된 자세 교정에 많은 도움을 받았습니다.
          예전에는 스쿼트할 때 무릎이 많이 아팠는데, 이제는 전혀 통증이 없어요.
          트레이너님이 전문적인 지식을 바탕으로 운동 방법을 자세히 설명해주시고,
          매 세션마다 체계적으로 프로그램을 진행해주셔서 좋았습니다. 식단 관리도
          현실적으로 조언해주셔서 무리 없이 잘 따라갈 수 있었어요. 운동할 때는
          엄격하시지만 평소에는 편하게 대화할 수 있어서 좋았고, 제가 지치려고 할
          때마다 동기부여도 잘 해주셨습니다. 다음 달에 PT 3개월 더 등록하려고요.
          완전 추천합니다! 👍
        </span>
      </div>
    </div>
  );
}
