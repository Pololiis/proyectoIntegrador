import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const GaleriaImagenes = () => {
  return (
    <Container fluid>
      <Row>
        {/* Main Image */}
        <Col md={6}>
          <img
            src="path/to/main-image.jpg"
            alt="Main"
            className="img-fluid"
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>

        {/* Thumbnail Images */}
        <Col md={6}>
          <Row>
            <Col xs={6} className="pb-2">
              <img
                src="path/to/image1.jpg"
                alt="Image 1"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col xs={6} className="pb-2">
              <img
                src="path/to/image2.jpg"
                alt="Image 2"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col xs={6} className="pb-2">
              <img
                src="path/to/image3.jpg"
                alt="Image 3"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col xs={6} className="pb-2">
              <img
                src="path/to/image4.jpg"
                alt="Image 4"
                className="img-fluid"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="text-end mt-2">
          <Button variant="link" onClick={() => alert('Show all images')}>
            Ver más
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default GaleriaImagenes;
