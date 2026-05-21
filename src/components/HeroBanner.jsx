
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useGetBannersQuery } from '../slices/bannerApiSlice';

 import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  const{data: banners,isLoading,error}= useGetBannersQuery()
 
   if(isLoading) return <div className='h-48 sm:h-64 md:h-96 w-full bg-slate-100 animate-pulse rounded-3xl max-w-5xl mx-auto my-6'></div>
  if(error || !banners || banners.length === 0 ) return null
   

  return <div className="max-w-7xl  mx-auto my-6 px-4 ">
    <style>{`
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 24px !important;
            height: 24px !important;
            background-color: rgba(0, 0, 0, 0.4) !important;
            border-radius: 50% !important;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 10px !important;
            font-weight: bold !important;
            color: #ffffff !important;
          }
          .swiper-pagination-bullet {
            width: 6px !important;
            height: 6px !important;
          }
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide._id} className="bg-slate-950">
             
            <div className="relative w-full aspect-21/9 sm:aspect-21/8 md:aspect-21/7 lg:aspect-21/7">
              <img 
                src={slide && slide.image && typeof slide.image === 'String' && slide.image.startWith('http') ? slide.image : `https://chalo-baba-backend.vercel.app${slide.image}`} 
                className="absolute inset-0 w-full h-full object-cover" 
                alt={slide.title}
                loading="eager"
              />
              
               
              <div className="absolute inset-0 bg-liner-to-r from-black/80 via-black/40 to-transparent flex flex-col items-start justify-center text-white text-left p-6 sm:p-12 md:p-16">
                <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-lg leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg font-medium opacity-90 mb-6 max-w-md drop-shadow-md">
                  {slide.subtitle}
                </p> 
                 
                 <Link  
                  className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg" 
                  to={slide.link ? slide.link : `/search/${slide.title}`}
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  }
  export default HeroBanner