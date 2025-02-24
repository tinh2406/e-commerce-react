import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { StatisticQuery, StatisticResponse } from "../../services/types";
import { UserStatisticsService } from "../../services/statistics.service";

const CycleSelect: ("day" | "week" | "month" | "quarter" | "year")[] = [
  "day",
  "week",
  "month",
  "quarter",
  "year",
];

const UserChart = () => {
  const [users, setUsers] = useState<StatisticResponse>([]);
  const [growth, setGrowth] = useState<StatisticResponse>([]);
  const [userQuery, setUserQuery] = useState<StatisticQuery>({
    cycle: "week",
    num_cycle: 7,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await UserStatisticsService(userQuery);
      if (res.length > 0) {
        setUsers(res);
        let growth = res.slice(res.length - 2);
        growth.reverse();
        setGrowth(growth);
      }
    };

    fetchUsers();
  }, [userQuery]);

  const [isCycleSelectOpen, setIsCycleSelectOpen] = useState(false);

  return (
    <div className="items-center flex flex-col justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="w-full flex justify-between">
        <div>
          <h3 className="text-base font-normal text-gray-500 dark:text-gray-400">
            New users
          </h3>
          <span className="text-2xl font-bold leading-none text-gray-900 sm:text-3xl dark:text-white">
            {growth.length > 0 ? growth[0].count - growth[1]?.count || 0 : 0}
          </span>
          <p className="flex items-center text-base font-normal text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-1.5 text-sm text-green-500 dark:text-green-400">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                ></path>
              </svg>
              {growth.length > 1
                ? `${(
                    ((growth[0].count - growth[1].count) /
                      (growth[1].count || growth[0].count)) *
                    100
                  ).toFixed(1)}%`
                : "0%"}
            </span>
            Since last {userQuery.cycle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative border  rounded-md">
            <div className="flex justify-between items-center">
              <label htmlFor="start" className="capitalize mx-2 my-1">
                Start:{" "}
              </label>
              <input
                type="date"
                id="start"
                name="start"
                className="outline-none mx-1 w-20 bg-gray-100 rounded-md text-right"
                value={userQuery.start_date || ""}
                onChange={(e) =>
                  setUserQuery({
                    ...userQuery,
                    start_date: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="relative border  rounded-md">
            <button className="flex justify-between items-center">
              <span className="capitalize mx-2 my-1">End: </span>
              <input
                type="date"
                className="outline-none mx-1 w-20 bg-gray-100 rounded-md text-right"
                value={userQuery.end_date || ""}
                onChange={(e) =>
                  setUserQuery({
                    ...userQuery,
                    end_date: e.target.value,
                  })
                }
              />
            </button>
          </div>
          <div className="relative border  rounded-md">
            <button className="flex justify-between items-center">
              <span className="capitalize mx-2 my-1">Total: </span>
              <input
                type="number"
                className="outline-none mx-1 w-10 bg-gray-100 rounded-md text-right"
                value={userQuery.num_cycle || ""}
                onChange={(e) =>
                  setUserQuery({
                    ...userQuery,
                    num_cycle: Number(e.target.value),
                  })
                }
              />
            </button>
          </div>
          <div className="relative border rounded-md">
            <button
              onClick={() => setIsCycleSelectOpen(!isCycleSelectOpen)}
              className="flex mx-2 my-1"
            >
              <span className="capitalize">Every {userQuery.cycle}</span>
              <div>
                <svg
                  xmlns="http://www.w3.org/
                2000/svg"
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {isCycleSelectOpen && (
              <div className="absolute p-2 w-32 overflow-hidden left-0 bg-white border-gray-200 rounded-md shadow-lg z-20 dark:bg-gray-800">
                {CycleSelect.map((cycle) => (
                  <button
                    key={cycle}
                    className="px-2 py-1 hover:bg-gray-200/90 w-full text-start rounded-md capitalize"
                    onClick={() => {
                      setUserQuery({
                        ...userQuery,
                        cycle,
                      });
                      setIsCycleSelectOpen(false);
                    }}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Chart
          options={{
            chart: {
              id: "user-chart",
            },
            xaxis: {
              categories: [
                ...users.map((user) =>
                  user.range_label == "0" ? "Other" : user.range_label
                ),
              ],
            },
          }}
          series={[
            {
              name: "Users",
              data: [...users.map((user) => user.count)],
            },
          ]}
          type="bar"
        />
      </div>
    </div>
  );
};

export default UserChart;
