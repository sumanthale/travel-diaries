import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
const Images = () => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"auto"}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      initialSlide={1}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-1.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-3.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-4.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-5.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-6.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-7.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-8.jpg" />
      </SwiperSlide>
      <SwiperSlide>
        <img alt="alt" src="https://swiperjs.com/demos/images/nature-9.jpg" />
      </SwiperSlide>
    </Swiper>
  );
};
export default Images;
