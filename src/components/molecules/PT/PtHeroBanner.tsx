import Section from '@/components/atoms/Section';

export default function PtHeroBanner() {
  return (
    <div
      className="min-h-[500px] relative w-full"
      style={{
        backgroundImage: `url(${'/assets/images/pt_hero_banner.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-start bg-black/50">
        <Section>
          <div className="flex  items-center pt-12 w-full justify-between h-full">
            <h2 className="text-stone-200 w-full font-semibold text-4xl">
              Find Your <br /> Personal Trainer{' '}
            </h2>
            <div className="text-stone-200 ">
              {/* <BaseSwiper
                items={Array.from({ length: 10 }, (_, index) => (
                  <MainPtCard
                    key={index}
                    backgroundImage={
                      'https://scontent-gmp1-1.xx.fbcdn.net/v/t39.30808-6/468976867_18145541191355519_2759252367887413235_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=oyiPV27iNh0Q7kNvgGRiRS6&_nc_oc=AdmI-aGb8SZyi7c2SuWXzLsKm3q8572F1bkeOz5MtYYXzv-jC89oM4ekomj2IbfHYro&_nc_zt=23&_nc_ht=scontent-gmp1-1.xx&_nc_gid=wzSQs-g3aNJMDjn7ovS79w&oh=00_AYHXc7cSMXilV8ZiEktdpna6vQs_dC1dYhVyakOxtcIG8g&oe=67F042CD'
                    }
                    content={
                      'pt는 아무데서나 받으시면 안됩니다. 전문가와 상담하고 지금 바로 나의 바디를 체인지 해보세요 지금 바로 나의 바디를 체인지 해보세요 '
                    }
                    title={'김호석 트레이너'}
                  />
                ))}
              /> */}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
