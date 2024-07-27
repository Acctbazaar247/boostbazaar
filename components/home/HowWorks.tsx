import Image from "next/image";

const HowWorks = () => {
  const cardData = [
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h1.png",
    },
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h2.png",
    },
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h3.png",
    },
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h4.png",
    },
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h5.png",
    },
    {
      title: "Create Account",
      text: "Create an account in less than a minute on BoostBazar.",
      image: "/image/h6.png ",
    },
  ];

  return (
    <section className="container pt-20">
      <h3 className="bg-primary/5 w-fit mx-auto rounded md:px-3 py-1.5 text-xs text-primary/70">
        Social Media Marketing
      </h3>
      <h1 className="heading text-center">How It Works</h1>
      <p className="text-dark-grey text-center">
        6 easy ways to elevate your online presence
      </p>
      <div className="grid grid-cols-3 gap-x-4 md:gap-x-28 gap-y-8 md:gap-y-12 pt-6 md:pt-12">
        {cardData.map((card, i) => (
          <div
            key={card?.title}
            className="bg-white relative center flex-col py-4 md:pt-12 md:pb-8 px-2 md:px-8 rounded-xl border border-primary/40"
          >
            {i !== 2 && i !== 5 && (
              <div className="absolute -right-4 md:-right-20">
                <Image
                  src={"/image/arrow.png"}
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
              className="max-sm:w-12 aspect-square rounded-full"
              alt={card.title}
            />
            <h2 className="text-primary text-xs md:text-[26px] 2xl:text-3xl pt-2 md:pt-11">
              {card.title}
            </h2>
            <p className="text-dark-grey text-[10px] 2xl:text-lg pt-1 md:pt-2">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
