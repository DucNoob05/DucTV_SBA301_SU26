import React from 'react';
import { Carousel } from 'react-bootstrap';

function TopCarousel({ banners }) {
  return (
    <Carousel fade interval={3000}> 
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '10px' }}>
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TopCarousel;