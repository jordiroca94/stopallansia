import Artists from "@/components/Artists";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";
import Header from "@/components/header/Header";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <CanvasWrapper>
        <Artists />
      </CanvasWrapper>
    </main>
  );
}
