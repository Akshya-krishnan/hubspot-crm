import StatCard from "./StatCard";

const DashboardCards = ({ stats }) => {
  if (!stats) {
    return <p>Loading...</p>;
  }

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      change: "Live Data",
    },
    {
      title: "Active Deals",
      value: stats.activeDeals,
      change: "Live Data",
    },
    {
      title: "Closed Deals",
      value: stats.closedDeals,
      change: "Live Data",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue}`,
      change: "Live Data",
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