import Header from "@/components/header/Header";
import AdminLogin from "@/components/tooling/AdminLogin";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <AdminLogin />
    </main>
  );
}
