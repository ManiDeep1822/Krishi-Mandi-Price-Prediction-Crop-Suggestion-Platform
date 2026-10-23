"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import {
  X,
  Printer,
  Download,
  QrCode,
  ShieldCheck,
  Building,
  User,
  Truck,
  Calendar,
  FileCheck2,
  CheckCircle2
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { CROPS_CATALOG, INDIAN_STATES, DISTRICT_MAP } from "@/lib/geoData";

export default function GatePassModal({
  isOpen,
  onClose,
  farmerProfile,
  benchmarkPrice,
  language
}) {
  const isHindi = language === "hi";
  const [farmerName, setFarmerName] = useState("Ramesh Baburao Patil");
  const [vehicleNo, setVehicleNo] = useState("MH-15-DK-4819");
  const [vehicleType, setVehicleType] = useState(isHindi ? "ट्रैक्टर ट्रॉली" : "Tractor Trolley");
  const [driverName, setDriverName] = useState("Ramesh Patil");
  const [contactNo, setContactNo] = useState("98234-XXXXX");
  const [passNumber] = useState(`APMC-NSK-${Math.floor(100000 + Math.random() * 900000)}`);
  const [todayStr] = useState(
    new Date().toLocaleDateString(isHindi ? "hi-IN" : "en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  );

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const stateObj = INDIAN_STATES.find(s => s.id === farmerProfile.state || s.name === farmerProfile.state);
  const distList = DISTRICT_MAP[farmerProfile.state] || [];
  const distObj = distList.find(d => d.name === farmerProfile.district);
  const cropObj = CROPS_CATALOG.find(c => c.id === farmerProfile.crop || c.name === farmerProfile.crop);

  const displayState = isHindi ? (stateObj?.nameHi || farmerProfile.state) : (stateObj?.name || farmerProfile.state);
  const displayDistrict = isHindi ? (distObj?.nameHi || farmerProfile.district) : (distObj?.name || farmerProfile.district);
  const displayCrop = isHindi ? (cropObj?.nameHi || farmerProfile.crop) : (cropObj?.name || farmerProfile.crop);

  const estimatedQuintals = Math.round(Number(farmerProfile.landSize || 1) * 18);
  const estimatedValue = estimatedQuintals * (benchmarkPrice || 2400);

  const qrPayload = [
    `GOVT OF INDIA • APMC MANDI GATE PASS`,
    `Pass No: ${passNumber}`,
    `Date: ${todayStr}`,
    `Farmer: ${farmerName} (${contactNo})`,
    `Vehicle: ${vehicleNo} (${vehicleType})`,
    `Driver: ${driverName}`,
    `Origin: ${displayState}, ${displayDistrict}`,
    `Allotted Yard: APMC ${displayDistrict.toUpperCase()} YARD`,
    `Commodity: ${displayCrop}`,
    `Estimated Lot: ${estimatedQuintals} Qtl | Rs.${estimatedValue.toLocaleString("en-IN")}`,
    `Shed Allotted: Platform Shed B-4 (Weighbridge Gate 2)`,
    `Security Code: APMC-${passNumber.replace(/[^0-9]/g, "").slice(0, 6)}`,
    `Status: VERIFIED & ADMITTED BY APMC SECURITY`
  ].join("\n");

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      QRCode.toDataURL(qrPayload, {
        width: 140,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#0f172a",
          light: "#ffffff"
        }
      })
        .then(url => {
          if (isMounted) setQrCodeUrl(url);
        })
        .catch(err => {
          console.error("Error generating Gate Pass QR Code:", err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen, qrPayload]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("gatepass-modal-open");
    } else {
      document.body.classList.remove("gatepass-modal-open");
    }
    return () => {
      document.body.classList.remove("gatepass-modal-open");
      document.body.classList.remove("printing-gatepass");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    document.body.classList.add("printing-gatepass");
    window.print();
    setTimeout(() => {
      document.body.classList.remove("printing-gatepass");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto gatepass-modal-backdrop">
      <div className="relative w-full max-w-2xl rounded border border-slate-300 bg-white text-slate-900 shadow-2xl my-8 overflow-hidden gatepass-modal-card print:m-0 print:border-none print:shadow-none">
        
        {/* Tricolor top header */}
        <div className="gov-tricolor-bar" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#162f6a] text-white px-5 py-3.5 print:hidden">
          <div className="flex items-center gap-2.5">
            <FileCheck2 className="h-5 w-5 text-[#ff9933]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider">
                {isHindi ? "किसान मंडी प्रवेश पर्ची (Gate Pass)" : "Official APMC Mandi Yard Entry Pass"}
              </h3>
              <p className="text-[11px] text-slate-200">
                {isHindi ? "सांविधिक कृषि उपज मंडी समिति प्रवेश पर्ची" : "Statutory Agricultural Produce Market Committee Entry Slip"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-200 hover:bg-[#214aab] hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Printable Pass Body */}
        <div className="p-6 space-y-4 print:p-0">
          
          {/* Official Pass Header */}
          <div className="border-b-2 border-slate-800 pb-3 text-center">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
              {isHindi ? "भारत सरकार • राज्य कृषि विपणन बोर्ड" : "Government of India • State Agricultural Marketing Board"}
            </div>
            <h2 className="text-lg font-black uppercase text-[#162f6a] mt-0.5">
              {isHindi ? `एपीएमसी ${displayDistrict} मंडी यार्ड प्रवेश गेट पास` : `APMC ${farmerProfile.district.toUpperCase()} MARKET YARD GATE PASS`}
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs tabular-nums text-slate-600 mt-1">
              <span>{isHindi ? "पर्ची सं:" : "Pass No:"} <strong>{passNumber}</strong></span>
              <span>•</span>
              <span>{isHindi ? "दिनांक:" : "Date:"} <strong>{todayStr}</strong></span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{isHindi ? "२४ घंटे हेतु मान्य" : "Valid for 24 Hours"}</span>
            </div>
          </div>

          {/* Form / Inputs in Screen view */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:hidden bg-slate-50 p-3 rounded border border-slate-200 text-xs">
            <div>
              <label htmlFor="gatepass-farmer-name" className="font-bold text-slate-700 block mb-1">
                {isHindi ? "किसान / उत्पादक का नाम" : "Farmer / Producer Full Name"}
              </label>
              <input
                id="gatepass-farmer-name"
                name="farmerName"
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:border-[#214aab] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gatepass-vehicle-no" className="font-bold text-slate-700 block mb-1">
                {isHindi ? "वाहन पंजीकरण संख्या" : "Vehicle Registration No."}
              </label>
              <input
                id="gatepass-vehicle-no"
                name="vehicleNo"
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                className="w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:border-[#214aab] focus:outline-none"
              />
            </div>
          </div>

          {/* Pass Details Table (Clean Government Receipt Grid) */}
          <div className="border border-slate-300 rounded overflow-hidden text-xs">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-600 w-1/3">
                    {isHindi ? "किसान का विवरण:" : "Farmer Particulars:"}
                  </td>
                  <td className="p-2.5 font-bold text-slate-900">{farmerName} (Ph: {contactNo})</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "कार्यक्षेत्र व ग्राम:" : "Jurisdiction & Village:"}
                  </td>
                  <td className="p-2.5 text-slate-800">{displayDistrict}, {displayState}</td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "कृषि जींस (फसल):" : "Commodity (Crop):"}
                  </td>
                  <td className="p-2.5 font-bold text-[#138808]">
                    {displayCrop} {isHindi ? "(श्रेणी: मानक एफएक्यू)" : "(Grade: Standard FAQ)"}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "घोषित लॉट मात्रा:" : "Declared Lot Volume:"}
                  </td>
                  <td className="p-2.5 tabular-nums text-slate-900 font-bold">
                    {formatNumber(estimatedQuintals)} {isHindi ? "क्विंटल" : "Quintals"} (~{formatNumber(Math.round(estimatedQuintals / 10))} {isHindi ? "मी.टन" : "MT"})
                  </td>
                </tr>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "वाहन प्रकार व पंजीकरण सं:" : "Vehicle Type & Reg No:"}
                  </td>
                  <td className="p-2.5 tabular-nums text-slate-900 font-semibold">{vehicleType} — {vehicleNo}</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "अनुमानित गेट मूल्यांकन:" : "Est. Gate Valuation:"}
                  </td>
                  <td className="p-2.5 tabular-nums font-black text-[#162f6a]">
                    {formatCurrency(estimatedValue)} {isHindi ? `(@ औसत भाव ₹${benchmarkPrice}/क्विं)` : `(@ benchmark ₹${benchmarkPrice}/q)`}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-600">
                    {isHindi ? "आवंटित नीलामी शेड:" : "Auction Yard Allotted:"}
                  </td>
                  <td className="p-2.5 font-bold text-slate-800">
                    {isHindi ? "प्लेटफॉर्म शेड बी-४ (धर्मकांटा गेट २)" : "Platform Shed B-4 (Weighbridge Gate 2)"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Official Security Verification & Stamp Block */}
          <div className="pt-3 border-t-2 border-slate-300">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {isHindi ? "सांविधिक सुरक्षा सत्यापन एवं आधिकारिक मुहर" : "Statutory Security Verification & Official APMC Seal"}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-3 rounded border border-slate-200">
              
              {/* 1. Real 100% Scannable QR Code */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="bg-white p-1 border border-slate-300 rounded shadow-2xs shrink-0">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="APMC Official Scannable Verification QR Code"
                      className="w-20 h-20 sm:w-22 sm:h-22 object-contain block"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center bg-slate-100 text-[10px] text-slate-400">
                      Generating...
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1">
                    <QrCode className="h-3.5 w-3.5 text-[#162f6a]" />
                    <span>{isHindi ? "सत्यापन क्यूआर कोड" : "Official Verification QR"}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isHindi ? "स्मार्टफोन कैमरे से स्कैन करें" : "Scan with phone camera"}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[9px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 rounded">
                    <CheckCircle2 className="h-2.5 w-2.5 text-emerald-700" />
                    <span>{isHindi ? "वास्तविक गेट पास डेटा" : "Live Scannable Data"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Authentic Circular APMC Violet Rubber Ink Seal */}
              <div className="shrink-0 flex items-center justify-center py-1">
                <div className="transform -rotate-3 transition hover:rotate-0 duration-200 select-none">
                  <svg width="125" height="125" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xs">
                    <defs>
                      <path id="stampArcTop" d="M 26,100 A 74,74 0 0,1 174,100" fill="none" />
                      <path id="stampArcBottom" d="M 26,100 A 74,74 0 0,0 174,100" fill="none" />
                    </defs>
                    <circle cx="100" cy="100" r="94" fill="none" stroke="#4338ca" strokeWidth="3" />
                    <circle cx="100" cy="100" r="86" fill="none" stroke="#4338ca" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx="100" cy="100" r="62" fill="none" stroke="#4338ca" strokeWidth="1.5" />
                    
                    <text fill="#4338ca" fontSize="11" fontWeight="900" letterSpacing="1" fontFamily="sans-serif">
                      <textPath href="#stampArcTop" startOffset="50%" textAnchor="middle">★ कृषि उपज मंडी समिति ★</textPath>
                    </text>
                    <text fill="#4338ca" fontSize="8.5" fontWeight="800" letterSpacing="1" fontFamily="sans-serif">
                      <textPath href="#stampArcBottom" startOffset="50%" textAnchor="middle">
                        ★ APMC {displayDistrict.toUpperCase()} YARD VERIFIED ★
                      </textPath>
                    </text>
                    
                    <text x="100" y="85" textAnchor="middle" fontSize="12" fontWeight="900" fill="#4338ca" fontFamily="sans-serif">
                      सत्यापित
                    </text>
                    <text x="100" y="100" textAnchor="middle" fontSize="9.5" fontWeight="900" fill="#4338ca" letterSpacing="0.5" fontFamily="sans-serif">
                      VERIFIED &amp; PASSED
                    </text>
                    <text x="100" y="114" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4338ca" fontFamily="sans-serif">
                      {todayStr}
                    </text>
                    <text x="100" y="126" textAnchor="middle" fontSize="7" fontWeight="700" fill="#4338ca" letterSpacing="0.5" fontFamily="sans-serif">
                      GATE INSP: #02-{displayDistrict.substring(0, 3).toUpperCase()}
                    </text>
                  </svg>
                </div>
              </div>

              {/* 3. Official Mandi Gate Officer Signature */}
              <div className="text-right shrink-0 space-y-0.5 sm:pl-2">
                <div className="font-serif italic text-blue-900 text-sm font-semibold select-none pr-1">
                  V. K. Shinde
                </div>
                <div className="border-b-2 border-slate-700 w-36 ml-auto" />
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wide">
                  {isHindi ? "वि. के. शिंदे (वरिष्ठ मंडी निरीक्षक)" : "V. K. Shinde (Sr. Mandi Inspector)"}
                </div>
                <div className="text-[9px] text-slate-500">
                  {isHindi ? "प्रवेश द्वार क्र. ०२ • धर्मकांटा यार्ड" : "Entry Gate No. 02 • Weighbridge Yard"}
                </div>
                <div className="text-[8px] font-mono text-slate-400">
                  {isHindi ? "समय मुहर: " : "Timestamp: "}{todayStr}
                </div>
              </div>

            </div>
          </div>

          {/* Action buttons (hidden when printed) */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-[#162f6a] hover:bg-[#214aab] text-white px-4 py-2 text-xs font-bold transition shadow-sm uppercase tracking-wider"
            >
              <Printer className="h-4 w-4" />
              <span>{isHindi ? "आधिकारिक गेट पास प्रिंट करें" : "Print Official Pass (Slip)"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 text-xs font-bold transition"
            >
              {isHindi ? "विंडो बंद करें" : "Close Window"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
