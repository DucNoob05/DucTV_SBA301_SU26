import React from 'react';
import { Carousel } from 'react-bootstrap';
import { BannersData } from '../shared/ListOfBanners';

function BannerCarousel() {
  return (
    <Carousel>
      {BannersData.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
          />
          <Carousel.Caption>
            <h3>{banner.title}</h3>
            <p>{banner.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
