// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slider.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";





function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          400: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          // when window width is >= 576px
          576: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <SwiperSlide key={index} className="slider-img-container">
            <div className="container-link"></div>
            <img
              src="https://i.ibb.co/S6qbQ9P/gas-munro.jpg"
              alt={`Slide ${index + 1}`}
            />{" "}
            <Link to="/detalleProducto" className="link-slider">ver mas</Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
