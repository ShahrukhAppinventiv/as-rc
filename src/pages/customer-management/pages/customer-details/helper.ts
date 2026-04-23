import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../store/store";
import { useEffect, useState } from "react";
import { getcustomerDetails, resetCustomerDetails } from "../../services/slice";
import useBreadcrumbs from "../../../../components/breadcrumbs/helper";
import type { UserDetailsType } from "../../services/type";

export const useCustomerDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const isLoading = useAppSelector(
  //   (state) => state.globalSlice.loader.isShowLoader,
  // );
  const isLoading = false;

  const { id } = useParams<string>();

  const userDetails: UserDetailsType = useAppSelector(
    (state) => state.customerManagementSlice.details,
  );

  const breadcrumbs = useBreadcrumbs("CUSTOMER_MANAGEMENT_DETAILS");

  useEffect(() => {
    dispatch(getcustomerDetails({ customerId: id })).unwrap();
  }, []);
  useEffect(() => {
    return () => {
      dispatch(resetCustomerDetails());
    };
  }, []);

  return { userDetails, breadcrumbs, isLoading, dispatch, navigate };
};
