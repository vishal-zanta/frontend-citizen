import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import heroSlideDarkImg from "@/assets/sahyog-variants/2/variation-2/bihar-leadership-pm-foreground.png";
import heroSlideLightImg from "@/assets/sahyog-variants/2/variation-2/bihar-leadership-banner2-v4.webp";

const HeroSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scheduleHero = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      motionQuery.matches ||
      document.hidden ||
      carouselRef.current?.matches(":hover") ||
      carouselRef.current?.contains(document.activeElement)
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 2);
    }, 2000);
  }, []);

  useEffect(() => {
    scheduleHero();

    const handleVisibilityChange = () => scheduleHero();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => scheduleHero();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [scheduleHero]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    scheduleHero();
  };

  const handleFocusIn = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleFocusOut = () => {
    setTimeout(scheduleHero, 0);
  };

  return (
    <section
      ref={carouselRef}
      className="hero hero-carousel"
      id="hero-banner"
      aria-roledescription="carousel"
      aria-label="Bihar Sahyog"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
    >
      {/* Slide 1 - Dark Hero (PM foreground & leadership) */}
      <div
        className={`hero-slide ${activeSlide === 0 ? "is-active" : ""}`}
        aria-hidden={activeSlide !== 0}
        inert={activeSlide !== 0 ? true : undefined}
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
          </div>
          <div className="hero-gallery">
            <img
              className="leadership-banner"
              src={heroSlideDarkImg}
              alt={t(
                "Combined image of leaders against the backdrop of Bihar's heritage and development",
                "बिहार की धरोहर और विकास की पृष्ठभूमि में दोनों नेताओं की संयोजित छवि"
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
        inert={activeSlide !== 1 ? true : undefined}
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
          </div>
          <div className="hero-gallery">
            <img
              className="leadership-banner"
              src={heroSlideLightImg}
              alt={t(
                "Combined image of leaders against the backdrop of Bihar's heritage and development",
                "बिहार की धरोहर और विकास की पृष्ठभूमि में दोनों नेताओं की संयोजित छवि"
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
