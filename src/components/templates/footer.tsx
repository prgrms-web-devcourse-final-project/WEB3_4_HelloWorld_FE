'use client';

export default function Footer() {
  return (
    <footer className=" absolute bottom-0 text-gray-300 w-full ">
      <div className="h-48 bg-mono_100" />
      <div className="bg-[#202020]">
        <div className="max-w-screen-2xl  container mx-auto py-10 px-6">
          <div className="w-full flex justify-between">
            <div className=" flex flex-col gap-y-2">
              <h1 className="hidden sm:block text-2xl font-black font-point  text-inherit">
                Gym<span className="text-main">M</span>ate
              </h1>
              <p>
                Wherever you want,{' '}
                <span className="font-semibold">GymMate</span>{' '}
              </p>
            </div>
            <div className="flex  gap-x-2">
              <ul className="flex gap-x-16 items-start">
                <li className="flex flex-col justify-center gap-y-2 items-center">
                  <div>
                    <h3 className="font-bold py-2">MEMBER</h3>
                    <p className="text-gray-400 text-sm">PO 이상은</p>
                  </div>
                  <ul className="grid text-gray-400 text-sm  grid-cols-2 gap-4">
                    <li>FE 박수관</li>
                    <li>PO 이상은</li>
                    <li>PO 이상은</li>
                    <li>PO 이상은</li>
                  </ul>
                </li>
                <li className="flex flex-col justify-center gap-y-2 items-start">
                  <div>
                    <h3 className="font-bold py-2">FEATURE</h3>
                  </div>
                  <ul className="flex text-gray-400 flex-col gap-4 text-sm ">
                    <li>헬스장 찾기</li>
                    <li>1:1 PT 선생님 찾기</li>
                    <li>나의 운동기록</li>
                    <li>1:1 채팅</li>
                  </ul>
                </li>
                <li className="flex flex-col justify-center gap-y-2 items-start">
                  <div>
                    <h3 className="font-bold py-2">OPEN API</h3>
                  </div>
                  <ul className="flex text-gray-400 flex-col gap-4 text-sm ">
                    <li>KAKAO API</li>
                    <li>KAKAO ADDRESS API</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div />
        </div>
      </div>
    </footer>
  );
}
