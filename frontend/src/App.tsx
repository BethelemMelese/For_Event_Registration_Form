import "./css/style.css";
import image from "./images/Events-amico.png";
import speakerOne from "./images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg";
import speakerTwo from "./images/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg";
import speakerThree from "./images/stefan-stefancik-QXevDflbl8A-unsplash.jpg";
import eventForm from "./images/Forms-rafiki.png";
import Navbar from "./menu/nabBar";

function App() {
  return (
    <div>
      <Navbar />
      <section id="home" className="hero-section">
        <div className="hero">
          <div className="hero-content">
            <h1>Join the Biggest Business Event</h1>
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
            <img src={eventForm} alt="Business Event" />
          </div>
          <div className="form-card">
            <form>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Profession"
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Country"
                  className="input-field"
                />
                <input type="text" placeholder="City" className="input-field" />
                <select className="input-field">
                  <option>Select Here</option>
                  <option>Business Category</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Fashion</option>
                </select>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
