export type UserListResponse = {
  statusCode: number;
  message: string;
  data: {
    items: User[];
    meta: ListMeta;
  };
  code: string;
};

type ListMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  adminId: string;
  email: string;
  fullName: string;
  userType: string;
  countryCode: string | null;
  phone: string | null;
  fullPhoneNo: string | null;
  isNew: boolean;
  roleId: string;
  role: Role;
};

export type Role = {
  id: string;
  name: string;
  isPharmacist: boolean;
  isSuperAdmin: boolean;
};
