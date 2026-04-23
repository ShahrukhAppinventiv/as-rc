import { useDispatch } from "react-redux";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { CUSTOMER_TABLE_HEADER } from "../../services/constant";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import {
  getcustomerList,
  resetSearch,
} from "../../services/slice";
const useCustomerManagement = () => {
  const breadcrumbs = useBreadcrumbs("CUSTOMER_MANAGEMENT");
  const tableHeading = CUSTOMER_TABLE_HEADER;
  const dispatch = useDispatch<AppDispatch>();
  const listParams = useAppSelector(
    (state) => state.customerManagementSlice.listParams,
  );
  const isFilteApplied = useAppSelector(
    (state) => state.customerManagementSlice.isFilterApplied,
  );
  const userList = useAppSelector(
    (state) => state.customerManagementSlice.list,
  );
  const isLoading = useAppSelector(
    (state) => state.globalSlice.loader.isShowLoader,
  );

  useEffect(() => {
    if (listParams?.page !== undefined) {
      dispatch(
        getcustomerList({
          page: listParams.page + 1,
          limit: listParams.limit,
          ...(listParams.search ? { search: listParams.search } : {}),
          ...(listParams.status ? { status: listParams.status } : {}),
        }),
      );
    }
  }, [listParams.page, listParams.limit, listParams.search, listParams.status]);
  
  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, []);

  return {
    breadcrumbs,
    tableHeading,
    dispatch,
    listParams,
    userList,
    isLoading,
    isFilteApplied,
  };
};

export default useCustomerManagement;
