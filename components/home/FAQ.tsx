import Image from "next/image";
import message from "@/assets/image/message.png";
import arrow from "@/assets/image/left-arrow.png";
import faq from "@/assets/image/faq.png";
import FaqCard from "./FaqCard";
import AnimationWrapper from "../ui/AnimationWrapper";

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
      <h1 data-aos="fade-right" className="heading max-w-[400px]">
        Frequently Asked Questions
      </h1>
      <p data-aos="fade-right" className="text-dark-grey text-lg font-light">
        Can’t find what you are looking for?
      </p>
      <div className="pt-2.5 md:grid grid-cols-2">
        <div data-aos="fade-right" className="">
          <h2 className="text-2xl">We would like to have a chat with you.</h2>
          <div className="flex gap-4">
            <Image
              src={message}
              width={60}
              height={60}
              className="aspect-square mt-5"
              alt="message icon"
            />
            <div className="">
              <Image
                src={arrow}
                width={70}
                height={40}
                className="flex-none h-fit"
                alt="message icon"
              />
            </div>
          </div>
          <div className="center justify-normal h-[85%] py-12">
            <Image
              src={faq}
              width={385}
              height={385}
              className="max-sm:w-1/2 aspect-square"
              alt="faq icon"
            />
          </div>
        </div>
        <div data-aos="fade-left" className="">
          {faqCards.map((faq, i) => (
            <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
              <FaqCard i={i} faq={faq} />
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
