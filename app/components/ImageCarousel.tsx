'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { useEffect, useState } from 'react';

type ImageCarouselProps = {
  images: string[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const containerStyle = {
    width: '99vw',
    height: '100vh',
    overflow: 'hidden',
    overflowX: 'hidden' as const,
    position: 'relative' as const,
  };

  const swiperStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '90%',
    height: '90%',
    objectFit: 'cover',
    position: 'absolute' as const,
    top: '5%',
    left: '5%',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    // backgroundColor: '#000000',
    padding: '1px',
  };

  return (
    <div style={containerStyle}>
      <Swiper
        style={swiperStyle}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`carousel-image-${index}`} style={imageStyle} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
