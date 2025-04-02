import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Container from "@/components/ui/Container";

export default function page() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <Container className="flex-grow flex items-center justify-center py-20">
          <h1 className="flex justify-center text-lg lg:text-2xl">
            Payment succesfully sent.
          </h1>
          <p className="flex justify-center text-lg lg:text-2xl">
            You will receive a confirmation email shortly.
          </p>
        </Container>
        <Footer />
      </div>
    </main>
  );
}
