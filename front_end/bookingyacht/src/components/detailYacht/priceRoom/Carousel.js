import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

const Carousel = ({ images }) => {
    const getImageApi = `http://localhost:8080/api/customer/file/`
    console.log(images)
    return (
        <BootstrapCarousel>
            {images.map((image, index) => (
                <BootstrapCarousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={`${getImageApi}${image}`}
                        alt={`Slide ${index + 1}`}
                    />
                </BootstrapCarousel.Item>
            ))}
        </BootstrapCarousel>
    );
};

export default Carousel;