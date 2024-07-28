import Image from "next/image";
import AppButton from "../ui/AppButton";
import Link from "next/link";
import { FaStar, FaUser } from "react-icons/fa";
import { MdOutlineHomeRepairService } from "react-icons/md";

const Banner = () => {
  const bannerData = [
    {
      image: "/image/b1.png",
      title: "Instagram",
    },
    {
      image: "/image/b2.png",
      title: "Facebook",
    },
    {
      image: "/image/b3.png",
      title: "Linkedin",
    },
    {
      image: "/image/b4.png",
      title: "Telegram",
    },
    {
      image: "/image/b5.png",
      title: "Youtube",
    },
  ];

  const avatars = [
    { image: "/image/ai1.png" },
    { image: "/image/ai2.png" },
    { image: "/image/ai3.png" },
  ];

  return (
    <section id="Home" className="md:h-screen">
      <div className="md:h-[89%] container grid grid-cols-1 md:grid-cols-2">
        {/* this is left div  */}
        <div className="flex flex-col max-sm:pt-24 justify-end md:h-full">
          <h2 className="text-primary/70 border w-fit border-primary/70 rounded-xl text-xs py-2 px-4">
            Unlimited Packages For You
          </h2>
          <h1 className="heading font-medium pt-5 text-black">
            Giving Your Brand <span className="text-primary">Unlimited</span>{" "}
            Outreach Is Our Priority
          </h1>
          <p className="font-light text-dark-grey max-w-[540px] py-4 2xl:py-6">
            Get your Brands Pictures, Videos buzzing with Followers, Likes,
            Views, etc without breaking a sweat.
          </p>

          <div className="flex items-center justify-between md:gap-5">
            <AppButton
              icon={<MdOutlineHomeRepairService />}
              label="Services"
              className="px-11 md:px-14 py-2"
              href="#Services"
            />
            <AppButton
              label="Contact Us"
              variant="outlined"
              className="px-9 md:px-12 py-2"
              icon={<FaUser className="text-sm" />}
              iconPosition="left"
              href="#Contact"
            />
          </div>
          <p className="font-light text-dark-grey py-6 2xl:py-9">
            Elevate your online presence with unlimited outreach.
          </p>

          <div className="pb-10 2xl:pb-20 flex items-center gap-6">
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {avatars.map((av, i) => (
                <Image
                  key={i}
                  className="max-2xl:size-10"
                  src={av.image}
                  alt="banner image"
                  width={45}
                  height={45}
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
          </div>
        </div>
        {/* this is right side div  */}
        <div className=" flex items-end justify-end">
          <Image
            className="-mb-4 md:-mb-5 2xl:-mb-6 max-2xl:w-[480px] aspect-square"
            src={"/image/banner.png"}
            alt="banner image"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="md:h-[11%] bg-primary center">
        <div className="container flex items-center justify-between max-sm:py-2">
          {bannerData.map((bann, i) => (
            <div key={i} className="center gap-1">
              <Image
                className="max-sm:w-3.5 max-2xl:w-9 h-auto"
                src={bann.image}
                alt="banner image"
                width={i == 0 ? 50 : 45}
                height={i == 0 ? 50 : 45}
              />
              <h2 className="max-sm:text-[10px] xl:text-2xl 2xl:text-3xl font-light text-white">
                {bann.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* this is grid image  */}
      <div className="absolute w-full -z-10 top-0 select-none">
        <div className="container">
          <Image
            className="md:w-10/12 mx-auto md:h-[90dvh]"
            src={"/image/banner-b.png"}
            alt="banner image"
            width={1600}
            height={1200}
          />
          <Image
            className="md:hidden md:w-10/12 mx-auto md:h-[90dvh]"
            src={"/image/banner-b.png"}
            alt="banner image"
            width={1600}
            height={1200}
          />
          <Image
            className="md:hidden md:w-10/12 mx-auto md:h-[90dvh]"
            src={"/image/banner-b.png"}
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
