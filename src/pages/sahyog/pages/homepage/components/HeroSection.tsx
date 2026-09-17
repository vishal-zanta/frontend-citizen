import React from "react";
import banner from "@/assets/slider.jpeg";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#f8fafc] border-b border-slate-200/80">
      <div className=" mx-auto">
        <div className="relative w-full   overflow-hidden shadow-xs">
          <img
            src={banner}
            alt="Bihar Sahyog Helpline - Government of Bihar"
            className="object-cover w-full h-full "
          />
        </div>
      </div>
    </section>
  );
}
