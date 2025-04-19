import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  Settings, 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare,
  X 
} from 'lucide-react';
import { MenuItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: 'BarChart2' },
  { name: 'Team', path: '/dashboard/team', icon: 'Users' },
  { name: 'Documents', path: '/dashboard/documents', icon: 'FileText' },
  { name: 'Calendar', path: '/dashboard/calendar', icon: 'Calendar' },
  { name: 'Messages', path: '/dashboard/messages', icon: 'MessageSquare' },
  { name: 'Settings', path: '/dashboard/settings', icon: 'Settings' },
];

const getIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    LayoutDashboard: <LayoutDashboard size={20} />,
    BarChart2: <BarChart2 size={20} />,
    Settings: <Settings size={20} />,
    Users: <Users size={20} />,
    FileText: <FileText size={20} />,
    Calendar: <Calendar size={20} />,
    MessageSquare: <MessageSquare size={20} />,
  };
  return icons[iconName] || <LayoutDashboard size={20} />;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <span className="mr-3 text-current">{getIcon(item.icon)}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <a 
              href="#" 
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Settings size={18} className="mr-3" />
              Help & Support
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;