"use client";

import React, { useState } from "react";
import {
  Globe,
  Sliders,
  FileCheck,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { translations } from "@/lib/translations";

export default function Navbar({
  language,
  setLanguage,
  onOpenApiSettings,
  onOpenGatePass,
  isLiveGovApi,
  activeSection,
  onSelectSection
}) {
  const t = translations[language];
  const [fontSizeLevel, setFontSizeLevel] = useState("normal");
  const isHindi = language === "hi";

  const handleFontSize = (level) => {
    setFontSizeLevel(level);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-font-size", level);
    }
  };

  const navItems = [
    { id: "all", labelEn: "Home / Overview", labelHi: "मुख्य पृष्ठ / सारांश" },
    { id: "mandi", labelEn: "Live APMC Rates", labelHi: "दैनिक मंडी भाव" },
    { id: "trends", labelEn: "Price Analytics & Forecast", labelHi: "मूल्य रुझान व पूर्वानुमान" },
    { id: "nearby", labelEn: "Nearby Markets & Freight", labelHi: "निकटतम मंडी व मालभाड़ा" },
    { id: "advisory", labelEn: "ICAR Advisory & Crops", labelHi: "कृषि वैज्ञानिक सलाह" },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-300 shadow-sm sticky top-0 z-40">
      {/* 0. Accessible Skip to Main Content Link for Keyboard & Screen Reader Users */}
      <a href="#main-content" className="skip-link">
        {t.skipToContent || "Skip to Main Content"}
      </a>

      {/* 1. Official Indian Flag Tricolor Strip */}
      <div className="gov-tricolor-bar" />

      {/* 2. Top GIGW Accessibility & National Government Identity Strip */}
      <div className="bg-[#f8fafc] border-b border-slate-200 py-1.5 px-3 sm:px-4 text-[11px] text-slate-700">
        <div className="enterprise-container flex items-center justify-between gap-2">
          {/* Left: Official India Gov Identity */}
          <div className="flex items-center gap-2 truncate">
            <span className="font-bold text-slate-900 tracking-tight whitespace-nowrap">
              {isHindi ? "भारत सरकार" : "GOVERNMENT OF INDIA"}
            </span>
            <span className="text-slate-400 select-none">|</span>
            <span className="text-slate-600 font-semibold hidden sm:inline">
              {isHindi ? "कृषि एवं किसान कल्याण मंत्रालय" : "Ministry of Agriculture & Farmers Welfare"}
            </span>
            <span className="text-slate-400 select-none hidden md:inline">|</span>
            <a
              href="https://india.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline text-slate-600 hover:text-[#162f6a] hover:underline"
            >
              india.gov.in
            </a>
          </div>

          {/* Right: Accessibility Font Resize & Bilingual Switcher (Dark Mode Toggle Removed) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Screen Reader & Text Resize Controls */}
            <div className="flex items-center gap-1 border-r border-slate-300 pr-2.5">
              <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline mr-0.5">
                {isHindi ? "अक्षर आकार:" : "Font Size:"}
              </span>
              <button
                onClick={() => handleFontSize("small")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${fontSizeLevel === "small" ? "bg-slate-300 border-slate-400 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                title={t.fontSmall || "Decrease Font Size (-A)"}
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <button
                onClick={() => handleFontSize("normal")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${fontSizeLevel === "normal" ? "bg-[#162f6a] border-[#162f6a] text-white" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                title={t.fontNormal || "Standard Font Size (A)"}
                aria-label="Standard Font Size"
              >
                A
              </button>
              <button
                onClick={() => handleFontSize("large")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition ${fontSizeLevel === "large" ? "bg-slate-300 border-slate-400 text-slate-900" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                title={t.fontLarge || "Increase Font Size (+A)"}
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1.5 font-bold text-[#162f6a] hover:text-[#214aab] transition px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 text-xs shadow-2xs"
              title="Switch Language / भाषा बदलें"
            >
              <Globe className="h-3.5 w-3.5 text-[#ff9933]" />
              <span className="font-semibold">{language === "en" ? "हिन्दी" : "English"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Brand & Emblem Banner (Authentic National Header Layout) */}
      <div className="bg-white py-3 px-3 sm:px-4 border-b border-slate-200">
        <div className="enterprise-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Authentic Lion Capital Emblem + Bilingual National Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Authentic State Emblem of India SVG */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/emblem-of-india.svg"
                alt="State Emblem of India"
                className="h-14 sm:h-16 w-auto object-contain shrink-0"
              />
            </div>

            {/* Project Title Branding */}
            <div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-700 tracking-tight">
                {isHindi ? (
                  <>
                    <span>भारत सरकार</span> <span className="text-slate-400">|</span> <span>कृषि एवं किसान कल्याण मंत्रालय</span>
                  </>
                ) : (
                  <>
                    <span className="uppercase">Government of India</span> <span className="text-slate-400">|</span> <span>Ministry of Agriculture & Farmers Welfare</span>
                  </>
                )}
              </div>
              <h1 className="text-base sm:text-xl md:text-2xl font-black text-[#162f6a] tracking-tight leading-tight mt-0.5">
                {isHindi ? "कृषि मंडी भाव पूर्वानुमान एवं फसल सुझाव मंच" : "Krishi Mandi Price Prediction & Crop Suggestion Platform"}
              </h1>
              <div className="text-[10.5px] sm:text-[11.5px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                {isHindi ? "राष्ट्रीय कृषि विपणन आसूचना प्रणाली (APMC / Agmarknet)" : "National APMC Agricultural Market Intelligence System"}
              </div>
            </div>
          </div>

          {/* Right: Citizen Services (Gate Pass & System Settings Buttons) */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {/* Gate Pass Slip Generator Button */}
            <button
              onClick={onOpenGatePass}
              className="flex items-center gap-1.5 rounded bg-[#138808] hover:bg-[#0f6b06] text-white px-3 py-1.5 text-xs font-bold transition uppercase tracking-wider shadow-none"
              title={isHindi ? "किसान मंडी गेट पास / विक्रय पर्ची जारी करें" : "Generate Farmer Mandi Gate Pass / विक्रय पर्ची"}
            >
              <FileCheck className="h-3.5 w-3.5 shrink-0" />
              <span>{isHindi ? "मंडी गेट पास" : "Mandi Gate Pass"}</span>
            </button>

            {/* System Settings Button (Configures .env.local) */}
            <button
              onClick={onOpenApiSettings}
              className="flex items-center gap-1.5 rounded bg-[#162f6a] hover:bg-[#214aab] text-white px-3 py-1.5 text-xs font-bold transition uppercase tracking-wider shadow-none"
              title={isHindi ? "सिस्टम कॉन्फ़िगरेशन एवं सर्वर .env.local" : "System Configuration & Server .env.local"}
            >
              <Sliders className="h-3.5 w-3.5 shrink-0" />
              <span>{isHindi ? "सिस्टम सेटिंग्स" : "Settings"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Royal Navy Navigation Ribbon (Strict Clean Typography - Zero Decorative Icon Spam) */}
      <nav className="bg-[#162f6a] text-white">
        <div className="enterprise-container flex items-center justify-between overflow-x-auto py-0">
          <div className="flex items-center">
            {navItems.map((item) => {
              const isActive = (activeSection || "all") === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection && onSelectSection(item.id)}
                  className={`px-3 sm:px-4 py-2.5 text-xs font-bold whitespace-nowrap transition border-b-2 uppercase tracking-wide ${
                    isActive
                      ? "bg-[#0e204a] text-[#ff9933] border-[#ff9933] shadow-inner"
                      : "text-slate-100 hover:bg-[#214aab] border-transparent"
                  }`}
                >
                  <span>{isHindi ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center text-[11px] text-slate-200 font-semibold px-3 gap-2 tabular-nums">
            <span className="text-slate-400 uppercase text-[10px]">
              {isHindi ? "किसान कॉल सेन्टर:" : "Kisan Call Centre:"}
            </span>
            <span className="text-[#ff9933] font-bold">1800-180-1551</span>
            <span className="text-slate-400 text-[10px]">
              {isHindi ? "(निःशुल्क)" : "(Toll-Free)"}
            </span>
          </div>
        </div>
      </nav>

      {/* 5. Official Daily APMC Market Rates Bulletin (Light GovTech Alert Strip with Clean Separation) */}
      <div className="bg-[#f8fafc] text-slate-800 border-b border-slate-300 py-2 px-3 sm:px-4 text-[11px] flex items-center justify-between overflow-hidden shadow-2xs">
        <div className="enterprise-container flex items-center gap-3 w-full">
          {/* Formal Government Bulletin Badge */}
          <div className="flex items-center gap-1.5 shrink-0 bg-[#162f6a] text-white font-bold px-2.5 py-1 rounded text-[10px] sm:text-[10.5px] uppercase tracking-wider border border-[#0e204a]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#ff9933] animate-pulse" />
            <span>{isHindi ? "दैनिक मंडी बुलेटिन" : "DAILY APMC BULLETIN"}</span>
          </div>

          {/* Marquee Ticker Track (Bilingual Commodity Reporting with High-Contrast Typography) */}
          <div className="flex-1 overflow-x-auto whitespace-nowrap text-xs font-sans tabular-nums font-medium scrollbar-none flex items-center gap-6 text-slate-700">
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "सोयाबीन (नासिक मंडी):" : "SOYABEAN (Nashik APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹4,892/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold text-[10.5px]">(+0.8%)</span>
            </span>
            <span className="text-slate-300 select-none">|</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "गेहूं (इंदौर मंडी):" : "WHEAT (Indore APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹2,425/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold text-[10.5px]">(+0.4%)</span>
            </span>
            <span className="text-slate-300 select-none">|</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "चना (भोपाल मंडी):" : "CHANA (Bhopal APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹6,150/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-rose-800 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 font-bold text-[10.5px]">(-0.2%)</span>
            </span>
            <span className="text-slate-300 select-none">|</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "सरसों (जयपुर मंडी):" : "MUSTARD (Jaipur APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹5,680/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold text-[10.5px]">(+1.1%)</span>
            </span>
            <span className="text-slate-300 select-none">|</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "प्याज (लासलगांव मंडी):" : "ONION (Lasalgaon APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹1,950/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-rose-800 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200 font-bold text-[10.5px]">(-1.5%)</span>
            </span>
            <span className="text-slate-300 select-none">|</span>
            <span className="flex items-center gap-1.5">
              <strong className="text-[#162f6a] font-bold">
                {isHindi ? "कपास (राजकोट मंडी):" : "COTTON (Rajkot APMC):"}
              </strong>
              <span className="font-semibold text-slate-900">₹7,420/{isHindi ? "क्विं" : "q"}</span>
              <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold text-[10.5px]">(+0.5%)</span>
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 text-[10.5px] text-slate-600 shrink-0 font-medium border-l border-slate-300 pl-3">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>{isHindi ? "एगमार्कनेट सत्यापित ईओडी सत्र" : "Agmarknet Certified EOD Session"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
