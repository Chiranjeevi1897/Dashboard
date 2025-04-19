export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joined: string;
  lastActive: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export interface DashboardStat {
  id: string;
  title: string;
  value: string;
  change: number;
  icon: string;
}

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}