import Reserve from "@/components/Reserve";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

export default function page() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <Reserve />
        <Footer />
      </div>
    </main>
  );
}
