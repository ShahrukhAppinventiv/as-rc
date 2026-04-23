import { Navigate, Outlet } from "react-router-dom";
import { getProfileDetails } from "../pages/Profile/services/slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { useEffect } from "react";

export const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (token) {
          const result = await dispatch(getProfileDetails()).unwrap();
          console.log("Profile:", result);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();

  }, [])
  const dispatch = useDispatch<AppDispatch>()
  return token ? <Outlet /> : <Navigate to="/" replace />;

}
