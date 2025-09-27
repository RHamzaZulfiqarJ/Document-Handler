import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { baseURL, URL } from "../../constant";

const Carousel = ({ data }) => {
  return (
    <div className="w-full px-4 py-8">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((doc) => (
            <SwiperSlide className="rounded-xl flex flex-col items-center">
              <img
                src={`${URL}${doc}`}
                alt="Uploaded"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="flex items-center justify-center h-40 text-gray-500">
            <img
              src={`${URL}${data}`}
              alt="Uploaded"
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
