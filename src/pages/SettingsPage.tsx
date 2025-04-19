import React, { useState } from "react";
import { Save, User, Bell, Lock, Shield } from "lucide-react";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useAuth } from "../contexts/AuthContext";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) return null;

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "security", label: "Security", icon: <Lock size={18} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and settings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <div className="md:w-64 flex-shrink-0">
          <Card className="overflow-hidden p-0">
            <nav className="divide-y divide-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium text-left
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span
                    className={`mr-3 ${
                      activeTab === tab.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card
              title="Profile Information"
              subtitle="Update your account profile information"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 relative rounded-full overflow-hidden border border-gray-200">
                    <span className="absolute bottom-0 right-0 text-xl animate-bounce">
                      😀
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <div className="text-xs text-gray-500">
                      JPG, GIF or PNG. 1MB max.
                    </div>
                  </div>
                </div>

                <Input
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                />

                <div className="flex justify-end">
                  <Button variant="primary" leftIcon={<Save size={18} />}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card
              title="Notification Preferences"
              subtitle="Control how you receive notifications"
            >
              <div className="space-y-4">
                {[
                  "Email Notifications",
                  "Push Notifications",
                  "SMS Notifications",
                  "In-App Notifications",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item}</p>
                      <p className="text-sm text-gray-500">
                        Receive notifications about account activity
                      </p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card
              title="Security Settings"
              subtitle="Update your security preferences"
            >
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter your current password"
                />

                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                />

                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm your new password"
                />

                <div className="flex justify-end">
                  <Button variant="primary" leftIcon={<Save size={18} />}>
                    Update Password
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card
              title="Privacy Settings"
              subtitle="Control your privacy preferences"
            >
              <div className="space-y-4">
                {[
                  "Profile Visibility",
                  "Email Address Visibility",
                  "Activity Status",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item}</p>
                      <p className="text-sm text-gray-500">
                        Control who can see your {item.toLowerCase()}
                      </p>
                    </div>
                    <select className="form-select rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm">
                      <option>Everyone</option>
                      <option>Only Me</option>
                      <option>Connections Only</option>
                    </select>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
