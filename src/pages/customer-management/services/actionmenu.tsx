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
import { getcustomerList, updatecustomerStatus } from "./slice";
import CommonDialog from "../../../components/dialog-box";
import { toast } from "react-toastify";

export default function ActionMenu({ row, navigate }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const listParams = useAppSelector(
    (state) => state.customerManagementSlice.listParams,
  );
  const [openDialog, setOpenDialog] = useState(false)

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleView = () => {
    navigate(`${Paths.CUSTOMER_DETAILS}/${row.id}`);
    handleClose();
  };

  const handleToggleStatus = async () => {
    handleClose();
    const payload = {
      customerId: row.id,
      status: row.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }
    await dispatch(updatecustomerStatus(payload)).unwrap()
    toast.success(`${row.status == 'ACTIVE' ? 'Cutomer has been Inactivated successfully' : 'Cutomer has been Activated successfully'}`)
    await dispatch(getcustomerList(listParams))

  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleView}>View Profile</MenuItem>

        <MenuItem onClick={() => setOpenDialog(true)}>
          {row.status === "ACTIVE" ? "Inactivate" : "Activate"}
        </MenuItem>
      </Menu>
      <CommonDialog
        open={openDialog}
        title="Update Customer Status"
        description={`Are you sure you want to ${row.status == 'ACTIVE' ? 'inactivate' : 'activate'} this customer ?`}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleToggleStatus}
        confirmText={`${row.status == 'ACTIVE' ? 'Inactivate' : 'Activate'}`}
        cancelText='Cancel'
      />
    </>
  );
}