import Image from "next/image";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <MainContent />
      <Footer />      
    </div>
  )
}
