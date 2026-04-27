import {
    Card,
    Avatar,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import dayjs from "dayjs";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useCustomerDetails } from "./helper";
import CommonDialog from "../../../../components/dialog-box";
import { useState } from "react";
import { updatecustomerStatus } from "../../services/slice";
import { toast } from "react-toastify";
import { Paths } from "../../../../constants/path";
import Breadcrumbs from "@components/breadcrumbs";

export default function CustomerDetails() {
    const { userDetails, breadcrumbs, isLoading, dispatch, navigate } = useCustomerDetails();
    const [openDialog, setOpenDialog] = useState(false)

    const handleToggleStatus = async () => {
        setOpenDialog(false)
        const payload = {
            customerId: userDetails.id,
            status: userDetails.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        }
        await dispatch(updatecustomerStatus(payload)).unwrap()
        toast.success(`${userDetails.status == 'ACTIVE' ? 'Cutomer has been Inactivated successfully' : 'Cutomer has been Activated successfully'}`)
        navigate(Paths.CUSTOMER_MANAGEMENT)

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
                <Breadcrumbs items={breadcrumbs} />
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
                            <Skeleton width={150} height={20} />
                        ) : (
                            <Typography className="font-medium">
                                Total Points : {userDetails?.points}
                            </Typography>
                        )}

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
                    <Field label="Customer Id" value={userDetails?.customerId} />
                    <Field label="Customer Name" value={userDetails?.fullName} />
                    <Field label="Phone" value={userDetails?.phone} />
                    <Field label="Email" value={userDetails?.email} />
                    <Field label="DOB" value={userDetails?.dob} />
                    <Field label="Platform" value={userDetails?.platform} />
                    <Field label="Tier" value={userDetails?.tier?.title} />
                    <Field label="Gender" value={userDetails?.gender} />
                    <Field
                        label="Registered on"
                        value={
                            userDetails?.createdAt
                                ? dayjs(userDetails.createdAt).format("DD MMM YYYY")
                                : "-"
                        }
                    />
                </div>

                <CommonDialog
                    open={openDialog}
                    title="Update Customer Status"
                    description={`Are you sure you want to ${userDetails?.status == 'ACTIVE' ? 'inactivate' : 'activate'} this customer ?`}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={handleToggleStatus}
                    confirmText={`${userDetails?.status == 'ACTIVE' ? 'Inactivate' : 'Activate'}`}
                    cancelText='Cancel'
                />
            </Card>
        </>
    );
}