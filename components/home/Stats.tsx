const Stats = () => {
  const stats = [
    {
      amount: "30k",
      text: "Total Users.",
    },
    {
      amount: "10k",
      text: "In progress.",
    },
    {
      amount: "30k",
      text: "Delivered.",
    },
  ];
  return (
    <section className="my-20 md:my-44 border-t border-b border-primary bg-white">
      <div className="container lg:px-12 center justify-between py-8 md:py-12">
        {stats.map((stat) => (
          <div key={stat.text} className="text-center">
            <h1 className="text-2xl md:text-7xl 2xl:text-[80px] text-primary leading-10 md:leading-[90px] 2xl:leading-[120px] font-medium">
              {stat.amount}
            </h1>
            <p className="text-lg md:text-3xl font-light">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
