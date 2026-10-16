import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import serviceRegisterImg from "@/assets/sahyog-variants/2/variation-2/service-register-illustration.png";
import serviceTrackImg from "@/assets/sahyog-variants/2/variation-2/service-track-illustration.png";
import serviceFeedbackImg from "@/assets/sahyog-variants/2/variation-2/service-feedback-illustration.png";
import { FileIcon, SearchIcon, MessageIcon } from "./Icons";

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="services">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <span className="kicker" data-en="Citizen Service">
              {t("Citizen Service", "नागरिक सेवाएं")}
            </span>
            <h2 data-en="How can we help you?">
              {t("How can we help you?", "हम आपकी क्या मदद कर सकते हैं?")}
            </h2>
          </div>
          <p data-en="Your complaint. Your status. Your feedback.">
            {t(
              "Your complaint. Your status. Your feedback.",
              "आपकी शिकायत। आपकी स्थिति। आपकी प्रतिक्रिया।"
            )}
          </p>
        </div>

        <div className="service-grid">
          {/* Card 01 - Register Complaint */}
          <article className="service service-orange">
            <div className="service-picture">
              <img
                src={serviceRegisterImg}
                alt={t(
                  "Citizen registering grievance on smartphone",
                  "स्मार्टफोन से शिकायत दर्ज करती नागरिक"
                )}
                loading="lazy"
              />
            </div>
            <div className="service-copy">
              <div className="service-top">
                <span className="service-icon">
                  <FileIcon />
                </span>
                <span className="service-no">01</span>
              </div>
              <h3 data-en="Register Complaint">
                {t("Register Complaint", "शिकायत पंजीकरण")}
              </h3>
              <p data-en="File your grievance online through our digital portal">
                {t(
                  "File your grievance online through our digital portal",
                  "पोर्टल के माध्यम से अपनी नई शिकायत दर्ज करें"
                )}
              </p>
              <Link
                to="/login"
                className="button orange"
                data-en="Register complaint"
              >
                {t("Register complaint", "शिकायत दर्ज करें")}
              </Link>
            </div>
          </article>

          {/* Card 02 - Complaint Status */}
          <article className="service service-blue">
            <div className="service-picture">
              <img
                src={serviceTrackImg}
                alt={t(
                  "Citizen checking complaint status at shop",
                  "अपनी दुकान पर शिकायत की स्थिति देखता नागरिक"
                )}
                loading="lazy"
              />
            </div>
            <div className="service-copy">
              <div className="service-top">
                <span className="service-icon">
                  <SearchIcon />
                </span>
                <span className="service-no">02</span>
              </div>
              <h3 data-en="Complaint Status">
                {t("Complaint Status", "शिकायत की स्थिति")}
              </h3>
              <p data-en="Track real-time progress and action taken status">
                {t(
                  "Track real-time progress and action taken status",
                  "अपनी शिकायत संख्या दर्ज कर वर्तमान शिकायत की स्थिति देखें"
                )}
              </p>
              <Link
                to="/complaint"
                className="button blue"
                data-en="Check status"
              >
                {t("Check status", "स्थिति देखें")}
              </Link>
            </div>
          </article>

          {/* Card 03 - Citizen Feedback */}
          <article className="service service-green">
            <div className="service-picture">
              <img
                src={serviceFeedbackImg}
                alt={t(
                  "Citizens giving feedback on complaint resolution",
                  "समाधान पर प्रतिक्रिया देते नागरिक"
                )}
                loading="lazy"
              />
            </div>
            <div className="service-copy">
              <div className="service-top">
                <span className="service-icon">
                  <MessageIcon />
                </span>
                <span className="service-no">03</span>
              </div>
              <h3 data-en="Citizen Feedback">
                {t("Citizen Feedback", "नागरिक प्रतिक्रिया")}
              </h3>
              <p data-en="Share your satisfaction rating & feedback on resolution">
                {t(
                  "Share your satisfaction rating & feedback on resolution",
                  "शिकायत समाधान के संबंध में अपनी शिकायत की प्रतिक्रिया और रेटिंग दें"
                )}
              </p>
              <Link
                to="/login"
                className="button green"
                data-en="Give feedback"
              >
                {t("Give feedback", "प्रतिक्रिया दें")}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
