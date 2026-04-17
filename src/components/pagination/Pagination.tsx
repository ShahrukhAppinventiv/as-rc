import TablePagination from '@mui/material/TablePagination';

type PaginationProps = {
    total: number,
    page: number
    limit: number
    onPagination: any,
    onLimitChange: any
}

export default function Pagination({ total, page, limit, onPagination, onLimitChange }: PaginationProps) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        console.log("newPage===>", newPage)
        // setPage(newPage);
        onPagination(newPage )
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        onLimitChange(parseInt(event.target.value))
        // setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
    };
    return (

        <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}
