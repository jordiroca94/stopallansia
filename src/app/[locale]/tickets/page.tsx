import Reserve from "@/components/tickets/Reserve";
import Header from "@/components/header/Header";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <CanvasWrapper>
        <Reserve />
      </CanvasWrapper>
    </main>
  );
}
