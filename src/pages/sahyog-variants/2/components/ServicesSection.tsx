import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import serviceRegisterImg from "@/assets/sahyog-variants/2/variation-2/service-register-blob.webp";
import serviceTrackImg from "@/assets/sahyog-variants/2/variation-2/service-track-blob.webp";
import serviceFeedbackImg from "@/assets/sahyog-variants/2/variation-2/service-feedback-blob.webp";
import registerComplaintIcon from "@/assets/sahyog-variants/2/icons/register-complaint.png";
import complaintStatusIcon from "@/assets/sahyog-variants/2/icons/complaint-status.png";
import citizenFeedbackIcon from "@/assets/sahyog-variants/2/icons/citizen-feedback.png";

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
            <h2 data-en="How We Can Help You">
              {t("How We Can Help You", "हम आपकी कैसे मदद कर सकते हैं")}
            </h2>
          </div>
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
                  <img
                    src={registerComplaintIcon}
                    alt=""
                    width="44"
                    height="44"
                  />
                </span>
              </div>
              <h3 data-en="Register Complaint">
                {t("Register Complaint", "शिकायत पंजीकरण")}
              </h3>
              <p data-en="Register your complaint easily on the portal">
                {t(
                  "Register your complaint easily on the portal",
                  "पोर्टल पर अपनी शिकायत आसानी से दर्ज करें"
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
                  <img
                    src={complaintStatusIcon}
                    alt=""
                    width="44"
                    height="44"
                  />
                </span>
              </div>
              <h3 data-en="Complaint Status">
                {t("Complaint Status", "शिकायत की स्थिति")}
              </h3>
              <p data-en="Enter your complaint number to see the latest progress instantly">
                {t(
                  "Enter your complaint number to see the latest progress instantly",
                  "शिकायत संख्या डालें और तुरंत देखें कि कार्रवाई कहां तक पहुंची"
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
                  <img
                    src={citizenFeedbackIcon}
                    alt=""
                    width="44"
                    height="44"
                  />
                </span>
              </div>
              <h3 data-en="Citizen Feedback">
                {t("Citizen Feedback", "नागरिक प्रतिक्रिया")}
              </h3>
              <p data-en="Rate the resolution and share your feedback with us">
                {t(
                  "Rate the resolution and share your feedback with us",
                  "समाधान से संतुष्ट हैं? अपनी रेटिंग और राय हमारे साथ साझा करें"
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
