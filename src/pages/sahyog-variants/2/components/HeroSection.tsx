import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import heroSlideDarkImg from "@/assets/sahyog-variants/2/variation-2/bihar-leadership-pm-foreground.png";
import heroSlideLightImg from "@/assets/sahyog-variants/2/variation-2/bihar-leadership-namaste.png";

const HeroSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % 2);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section
      className="hero hero-carousel"
      id="hero-banner"
      aria-roledescription="carousel"
      aria-label="Bihar Sahyog"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Scoped Hero styles ensuring banner text sits on top on mobile/tablet */}
      <style>{`
        #hero-banner .hero-layout {
          position: relative;
        }
        @media (max-width: 850px) {
          #hero-banner.hero {
            height: 550px !important;
          }
          #hero-banner .hero-layout {
            display: block !important;
            height: 100% !important;
            min-height: 0 !important;
            padding: 0 !important;
          }
          #hero-banner .hero-copy {
            width: 100% !important;
            max-width: none !important;
            padding: 24px 20px 0 !important;
            position: relative !important;
            top: 0 !important;
            margin-top: 0 !important;
            align-self: flex-start !important;
            z-index: 4 !important;
          }
          #hero-banner .eyebrow {
            font-size: 12px !important;
            margin-bottom: 12px !important;
          }
          #hero-banner h1 {
            font-size: clamp(27px, 7.8vw, 36px) !important;
            line-height: 1.3 !important;
          }
          #hero-banner .hero-copy > p {
            font-size: 13px !important;
            line-height: 1.7 !important;
            margin-top: 10px !important;
            max-width: 340px !important;
          }
          #hero-banner .hero-gallery::after {
            background: linear-gradient(180deg, #08243c 0%, #08243c 39%, #08243c90 49%, transparent 62%) !important;
          }
          #hero-banner .leadership-banner {
            position: absolute !important;
            bottom: 0 !important;
            left: -103% !important;
            width: 203% !important;
            max-width: none !important;
            height: 310px !important;
            margin: 0 !important;
            object-fit: cover !important;
            object-position: right bottom !important;
          }
        }
      `}</style>

      {/* Slide 1 - Dark Hero (PM foreground & leadership) */}
      <div
        className={`hero-slide ${activeSlide === 0 ? "is-active" : ""}`}
        aria-hidden={activeSlide !== 0}
      >
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">
              <span aria-hidden="true"></span>
              <span data-en="BIHAR SAHYOG HELPLINE">
                {t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}
              </span>
            </div>
            <h1 data-en="Help for Every Citizen,<br><em>Just a Call Away.</em>">
              {lang === "en" ? (
                <>
                  Help for Every Citizen,
                  <br />
                  <em>Just a Call Away.</em>
                </>
              ) : (
                <>
                  हर नागरिक की मदद,
                  <br />
                  <em>बस एक कॉल पर।</em>
                </>
              )}
            </h1>
            <p data-en="Register your complaint. Check status.">
              {t(
                "Register your complaint. Check status.",
                "शिकायत दर्ज करें, स्थिति देखें।",
              )}
            </p>
          </div>
          <div className="hero-gallery">
            <img
              className="leadership-banner"
              src={heroSlideDarkImg}
              alt={t(
                "Combined image of leaders against the backdrop of Bihar's heritage and development",
                "बिहार की धरोहर और विकास की पृष्ठभूमि में दोनों नेताओं की संयोजित छवि",
              )}
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {/* Slide 2 - Light Hero (Namaste & leadership) */}
      <div
        className={`hero-slide hero-slide-light ${activeSlide === 1 ? "is-active" : ""}`}
        aria-hidden={activeSlide !== 1}
      >
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">
              <span aria-hidden="true"></span>
              <span data-en="BIHAR SAHYOG HELPLINE">
                {t("BIHAR SAHYOG HELPLINE", "बिहार सहयोग हेल्पलाइन")}
              </span>
            </div>
            <h1 data-en="Help for Every Citizen,<br><em>Just a Call Away.</em>">
              {lang === "en" ? (
                <>
                  Help for Every Citizen,
                  <br />
                  <em>Just a Call Away.</em>
                </>
              ) : (
                <>
                  हर नागरिक की मदद,
                  <br />
                  <em>बस एक कॉल पर।</em>
                </>
              )}
            </h1>
            <p data-en="Register your complaint. Check status.">
              {t(
                "Register your complaint. Check status.",
                "शिकायत दर्ज करें, स्थिति देखें।",
              )}
            </p>
          </div>
          <div className="hero-gallery">
            <img
              className="leadership-banner"
              src={heroSlideLightImg}
              alt={t(
                "Combined image of leaders greeting citizens against the backdrop of Bihar's heritage and development",
                "बिहार की धरोहर और विकास की पृष्ठभूमि में दोनों नेताओं की संयोजित छवि",
              )}
              loading="eager"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
