import image from "../images/photo_2025-02-15_23-54-03.jpg";
import eventForm from "../images/photo_2025-02-20_20-29-55.jpg";
import Navbar from "../menu/nabBar";
import Notification from "../commonComponent/notification";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "../appurl";
import { Button } from "@mui/material";

const Home = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<any>([]);
  const [responseHero, setResponseHero] = useState<any>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    profession: "",
    attendeeType: "",
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
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onRegisterError = (action: any) => {
    setNotify({
      isOpen: true,
      message: action,
      type: "error",
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const onFetchError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.profession) newErrors.profession = "Profession is required";
    if (!formData.attendeeType)
      newErrors.attendeeType = "Attendee Type is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    axios
      .post(appUrl + "users/registerUser/", formData)
      .then((response) => onRegisterSuccess(response.data))
      .catch((error) => onRegisterError(error.response.data.message));
  };

  useEffect(() => {
    axios
      .get(appUrl + "speakers/allSpeaker")
      .then((response) => setResponse(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  useEffect(() => {
    axios
      .get(appUrl + "heroSections/get")
      .then((response) => setResponseHero(response.data))
      .catch((error) => onFetchError(error.response.data.message));
  }, []);

  return (
    <div>
      <Navbar />
      <section id="home" className="hero-section">
        <div className="hero">
          {responseHero.length != 0 &&
            responseHero.map((item: any) => {
              return (
                <>
                  <div className="hero-content">
                    <h1>{item.headerTitle}</h1>
                    <p>{item.subTitle}</p>
                    <a href="#registration" className="hero-btn">
                      Register Now
                    </a>
                  </div>

                  <div className="hero-image">
                    <img src={item.heroImage} alt="Business Event" />
                  </div>
                </>
              );
            })}
        </div>
      </section>

      <section id="speakers" className="speakers">
        <h2>Expert Speakers</h2>
        <div className="speaker-list">
          {response.length != 0 &&
            response.map((item: any) => {
              return (
                <div className="speaker-card">
                  <img
                    src={item.speakerImage}
                    alt="Speaker 1"
                    className="speaker-img"
                  />
                  <h3>{item.title}</h3>
                  <p>{item.speakerRole}</p>
                  <p className="speaker_Description">{item.speakerDescription}</p>
                </div>
              );
            })}
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

                <div className="form-group">
                  <select
                    className="input-field"
                    name="attendeeType"
                    value={formData.attendeeType}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="" disabled selected>
                      Choose Attendee Type
                    </option>
                    <option value="Participant">Participant</option>
                    <option value="Vender">Vender</option>
                  </select>
                  {errors.attendeeType && (
                    <span className="error">{errors.attendeeType}</span>
                  )}
                </div>
              </div>

              {isSubmitting ? (
                <button
                  className="progress"
                  disabled={isSubmitting}
                >
                  Submitting...
                </button>
              ) : (
                <button type="submit" className="submit-button">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
        <Notification notify={notify} setNotify={setNotify} />
      </section>
      <div className="sponsored-container">
        <h3>Sponsored By</h3>
        <img src={image} alt="Sponsor" className="sponsor-logo" />
      </div>
      <div className="copyrightholder">
        <p>&copy; {new Date().getFullYear()} Grand Habesha Business Event. All rights reserved</p>
      </div>
    </div>
  );
};

export default Home;
