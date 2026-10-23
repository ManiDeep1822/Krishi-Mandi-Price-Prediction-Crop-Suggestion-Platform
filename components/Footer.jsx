"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Eye,
  Award
} from "lucide-react";
import { translations } from "@/lib/translations";
import PolicyModal from "@/components/PolicyModal";

export default function Footer({ language }) {
  const t = translations[language];
  const [activePolicy, setActivePolicy] = useState(null);
  const isHindi = language === "hi";

  const handleOpenPolicy = (policyKey) => {
    setActivePolicy(policyKey);
  };

  const handleClosePolicy = () => {
    setActivePolicy(null);
  };

  return (
    <>
      <footer className="w-full bg-[#0a1730] text-slate-300 border-t-2 border-[#ff9933] text-xs font-sans">
        
        {/* 1. Official National Initiative & Partner Ecosystem Seals Strip (Data.gov.in Standard) */}
        <div className="bg-[#0e204a] border-b border-slate-700/70 py-4 px-4">
          <div className="enterprise-container">
            <div className="text-center mb-3">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                {isHindi ? "राष्ट्रीय डिजिटल सार्वजनिक अवसंरचना एवं सहभागी मंच" : "National Digital Public Infrastructure & Government Initiatives"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Seal 1: Digital India */}
              <a
                href="https://digitalindia.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 hover:border-[#ff9933] hover:bg-[#0a1730] transition text-center"
              >
                <div className="text-xs font-black tracking-tight text-white group-hover:text-[#ff9933]">
                  Digital India
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "डिजिटल सशक्तिकरण" : "Power To Empower"}
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 flex items-center gap-0.5">
                  digitalindia.gov.in <ExternalLink className="h-2 w-2" />
                </span>
              </a>

              {/* Seal 2: Data.gov.in */}
              <a
                href="https://data.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 hover:border-[#ff9933] hover:bg-[#0a1730] transition text-center"
              >
                <div className="text-xs font-black tracking-tight text-white group-hover:text-[#ff9933]">
                  data.gov.in
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "खुला सरकारी डेटा मंच" : "Open Government Data"}
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 flex items-center gap-0.5">
                  data.gov.in <ExternalLink className="h-2 w-2" />
                </span>
              </a>

              {/* Seal 3: India.gov.in */}
              <a
                href="https://india.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 hover:border-[#ff9933] hover:bg-[#0a1730] transition text-center"
              >
                <div className="text-xs font-black tracking-tight text-white group-hover:text-[#ff9933]">
                  india.gov.in
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "भारत का राष्ट्रीय पोर्टल" : "National Portal of India"}
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 flex items-center gap-0.5">
                  india.gov.in <ExternalLink className="h-2 w-2" />
                </span>
              </a>

              {/* Seal 4: Agmarknet */}
              <a
                href="https://agmarknet.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 hover:border-[#ff9933] hover:bg-[#0a1730] transition text-center"
              >
                <div className="text-xs font-black tracking-tight text-white group-hover:text-[#ff9933]">
                  Agmarknet
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "कृषि विपणन निदेशालय (DMI)" : "Agricultural Marketing (DMI)"}
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 flex items-center gap-0.5">
                  agmarknet.gov.in <ExternalLink className="h-2 w-2" />
                </span>
              </a>

              {/* Seal 5: NIC */}
              <a
                href="https://nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 hover:border-[#ff9933] hover:bg-[#0a1730] transition text-center"
              >
                <div className="text-xs font-black tracking-tight text-white group-hover:text-[#ff9933]">
                  NIC India
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "राष्ट्रीय सूचना विज्ञान केंद्र" : "National Informatics Centre"}
                </div>
                <span className="text-[8.5px] text-slate-500 mt-1 flex items-center gap-0.5">
                  nic.in <ExternalLink className="h-2 w-2" />
                </span>
              </a>

              {/* Seal 6: STQC / GIGW 3.0 */}
              <div className="flex flex-col items-center justify-center p-2.5 rounded bg-[#0a1730]/80 border border-slate-700 text-center">
                <div className="text-xs font-black tracking-tight text-slate-200 flex items-center gap-1 justify-center">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>STQC / CQW</span>
                </div>
                <div className="text-[9.5px] text-slate-400 mt-0.5 leading-tight">
                  {isHindi ? "जीआईजीडब्ल्यू 3.0 प्रमाणित" : "GIGW 3.0 Certified"}
                </div>
                <span className="text-[8.5px] text-emerald-400 mt-1 font-semibold">
                  {isHindi ? "गुणवत्ता प्रमाणित" : "Certified Quality"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Official Horizontal GIGW Statutory Policy Links Ribbon */}
        <div className="bg-[#081224] border-b border-slate-800 py-3 px-4">
          <div className="enterprise-container flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11.5px] text-slate-300 font-medium">
            <button
              onClick={() => handleOpenPolicy("privacy")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "वेबसाइट नीतियां" : "Website Policies"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("terms")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "नियम व शर्तें" : "Terms of Use"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("hyperlink")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "हाइपरलिंकिंग नीति" : "Hyperlinking Policy"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("copyright")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "कॉपीराइट नीति" : "Copyright Policy"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("privacy")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("disclaimer")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "अस्वीकरण" : "Disclaimer"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("accessibility")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "सुलभता वक्तव्य" : "Accessibility Statement"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <button
              onClick={() => handleOpenPolicy("privacy")}
              className="hover:text-white hover:underline transition focus:outline-none"
            >
              {isHindi ? "सहायता व प्रतिक्रिया" : "Help & Feedback"}
            </button>
            <span className="text-slate-600 select-none">|</span>

            <a
              href="https://agmarknet.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:underline transition"
            >
              {isHindi ? "संपर्क सूत्र" : "Contact Us"}
            </a>
          </div>
        </div>

        {/* 3. Formal Institutional Directory & Helplines (Strict Government Standard) */}
        <div className="enterprise-container py-7 border-b border-slate-800 text-xs text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Administrative Nodal Authority */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{isHindi ? "नोडल प्रशासनिक कार्यालय" : "Nodal Administrative Authority"}</span>
              </h4>
              <div className="text-[11.5px] leading-relaxed text-slate-300 space-y-1">
                <p className="font-semibold text-white">
                  {isHindi ? "विपणन एवं निरीक्षण निदेशालय (DMI)" : "Directorate of Marketing & Inspection (DMI)"}
                </p>
                <p className="text-slate-300">
                  {isHindi ? "कृषि एवं किसान कल्याण विभाग," : "Department of Agriculture & Farmers Welfare,"}
                  <br />{isHindi ? "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार" : "Ministry of Agriculture & Farmers Welfare, Government of India"}
                </p>
                <p className="text-slate-400">
                  {isHindi ? "कृषि भवन, डॉ. राजेन्द्र प्रसाद रोड, नई दिल्ली - 110001" : "Krishi Bhawan, Dr. Rajendra Prasad Road, New Delhi - 110001"}
                </p>
                <p className="text-slate-400 pt-1">
                  {isHindi ? "वेब सूचना प्रबंधक (WIM):" : "Web Information Manager (WIM):"} <span className="text-slate-200">wim.agri@nic.in</span>
                </p>
              </div>
            </div>

            {/* Column 2: 24x7 Citizen & Farmer Helplines */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{isHindi ? "राष्ट्रीय हेल्पलाइन एवं सहायता डेस्क" : "National Helplines & Helpdesks"}</span>
              </h4>
              <div className="text-[11.5px] space-y-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {isHindi ? "किसान कॉल सेंटर (टोल-फ्री):" : "Kisan Call Centre (Toll-Free):"}
                  </span>
                  <a href="tel:18001801551" className="text-white font-bold hover:underline text-sm tabular-nums tracking-wide">
                    1800-180-1551
                  </a>
                  <span className="text-[10px] text-slate-400 block">
                    {isHindi ? "प्रातः 06:00 से रात्रि 10:00 बजे तक (सातों दिन)" : "06:00 AM to 10:00 PM (All 7 Days)"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {isHindi ? "ई-नाम राष्ट्रीय व्यापार सहायता डेस्क:" : "e-NAM National Trade Helpdesk:"}
                  </span>
                  <a href="tel:18002700224" className="text-slate-200 font-bold hover:underline tabular-nums">
                    1800-270-0224
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {isHindi ? "पीएम-किसान केंद्रीय हेल्पलाइन:" : "PM-KISAN Central Helpline:"}
                  </span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    155261 / 011-24300606
                  </span>
                </div>
              </div>
            </div>

            {/* Column 3: National Portals & Agricultural Networks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-700 pb-1.5 flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{isHindi ? "संबंधित राष्ट्रीय पोर्टल" : "Related National Portals"}</span>
              </h4>
              <ul className="space-y-1.5 text-[11.5px] text-slate-300">
                <li>
                  <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center justify-between">
                    <span>{isHindi ? "एगमार्कनेट पोर्टल (डीएमआई)" : "Agmarknet Portal (DMI)"}</span>
                    <span className="text-[10px] text-slate-400">agmarknet.gov.in</span>
                  </a>
                </li>
                <li>
                  <a href="https://enam.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center justify-between">
                    <span>{isHindi ? "ई-नाम (राष्ट्रीय कृषि बाजार)" : "e-NAM (National Agriculture Market)"}</span>
                    <span className="text-[10px] text-slate-400">enam.gov.in</span>
                  </a>
                </li>
                <li>
                  <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center justify-between">
                    <span>{isHindi ? "पीएम-किसान सम्मान निधि" : "PM-KISAN Samman Nidhi"}</span>
                    <span className="text-[10px] text-slate-400">pmkisan.gov.in</span>
                  </a>
                </li>
                <li>
                  <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center justify-between">
                    <span>{isHindi ? "आईसीएआर कृषि अनुसंधान परिषद" : "ICAR Agricultural Research"}</span>
                    <span className="text-[10px] text-slate-400">icar.org.in</span>
                  </a>
                </li>
                <li>
                  <a href="https://upag.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline flex items-center justify-between">
                    <span>{isHindi ? "यूपीएजी (एकीकृत कृषि सांख्यिकी पोर्टल)" : "UPAg (Unified Portal for Agricultural Stats)"}</span>
                    <span className="text-[10px] text-slate-400">upag.gov.in</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* 4. Official Project Ownership & Development Declaration Bar */}
        <div className="bg-[#050c1b] py-5 px-4 text-slate-400 text-[11px] border-t border-slate-900">
          <div className="enterprise-container text-center space-y-1.5 max-w-4xl mx-auto">
            <p className="text-slate-300 leading-relaxed">
              {isHindi ? (
                <>
                  वेबसाइट सामग्री प्रबंधन एवं स्वामित्व{" "}
                  <strong className="text-white font-semibold">
                    कृषि मंडी भाव पूर्वानुमान एवं फसल सुझाव मंच परियोजना टीम
                  </strong>
                </>
              ) : (
                <>
                  Website Content Managed & Owned by{" "}
                  <strong className="text-white font-semibold">
                    Krishi Mandi Price Prediction & Crop Suggestion Platform Team
                  </strong>
                </>
              )}
            </p>
            <p className="text-[10.5px] text-slate-400 leading-relaxed">
              {isHindi ? (
                <>
                  डिजाइन, विकास एवं होस्टिंग{" "}
                  <strong className="text-slate-200 font-semibold">
                    कृषि मंडी भाव पूर्वानुमान एवं फसल सुझाव मंच तकनीकी विकास एवं एआई प्रभाग
                  </strong>
                </>
              ) : (
                <>
                  Designed, Developed and Hosted by{" "}
                  <strong className="text-slate-200 font-semibold">
                    Krishi Mandi Price Prediction & Crop Suggestion Platform Development & AI Cell
                  </strong>
                </>
              )}
            </p>
          </div>
        </div>

        {/* 5. Base Indian Flag Tricolor Strip */}
        <div className="gov-tricolor-bar" />
      </footer>

      {/* Interactive Policy Modal for Statutory GIGW Documents */}
      <PolicyModal
        isOpen={Boolean(activePolicy)}
        onClose={handleClosePolicy}
        policyKey={activePolicy || "privacy"}
        language={language}
      />
    </>
  );
}
