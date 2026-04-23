import { useDispatch } from "react-redux";
import { getPermissionsListing, getRoleDetails } from "../../services/role-slice";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { useEffect } from "react";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { useNavigate, useParams } from "react-router-dom";

export const useRoleDetailsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const breadcrumbs = useBreadcrumbs("ROLE_DETAILS");
  const { roleId } = useParams<string>();
  const navigate = useNavigate();

  const permissionsList = useAppSelector(
    (state) => state.roleSlice.permissionList,
  );
  const roleDetials = useAppSelector((state) => state.roleSlice.details);

  useEffect(() => {
    dispatch(getPermissionsListing({}));
  }, [dispatch]);

  useEffect(() => {
    if (roleId) {
      dispatch(getRoleDetails({ id: roleId }));
    }
  }, [roleId]);

  const transformPermissions = (data: any[], selectedIds: string[] = []) => {
    if (!data || data.length === 0) return [];

    const grouped: any = {};

    data.forEach((item: any) => {
      if (!grouped[item.module]) {
        grouped[item.module] = {
          module: item.module,
          view: null,
          edit: null,
        };
      }

      grouped[item.module][item.action] = {
        id: item.id,
        checked: selectedIds.includes(item.id),
      };
    });

    return Object.values(grouped);
  };

  return {
    breadcrumbs,
    permissionsList,
    transformPermissions,
    roleId,
    dispatch,
    roleDetials,
    navigate,
  };
};
