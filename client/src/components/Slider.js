import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import b4 from "../../src/images/b4.webp";
import b5 from "../../src/images/b5.webp";
import b6 from "../../src/images/b6.webp";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination,Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img className="object-cover w-full"
                        src={b4}
                        alt="img_1"/></SwiperSlide>
        <SwiperSlide><img className="object-cover w-full"
                        src={b5}
                        alt="img_2"/></SwiperSlide>
        <SwiperSlide><img className="object-cover w-full"
                        src={b6}
                        alt="img_3"/></SwiperSlide>
      
      </Swiper>
    </>
  );
}
