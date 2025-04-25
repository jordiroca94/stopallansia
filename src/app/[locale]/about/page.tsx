import CanvasBackground from "@/components/CanvasBackground";
import AboutContent from "@/components/AboutContent";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="relative min-h-screen overflow-hidden">
          <CanvasBackground />
          <div className="relative z-10">
            <AboutContent />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
