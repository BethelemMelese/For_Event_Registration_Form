import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl } from "../../appurl";
import axios from "axios";
import Notification from "../../commonComponent/notification";
import image from "../../images/Reset password-rafiki.png";

const initialState: LOGINSTATE = {
  username: "",
  password: "",
};

interface LOGINSTATE {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onLoginSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("permission", response.userPermissions);
      setIsSubmitting(false);
    }, 2000);
  };

  const onLoginError = (action: any) => {
    setNotify({
      isOpen: true,
      message: action,
      type: "error",
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "admins/login", values)
        .then((response) => onLoginSuccess(response.data))
        .catch((error) => onLoginError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <div>
        <div className="login-container">
          {/* Left Side - Illustration */}
          <div className="login-illustration">
            <img src={image} alt="Illustration" />
          </div>

          {/* Right Side - Login Form */}
          <div className="login-form">
            <h2>Sign In</h2>
            <form>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                {...formik.getFieldProps("username")}
                // {
                //   formik.touched.username && formik.errors.username
                //     ? formik.errors.username
                //     : ""
                // }
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
              />

              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
};

export default Login;
