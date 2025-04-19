import React from 'react';
import { Check, MessageSquare, FileText, Calendar, User } from 'lucide-react';
import Card from '../common/Card';

const activities = [
  {
    id: 1,
    user: 'You',
    action: 'completed task',
    target: 'Q2 Planning Document',
    time: '2 hours ago',
    icon: 'check',
  },
  {
    id: 2,
    user: 'Alex Thompson',
    action: 'commented on',
    target: 'Project Timeline',
    time: '3 hours ago',
    icon: 'message',
  },
  {
    id: 3,
    user: 'Sarah Miller',
    action: 'uploaded',
    target: 'Q1 Performance Report',
    time: 'Yesterday at 2:30 PM',
    icon: 'file',
  },
  {
    id: 4,
    user: 'Martin Lewis',
    action: 'scheduled meeting',
    target: 'Product Review',
    time: 'Yesterday at 10:15 AM',
    icon: 'calendar',
  },
  {
    id: 5,
    user: 'Jessica Wang',
    action: 'joined team',
    target: 'Product Development',
    time: '2 days ago',
    icon: 'user',
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'check':
      return <Check size={14} className="text-green-500" />;
    case 'message':
      return <MessageSquare size={14} className="text-blue-500" />;
    case 'file':
      return <FileText size={14} className="text-purple-500" />;
    case 'calendar':
      return <Calendar size={14} className="text-orange-500" />;
    case 'user':
      return <User size={14} className="text-teal-500" />;
    default:
      return <Check size={14} className="text-green-500" />;
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <Card title="Recent Activity" className="h-full">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                {getIcon(activity.icon)}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityFeed;