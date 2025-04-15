import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Dashboard from "@/components/tooling/Dashboard";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <Dashboard />
      <Footer />
    </main>
  );
}
