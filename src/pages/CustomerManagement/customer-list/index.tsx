import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getApiCall } from '../../../api/api.method';
import endpoints from '../../../api/api.endpoint';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import NotFound from '../../../components/not-found/NotFound';
import SearchBox from '../../../components/search-box/SearchBox';
import Pagination from '../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants/path';
import { Badge, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import Breadcrumbs from '../../../components/breadcrumbs';
import useCustomerManagement from './helper';
import CommonTable from '../../../components/table';
import { columnRenderers } from '../services/constants';
import { setListParams } from '../services/slice';
import Fitler from '../../../components/filter';
import FilterListIcon from "@mui/icons-material/FilterList";


type User = {
    id: string;
    customerId: string;
    fullName: string | null;
    email: string | null;
    phone: string;
    countryCode: string;
    status: string;
};


export default function CustomerManagement() {
    // const [userList, setUserList] = useState<User[]>([])
    // const [isLoading, setIsLoading] = useState(false);
    // const [search, setSearch] = useState('');
    const navigate = useNavigate()
    const { breadcrumbs, tableHeading, dispatch, listParams, userList,isLoading } = useCustomerManagement()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false)
    const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className='flex justify-between'>

                {/* <SearchBox placeholder={'Search by Customer Name'} onSearch={(value) => setSearch(value)} /> */}
                <SearchBox
                    placeholder="Search by Customer Name"
                    onSearch={(value) =>
                        dispatch(
                            setListParams({
                                limit: listParams.limit || 10,
                                page: 0,
                                search: value,
                            })
                        )
                    }
                />
                <Badge
                    color="error"
                    variant="dot"
                    invisible={!isFilterApplied} // 🔥 hide if no filter
                >
                <IconButton onClick={handleFilterOpen}>
                    <FilterListIcon />
                </IconButton>
                </Badge>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem>
                        <Fitler closeFilter={setAnchorEl} setIsFilterApplied={setIsFilterApplied}></Fitler>
                    </MenuItem>


                </Menu>
            </div>
            <CommonTable tableHeader={tableHeading} data={userList?.data?.users} renderers={columnRenderers} isLoading={isLoading} navigatge={navigate} />
            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className='bg-gray-200' sx={{
                            '& .MuiTableCell-root': {
                                fontWeight: 'bold',
                            },
                        }}>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {isLoading
                            ? Array.from({ length: 10 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton />
                                    </TableCell>
                                </TableRow>
                            ))
                            : (
                                userList.length ?
                                    userList.map((row: User) => (
                                        <TableRow key={row.id}>
                                            <TableCell onClick={() => navigate(`${Paths.CUSTOMER_DETAILS}/${row.id}`)} className='underline cursor-pointer' >{row.customerId}</TableCell>
                                            <TableCell >{row.fullName || '-'}</TableCell>
                                            <TableCell >{row.email || '-'}</TableCell>
                                            <TableCell >{row.phone ? `${row.countryCode}-${row.phone}` : '-'}</TableCell>
                                            <TableCell >
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
                                            </TableCell>
                                        </TableRow>
                                    )) : <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <NotFound message={'No Customer Found !'} />
                                        </TableCell>
                                    </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer> */}
            {/* <Pagination total={userList?.data?.total} page={listParams?.page} onPagination={setPage} limit={listParams?.limit} onLimitChange={setLimit} /> */}
            <Pagination
                total={userList?.data?.total}
                page={listParams?.page || 0}
                limit={listParams?.limit || 10}
                onPagination={(newPage: any) =>
                    dispatch(setListParams({ page: newPage, limit: listParams.limit, search: listParams.search }))
                }
                onLimitChange={(newLimit: any) =>
                    dispatch(setListParams({ page: 0, limit: newLimit, search: listParams.search, }))
                }
            />
        </>
    );
}

