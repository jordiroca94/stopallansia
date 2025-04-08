import Footer from "@/components/Footer";
import Header from "@/components/header/Header";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  return (
    <main>
      <Header />
      <div className="h-screen flex flex-col justify-between -mt-20">
        <Container className="flex-grow flex items-center justify-center py-20">
          <h1 className="flex justify-center text-lg lg:text-2xl">
            {t("PAYMENT_SUCCESS_TITLE")}
          </h1>
          <p className="flex justify-center text-lg lg:text-2xl">
            {t("PAYMENT_SUCCESS_SUBTITLE")}
          </p>
        </Container>
        <Footer />
      </div>
    </main>
  );
}
