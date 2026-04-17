
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NotFound from '../not-found/NotFound';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

export type TableHeader<T> = {
    label: string;
    key: keyof T;
};

type tableHeaderProp<T> = {
    tableHeader: TableHeader<T>[],
    data: T[],
    renderers?: Partial<Record<keyof T, (row: T, navigate?: any) => React.ReactNode>>;
    isLoading?: boolean,
    navigatge: any
}
export default function CommonTable<T>({ tableHeader, data = [], renderers = {}, isLoading = false, navigatge }: tableHeaderProp<T>) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gray-200' sx={{
                            '& .MuiTableCell-root': {
                                fontWeight: 'bold',
                            },
                        }}>{
                                tableHeader.map((heading, index) => <TableCell key={index}>{heading.label}</TableCell>)
                            }

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
                                        const renderer = renderers?.[heading.key];

                                        return (
                                            <TableCell key={String(heading.key)}>
                                                {renderer
                                                    ? renderer(row, navigatge)
                                                    : String(row[heading.key] ?? '-')}
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
    )
}
