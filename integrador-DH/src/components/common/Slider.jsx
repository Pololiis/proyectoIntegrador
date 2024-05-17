// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slider.css";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

function Slider() {
  const { id } = useParams();

  const url = `http://localhost:8080/videojuegos${id}`;
  const [videoJuegos, setVideoJuegos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);

        setVideoJuegos(response.data);

        // Aquí puedes usar la variable videojuegos
        console.log("Datos de los videojuegos:", videoJuegos);
      } catch (error) {
        console.error("Hubo un error al hacer la solicitud:", error);
      }
    };

    fetchData();
  }, [id]);

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
        <SwiperSlide key={videoJuegos.id} className="slider-img-container">
          {videoJuegos.map(videoJuego =>(
            <img src={videoJuego.imagen} key={videoJuego.id} />
          ))}
            <Link to={`/detalle/${videoJuegos.id}`} className="link-slider">
          
            ver mas
          </Link>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;

// function Slider() {
//   // Array de objetos, cada uno con una URL de imagen y otra información opcional
//   const slideData = [
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/iaFO_0QOcEB9R4_vNmbvcTBrniRDLR7Dwk6IP6rYwbY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzYw/LzQzLzFiNjA0M2Jj/NzUxNWJmZTg3NTBk/MjQyMmM5YjFjYzRm/LmpwZw",
//       title: "Call of Duty",
//     },
//     {
//       imageUrl:
//         "https://th.bing.com/th/id/OIP.f9ZPD3tnSQC90XKWeGXVRQHaJ4?w=135&h=180&c=7&r=0&o=5&pid=1.7",
//       title: "League of Leyends",
//     },
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/fqAXkexL27jEtGaCwAYCxJtD1PoFEW5rSbGtPOcX4KM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLmJs/b2dzLmVzL2p1ZWdv/cy8xODUyMS9maWZh/XzIzL2ZvdG9zL25v/dGljaWFzL2ZpZmFf/MjMtNTcwNzg1My5q/cGc",
//       title: "FIFA 2024",
//     },
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/INs0c4CDdCtRWR_ZfrU3rMD88asLEw1_s5Rz7ASQDGs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFNd1QxRkpVN0wu/anBn",
//       title: "Need for Speed",
//     },
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/FObutkpdIxZML-ZJCcYGFHVIcSoQt1A_fKyx1ysdYTQ/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLmJs/b2dzLmVzLzFhMzEy/ZS81MXoxajRyem15/bC5fc2w1MDBfL29y/aWdpbmFsLndlYnA",
//       title: "Remnant II",
//     },
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/mUQ5F4_2CZ6LT8_ZoahdRtpkrgdfdpQLk1C7LrGkdzg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91dmVq/dWVnb3MuY29tL2lt/Zy9jYXJhdHVsYXMv/NjExNDQvcGVxdWVf/bm8tZGVmaW5pZGEt/ZGlhYmxvLWl2Lmpw/Zw",
//       title: "Diablo IV",
//     },
//     {
//       imageUrl:
//         "https://imgs.search.brave.com/NrcbDsKKz2tm5DakhWgDYA3VqaZyDqgarmgmYtQ682g/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzkxLVZmUnAtaTBM/LmpwZw",
//       title: "Super Mario Odyssey",
//     },
//     // Agrega más objetos según sea necesario
//   ];

//   return (
//     <>
//       <Swiper

//         slidesPerView={4}
//         spaceBetween={30}
//         freeMode={true}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints={{
//           // cuando el ancho de la ventana es >= 0px
//           0: {
//             slidesPerView: 2,
//             spaceBetween: 20,
//           },
//           // cuando el ancho de la ventana es >= 400px
//           400: {
//             slidesPerView: 3,
//             spaceBetween: 30,
//           },
//           // cuando el ancho de la ventana es >= 576px
//           576: {
//             slidesPerView: 4,
//             spaceBetween: 10,
//           },
//           // cuando el ancho de la ventana es >= 768px
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 50,
//           },
//         }}
//         modules={[FreeMode, Pagination]}
//         className="mySwiper"
//       >
//         {/* Mapea sobre el array de objetos */}
//         {slideData.map((slide, index) => (
//           <SwiperSlide key={index} className="slider-img-container">
//             <div className="container-link"></div>
//             {/* Usa la URL de la imagen y otra información del objeto actual */}
//             <img src={slide.imageUrl} alt={slide.title} />{" "}
//             <Link to={`/detalleProducto/${videoJuego.id}`} className="link-slider">
//               ver mas
//             </Link>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   );
// }
