import React from 'react'
import "./galeriaImagenes.css"

function GaleriaImagenes({images}) {
    if (!images || images.length === 0) {
        return <div>No hay imágenes disponibles.</div>;
      }
    
      const [mainImage, ...otherImages] = images;

  return (
    <div className="container-fluid">
      <div className="row borde">
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <img src={mainImage} alt="Imagen principal" className="img-fluid main-image" />
        </div>
        <div className="col-lg-6">
          <div className="row">
            {otherImages.map((image, index) => (
              <div key={index} className="col-6 mb-3">
                <img src={image} alt={`Imagen ${index + 2}`} className="img-fluid" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-link">Ver más</button>
      </div>
    </div>
  );
};

export default GaleriaImagenes