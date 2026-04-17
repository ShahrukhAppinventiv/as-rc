import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return {
    navigate,
    goBack,
  };
};
