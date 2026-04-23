import useBreadcrumbs from "@components/breadcrumbs/helper";
import { USER_TABLE_HEADER } from "../../services/heading";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserList } from "../../services/action";
import { useAppSelector, type AppDispatch } from "@store/store";
import { useNavigate } from "react-router-dom";

export const useUserListHelper = () => {
  const breadcrumb = useBreadcrumbs("USER_MANAGEMENT");
  const tableHeading = USER_TABLE_HEADER;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const listParams = useAppSelector(
    (state) => state.userManagementSlice.listParams,
  );
  const isFilteApplied = useAppSelector(
    (state) => state.userManagementSlice.isFilterApplied,
  );
  const userList = useAppSelector((state) => state.userManagementSlice.list);
  const isLoading = useAppSelector(
    (state) => state.globalSlice.loader.isShowLoader,
  );
  useEffect(() => {
    if (listParams?.page !== undefined) {
      dispatch(
        getUserList({
          page: listParams.page + 1,
          limit: listParams.limit,
          ...(listParams.search ? { search: listParams.search } : {}),
          ...(listParams.status ? { status: listParams.status } : {}),
        }),
      );
    }
  }, [listParams.page, listParams.limit, listParams.search, listParams.status]);
  return {
    breadcrumb,
    tableHeading,
    dispatch,
    listParams,
    userList,
    isLoading,
    isFilteApplied,
    navigate
  };
};
