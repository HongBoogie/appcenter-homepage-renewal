import { Swiper, SwiperSlide } from 'swiper/react';
import PlayStoreBadge from '@assets/svg/google-play-badge.svg';
import AppStoreBadge from '@assets/svg/app-store-badge.svg';
import { Autoplay } from 'swiper/modules';
import useGetIntroductionBoardPublicAllQuery from '@api/query/useGetIntroductionBoardPublicAllQuery.ts';

const ProductListSwiper = () => {
  const { data } = useGetIntroductionBoardPublicAllQuery();

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        speed={2000}
        slidesPerView={5}
        spaceBetween={30}
      >
        {data.map(({ id, title, images, androidStoreLink, appleStoreLink }) => (
          <SwiperSlide key={id}>
            <div className='flex flex-col gap-y-3'>
              <img
                className='border border-solid rounded-2xl'
                alt={title}
                src={Object.values(images).at(0)}
              />
              <div className='flex flex-col gap-y-1'>
                {androidStoreLink && (
                  <img
                    className='px-4'
                    alt={`${title} 플레이스토어 링크`}
                    src={PlayStoreBadge}
                  />
                )}
                {appleStoreLink && (
                  <img
                    className='px-4'
                    alt={`${title} 앱스토어 링크`}
                    src={AppStoreBadge}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductListSwiper;
