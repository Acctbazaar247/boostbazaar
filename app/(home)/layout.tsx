import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="overflow-hidden">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
};

export default HomeLayout;
