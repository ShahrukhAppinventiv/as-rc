import useBreadcrumbs from "@components/breadcrumbs/helper";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../services/action";
import { useAppSelector } from "@store/store";
import { resetDetails } from "../../services/user-management-slice";

export const useUserDetailsHelper = () => {
  const breadcrumb = useBreadcrumbs("USER_DETAILS");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userDetails = useAppSelector(
    (state) => state.userManagementSlice.details,
  );
  const isLoading = false;

  useEffect(() => {
    dispatch(getUserDetails({ id }));
    return () => {
      dispatch(resetDetails());
    };
  }, []);

  return {
    breadcrumb,
    userDetails,
    isLoading,
    dispatch,
    navigate,
  };
};
