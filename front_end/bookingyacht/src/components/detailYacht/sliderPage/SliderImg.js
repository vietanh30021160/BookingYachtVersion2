import React, { useState, useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import './SliderImg.scss'
import { getImagesYacht } from '../../../services/ApiServices';
import { LuShip } from "react-icons/lu";

const SimpleSlider = ({ yacht }) => {

  const [image, setImage] = useState([]);

  const getImagesYachtById = async (yachtId) => {
    const res = await getImagesYacht(yachtId);
    setImage(res.data.data)
    console.log(res.data.data)
  }

  useEffect(() => {
    getImagesYachtById(yacht.idYacht)
  }, [yacht.idYacht])

  const getImageApi = `http://localhost:8080/api/customer/file/`

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNextThumbnails = () => {
    setCurrentIndex((prev) => (prev + 1) % image.length);
  };

  const handlePrevThumbnails = () => {
    setCurrentIndex((prev) => (prev - 1 + image.length) % image.length);
  };

  const displayedThumbnails = image.slice(currentIndex, currentIndex + 5).concat(
    image.slice(0, Math.max(0, currentIndex + 5 - image.length))
  );

  return (

    <div className="custom-slider">
      <div className='title_page mb-4' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 'bold', color: '#0E4F4F' }}><span><LuShip color='gold' size={80}></LuShip></span> {yacht.name}</h1>
        <h3 style={{ color: '#0E4F4F', fontWeight: 'normal' }}>3,550,000 đ/khách</h3>
      </div>

      <div className='slider_page'>
        <Carousel activeIndex={currentIndex} onSelect={handleSelect} slide={false} indicators={false} interval={null}>
          {image.map((image, index) => (
            <Carousel.Item key={image.idYachtImage}>
              <Image src={`${getImageApi}${image.imageYacht}`} alt={index} fluid className='img1' />
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
              const realIndex = (currentIndex + index) % image.length;
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
              src={`${getImageApi}${image.imageYacht}`}
              alt={`${getImageApi}${image.imageYacht}`}
              thumbnail
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleSlider;