import React from "react";
import { User, Clock, ArrowUpRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import UserProfile from "../components/dashboard/UserProfile";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/common/Card";
import { DashboardStat } from "../types";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats: DashboardStat[] = [
    {
      id: "1",
      title: "Total Users",
      value: "12,345",
      change: 12,
      icon: "users",
    },
    {
      id: "2",
      title: "Revenue",
      value: "$48,574",
      change: 8.2,
      icon: "dollar",
    },
    {
      id: "3",
      title: "Engagement",
      value: "22.5%",
      change: -4.3,
      icon: "chart",
    },
    {
      id: "4",
      title: "Orders",
      value: "784",
      change: 16.8,
      icon: "cart",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User profile card */}
        <div className="lg:col-span-1">
          <UserProfile user={user} />
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>

        {/* Tasks card */}
        <div className="lg:col-span-1">
          <Card title="Upcoming Tasks" className="h-full">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">
                      Task {i}: Quarterly Report Review
                    </h4>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      In Progress
                    </span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    Due in 3 days
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-6 w-6 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                        />
                      ))}
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      View Details
                      <ArrowUpRight size={12} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
