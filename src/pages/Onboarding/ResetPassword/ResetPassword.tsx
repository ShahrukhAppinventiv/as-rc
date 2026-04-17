import { useNavigate, useParams } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { postApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { toast } from "react-toastify";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const { sessionToken } = useParams();
  console.log("secons", sessionToken)
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const passwordResetFormSchema = Yup.object({
    password: Yup.string().required('Please enter password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Password must be 8-16 chars, include uppercase, lowercase, number & special character'),
    confirmPassword: Yup.string().required('Please enter confirm password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Confirm password must be 8-16 chars, include uppercase, lowercase, number & special character')
      .oneOf([Yup.ref("password")], "Passwords must match")
  })

  const onSubmit = async (data: ResetForm) => {
    console.log("payload:", data);
    try {
      setLoader(true)
      const payload = {
        ...data,
        sessionToken
      }
      await postApiCall(endpoints.auth.resetPassword, payload);
      toast.success('Password reset successfully')

      navigate("/");
    } catch (err) {

    } finally {
      setLoader(false)

    }

  };


  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordResetFormSchema,
    onSubmit: onSubmit,
    validateOnMount: true
  })


  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
      <TextField
        fullWidth
        label="Password*"
        name="password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password*"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        margin="normal"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />


      <button
        type="submit"
        disabled={!formik.isValid || loader}
        className={`w-full p-2 rounded text-white mt-4 ${formik.isValid
          ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        Reset Password {loader && <CircularProgress sx={{ color: "white" }} size={20} />}

      </button>
      <button
        type="button"
        onClick={() => navigate("/")}
        className="w-full mt-3 text-sm text-blue-500 hover:underline cursor-pointer"
      >
        Back to Login
      </button>
    </form>
  );
}
