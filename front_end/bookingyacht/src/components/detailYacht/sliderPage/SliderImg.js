import React, { useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import i_content from '../../../assets/image_1.webp';
import './CustomSlider.scss';
const SimpleSlider = ({ yacht }) => {
  const images = [
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/nx36g4ggepatgx23.webp', alt: 'First image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/1igusnttvx5r28wp.webp', alt: 'Second image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/63ljiq0pp8y5szs8.webp', alt: 'Third image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/o7kiablbgtnjaxwf.webp', alt: 'Fourth image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/wwd7tjmchxpz8akk.webp', alt: 'Fifth image' },
    { src: 'https://minio.fares.vn/mixivivu-dev/tour/du-thuyen-heritage-binh-chuan-cat-ba/images/wwd7tjmchxpz8akk.webp', alt: 'Sixth image' },
    // Thêm nhiều ảnh khác nếu cần
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNextThumbnails = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevThumbnails = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayedThumbnails = images.slice(currentIndex, currentIndex + 5).concat(
    images.slice(0, Math.max(0, currentIndex + 5 - images.length))
  );

  return (
    <div className="custom-slider">
      <div className='title_page mb-4' style={{ justifyContent: 'space-between' }}>
        <h1 style={{ fontWeight: 'bold' }}>{yacht.name}</h1>
        <h1 style={{ color: 'orange', fontWeight: 'bold' }}>3,550,000 đ/khách</h1>
      </div>
      <div>
        <img src={i_content} />
      </div>
      <div className='slider_page'>
        <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} indicators={false} interval={null}>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <Image src={image.src} alt={image.alt} fluid className='img1' />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="thumbnail-container">
        {displayedThumbnails.map((image, index) => (
          <div
            className="thumbnail"
            key={index}
            onClick={() => {
              const realIndex = (currentIndex + index) % images.length;
              if (index === 0) {
                handlePrevThumbnails();
              } else if (index === displayedThumbnails.length - 1) {
                handleNextThumbnails();
              } else {
                handleThumbnailClick(realIndex);
              }
            }}
          >
            <Image
              className='img2'
              src={image.src}
              alt={image.alt}
              thumbnail
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleSlider;