import StatCard from "./StatCard";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Leads",
      value: "1,250",
      change: "+15% from last month",
    },
    {
      title: "Active Deals",
      value: "136",
      change: "+8%",
    },
    {
      title: "Closed Deals",
      value: "58",
      change: "+12%",
    },
    {
      title: "Monthly Revenue",
      value: "$45,000",
      change: "+20%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          change={card.change}
        />
      ))}
    </div>
  );
};

export default DashboardCards;