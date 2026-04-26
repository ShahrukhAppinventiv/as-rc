import Breadcrumbs from "@components/breadcrumbs";
import { useUserListHelper } from "./user-list-helper";
import SearchBox from "@components/search-box/SearchBox";
import { Button, Menu, MenuItem } from "@mui/material";
import { useCallback, useState } from "react";
import { setListParams } from "../../services/user-management-slice";
import Fitler from "@components/filter";
import CommonTable from "@components/table";
import Pagination from "@components/pagination/Pagination";
import { Paths } from "@constants/path";

export default function UserList() {
    const {
        breadcrumb,
        tableHeading,
        dispatch,
        listParams,
        userList,
        isLoading,
        navigate,
    } = useUserListHelper();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleSearch = useCallback(
        (value: string) => {
            dispatch(
                setListParams({
                    limit: listParams.limit || 10,
                    page: 0,
                    search: value,
                }),
            );
        },
        [dispatch, listParams.limit],
    );

    return (
        <>
            <Breadcrumbs items={breadcrumb} />
            <div className="flex justify-between items-center">
                <SearchBox
                    placeholder="Search by Customer Name"
                    onSearch={handleSearch}
                />
                <Button
                    sx={{ textTransform: "none", width: "150px" }}
                    variant="contained"
                    onClick={() => navigate(Paths.ADD_USER)}
                >
                    Add
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem>
                        <Fitler closeFilter={setAnchorEl}></Fitler>
                    </MenuItem>
                </Menu>
            </div>
            <CommonTable
                tableHeader={tableHeading}
                data={userList?.data?.items ?? []}
                isLoading={isLoading}
            />
            <Pagination
                total={userList?.data?.meta.totalItems ?? 0}
                page={listParams?.page || 0}
                limit={listParams?.limit || 10}
                onPagination={(newPage: any) =>
                    dispatch(
                        setListParams({
                            page: newPage,
                            limit: listParams.limit,
                            search: listParams.search,
                        }),
                    )
                }
                onLimitChange={(newLimit: any) =>
                    dispatch(
                        setListParams({
                            page: 0,
                            limit: newLimit,
                            search: listParams.search,
                        }),
                    )
                }
            />
        </>
    );
}
