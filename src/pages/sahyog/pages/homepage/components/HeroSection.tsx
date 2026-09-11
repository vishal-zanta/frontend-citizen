import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#f8fafc] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full aspect-[1080/360] overflow-hidden shadow-xs">
          <img
            src="/hero-banner.webp"
            alt="Sahyog Helpline Portal - Government of Bihar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
