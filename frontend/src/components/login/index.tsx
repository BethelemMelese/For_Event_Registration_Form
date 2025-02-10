import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appUrl } from "../../appurl";
import axios from "axios";
import Notification from "../../commonComponent/notification";
import image from "../../images/Reset password-rafiki.png";


const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.userName) newErrors.userName = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onLoginSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "You Sign In Successfully!",
    });
    setTimeout(() => {
      localStorage.setItem("token", response.token);
      navigate("/forEvent/adminpanel")
    }, 2000);
  };

  const onLoginError = (action: any) => {
    setNotify({
      isOpen: true,
      message: action,
      type: "error",
    });
    setTimeout(() => {
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios
      .post(appUrl + "admin/login/",formData)
      .then((response) => onLoginSuccess(response.data))
      .catch((error) => onLoginError(error.response.data.message));
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="input-field"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                />
                {errors.userName && (
                  <span className="error">{errors.userName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="input-field"
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>

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
