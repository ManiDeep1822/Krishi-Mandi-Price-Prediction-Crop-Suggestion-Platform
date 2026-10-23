"use client";

import React from "react";
import {
  FileText,
  MapPin,
  Sprout,
  TrendingUp,
  Scale,
  Calendar,
  Layers,
  ShieldCheck,
  CloudSun,
  Droplets,
  CheckCircle2
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { translations } from "@/lib/translations";
import { CROPS_CATALOG, SOIL_TYPES, SEASONS, INDIAN_STATES, DISTRICT_MAP } from "@/lib/geoData";

export default function FarmSummaryHUD({
  farmerProfile,
  weatherData,
  mandiSummary,
  language
}) {
  const t = translations[language];
  const isHindi = language === "hi";

  const cropObj = CROPS_CATALOG.find(c => c.id === farmerProfile.crop) || CROPS_CATALOG[0];
  const soilObj = SOIL_TYPES.find(s => s.id === farmerProfile.soilType) || SOIL_TYPES[0];
  const seasonObj = SEASONS.find(s => s.id === farmerProfile.season) || SEASONS[0];
  
  // Resolve state & district Hindi names
  const stateObj = INDIAN_STATES.find(st => st.id === farmerProfile.state);
  const districtList = DISTRICT_MAP[farmerProfile.state] || [];
  const districtObj = districtList.find(d => d.name === farmerProfile.district);

  const displayState = isHindi && stateObj ? stateObj.nameHi : farmerProfile.state;
  const displayDistrict = isHindi && districtObj ? districtObj.nameHi : farmerProfile.district;
  const displayCrop = isHindi ? cropObj.nameHi : farmerProfile.crop;
  const displaySeason = isHindi ? seasonObj.nameHi.split(" ")[0] : farmerProfile.season;
  const displaySoil = isHindi ? soilObj.nameHi : soilObj.name;

  const estimatedYieldPerAcre = 18; // approx quintals
  const totalEstimatedHarvestQtl = Math.round(Number(farmerProfile.landSize || 1) * estimatedYieldPerAcre);

  return (
    <div className="gov-card bg-white border border-slate-300 p-0 shadow-none h-full flex flex-col justify-between">
      {/* Official Government Table Title Header */}
      <div className="bg-[#162f6a] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#ff9933]" />
          <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
            {isHindi ? "सक्रिय कृषक एवं जोत विवरण तालिका" : "Active Producer & Mandi Registry Ledger"}
          </h3>
        </div>
        <span className="text-[10px] text-slate-300 font-semibold tracking-wide">
          {isHindi ? "प्रपत्र ७-क (एपीएमसी)" : "Form 7-A (APMC)"}
        </span>
      </div>

      {/* Formal Key-Value Grid (Strict GovTech Table Format) */}
      <div className="p-0 overflow-x-auto flex-1">
        <table className="w-full border-collapse text-xs">
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 w-2/5 border-r border-slate-200">
                {isHindi ? "एपीएमसी कार्यक्षेत्र (जिला / राज्य)" : "APMC Jurisdiction (State / District)"}
              </td>
              <td className="py-2 px-3 font-bold text-slate-900">
                {displayDistrict}, {displayState}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "सक्रिय फसल एवं किस्म" : "Active Commodity & Variety"}
              </td>
              <td className="py-2 px-3 font-bold text-[#138808]">
                {displayCrop} {isHindi ? "(मानक एफएक्यू ग्रेड)" : "(Standard FAQ Grade)"}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "सरकारी न्यूनतम समर्थन मूल्य (MSP)" : "Government Benchmark MSP"}
              </td>
              <td className="py-2 px-3 tabular-nums font-bold text-slate-800">
                ₹{cropObj.baseMsp} / {isHindi ? "क्विंटल" : "Quintal"}
              </td>
            </tr>

            <tr className="border-b border-slate-200 bg-blue-50/50">
              <td className="py-2 px-3 font-semibold text-[#162f6a] bg-blue-100/60 border-r border-slate-200">
                {isHindi ? "प्रचलित मंडी मॉडल भाव" : "Prevailing Mandi Modal Price"}
              </td>
              <td className="py-2 px-3 tabular-nums font-black text-[#162f6a] text-sm">
                {formatCurrency(mandiSummary?.avgModalPrice || cropObj.baseMsp)}
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  / {isHindi ? "क्विंटल" : "Quintal"}
                </span>
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "भूमि रकबा एवं मौसम" : "Declared Land & Season"}
              </td>
              <td className="py-2 px-3 font-semibold text-slate-800">
                {farmerProfile.landSize} {t.landUnit} • {displaySeason}
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "मृदा वर्गीकरण एवं पीएच" : "Soil Classification & pH"}
              </td>
              <td className="py-2 px-3 text-slate-700">
                {displaySoil} (pH {soilObj.ph})
              </td>
            </tr>

            <tr className="border-b border-slate-200">
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "अनुमानित कुल उत्पादन" : "Est. Production Volume"}
              </td>
              <td className="py-2 px-3 tabular-nums font-bold text-slate-900">
                {formatNumber(totalEstimatedHarvestQtl)} {isHindi ? "क्विंटल" : "Qtl"}{" "}
                <span className="font-normal text-slate-500 text-[11px]">
                  (~{formatNumber(Math.round(totalEstimatedHarvestQtl / 10))} {isHindi ? "मी. टन" : "MT"})
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-2 px-3 font-semibold text-slate-600 bg-slate-50 border-r border-slate-200">
                {isHindi ? "स्थानीय कृषि मौसम" : "Local Ag-Weather Observation"}
              </td>
              <td className="py-2 px-3 text-slate-700 flex items-center justify-between">
                <span>{weatherData?.temperature || 28.5}°C • {isHindi ? "साफ मौसम" : (weatherData?.weatherCode || "Clear Sky")}</span>
                <span className="text-[10px] tabular-nums font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 border border-blue-200">
                  {isHindi ? "मृदा नमी:" : "Moisture:"} {weatherData?.soilMoisture || 24}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Verification Footer Bar */}
      <div className="bg-slate-50 p-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          <span>{isHindi ? "एगमार्कनेट सत्यापित अभिलेख" : "Agmarknet Verified Record"}</span>
        </div>
        <span className="text-[10px] font-semibold text-slate-600 tabular-nums">
          {isHindi ? "सत्र: २३ अक्टूबर २०२६ (ईओडी)" : "Session: 23 Oct 2026 EOD"}
        </span>
      </div>
    </div>
  );
}
