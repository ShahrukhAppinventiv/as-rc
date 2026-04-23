import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { removeFilter, resetCustomerState, resetListParams } from "./services/slice";

const CustomerManagementLayout = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        return () => {
            // dispatch(resetListParams());
            dispatch(removeFilter());
            // dispatch(resetCustomerState());
        };
    }, []);
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default CustomerManagementLayout;