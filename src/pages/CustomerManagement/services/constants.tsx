import { Chip } from "@mui/material";
import { Paths } from "../../../constants/path";
import ActionMenu from "./actionmenu";

export const columnRenderers = {
    customerId: (row: any, navigate: any) => (
        <span className="cursor-pointer underline"
            onClick={() => navigate(`${Paths.CUSTOMER_DETAILS}/${row.id}`)}>{row.customerId}</span>
    ),
    status: (row: any) => (
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
    ),
    createdAt: (row: any) =>
        new Date(row.createdAt).toLocaleDateString(),

    phone: (row: any) =>
        `${row.countryCode ?? ""} ${row.phone ?? "-"}`,
    actions: (row: any, navigate: any) => (
        <ActionMenu row={row} navigate={navigate} />
    ),
};