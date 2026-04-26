
import { useCallback, useState } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import SearchBox from '../../../../components/search-box/SearchBox';
import Pagination from '../../../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { Badge, Menu, MenuItem } from "@mui/material";
import Breadcrumbs from '../../../../components/breadcrumbs';
import useCustomerManagement from './helper';
import CommonTable from '../../../../components/table';
import { setListParams } from '../../services/slice';
import Fitler from '../../../../components/filter';
import FilterListIcon from "@mui/icons-material/FilterList";


export default function CustomerManagement() {
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
            <CommonTable tableHeader={tableHeading} data={userList?.data?.users ?? []} isLoading={isLoading} />
            <Pagination
                total={userList?.data?.total ?? 0}
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

