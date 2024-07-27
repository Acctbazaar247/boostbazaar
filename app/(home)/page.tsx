import Banner from "@/components/home/Banner";
import ContactUs from "@/components/home/ContactUs";
import FAQ from "@/components/home/FAQ";
import HowWorks from "@/components/home/HowWorks";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import WhyChoose from "@/components/home/WhyChoose";

const page = () => {
  return (
    <section className="">
      <Banner />
      <HowWorks />
      <Stats />
      <Services />
      <WhyChoose />
      <FAQ />
      <ContactUs />
    </section>
  );
};

export default page;
