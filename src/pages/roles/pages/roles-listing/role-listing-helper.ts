import { useEffect } from "react";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { ROLES_TABLE_HEADER } from "../../services/constant";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { getRoleListing } from "../../services/role-slice";
import { useNavigate } from "react-router-dom";

export const useRoleListingHelper = () => {
  const breadcrumbs = useBreadcrumbs("ROLES");
  const tableHeading = ROLES_TABLE_HEADER;
  const navigagte = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const listParams = useAppSelector((state) => state.roleSlice.listParams);
  const rolesList = useAppSelector((state) => state.roleSlice.list);
  const isLoading = useAppSelector(
    (state) => state.globalSlice.loader.isShowLoader,
  );
  useEffect(() => {
    if (listParams?.page !== undefined) {
      dispatch(
        getRoleListing({
          page: listParams.page + 1,
          limit: listParams.limit,
          ...(listParams.search ? { search: listParams.search } : {}),
          ...(listParams.status ? { status: listParams.status } : {}),
        }),
      );
    }
  }, [
    listParams?.page,
    listParams?.limit,
    listParams?.search,
    listParams?.status,
  ]);
  useEffect(() => {
    return () => {
      // dispatch(resetListParams());
    };
  }, []);
  return {
    breadcrumbs,
    tableHeading,
    dispatch,
    listParams,
    rolesList,
    isLoading,
    navigagte
  };
};
