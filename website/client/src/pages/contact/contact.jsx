import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBusinessTime, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

function Contact() {
  return (
    <>
      <section className="contact-details ">
        <div className="details">
          <h3>Contact Us Today</h3>
          <div className="details-section">
            <div className="contact-info">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
              <p>Instagram Account</p>
            </div>

            <div className="contact-info">
              <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              <p>Whatsapp Number</p>
            </div>

            <div className="contact-info">
              <FontAwesomeIcon icon={faEnvelope} size="xl" />
              <p>contact@gmail.com</p>
            </div>

            <div className="contact-info">
              <FontAwesomeIcon icon={faBusinessTime} size="xl" />
              <p>Monday to Friday: 09:00 to 16:00</p>
            </div>
          </div>
        </div>
      </section>

      <section className="form-details">
        <h2>Leave Us A Message</h2>
        <form className="form">
          <div className="flex">
            <label htmlFor="firstname">
              <input
                type="text"
                required
                placeholder=""
                className="input"
                id="firstname"
              />
              <span>First Name</span>
            </label>
            <label htmlFor="lastname">
              <input
                type="text"
                required
                placeholder=""
                className="input"
                id="lastname"
              />
              <span>Last Name</span>
            </label>
          </div>
          <label htmlFor="e-mail">
            <input
              type="email"
              placeholder=""
              required
              className="input"
              id="e-mail"
            />
            <span>Email</span>
          </label>
          <label htmlFor="telephone">
            <input
              type="tel"
              placeholder=""
              required
              className="input"
              id="telephone"
            />
            <span>Contact Number</span>
          </label>
          <label htmlFor="textarea">
            <textarea
              className="input01"
              required
              rows="3"
              placeholder=""
              id="textarea"
            ></textarea>
            <span>Message</span>
          </label>
          <button className="fancy" href="/">
            <span className="top-key"></span>
            <span className="text">Submit</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </form>
      </section>
    </>
  );
}

export default Contact;
