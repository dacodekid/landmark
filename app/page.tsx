import Image from "next/image";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ImageCarousel from './components/ImageCarousel';

export default function Home() {
  const images = [
    '/img/optimized/front_elevation_01.jpg',
    '/img/optimized/back_elevation_01.jpg',
    '/img/optimized/kitchen_01.jpg',
    '/img/optimized/kitchen_02.jpg',
    '/img/optimized/kitchen_03.jpg',
    '/img/optimized/master_bedroom_01.jpg',
    '/img/optimized/master_bathroom_02.jpg'
  ];

  return (
    <div className="bg-white">
      <Header />
      <main>
        <ImageCarousel images={images} />
      </main>
      <MainContent />
      <Footer />      
    </div>
  )
}
