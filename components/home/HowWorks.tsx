import Image from "next/image";
import { cardData } from "./data";
import arrow from "@/assets/image/arrow.png";

const HowWorks = () => {
  return (
    <section data-aos="fade-up" className="container pt-20">
      <h3 className="bg-primary/5 w-fit mx-auto rounded md:px-3 py-1.5 text-xs text-primary/70">
        Social Media Marketing
      </h3>
      <h1 className="heading text-center">How It Works</h1>
      <p className="text-dark-grey text-center">
        6 easy ways to elevate your online presence
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-x-28 gap-y-8 md:gap-y-12 pt-6 md:pt-12">
        {cardData.map((card, i) => (
          <div
            key={card?.title}
            className="bg-white relative center flex-col py-8 md:pt-12 md:pb-8 px-2 md:px-8 rounded-xl border border-primary/40"
          >
            {i !== 2 && i !== 5 && (
              <div className="max-sm:hidden absolute -right-4 md:-right-20">
                <Image
                  src={arrow}
                  alt="arrow"
                  className="max-sm:w-4 object-cover"
                  width={60}
                  height={40}
                />
              </div>
            )}
            {i % 2 === 0 && (
              <div className="absolute -right-[19px] md:-right-20">
                <Image
                  src={arrow}
                  alt="arrow"
                  className="max-sm:w-4 object-cover"
                  width={60}
                  height={40}
                />
              </div>
            )}

            <Image
              src={card.image}
              width={130}
              height={130}
              className="max-sm:w-16 aspect-square rounded-full"
              alt={card.title}
            />
            <h2 className="text-primary text-base md:text-[26px] 2xl:text-3xl pt-2 md:pt-11">
              {card.title}
            </h2>
            <p className="text-dark-grey text-xs 2xl:text-lg pt-1 md:pt-2">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
