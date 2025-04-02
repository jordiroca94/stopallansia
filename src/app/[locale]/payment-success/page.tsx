import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Container from "@/components/ui/Container";

export default function page() {
  return (
    <main>
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <Container className="flex-grow flex items-center justify-center py-20">
          <h1 className="flex justify-center text-lg lg:text-3xl">
            Payment succesfully sent, an email with the details has been sent to
            you.
          </h1>
        </Container>
        <Footer />
      </div>
    </main>
  );
}
