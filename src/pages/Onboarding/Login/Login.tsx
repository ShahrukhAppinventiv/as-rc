import { useNavigate } from "react-router-dom";
import { postApiCall } from "../../../api/api.method";
import endpoints from "../../../api/api.endpoint";
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    TextField,
    IconButton,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../service/action";
import type { AppDispatch } from "@store/store";

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const loginFormSchema = Yup.object({
        email: Yup.string().required('Please enter email').email('Please enter valid email'),
        password: Yup.string().required('Please enter password')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, 'Password must be 8-16 chars, include uppercase, lowercase, number & special character')
    })

    const submitHandler = async (data: LoginForm) => {
        try {
            setLoading(true)
           const loginResponse =  await dispatch(login(data)).unwrap();
            console.log("login after api",loginResponse)
            navigate("/dashboard");
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginFormSchema,
        onSubmit: submitHandler,
        validateOnMount: true
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <div>
                {/* Email */}
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

            </div>
            <div className="relative">
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

            </div>

            <button
                type="submit"
                disabled={!formik.isValid || loading}
                className={`w-full p-2 rounded text-white mt-4 ${formik.isValid
                    ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                Login   {loading && <CircularProgress sx={{ color: "white" }} size={20} />}

            </button>
            <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="w-full mt-3 text-sm text-blue-500 hover:underline cursor-pointer"
            >
                Forgot Password?
            </button>
        </form>
    );
}