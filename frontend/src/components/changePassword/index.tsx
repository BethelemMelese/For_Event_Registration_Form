import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appUrl } from "../../appurl";
import axios from "axios";
import Notification from "../../commonComponent/notification";
import { userService } from "../../polices/userService";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<any>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  useEffect(() => {
    const userToken = userService.token;
    axios
      .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
      .get(appUrl + `admin/UserInfo/${userToken}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.oldPassword)
      newErrors.oldPassword = "Old Password is required";
    if (!formData.newPassword)
      newErrors.newPassword = "New Password is required";
    if (formData.newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onUpdateSuccess = (action: any) => {
    setNotify({
      isOpen: true,
      message: "Your Password is Changed Successfully !",
      type: "success",
    });
    setTimeout(() => {
      navigate("/forEvent/adminpanel");
    }, 2000);
  };

  const onUpdateError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .put(
        appUrl + `admin/changePassword/${response.id}`,
        formData
      )
      .then((response) => onUpdateSuccess(response.data))
      .catch((error) => onUpdateError(error.response.data.message));
  };

  return (
    <>
      <div>
        <div className="changePassword-container">
          <div className="changePassword-form">
            <h2>Change Your Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="input-field"
                  type="text"
                  name="oldPassword"
                  placeholder="Old Password"
                  value={formData.oldPassword}
                  onChange={handleChange}
                />
                {errors.oldPassword && (
                  <span className="error">{errors.oldPassword}</span>
                )}
              </div>
              <div className="form-group">
                <input
                  className="input-field"
                  type="text"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword && (
                  <span className="error">{errors.newPassword}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  className="input-field"
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
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

export default ChangePassword;
