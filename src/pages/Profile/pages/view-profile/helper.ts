import { useNavigate } from "react-router-dom";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import { useAppSelector } from "../../../../store/store";

const useViewProfile = () => {
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs("VIEW_PROFILE");
  const profileDetails = useAppSelector(state => state.profileSlice.data)
  return { navigate, breadcrumbs,profileDetails };
};

export default useViewProfile;
