import React from "react";
import HeroSection from "./components/HeroSection";
import GrievanceStats from "./components/GrievanceStats";
import ActionCards from "./components/ActionCards";
import TrackWidget from "./components/TrackWidget";
import FeaturesAndFlow from "./components/FeaturesAndFlow";

export default function SahyogHomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Banner Image */}
      <HeroSection />

      {/* 2. Grievance Stats Component */}
      <GrievanceStats />

      {/* 3. 4 Quick Service Action Cards (01 to 04) */}
      <ActionCards />

      {/* 4. Real-Time Grievance Tracker Widget */}
      <TrackWidget />

      {/* 5. Key Features & How It Works (2-Column Grid) */}
      <FeaturesAndFlow />
    </div>
  );
}
