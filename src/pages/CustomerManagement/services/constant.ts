import type { TableHeader } from "../../../components/table";
import type { UserType } from "./type";

export const CUSTOMER_TABLE_HEADER: TableHeader<UserType>[] = [
  { label: "Customer ID", key: "customerId" },
  { label: "Full Name", key: "fullName" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Status", key: "status" },
  { label: "Action", key: "actions" },
];
