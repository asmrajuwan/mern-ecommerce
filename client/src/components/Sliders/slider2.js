import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import bannerImg2 from "../../images/banner_hero_image.avif";
import Banner from "../Global/Banner";
export default function Slider2() {
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
                navigation={false}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                <Banner headingText="Setting up an ethical business standard"
        paragraphText="Ensuring sustainable growth through"
        buttonText="Get Started"
        bannerImgSrc={bannerImg2}/>
                 
                </SwiperSlide>
                   

                <SwiperSlide>
                    
                <Banner headingText="Setting up an ethical business standard"
        paragraphText="Ensuring sustainable growth through"
        buttonText="Get Started"
        bannerImgSrc={bannerImg2}/>
                </SwiperSlide>


              
            </Swiper>
        </>
    );
}