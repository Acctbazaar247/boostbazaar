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
      className="w-11/12 mx-auto md:container bg-primary px-4 md:px-16 py-6 md:py-16 rounded-xl md:rounded-[20px] mt-20 md:mt-24 -mb-10 md:-mb-16 flex items-center justify-between"
    >
      {contactsData.map((contact, i) => (
        <div
          key={i}
          className={`text-white flex items-center ${
            i === 1 ? "md:gap-1" : "gap-1 md:gap-2.5"
          }`}
        >
          <Image
            src={contact.image}
            width={i === 1 ? 60 : 40}
            height={i === 1 ? 60 : 40}
            alt="logo"
            className="max-sm:size-5 aspect-square"
          />
          <div className="">
            <h2 className="text-sm md:text-2xl leading-9">{contact.title}</h2>
            <p className="font-light text-[8px] md:text-sm">{contact.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ContactUs;
