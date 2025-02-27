import Image from 'next/image';
import { servicesData } from './data';
import e from '@/assets/image/e.png';
import se from '@/assets/image/se.png';
import mac from '@/assets/image/mac.png';
import iphone from '@/assets/image/phone.png';

const Services = () => {
  return (
    <section
      data-aos="fade-up"
      id="Services"
      className="container scroll-m-28 md:scroll-m-44"
    >
      <div className="bg-primary-7 relative mt-32 pt-16 pb-10 md:py-20 center flex-col rounded-t-lg shadow-md -mb-0.5">
        <h1 className="heading">Our Services</h1>
        <p className="leading-6 text-dark-grey">
          Unlimited services that keeps your brand atop
        </p>

        <div className="absolute top-0">
          <div className="relative">
            <Image src={e} width={112} height={55} alt="logo" className="" />
            <div className="absolute w-full center -top-9">
              <Image src={se} width={80} height={80} alt="logo" className="" />
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 justify-center items-center mt-[-2rem] md:mt-[-5rem]">
        {/* MacBook Image */}
        <div className="w-full md:w-[75%] lg:w-[70%] xl:w-[65%] relative md:block">
          <Image
            src={mac}
            alt="MacBook"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* iPhone Image */}
        <div className="w-[80%] md:w-[35%] lg:w-[30%] xl:w-[25%] relative">
          <Image
            src={iphone}
            alt="iPhone"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>


      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10">
        {servicesData.map((service, i) => (
          <div
            key={i}
            className="bg-white drop-shadow-md border border-primary/50 rounded-lg text-center"
          >
            <div className="relative">
              <Image
                src={service.image}
                width={400}
                height={180}
                alt="logo"
                className="w-full h-auto 2xl:h-44"
              />
            </div>
            <h3 className="text-base md:text-2xl pb-8 md:pb-16 pt-4 md:pt-8">
              {service.title}
            </h3>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default Services;
