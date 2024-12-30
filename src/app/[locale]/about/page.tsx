import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <About />
        <Footer />
      </div>
    </main>
  );
}
