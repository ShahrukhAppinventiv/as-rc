import { Chip } from "@mui/material";
import type { TableHeader } from "../../../components/table";
import { ActionMenu2 } from "./actionMenu2";
// import ActionMenu from "./actionmenu";
// import { ActionMenu2 } from "./actionMenu2";
import type { UserType } from "./type";
import { Paths } from "../../../constants/path";

// export const CUSTOMER_TABLE_HEADER: TableHeader<UserType>[] = [
//   { label: "Customer ID", key: "customerId", },
//   { label: "Full Name", key: "fullName" },
//   { label: "Email", key: "email" },
//   { label: "Phone", key: "phone" },
//   { label: "Status", key: "status" },
//   { label: "Action", key: "actions" },
// ];

export const CUSTOMER_TABLE_HEADER = [
    {
        label: "Customer ID", key: "customerId", render: (row: any, navigate: any) => (
            <span className="cursor-pointer underline"
                onClick={() => navigate(`${Paths.CUSTOMER_DETAILS}/${row.id}`)}>{row.customerId}</span>
        )
    },
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
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
    { label: "Action", key: "actions", render: (row: any) => <ActionMenu2 row={row} /> },
];


// const columns = [
//     { header: "User Id", accessor: "adminId", render: (row: any) => <a className="cursor-pointer text-blue-500" onClick={() => onDetails(row)}>{row.adminId} </a> },

//     { header: "Name", accessor: "fullName" },
//     { header: "Email", accessor: "email" },
//     { header: "Created On", accessor: "createdAt", sortable: true, sortKey: 'createdAt', render: (row: any) => (formatDate(row.createdAt)) },
//     { header: "Status", accessor: "status", render: (row: any) => (<span className={${row.status == 'ACTIVE' ? "text-green-600" : "text-gray-600 bg-gray-100"}} > { row.status }</span >) },
// {
//     header: "Actions",
//         accessor: "",
//             render: (row: any) => <button className="cursor-pointer text-blue-500" onClick={() => onEdit(row)} >Edit</button>,
//         },
//     ]

// const onEdit = (row: any) => {
// }
// const onDetails = (row: any) => {
// }