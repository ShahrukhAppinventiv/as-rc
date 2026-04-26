export type RoleListResponse = {
  statusCode: number;
  message: string;
  data: {
    items: Role[];
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

export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: string | null;
  status: "ACTIVE" | "INACTIVE";
  roleId: string;
  name: string;
  description: string | null;
  isPharmacist: boolean;
  isSuperAdmin: boolean;
  totalUser: number;
};
