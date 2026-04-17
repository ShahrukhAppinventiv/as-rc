import { useNavigate } from "react-router-dom";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { useDispatch } from "react-redux";

const useEditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const breadcrumbs = useBreadcrumbs("EDIT_PROFILE");
  const profileDetails = useAppSelector((state) => state.profileSlice.data);

  return {
    navigate,
    dispatch,
    breadcrumbs,
    profileDetails,
  };
};

export default useEditProfile;
