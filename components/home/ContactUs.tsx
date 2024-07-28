import Image from "next/image";

const ContactUs = () => {
  const contactsData = [
    {
      image: "/image/c1.png",
      title: "About Us",
      text: "Know about us",
    },
    {
      image: "/image/c2.png",
      title: "Contact Us",
      text: "Have any question?",
    },
    {
      image: "/image/c3.png",
      title: "24 / 7 support",
      text: "Dedicated support",
    },
  ];
  return (
    <section
      id="Contact"
      className="w-[85%] mx-auto md:container bg-primary px-4 md:px-16 py-10 md:py-16 rounded-xl md:rounded-[20px] mt-20 md:mt-24 -mb-10 md:-mb-16 flex max-sm:flex-col max-sm:gap-5 items-center justify-between"
    >
      {contactsData.map((contact, i) => (
        <div
          key={i}
          className={`text-white flex max-sm:flex-col max-sm:text-center items-center ${
            i !== 0 && "max-sm:pt-4"
          } ${i === 1 ? "md:gap-1" : "gap-2.5"}`}
        >
          <Image
            src={contact.image}
            width={i === 1 ? 60 : 40}
            height={i === 1 ? 60 : 40}
            alt="logo"
            className={` aspect-square ${
              i === 1 ? "max-sm:size-8" : "max-sm:size-7"
            }`}
          />
          <div className="">
            <h2 className=" md:text-2xl md:leading-9">{contact.title}</h2>
            <p className="font-light text-sm">{contact.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ContactUs;
