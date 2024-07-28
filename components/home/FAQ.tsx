import Image from "next/image";
import { IoIosArrowUp } from "react-icons/io";

const FAQ = () => {
  const faqCards = [
    {
      title: "What is BoostBazaar?",
      text: "BoostBazaar is an SMM provider. We promote your brand with our social influence partners, We provide your brand unlimited outreach that helps your brand get the social reacton or engagement you desire.",
    },
    {
      title: "What is SMM?",
      text: "Social media marketing (SMM) is the use of Social media platforms to interact with customers to build brands, increase sales, and drive website traffic.",
    },
    {
      title: "What payment options do you accept?",
      text: "At BoostBazzar our goal is to run seamless and easy means of payment options which includes Debit/Credit cards or cryptocurrency payments such as BTC, USDT etc.",
    },
    {
      title: "What social media platform can i promote?",
      text: "We promote social medias like Facebook, X which was Twitter, Telegram, Youtube, Instagram Snapchat and lots more.",
    },
  ];
  return (
    <section id="FAQ" className="container  scroll-m-28 md:scroll-m-44">
      <h1 className="heading max-w-[400px]">Frequently Asked Questions</h1>
      <p className="text-dark-grey text-lg font-light">
        Can’t find what you are looking for?
      </p>
      <div className="pt-2.5 md:grid grid-cols-2">
        <div className="">
          <h2 className="text-2xl">We would like to have a chat with you.</h2>
          <div className="flex gap-4">
            <Image
              src={"/image/message.png"}
              width={60}
              height={60}
              className="aspect-square mt-5"
              alt="message icon"
            />
            <div className="">
              <Image
                src={"/image/left-arrow.png"}
                width={70}
                height={40}
                className="flex-none h-fit"
                alt="message icon"
              />
            </div>
          </div>
          <div className="center justify-normal h-[85%] py-12">
            <Image
              src={"/image/faq.png"}
              width={385}
              height={385}
              className="max-sm:w-1/2 aspect-square"
              alt="faq icon"
            />
          </div>
        </div>
        <div className="">
          {faqCards.map((faq, i) => (
            <div
              key={faq.text}
              className={`border-b border-b-black/30 pb-6 ${
                i !== 0 && "pt-8 md:pt-12"
              }`}
            >
              <h2 className="text-xl md:text-2xl md:leading-9 pb-6 flex items-center gap-2.5">
                <IoIosArrowUp className="text-dark-grey" />
                {faq.title}
              </h2>
              <p className="text-lg md:text-xl md:leading-7 font-light px-4 text-black/90">
                {faq.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
