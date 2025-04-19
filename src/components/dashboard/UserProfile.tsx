import React from "react";
import { User as UserIcon, Mail, Calendar, Clock } from "lucide-react";
import Card from "../common/Card";
import { User } from "../../types";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card className="overflow-hidden">
      {/* Cover photo */}
      <div className="-m-5 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 mb-0"></div>

      {/* Profile info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-4 px-4">
        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
          <span className="absolute bottom-0 right-0 text-xl animate-bounce">
            😀
          </span>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.role}</p>
        </div>
      </div>

      {/* User details */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <div className="w-10 text-gray-500">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 text-gray-500">
            <UserIcon size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">ID</p>
            <p className="text-gray-900">{user.id}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 text-gray-500">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-gray-900">{user.joined}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-10 text-gray-500">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Last active</p>
            <p className="text-gray-900">{user.lastActive}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserProfile;
