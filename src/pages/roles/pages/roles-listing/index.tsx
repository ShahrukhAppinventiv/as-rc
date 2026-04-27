import { Button } from "@mui/material";
import Breadcrumbs from "../../../../components/breadcrumbs";
import Pagination from "../../../../components/pagination/Pagination";
import SearchBox from "../../../../components/search-box/SearchBox";
import CommonTable from "../../../../components/table";
import { setRoleListParams } from "../../services/role-slice";
import { useRoleListingHelper } from "./role-listing-helper";
import { Paths } from "../../../../constants/path";

export default function RolesListing() {
    const {
        breadcrumbs,
        tableHeading,
        dispatch,
        navigagte,
        listParams,
        rolesList,
        isLoading,
    } = useRoleListingHelper();

    return (
        <div>
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex justify-between items-center">
                <SearchBox
                    placeholder="Search by Name"
                    onSearch={(value) =>
                        dispatch(
                            setRoleListParams({
                                limit: listParams.limit || 10,
                                page: 0,
                                search: value,
                            }),
                        )
                    }
                />
                <Button
                    sx={{ textTransform: "none", width: "150px" }}
                    variant="contained"
                    onClick={() => navigagte(Paths.ADD_ROLE)}
                >
                    Add
                </Button>
            </div>
            <CommonTable
                tableHeader={tableHeading}
                data={rolesList?.data?.items ?? []}
                isLoading={isLoading}
            />
            <Pagination
                total={rolesList?.data?.meta.totalItems ?? 0}
                page={listParams?.page || 0}
                limit={listParams?.limit || 10}
                onPagination={(newPage: any) =>
                    dispatch(
                        setRoleListParams({
                            page: newPage,
                            limit: listParams.limit,
                            search: listParams.search,
                        }),
                    )
                }
                onLimitChange={(newLimit: any) =>
                    dispatch(
                        setRoleListParams({
                            page: 0,
                            limit: newLimit,
                            search: listParams.search,
                        }),
                    )
                }
            />
        </div>
    );
}
