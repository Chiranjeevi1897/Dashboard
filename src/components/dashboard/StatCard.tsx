import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  BarChart2, 
  ShoppingCart 
} from 'lucide-react';
import { DashboardStat } from '../../types';

interface StatCardProps {
  stat: DashboardStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const getIcon = () => {
    const icons: { [key: string]: React.ReactNode } = {
      'users': <Users size={24} />,
      'dollar': <DollarSign size={24} />,
      'chart': <BarChart2 size={24} />,
      'cart': <ShoppingCart size={24} />
    };
    
    return icons[stat.icon] || <BarChart2 size={24} />;
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <p className="text-2xl font-semibold mt-1 text-gray-900">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-lg ${
          stat.icon === 'users' ? 'bg-blue-50 text-blue-600' :
          stat.icon === 'dollar' ? 'bg-green-50 text-green-600' :
          stat.icon === 'chart' ? 'bg-purple-50 text-purple-600' :
          'bg-orange-50 text-orange-600'
        }`}>
          {getIcon()}
        </div>
      </div>
      
      <div className="mt-4 flex items-center">
        <span className={`flex items-center text-sm ${
          stat.change > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.change > 0 ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          {Math.abs(stat.change)}%
        </span>
        <span className="text-gray-500 text-sm ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;