import {
    Card,
    Avatar,
    Button
} from "@mui/material";
import dayjs from "dayjs";
import useViewProfile from './helper';
import { Paths } from '../../../../constants/path';
import Breadcrumbs from '../../../../components/breadcrumbs';


export default function ViewProfile() {
    const { navigate, breadcrumbs, profileDetails } = useViewProfile()

    const Field = ({ label, value }: any) => (
        <div>
            <p className="text-base font-semibold">{label}</p>
            <p className="text-sm">{value || "-"}</p>
        </div>
    );

    return (
        <>  <Breadcrumbs items={breadcrumbs} />
            <Card className="p-6 rounded-xl shadow-sm bg-gray-100">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    {/* Avatar */}
                    {profileDetails?.profilePicture ? <img className='rounded-full object-cover' src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${profileDetails.profilePicture}`} alt="" /> : <Avatar sx={{ width: 120, height: 120 }} />}
                    <Button sx={{ textTransform: "none" }} onClick={() => navigate(Paths.EDIT_PROFILE)} variant="contained">Edit Profile</Button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-y-6 mt-8 text-sm">
                    <Field label="Name" value={profileDetails?.fullName} />
                    <Field label="Email" value={profileDetails?.email} />
                    <Field label="Role" value={profileDetails?.email} />
                    <Field
                        label="Registered on"
                        value={
                            profileDetails?.createdAt
                                ? dayjs(profileDetails.createdAt).format("DD MMM YYYY")
                                : "-"
                        }
                    />
                </div>
            </Card>
        </>
    )
}
