import { Chip } from "@mui/material";
import type { TableHeader } from "../../../components/table";
import { ActionMenu2 } from "./actionMenu2";
import type { Customer } from "./type";
import { Paths } from "../../../constants/path";

export const CUSTOMER_TABLE_HEADER: TableHeader<Customer>[] = [
    {
        label: "Customer ID",
        key: "customerId",
        render: (row: any, navigate: any) => (
            <span
                className="cursor-pointer underline"
                onClick={() => navigate(`${Paths.CUSTOMER_DETAILS}/${row.id}`)}
            >
                {row.customerId}
            </span>
        ),
    },
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    {
        label: "Status",
        key: "status",
        render: (row: any) => (
            <Chip
                label={row?.status === "ACTIVE" ? "Active" : "Inactive"}
                sx={{
                    backgroundColor: row?.status === "ACTIVE" ? "#cfe3d9" : "#f1aaaa",
                    color: row?.status === "ACTIVE" ? "green" : "red",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 1.5,
                }}
            />
        ),
    },
    {
        label: "Action",
        key: "actions",
        render: (row: any) => <ActionMenu2 row={row} />,
    },
];
