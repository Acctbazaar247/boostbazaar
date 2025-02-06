'use client';

import Image from 'next/image';
import AppButton from '../ui/AppButton';
import Link from 'next/link';
import { FaStar, FaUser } from 'react-icons/fa';
import { MdOutlineHomeRepairService } from 'react-icons/md';
import Marquee from 'react-fast-marquee';
import { useEffect, useState } from 'react';
import { avatars, bannerData } from './data';
import banner from '@/assets/image/new-banner.png';
import bannerB from '@/assets/image/banner-b.png';

const Banner = () => {
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      setSpeed(window.innerWidth > 668 ? 40 : 30);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="Home" className="md:h-screen">
      <div className="md:h-[89%] container grid grid-cols-1 md:grid-cols-2">
        {/* this is left div  */}
        <div
          data-aos="fade-right"
          className="flex flex-col max-sm:pt-24 justify-end md:h-full"
        >
          <h2 className="text-primary/70 border w-fit border-primary/70 rounded-xl text-xs py-2 px-4">
            Unlimited Packages For You
          </h2>
          <h1 className="heading font-medium pt-5 text-black">
            Cheapest and Fastest Engagements & Online SMS Verification
          </h1>
          <p className="font-light text-dark-grey max-w-[540px] py-4 2xl:py-6">
            Boost your brand with real engagement—followers, likes, and
            views—while also ensuring seamless SMS verifications for hassle-free
            account setups.
          </p>

          <div className="flex items-center max-sm:justify-between gap-2 md:gap-5">
            <AppButton
              icon={<MdOutlineHomeRepairService />}
              label="Services"
              className="px-11 md:px-14 py-2"
              href="#Services"
            />
            <AppButton
              label="Contact Us"
              variant="outlined"
              className="px-8 md:px-12 py-2"
              icon={<FaUser className="text-sm" />}
              iconPosition="left"
              href="#Contact"
            />
          </div>
          <p className="font-light text-dark-grey py-6 2xl:py-9">
            Access 1,000+ SMS verification and engagement services through our platform.
          </p>

          {/* <div className="pb-10 2xl:pb-20 flex items-center gap-6">
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {avatars.map((av, i) => (
                <Image
                  src={av.image}
                  key={i}
                  width={405}
                  className="max-2xl:size-10"
                  alt="banner image"
                  sizes="100vw"
                  height={405}
                  unoptimized={true}
                  quality={100}
                />
              ))}
              <Link
                className="flex items-center justify-center text-center max-2xl:size-10 2xl:size-[45px] text-xs font-medium text-white bg-[#D4D4D8] border-2 border-white rounded-full hover:bg-gray-600"
                href="#"
              >
                +30k
              </Link>
            </div>
            <div className="flex items-center gap-1.5">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FaStar className="text-[#F0C867] md:text-lg" key={index} />
                ))}
            </div>
          </div> */}
        </div>
        {/* this is right side div  */}
        <div data-aos="fade-left" className=" flex items-end justify-end">
          <Image
            className="mb-4 md:mb-5 2xl:mb-6 max-2xl:w-[480px] aspect-square"
            src={banner}
            alt="banner image"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="md:h-[11%] bg-primary center  max-sm:py-2">
        <Marquee
          speed={speed}
          direction="right"
          className="w-fit"
          autoFill={true}
        >
          {bannerData.map((bann, i) => (
            <div key={i} className="center gap-1 pl-5 lg:pl-40">
              <Image
                className="max-sm:w-3.5 max-2xl:w-9 h-auto"
                src={bann.image}
                alt="banner image"
                width={i == 0 ? 50 : 45}
                height={i == 0 ? 50 : 45}
              />
              <h2 className="max-sm:text-[10px] xl:text-2xl 2xl:text-3xl font-light text-[#fff]">
                {bann.title}
              </h2>
            </div>
          ))}
        </Marquee>
      </div>

      {/* this is grid image  */}
      <div
        data-aos="zoom-in"
        className="absolute w-full -z-10 top-0 select-none"
      >
        <div className="container">
          <Image
            className="md:w-10/12 mx-auto md:h-[90dvh]"
            src={bannerB}
            alt="banner image"
            width={1600}
            height={1200}
          />
          <Image
            className="md:hidden md:w-10/12 mx-auto md:h-[90dvh]"
            src={bannerB}
            alt="banner image"
            width={1600}
            height={1200}
          />
          <Image
            className="md:hidden md:w-10/12 mx-auto md:h-[90dvh]"
            src={bannerB}
            alt="banner image"
            width={1600}
            height={1200}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
