"use client";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { config } from "@/config";
import { useEffect } from "react";

const HomeLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    const tawk = document.createElement("script");
    tawk.async = true;
    tawk.src = `https://embed.tawk.to/${config.tawkId}/DEFAULT`;
    tawk.charset = "UTF-8";
    tawk.setAttribute("crossorigin", "*");
    document.body.appendChild(tawk);

    return () => {
      document.body.removeChild(tawk);
    };
  }, []);
  return (
    <section className="overflow-hidden">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
};

export default HomeLayout;
