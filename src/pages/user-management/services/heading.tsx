import { Paths } from "@constants/path";
import { Chip } from "@mui/material";
import { ActionMenu } from "./actionMenu";

export const USER_TABLE_HEADER = [
    {
        label: "User Id", key: "adminId", render: (row: any, navigate: any) => (
            <span className="cursor-pointer underline"
                onClick={() => navigate(`${Paths.USER_DETAILS}/${row.id}`)}>{row.adminId}</span>
        )
    },
    { label: "Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Role", key: "role", render: (row: any) => <span>{row.role.name}</span> },
    {
        label: "Status", key: "status", render: (row: any) =>
            <Chip
                label={row?.status === "ACTIVE" ? "Active" : "Inactive"}
                sx={{
                    backgroundColor:
                        row?.status === "ACTIVE" ? "#cfe3d9" : "#f1aaaa",
                    color: row?.status === "ACTIVE" ? "green" : "red",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    px: 1.5,
                }}
            />
    },
     { label: "Action", key: "actions", render: (row: any) => <ActionMenu row={row} /> },
];