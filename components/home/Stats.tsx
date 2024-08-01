import Count from "./Count";

const Stats = () => {
  const stats = [
    {
      amount: 30,
      text: "Total Users.",
    },
    {
      amount: 10,
      text: "In progress.",
    },
    {
      amount: 30,
      text: "Delivered.",
    },
  ];
  return (
    <section className="my-20 md:my-44 border-t border-b border-primary bg-white">
      <div className="container lg:px-12 center justify-between py-8 md:py-12">
        {stats.map((stat) => (
          <div key={stat.text} className="text-center">
            <h1 className="text-2xl md:text-7xl 2xl:text-[80px] text-primary leading-10 md:leading-[90px] 2xl:leading-[120px] font-medium flex items-center">
              <Count amount={stat.amount} />k
            </h1>
            <p className="text-lg md:text-3xl font-light">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
