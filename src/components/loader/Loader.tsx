import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { LoaderContext } from "../../Context/LoaderContext";
import { useAppSelector } from "../../store/store";

export default function Loader() {
    // const { loading } = useContext(LoaderContext)

    const isLoading = useAppSelector(state=>state.globalSlice.loader.isShowLoader)

    return (
        <Backdrop
            open={isLoading}
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.modal + 1,
            }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}