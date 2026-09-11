import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import HeaderBranding from "./HeaderBranding";
import MainNavbar from "./MainNavbar";
import Footer from "./Footer";

export default function SahyogLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#1C4D8D] selection:text-white">
      {/* 1. Top Governance Bar with Live Language Switcher */}
      <TopBar />

      {/* 2. White Header Branding Section */}
      <HeaderBranding />

      {/* 3. Dark Blue Main Navigation Bar with Dropdowns */}
      <MainNavbar />

      {/* Main Content Body */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer & Red Disclaimer Banner */}
      <Footer />
    </div>
  );
}
