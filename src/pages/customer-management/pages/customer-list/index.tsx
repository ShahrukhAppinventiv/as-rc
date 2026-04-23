import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCallback, useEffect, useState } from 'react';
import { getApiCall } from '../../../../api/api.method';
import endpoints from '../../../../api/api.endpoint';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import NotFound from '../../../../components/not-found/NotFound';
import SearchBox from '../../../../components/search-box/SearchBox';
import Pagination from '../../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../../constants/path';
import { Badge, Chip, IconButton, Menu, MenuItem } from "@mui/material";
import Breadcrumbs from '../../../../components/breadcrumbs';
import useCustomerManagement from './helper';
import CommonTable from '../../../../components/table';
import { columnRenderers } from '../../services/constantsdd';
import { setListParams } from '../../services/slice';
import Fitler from '../../../../components/filter';
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
    const { breadcrumbs, tableHeading, dispatch, listParams, userList, isLoading, isFilteApplied } = useCustomerManagement()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSearch = useCallback((value: string) => {
        dispatch(
            setListParams({
                limit: listParams.limit || 10,
                page: 0,
                search: value,
            })
        );
    }, [dispatch, listParams.limit]);

    

    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <div className='flex justify-between'>

                <SearchBox
                    placeholder="Search by Customer Name"
                    onSearch={handleSearch}
                // onSearch={(value) =>
                //     dispatch(
                //         setListParams({
                //             limit: listParams.limit || 10,
                //             page: 0,
                //             search: value,
                //         })
                //     )
                // }
                />
                <Badge color="secondary" variant="dot" invisible={!isFilteApplied}>
                    <span onClick={handleFilterOpen} className='cursor-pointer'>

                        <FilterListIcon />
                    </span>
                </Badge>
                
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem>
                        <Fitler closeFilter={setAnchorEl}></Fitler>
                    </MenuItem>

                </Menu>
            </div>
            <CommonTable tableHeader={tableHeading} data={userList?.data?.users} renderers={columnRenderers} isLoading={isLoading} navigatge={navigate} />
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

