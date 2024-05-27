import "./sliderInfinito.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

function SliderInfinito() {
  const url = `http://localhost:8080/plataformas`;
  const [plataformas, setPlataformas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setPlataformas(response.data);
        console.log(response);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, []);

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
        <div>{plataformas.map((plataformas) => {
          return (
            <SwiperSlide>
              {plataformas.nombre}
            </SwiperSlide>
          );
        })}</div>
      </Swiper>
    </>
  );
}

export default SliderInfinito;
