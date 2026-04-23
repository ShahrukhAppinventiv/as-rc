export interface UserDetailsType {
  fullName: string;
  profilePicture: string | null;
  countryCode: string | null;
  phone: string | null;
  email: string | null;
  status: "ACTIVE" | "INACTIVE" | string;
  gender: "MALE" | "FEMALE" | string | null;
  dob: string | null; // can be empty ""
  platform: string | null;
  points: number | null;
  createdAt: string; // ISO date string
  customerId: string;
  id: string;
  tierId: string | null;
  tier: any;
}

export type UserType = {
  id: string;
  customerId: string;
  fullName: string | null;
  email: string | null;
  phone: string;
  countryCode: string;
  status: string;
  actions:string
};
