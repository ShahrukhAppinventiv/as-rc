import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Paths } from "../../../constants/path";
import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../store/store";
import CommonDialog from "../../../components/dialog-box";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserList, updateUserStatus } from "./action";

export const ActionMenu = ({ row }: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const listParams = useAppSelector(
        (state) => state.userManagementSlice.listParams,
    );
    const [openDialog, setOpenDialog] = useState(false)

    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleView = () => {
        navigate(`${Paths.USER_DETAILS}/${row.id}`);
        handleClose();
    };

    const handleToggleStatus = async () => {
        handleClose();
        const payload = {
            id: row.id,
            status: row.status == 'ACTIVE' ? 'deactivate' : 'activate'
        }
        await dispatch(updateUserStatus(payload)).unwrap()
        toast.success(`${row.status == 'ACTIVE' ? 'User has been Inactivated successfully' : 'User has been Activated successfully'}`)
        // await dispatch(getUserList(listParams))
        dispatch(getUserList({
            page: listParams.page + 1,
            limit: listParams.limit,
            ...(listParams.search ? { search: listParams.search } : {}),
            ...(listParams.status ? { status: listParams.status } : {}),
        }));

    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: 150,
                        },
                    },
                }}>
                <MenuItem onClick={handleView}>View</MenuItem>
                <MenuItem onClick={()=>navigate(`${Paths.EDIT_USER}/${row.id}`)}>Edit</MenuItem>
                <MenuItem onClick={() => setOpenDialog(true)}>
                    {row.status === "ACTIVE" ? "Inactivate" : "Activate"}
                </MenuItem>
            </Menu>
            <CommonDialog
                open={openDialog}
                title="Update User Status"
                description={`Are you sure you want to ${row.status == 'ACTIVE' ? 'inactivate' : 'activate'} this user ?`}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleToggleStatus}
                confirmText={`${row.status == 'ACTIVE' ? 'Inactivate' : 'Activate'}`}
                cancelText='Cancel'
            />
        </>
    );
}