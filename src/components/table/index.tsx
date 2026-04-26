import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotFound from "../not-found/NotFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

export type TableHeader<T> = {
    label: string;
    key?: keyof T;
    render?: (row: T, navigate?: any) => React.ReactNode;
};

type tableHeaderProp<T> = {
    tableHeader: TableHeader<T>[];
    data: T[];
    isLoading?: boolean;
};
export default function CommonTable<T>({
    tableHeader,
    data = [],
    isLoading = false,
}: tableHeaderProp<T>) {
    const navigatge = useNavigate();
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            className="bg-gray-200"
                            sx={{
                                "& .MuiTableCell-root": {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            {tableHeader.map((heading, index) => (
                                <TableCell key={index}>{heading.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 10 }).map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {tableHeader.map((_, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <Skeleton />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : data.length ? (
                            data.map((row: T, index) => (
                                <TableRow key={index}>
                                    {tableHeader.map((heading) => {
                                        return (
                                            <TableCell key={String(heading.key)}>
                                                {heading.render
                                                    ? heading.render(row, navigatge)
                                                    : (heading.key ? String(row[heading.key] ?? "-") : "")
                                                    // String(row[heading.key] ?? "-")
                                                }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={tableHeader.length} align="center">
                                    <NotFound message="No Data Found!" />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
