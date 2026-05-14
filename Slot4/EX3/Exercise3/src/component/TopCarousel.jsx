import React from 'react';
import { Carousel } from 'react-bootstrap';

function TopCarousel({ banners }) {
  return (
    <Carousel fade interval={2500} className="banner-carousel">
      {banners.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100 banner-image"
            src={item.image}
            alt={item.title}
          />
          <Carousel.Caption className="banner-caption">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TopCarousel;