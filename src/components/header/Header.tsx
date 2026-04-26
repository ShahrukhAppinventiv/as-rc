import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { postApiCall } from "../../api/api.method";
import endpoints from "../../api/api.endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../constants/path";
import { useAppSelector, type AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import CommonDialog from "../dialog-box";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { hideLoader, showLoader } from "@globalSlice/globalSlice";


type HeaderProps = {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setCollapsed }: HeaderProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const profileDetails = useAppSelector(state => state.profileSlice.data)
    const isMenuOpen = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev)
    }

    const handleClickOpenDialog = () => {
        setOpenLogoutDialog(true);
    };


    const navigateToProfile = () => {
        navigate(Paths.ADMIN_PROFILE)
        handleClose()
    }
    useEffect(() => {
        // dispatch(getProfileDetails()).unwrap()
    }, [])


    const logoutHandler = async () => {
        try {
            dispatch(showLoader())
            await postApiCall(endpoints.main.logout);
            setOpenLogoutDialog(false);
            localStorage.clear();
            navigate('login')
            toast.success("Logout successfully");
        } catch (err) {

        }
        finally{
            dispatch(hideLoader())
        }

    }



    return (
        <>
            <Box sx={{ flexGrow: 1 }}>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Kulud
                        </Typography>
                        <div onClick={handleMenu} className="flex items-center gap-2 cursor-pointer">
                            {profileDetails?.fullName ? (
                                <div>
                                    <img
                                        className="w-[40px] h-[40px] rounded-full object-cover border-2 border-grey-600"
                                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${profileDetails.profilePicture}`}
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            )}

                            <Typography className="font-medium">
                                {profileDetails?.fullName}
                            </Typography>
                        </div>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            slotProps={{
                                paper: {
                                    sx: {
                                        width: 150,
                                    },
                                },
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={isMenuOpen}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={navigateToProfile}><CgProfile size={24} className="mr-2" />Profile</MenuItem>
                            <MenuItem onClick={handleClickOpenDialog}><FiLogOut size={24} className="mr-2" />Logout</MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
            </Box>

            <CommonDialog
                open={openLogoutDialog}
                title="Logout"
                description="Are you sure you want to logout?"
                onClose={() => setOpenLogoutDialog(false)}
                onConfirm={logoutHandler}
            />
        </>

    );
}
