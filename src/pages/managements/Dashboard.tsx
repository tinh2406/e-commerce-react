import ProductChart from "../../components/managements/ProductChart";
import UserChart from "../../components/managements/UserChart";

const Dashboard = () => {
  return (
    <div className="px-4 pt-6">
      <div className="grid w-full grid-cols-1 gap-4 mt-4 xl:grid-cols-2">
        <ProductChart />
        <UserChart />
      </div>
    </div>
  );
};

export default Dashboard;
