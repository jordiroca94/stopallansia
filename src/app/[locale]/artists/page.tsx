import Artists from "@/components/Artists";
import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <Artists />
        <Footer />
      </div>
    </main>
  );
}
