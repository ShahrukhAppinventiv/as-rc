import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../store/store";
import { useEffect } from "react";
import { getMedicineList } from "./services/slice";

export const useMedicine = () => {
  const dispatch = useDispatch<AppDispatch>();
  const medicineList = useAppSelector(
    (state) => state.medicineSlice.medicineList,
  );

  useEffect(() => {
    dispatch(getMedicineList({ page: 1, limit: 100 }));
  }, []);

  return {
    medicineList,
  };
};
