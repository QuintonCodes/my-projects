import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBusinessTime, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

function Contact() {
  return (
    <>
      <section className="contact-details section-p1">
        <div className="details">
          <span>Get In Touch</span>
          <h3>Contact Us Today</h3>
          <div className="details-section">
            <li>
              <FontAwesomeIcon icon={faInstagram} id="icon" size="lg" />
            </li>
            <p>Instagram Account</p>
            <li>
              <FontAwesomeIcon icon={faWhatsapp} id="icon" size="lg" />
            </li>
            <p>Whatsapp Number</p>
            <li>
              <FontAwesomeIcon icon={faEnvelope} id="icon" size="lg" />
            </li>
            <p>contact@gmail.com</p>
            <li>
              <FontAwesomeIcon icon={faBusinessTime} id="icon" size="lg" />
            </li>
            <p>Monday to Friday: 09:00 to 16:00</p>
          </div>
        </div>
      </section>

      <section className="form-head">
        <div className="form-header">
          <h2>Leave Us A Message</h2>
        </div>
      </section>

      <section className="form-details">
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
