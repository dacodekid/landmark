'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { useEffect, useState } from 'react';

interface Slide {
  image: string;
  header?: string;
}

type ImageCarouselProps = {
  slides: Slide[];
};

export default function ImageCarousel({ slides }: ImageCarouselProps) {
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
    objectFit: 'cover' as const,
    position: 'absolute' as const,
    top: '5%',
    left: '5%',
    borderRadius: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    // backgroundColor: '#000000',
    padding: '1px',
  };

  const headerStyle = {
    position: 'absolute' as const,
    bottom: '85px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div>
              <img src={slide.image} alt={`carousel-image-${index}`} style={imageStyle} />
              {slide.header && <div style={headerStyle}>{slide.header}</div>}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
