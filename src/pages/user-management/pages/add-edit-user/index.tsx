import Breadcrumbs from "@components/breadcrumbs";
import { useAddEditUserHelper } from "./add-edit-user-helper";
import {
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addUser, editUser } from "../../services/action";
import { toast } from "react-toastify";
import { Paths } from "@constants/path";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ImageUploader from "@components/image-uploader";
import { MdOutlineFileUpload } from "react-icons/md";
import { getPresignedUrl } from "@globalSlice/global-action";
import { uploadFileToS3 } from "@common/utils/common.fn";
import { hideLoader, showLoader } from "@globalSlice/globalSlice";
import CommonDialog from "@components/dialog-box";


export default function AddEditUser() {
    const { addBreadcrumb, editBreadcrumb, rolesDropdown, branchDropdown, id, dispatch, navigate, userDetails, openCancelDialog,
        setOpenCancelDialog, toggleCancelDialog,
        openSaveDialog, setOpenSavelDialog,
        toggleSaveDialog } =
        useAddEditUserHelper();

    // const [preview, setPreview] = useState<string | null>(null);
    const [value, setValue] = useState()
    const [imageFile, setImageFile] = useState<File | null>(null);
    const IMAGE_PREFIX = import.meta.env.VITE_IMAGE_BASE_URL;
    // ✅ Formik Setup
    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: true,
        initialValues: {
            profilePicture: userDetails?.profilePicture || "",
            fullName: userDetails?.fullName || "",
            email: userDetails?.email || "",
            roleId: userDetails?.role?.id || "",
            branchId: userDetails?.branch?.id || "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().required('Email is required').email(),
            roleId: Yup.string().required("Role is required"),
            branchId: Yup.string().required("Branch is required"),
        }),
        onSubmit: async (values: any) => {
            console.log("Final Payload:", values);
            console.log("Image File:", values.profilePicture);
            if (values.profilePicture instanceof File) {
                const body = {
                    uploadType: 'profile/',
                    filename: values.profilePicture.name,
                };
                const fileData = await dispatch(getPresignedUrl(body)).unwrap()
                console.log('FileData--->', fileData)
                const { presignedUrl } = fileData

                const uploadRes = await uploadFileToS3(
                    presignedUrl,
                    values.profilePicture, {
                    start: () => dispatch(showLoader()),
                    end: () => dispatch(hideLoader())
                }
                );
                if (!uploadRes.success) {
                    toast.error("Image upload failed");
                    return;
                }
                else {
                    values.profilePicture = `${body.uploadType}${body.filename}`
                }

            }

            if (!values) {
                console.error("Formik values missing!");
                return;
            }
            if (id) {
                await dispatch(editUser({ id: id, ...values }))
                toast.success("User has been updated successfully")
            } else {
                await dispatch(addUser(values))
                toast.success("User has been added successfully")
            }
            navigate(Paths.USER_MANAGEMENT)
        },
    });

    // ✅ Image Upload Handler
    // const handleImageUpload = (e: any) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         // Max 200KB validation
    //         if (file.size > 200 * 1024) {
    //             alert("Max file size is 200KB");
    //             return;
    //         }

    //         formik.setFieldValue("profilePicture", file);
    //         setPreview(URL.createObjectURL(file));
    //     }
    // };

    return (
        <>
            <Breadcrumbs items={id ? editBreadcrumb : addBreadcrumb} />

            <form onSubmit={formik.handleSubmit}>
                <div className="bg-white rounded-2xl p-6 mt-4 shadow-sm">

                    {/* ✅ Profile Upload */}

                    <div className="flex items-center gap-6 mb-6">
                        <ImageUploader
                            value={typeof formik.values.profilePicture === "string" && !!formik.values.profilePicture
                                ? encodeURI(`${IMAGE_PREFIX}/${formik.values.profilePicture}`)
                                : formik.values.profilePicture}
                            cropShape="round"
                            aspectRatio={1}
                            onChange={(file) => {
                                setImageFile(file);
                                formik.setFieldValue("profilePicture", file);
                            }}
                            enableCrop={true}
                            renderPlaceholder={
                                <div className="flex flex-col items-center text-gray-400 text-sm">
                                    <MdOutlineFileUpload />
                                    Upload
                                </div>
                            }
                        />

                        <p className="text-sm text-gray-500">
                            Maximum file size is 200 KB. Only JPG and PNG formats are allowed.
                        </p>
                    </div>

                    {/* ✅ Form Grid */}
                    <div className="grid grid-cols-2 gap-6">

                        {/* Full Name */}
                        <TextField
                            label="Full Name *"
                            fullWidth
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} // ✅ IMPORTANT
                            error={formik.touched.fullName && !!formik.errors.fullName}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />

                        {/* Full Name */}
                        <TextField
                            label="Email *"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && !!formik.errors.email}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        {/* Role */}
                        <FormControl fullWidth error={formik.touched.roleId && !!formik.errors.roleId}  >
                            <InputLabel>Role *</InputLabel>
                            <Select
                                name="roleId"
                                value={formik.values.roleId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Role *"
                                MenuProps={{
                                    slotProps: {
                                        paper: {
                                            sx: {
                                                maxHeight: 250,
                                            },
                                        },
                                    },
                                }}
                            >
                                {rolesDropdown?.map((role: any) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.roleId && formik.errors.roleId && (
                                <FormHelperText>{formik?.errors?.roleId}</FormHelperText>
                            )}
                        </FormControl>
                        {/* Branch */}
                        <FormControl fullWidth error={formik.touched.branchId && !!formik.errors.branchId}>
                            <InputLabel>Branch *</InputLabel>
                            <Select
                                name="branchId"
                                value={formik.values.branchId}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Branch"
                                MenuProps={{
                                    slotProps: {
                                        paper: {
                                            sx: {
                                                maxHeight: 250,
                                            },
                                        },
                                    },
                                }}
                            >
                                {branchDropdown?.map((branch: any) => (
                                    <MenuItem key={branch.id} value={branch.id}>
                                        {branch.nameEn}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.branchId && formik.errors.branchId && (
                                <FormHelperText>{formik.errors.branchId}</FormHelperText>
                            )}
                        </FormControl>
                    </div>


                    {/* ✅ Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <Button
                            variant="outlined"
                            onClick={toggleCancelDialog}
                            sx={{
                                width: "200px",
                                textTransform: "none",
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="contained"
                            disabled={!formik.isValid}
                            onClick={toggleSaveDialog}
                            sx={{
                                width: "200px",
                                textTransform: "none",
                            }}
                        >
                            {id ? "Update" : "Add"}
                        </Button>
                    </div>
                </div>
            </form>
            <div>
                <CommonDialog
                    open={openCancelDialog}
                    title="Cancel"
                    description={`Are you sure you want to Cancel ?`}
                    onClose={toggleCancelDialog}
                    onConfirm={() => {
                        toggleCancelDialog();
                        navigate(Paths.USER_MANAGEMENT)
                    }}
                    cancelText='Cancel'
                />

                <CommonDialog
                    open={openSaveDialog}
                    title={`${id ? 'Update User' : 'Add User'}`}
                    description={`Are you sure you want to ${id ? 'Update' : 'Add'} User?`}
                    onClose={toggleSaveDialog}
                    onConfirm={() => {
                        formik.handleSubmit();
                    }}
                    cancelText='Cancel'
                />
            </div>
        </>
    );
}