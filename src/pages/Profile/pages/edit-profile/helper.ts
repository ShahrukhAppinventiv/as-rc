import { useNavigate } from "react-router-dom";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useEditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const breadcrumbs = useBreadcrumbs("EDIT_PROFILE");
  const profileDetails = useAppSelector((state) => state.profileSlice.data);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const toggleCancelDialog = () => {
    setOpenCancelDialog((prev) => !prev);
  };

  return {
    navigate,
    dispatch,
    breadcrumbs,
    profileDetails,
    openCancelDialog,
    toggleCancelDialog,
  };
};

export default useEditProfile;
