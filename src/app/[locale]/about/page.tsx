import About from "@/components/About";
import Header from "@/components/header/Header";
import CanvasWrapper from "@/components/canvas/CanvasWrapper";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <CanvasWrapper>
        <About />
      </CanvasWrapper>
    </main>
  );
}
