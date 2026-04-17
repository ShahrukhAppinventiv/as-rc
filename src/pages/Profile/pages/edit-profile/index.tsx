import useEditProfile from './helper'
import Breadcrumbs from '../../../../components/breadcrumbs'
import {
    Card,
    Avatar,
    Button,
    TextField
} from "@mui/material";
import { Paths } from '../../../../constants/path';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { getProfileDetails, updateProfileDetails } from '../../services/slice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommonDialog from '../../../../components/dialog-box';
import { toast } from 'react-toastify';

export default function EditProfile() {

    const { navigate, dispatch, breadcrumbs, profileDetails } = useEditProfile()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const profileFormSchema = Yup.object({
        fullName: Yup.string().required('Please enter full name'),
        email: Yup.string().required('Please enter email').email('Please enter valid email'),

    })
    const profileHandler = async () => {
        setOpenDialog(false)
        await dispatch(updateProfileDetails({ fullName: formik.values.fullName })).unwrap()
        await dispatch(getProfileDetails()).unwrap()
        toast.success('Profile has been updated successfully')

        navigate(Paths.ADMIN_PROFILE)
    }

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: ''
        },
        validationSchema: profileFormSchema,
        onSubmit: () => setOpenDialog(true)
    })

    useEffect(() => {
        if (profileDetails) {
            formik.setValues({
                fullName: profileDetails.fullName,
                email: profileDetails.email
            })
        }

    }, [profileDetails])



    return (
        <>
            <Breadcrumbs items={breadcrumbs} />
            <Card className="p-6 rounded-xl shadow-sm bg-gray-100">
                <div className='flex gap-8'>
                    {profileDetails?.profilePicture ? <img className='rounded-full object-cover' src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${profileDetails.profilePicture}`} alt="" /> : <Avatar sx={{ width: 120, height: 120 }} />}
                </div>

                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='flex gap-6'>
                            <TextField
                                fullWidth
                                label="Name"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="outlined"
                                margin="normal"
                                autoComplete='off'
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="email"
                                variant="outlined"
                                margin="normal"
                                autoComplete='off'
                                disabled
                            />

                        </div>
                        <div className="flex justify-center gap-3 mt-4">
                            <Button onClick={() => navigate(Paths.ADMIN_PROFILE)} sx={{ width: "200px" }} variant="outlined">Cancel</Button>
                            <Button type='submit' sx={{ width: "200px" }} variant="contained">Save</Button>
                        </div>

                    </form>

                </div>
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    role="alertdialog"
                    sx={{
                        "& .MuiDialog-paper": {
                            width: "400px",
                            maxWidth: "none",
                        },
                    }}
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Update Profile"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to update profile ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{
                        justifyContent: "center",
                        padding: "20px"
                    }}>
                        <Button onClick={() => setOpenDialog(false)} variant="outlined">No</Button>
                        <Button onClick={profileHandler} variant="contained">Yes</Button>
                    </DialogActions>
                </Dialog> */}

                <CommonDialog
                    open={openDialog}
                    title="Update Profile"
                    description={`Are you sure you want to update profile ?`}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={profileHandler}
                    confirmText='Update'
                    cancelText='Cancel'
                /></Dialog>

            </Card>
        </>
    )
}
