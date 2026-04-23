import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useState } from "react";
import { Paths } from "../../../constants/path";
import { useNavigate } from "react-router-dom";

export const ActionMenu = ({ row }: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleView = () => {
        navigate(`${Paths.ROLE_DETAILS}/${row.id}`);
        handleClose();
    };
    const handleEdit = () => {
        navigate(`${Paths.EDIT_ROLE}/${row.id}`);
        handleClose();

    }


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

                <MenuItem onClick={handleEdit}>
                    Edit
                </MenuItem>
            </Menu>

        </>
    );
}