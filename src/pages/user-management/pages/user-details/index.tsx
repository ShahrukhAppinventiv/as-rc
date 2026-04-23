import Breadcrumbs from "@components/breadcrumbs";
import { useUserDetailsHelper } from "./user-details.helper";
import { Avatar, Button, Card, Chip, Typography } from "@mui/material";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import CommonDialog from "@components/dialog-box";
import { useState } from "react";
import { transformDate } from "@common/utils/common.fn";
import { updateUserStatus } from "../../services/action";
import { toast } from "react-toastify";
import { Paths } from "@constants/path";

export default function UserDetails() {
    const { breadcrumb, userDetails, isLoading, dispatch, navigate } = useUserDetailsHelper();
    const [openDialog, setOpenDialog] = useState(false)
    const handleToggleStatus = async () => {
        setOpenDialog(false)
        const payload = {
            id: userDetails.id,
            status: userDetails.status == 'ACTIVE' ? 'deactivate' : 'activate'
        }
        await dispatch(updateUserStatus(payload)).unwrap()
        toast.success(`${userDetails.status == 'ACTIVE' ? 'User has been Inactivated successfully' : 'User has been Activated successfully'}`)
        navigate(Paths.USER_MANAGEMENT)

    };
    const Field = ({ label, value }: any) => (
        <div>
            <p className="text-base font-semibold">{label}</p>

            {isLoading ? (
                <Skeleton width={120} height={15} />
            ) : (
                <p className="text-sm">{value || "-"}</p>
            )}
        </div>
    );
    return (
        <>
            <div className="flex justify-between mb-4">
                <Breadcrumbs items={breadcrumb} />
                {userDetails?.status &&
                    <Button onClick={() => setOpenDialog(true)} sx={{ textTransform: 'none' }} variant="contained"> {userDetails?.status === "ACTIVE" ? "Inctivate" : "Activate"} </Button>
                }

            </div>
            <Card className="p-6 rounded-xl shadow-sm bg-gray-100">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    {isLoading ? (
                        <Skeleton circle width={120} height={120} />
                    ) : userDetails?.profilePicture ? (
                        <img
                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${userDetails.profilePicture}`}
                            alt="Profile image"
                            className="w-[120px] h-[120px] rounded-full object-cover"
                        />
                    ) : (
                        <Avatar sx={{ width: 120, height: 120 }} />
                    )}

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {isLoading ? (
                            <Skeleton width={80} height={30} />
                        ) : (
                            userDetails?.status && (
                                <Chip
                                    label={userDetails?.status === "ACTIVE" ? "Active" : "Inactive"}
                                    sx={{
                                        backgroundColor:
                                            userDetails?.status === "ACTIVE" ? "#cfe3d9" : "#f1aaaa",
                                        color: userDetails?.status === "ACTIVE" ? "green" : "red",
                                        fontWeight: "bold",
                                        borderRadius: "20px",
                                        px: 1.5,
                                    }}
                                />
                            )

                        )}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-y-6 mt-8 text-sm">
                    <Field label="User Id" value={userDetails?.adminId} />
                    <Field label="Name" value={userDetails?.fullName} />
                    <Field label="Email" value={userDetails?.email} />
                    <Field label="Phone" value={userDetails?.fullPhoneNo} />
                    <Field label="Branch" value={userDetails?.branch?.nameEn} />
                    <Field label="Role" value={userDetails?.role?.name} />
                    <Field
                        label="Created on"
                        value={
                            userDetails?.createdAt
                                ? transformDate(userDetails.createdAt, 'DD MMM YYYY')
                                : "-"
                        }
                    />
                </div>

                <CommonDialog
                    open={openDialog}
                    title="Update User Status"
                    description={`Are you sure you want to ${userDetails?.status == 'ACTIVE' ? 'inactivate' : 'activate'} this user ?`}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={handleToggleStatus}
                    confirmText={`${userDetails?.status == 'ACTIVE' ? 'Inactivate' : 'Activate'}`}
                    cancelText='Cancel'
                />
            </Card>
        </>
    )
}
