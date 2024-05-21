import "./sliderInfinito.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function SliderInfinito() {
  const categorias = [
    {
      nombre: "PUZLE",
      imagen: "https://i.ibb.co/j661tp2/jigsaw-305576-1280.png",
    },
    {
      nombre: "TERROR",
      imagen:
        "https://i.ibb.co/BtPXn3r/jan-jakub-nanista-z9hvk-SDWMIM-unsplash.jpg",
    },

    {
      nombre: "RPG",
      imagen:
        "https://i.ibb.co/gd39h56/39c9cd1a-45af-4a9b-8281-41b6755f5184.jpg",
    },
    {
      nombre: "ESTRATEGIA",
      imagen: "https://i.ibb.co/S0fjpzP/pexels-rgsk97-814133.jpg",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
      >
        {categorias.map((categoria, index) => (
          <SwiperSlide key={index} className="mySwiper container-img-categoria">
            <div className="img-container">
              <img
                src={categoria.imagen}
                className="img-fluid img-categoria"
                alt={categoria.nombre}
              />
              <div className="img-overlay">
                <div className="img-text">{categoria.nombre}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SliderInfinito;
