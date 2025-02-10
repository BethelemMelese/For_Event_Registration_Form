import image from "../images/Events-amico-purpule.png";
import speakerOne from "../images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";
import speakerTwo from "../images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg";
import speakerThree from "../images/stefan-stefancik-QXevDflbl8A-unsplash.jpg";
import eventForm from "../images/Forms-rafiki-purpole.png";
import Navbar from "../menu/nabBar";
import Notification from "../commonComponent/notification";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { appUrl } from "../appurl";

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    profession: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onRegisterSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "You are Registered Successfully!",
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const onRegisterError = (action: any) => {
    setNotify({
      isOpen: true,
      message: action,
      type: "error",
    });
    setTimeout(() => {}, 2000);
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.profession) newErrors.profession = "Profession is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    axios
      .post(appUrl + "users/registerUser/", formData)
      .then((response) => onRegisterSuccess(response.data))
      .catch((error) => onRegisterError(error.response.data.message));
  };

  return (
    <div>
      <Navbar />
      <section id="home" className="hero-section">
        <div className="hero">
          <div className="hero-content">
            <h1>Join the Grand Habesha Business Event </h1>
            <p>
              Expand your network and grow your business with industry leaders.
            </p>
            <a href="#registration" className="hero-btn">
              Register Now
            </a>
          </div>

          <div className="hero-image">
            <img src={image} alt="Business Event" />
          </div>
        </div>
      </section>

      <section id="speakers" className="speakers">
        <h2>Expert Speakers</h2>
        <div className="speaker-list">
          <div className="speaker-card">
            <img src={speakerOne} alt="Speaker 1" className="speaker-img" />
            <h3>Speaker Name</h3>
            <p>Business Expert</p>
          </div>
          <div className="speaker-card">
            <img src={speakerTwo} alt="Speaker 2" className="speaker-img" />
            <h3>Speaker Name</h3>
            <p>Entrepreneur</p>
          </div>
          <div className="speaker-card">
            <img src={speakerThree} alt="Speaker 2" className="speaker-img" />
            <h3>Speaker Name</h3>
            <p>Entrepreneur</p>
          </div>
        </div>
      </section>
      <section id="registration" className="registration">
        <h2>Register for the Event</h2>
        <div className="form">
          <div className="form-image">
            <img src={eventForm} alt="Business Event Image" />
          </div>
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <input
                    className="input-field"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="error">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="text"
                    name="profession"
                    placeholder="Profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                  {errors.profession && (
                    <span className="error">{errors.profession}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && (
                    <span className="error">{errors.country}</span>
                  )}
                </div>

                <div className="form-group">
                  <input
                    className="input-field"
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <span className="error">{errors.city}</span>}
                </div>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </section>
      <div className="copyrightholder">
        <p>&copy; 2025 Grand Habesha Business Event. All rights reserved</p>
      </div>
    </div>
  );
};

export default Home;
