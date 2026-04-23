import { useAppDispatch } from "@hooks/useAppDispatch";
import { useEffect, useState } from "react";
import {
  getBranchDropdown,
  getRolesDropdown,
  getUserDetails,
} from "../../services/action";
import useBreadcrumbs from "@components/breadcrumbs/helper";
import { useAppSelector } from "@store/store";
import { useNavigate, useParams } from "react-router-dom";
import { resetDetails } from "../../services/user-management-slice";

export const useAddEditUserHelper = () => {
  const addBreadcrumb = useBreadcrumbs("ADD_USER");
  const editBreadcrumb = useBreadcrumbs("EDIT_USER");
  const navigate = useNavigate();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSaveDialog, setOpenSavelDialog] = useState(false);

  const toggleCancelDialog = () => {
    setOpenCancelDialog((prev) => !prev);
  };

  const toggleSaveDialog = () => {
    setOpenSavelDialog((prev) => !prev);
  };

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const rolesDropdown = useAppSelector(
    (state) => state.userManagementSlice.rolesDropdown,
  );
  const branchDropdown = useAppSelector(
    (state) => state.userManagementSlice.branchDropdown,
  );

  const userDetails = useAppSelector(
    (state) => state.userManagementSlice.details,
  );

  useEffect(() => {
    dispatch(getRolesDropdown({}));
    dispatch(getBranchDropdown({}));
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails({ id }));
    }
    return () => {
      dispatch(resetDetails());
    };
  }, []);
  return {
    addBreadcrumb,
    editBreadcrumb,
    rolesDropdown,
    branchDropdown,
    id,
    dispatch,
    navigate,
    userDetails,
    openCancelDialog,
    setOpenCancelDialog,
    openSaveDialog,
    setOpenSavelDialog,
    toggleCancelDialog,
    toggleSaveDialog
  };
};
