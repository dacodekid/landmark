import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import ImageCarousel from './components/ImageCarousel';

export default function Home() {
  const slides = [
    { image: '/img/optimized/front_elevation_01.jpg', header: 'A Grand Welcome to Your New Home' },
    { image: '/img/optimized/back_elevation_01.jpg', header: 'Relax in Your Serene Backyard Oasis' },
    { image: '/img/optimized/kitchen_01.jpg', header: 'Cook in Style: Modern Culinary Space' },
    { image: '/img/optimized/kitchen_02.jpg', header: 'Elegant Kitchen Design for Every Chef' },
    { image: '/img/optimized/kitchen_03.jpg', header: 'Your Dream Kitchen Awaits' },
    { image: '/img/optimized/master_bedroom_01.jpg', header: 'Retreat to Luxury in Your Master Suite' },
    { image: '/img/optimized/master_bathroom_02.jpg', header: 'Indulge in a Spa-Like Bathroom Experience' },
  ];

  return (
    <div className="">
      <Header />
      <main>
        <ImageCarousel slides={slides} />
      </main>
      <MainContent />
      <Footer />
    </div>
  )
}
