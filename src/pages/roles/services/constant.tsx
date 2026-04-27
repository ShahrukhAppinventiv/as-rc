import { Chip } from "@mui/material";
import { transformDate } from "../../../common/utils/common.fn";
import { Paths } from "../../../constants/path";
import { ActionMenu } from "./actionMenu";
import type { TableHeader } from "@components/table";
import type { Role } from "./types";

export const ROLES_TABLE_HEADER: TableHeader<Role>[] = [
    {
        label: "Role Id", key: "roleId", render: (row: any, navigate: any) => (
            <span className="cursor-pointer underline"
                onClick={() => navigate(`${Paths.ROLE_DETAILS}/${row.id}`)}>{row.roleId}</span>
        )
    },
    {
        label: "Name", key: "name",
    },
    { label: "Members Aligned", key: "totalUser" },
    {
        label: "Status", key: "status", render: (row: any) => <Chip
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
    { label: 'Created on', key: 'createdAt', render: (row: any) => <span>{transformDate(row.createdAt, 'DD MMM YYYY')}</span> },
    { label: "Actions", key: "action", render: (row: any) => <ActionMenu row={row} /> },
];