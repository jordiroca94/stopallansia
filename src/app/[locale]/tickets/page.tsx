import Tickets from "@/components/tickets/Tickets";
import Header from "@/components/header/Header";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <CanvasWrapper>
        <Tickets />
      </CanvasWrapper>
    </main>
  );
}
