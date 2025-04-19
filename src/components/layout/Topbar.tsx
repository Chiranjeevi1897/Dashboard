import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  onMenuClick: () => void;
}

const getRandomEmoji = () => {
  const emojis = ["👋", "🌟", "✨", "🚀", "💫", "⭐️", "🌈", "🎯", "💪", "🎨"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "🌅 Good morning";
  if (hour < 17) return "☀️ Good afternoon";
  return "🌙 Good evening";
};

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [greeting] = useState(getTimeBasedGreeting());
  const [emoji] = useState(getRandomEmoji());
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      {/* Left section */}
      <div className="flex items-center">
        <button
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        {/* Greeting */}
        <div className="hidden md:flex items-center ml-4 space-x-2">
          <span className="text-lg font-medium text-gray-700">{greeting}</span>
          <span className="text-2xl">{emoji}</span>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center ml-4 lg:ml-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          <Bell size={20} />
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="relative">
              <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                <span className="absolute bottom-0 right-0 text-xl animate-bounce">
                  😀
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 text-sm">
                {user?.role === "Developer"
                  ? "👨‍💻"
                  : user?.role === "Designer"
                  ? "🎨"
                  : user?.role === "Product Manager"
                  ? "📊"
                  : user?.role === "Marketing Manager"
                  ? "📢"
                  : "👔"}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-700 flex items-center">
                {user?.name}
                <span className="ml-1" role="img" aria-label="wave">
                  {emoji}
                </span>
              </p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  Signed in as
                </p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User size={16} className="mr-3 text-gray-500" />
                Your Profile
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Settings size={16} className="mr-3 text-gray-500" />
                Settings
              </a>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-3 text-red-500" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
