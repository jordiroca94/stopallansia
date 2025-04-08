import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import ReserveTickets from "@/components/tickets/ReserveTickets";

export default function page() {
  return (
    <main>
      <Header />
      <div className="h-screen flex flex-col justify-between">
        <ReserveTickets />
        <Footer />
      </div>
    </main>
  );
}
