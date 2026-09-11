export interface UserData {
  fullname: string;
  email: string;
  password: string;
}

export interface UserDetails {
  _id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  avatar?: string;
  monthlyGoal?: number;
}

export interface LoginResponse {
  token: string;
  userDetails: UserDetails;
  message?: string;
  status?: string;
}

export interface SignupResponse {
  status: string;
  data: string | UserDetails;
  message: string | UserDetails;
}

export interface TableData {
  _id: string;
  category: string;
  userId: string;
  amount: number;
  date: Date | string;
  entryType: string;
  monthlyGoal?: number;
}

export interface MonthData {
  Expense: number;
  Income: number;
}

export interface DailyData {
  Expense: number;
  Income: number;
}

export interface ExpenseGraphItem {
  _id: string;
  totalSum: number;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
  access_key?: string;
}

export interface TrackFolioLandingProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
  [key: string]: any;
}

export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status?: number;
}
