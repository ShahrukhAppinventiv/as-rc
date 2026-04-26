export interface UserDetailsType {
  fullName: string;
  profilePicture: string | null;
  countryCode: string | null;
  phone: string | null;
  email: string | null;
  status: "ACTIVE" | "INACTIVE" | string;
  gender: "MALE" | "FEMALE" | string | null;
  dob: string | null;
  platform: string | null;
  points: number | null;
  createdAt: string;
  customerId: string;
  id: string;
  tierId: string | null;
  tier: any;
}

export type Customer = {
  id: string;
  fullName: string | null;
  email: string | null;
  countryCode: string;
  phone: string;
  status: string;
  platform: string | null;
  customerId: string;
  createdAt: string;
  tier: any;
};

export type CustomerListResponse = {
  users: Customer[];
  total: number;
  page: number;
  limit: number;
};

export type CustomerListApiResponse = {
  statusCode: number;
  message: string;
  data: CustomerListResponse;
};
