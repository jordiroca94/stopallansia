"use client";

import Header from "@/components/Header";
import Parallax from "@/components/Parallax";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Header />
        <Parallax />
        <div className="bg-white">FOOTER </div>
      </div>
    </main>
  );
}
