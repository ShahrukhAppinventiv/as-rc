import { useNavigate } from "react-router-dom";
import { Paths } from "../../../constants/path";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@store/store";
import { forgot } from "../service/action";

type ForgotPasswordForm = {
  email: string;
};
export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const [loader, setLoader] = useState<boolean>(false)
  const forgotValidationSchema = Yup.object({
    email: Yup.string().email("Enter Valid Email").required("Email is required")

  })
  const submitHandler = async (data: ForgotPasswordForm) => {
    try {
      setLoader(true)
      await dispatch(forgot(data)).unwrap()
      localStorage.setItem('forgotEmail', data.email)
      navigate(`/${Paths.VERIFY_OTP}`);
      toast.success('Check your email for OTP')
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)

    }
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotValidationSchema,
    onSubmit: submitHandler,
    validateOnMount: true
  })




  return (
    <div className="w-full max-w-md text-center">

      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Your Password?</h2>
        <p className="text-gray-500 text-sm mb-6">
          Enter your registered email and continue.
        </p>

        <TextField
          fullWidth
          label="Email*"
          name="email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />

        <button
          type="submit"
          disabled={!formik.isValid || loader}
          className={`w-full p-2 rounded text-white mt-4 ${formik.isValid
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Send OTP  {loader && <CircularProgress sx={{ color: "white" }} size={20} />}
        </button>
        <button
          type="button"
          className="w-full mt-3 text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate('/')}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
