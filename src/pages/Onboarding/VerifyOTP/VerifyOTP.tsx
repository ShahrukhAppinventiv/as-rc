import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { postApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { Paths } from "../../../constants/path";

function VerifyOTP() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false)
    const email = localStorage.getItem('forgotEmail')



    const handleVerify = async () => {
        try {
            setLoader(true)
            const payload = {
                email, otp
            }
            const verifyOTPResponse = await postApiCall(endpoints.auth.verifyOTP, payload)
            console.log(verifyOTPResponse)
            localStorage.removeItem('forgotEmail')
            toast.success('OTP verifed successfully')
            navigate(`${Paths.RESET_PASSWORD}/${verifyOTPResponse.data.data.sessionToken}`);
        } catch (err) {

        } finally {
            setLoader(false)

        }
    };

    // useEffect(() => {
    //     return () => {
    //         localStorage.removeItem('forgotEmail')
    //     }
    // })

    return (
        <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-2">Verify OTP</h2>

            <p className="text-gray-500 text-sm mb-6">
                Enter the 6-digit code sent to your email {email}
            </p>

            <div className="flex justify-center mb-6">
                <OtpInput
                    value={otp}
                    onChange={(value) => {
                        if (/^\d*$/.test(value)) {
                            setOtp(value);
                        }
                    }}
                    numInputs={6}
                    shouldAutoFocus
                    renderSeparator={<span className="mx-1"></span>}
                    renderInput={(props) => (
                        <input
                            {...props}
                            inputMode="numeric"
                            onKeyDown={(e) => {
                                props.onKeyDown?.(e);

                                if (
                                    !/[0-9]/.test(e.key) &&
                                    e.key !== "Backspace" &&
                                    e.key !== "Delete" &&
                                    e.key !== "Tab" &&
                                    e.key !== "ArrowLeft" &&
                                    e.key !== "ArrowRight"
                                ) {
                                    e.preventDefault();
                                }
                            }}
                            style={{
                                width: "50px",
                                height: "45px",
                                margin: "0 4px",
                                fontSize: "18px",
                                borderRadius: "6px",
                                border: "1px solid #d1d5db",
                                textAlign: "center",
                            }}
                        />
                    )}
                />
            </div>

            <button
                onClick={handleVerify}
                disabled={otp.length < 6 || loader}
                className={`w-full p-2 rounded text-white transition ${otp.length === 6
                    ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Verify OTP  {loader && <CircularProgress sx={{ color: "white" }} size={20} />}
            </button>

            <button
                type="button"
                className="mt-4 text-sm text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate('/')}
            >
               Back to Login
            </button>
        </div>
    );
}

export default VerifyOTP;