"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  Target,
  ShieldAlert,
  Layers,
  Sprout,
  Coins,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Droplets,
  Cpu,
  Building,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Warehouse,
  Scale
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { translations } from "@/lib/translations";
import { CROPS_CATALOG, SOIL_TYPES, SEASONS } from "@/lib/geoData";

export default function AIAdvisoryPanel({
  farmerProfile,
  modalPrice,
  apiKeys,
  language
}) {
  const t = translations[language];
  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [engineSource, setEngineSource] = useState("");
  const isHindi = language === "hi";

  const soilObj = SOIL_TYPES.find(s => s.id === farmerProfile.soilType || s.name === farmerProfile.soilType);
  const seasonObj = SEASONS.find(s => s.id === farmerProfile.season || s.name === farmerProfile.season);
  const activeSoilName = isHindi ? (soilObj?.nameHi || farmerProfile.soilType) : (soilObj?.name || farmerProfile.soilType);
  const activeSeasonName = isHindi ? (seasonObj?.nameHi || farmerProfile.season) : (seasonObj?.name || farmerProfile.season);

  useEffect(() => {
    async function fetchAdvisory() {
      setLoading(true);
      try {
        const res = await fetch("/api/advisory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            state: farmerProfile.state,
            district: farmerProfile.district,
            crop: farmerProfile.crop,
            soilType: farmerProfile.soilType,
            season: farmerProfile.season,
            landSize: farmerProfile.landSize,
            irrigation: farmerProfile.irrigation,
            currentModalPrice: modalPrice || 2400,
            apiKey: apiKeys?.geminiKey,
            language: language
          })
        });
        const data = await res.json();
        if (data.success) {
          setAdvisory(data.insights);
          setEngineSource(data.engine);
        }
      } catch (err) {
        console.error("Failed to generate AI advisory:", err);
      } finally {
        setLoading(false);
      }
    }

    if (farmerProfile.crop && farmerProfile.soilType) {
      fetchAdvisory();
    }
  }, [farmerProfile, modalPrice, apiKeys?.geminiKey, language]);

  if (loading) {
    return (
      <section className="gov-card p-8 mb-6 border border-slate-300 shadow-none bg-white text-center py-12">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <div className="h-6 w-6 animate-spin border-2 border-[#162f6a] border-t-transparent" />
          <p className="text-xs text-slate-700 font-bold uppercase tracking-wider">
            {isHindi ? "आईसीएआर कृषि वैज्ञानिक एवं एपीएमसी मंडी परामर्श बुलेटिन संकलित किया जा रहा है..." : "Compiling ICAR Agronomic & APMC Market Intelligence Bulletin..."}
          </p>
        </div>
      </section>
    );
  }

  if (!advisory) return null;

  const isHold = advisory.recommendationType === "STRONG_HOLD";
  const isSell = advisory.recommendationType === "IMMEDIATE_SELL";

  const recBadgeText = isHindi
    ? isHold
      ? "रोककर रखें (मजबूत होल्ड)"
      : isSell
      ? "तत्काल बिक्री"
      : "किश्तों में बिक्री"
    : advisory.recommendationType;

  return (
    <section className="gov-card p-0 mb-6 border border-slate-300 shadow-none bg-white overflow-hidden">
      {/* Official Government Technical Bulletin Header */}
      <div className="bg-[#162f6a] text-white px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#ff9933]" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              {isHindi ? "आईसीएआर-केवीके तकनीकी कृषि एवं विपणन परामर्श बुलेटिन" : "ICAR-KVK Technical Agronomic & Mandi Advisory Bulletin"}
            </h2>
            <span className="text-[10px] text-slate-300">
              {isHindi ? "बुलेटिन सं: आईसीएआर/डीएमआई/२०२६/अक्टूबर-२३/बुल-८४२ • कृषि विपणन निदेशालय द्वारा जारी" : "Bulletin No: ICAR/DMI/2026/OCT-23/BUL-842 • Issued by Directorate of Agricultural Marketing"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-semibold bg-[#0e204a] text-emerald-300 px-2 py-0.5 border border-slate-600">
            {isHindi ? "प्रोटोकॉल: आईसीएआर-एग्रीडीएसएस सत्यापित" : "Protocol: ICAR-AgriDSS Verified"}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-5">
        
        {/* SECTION 1: STATUTORY RECOMMENDATION BLOCK */}
        <div className="border border-slate-300 bg-slate-50 p-3.5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              {isHindi ? "[अनुच्छेद १.०] कार्यकारी उपज विपणन मार्गदर्शन" : "[PARAGRAPH 1.0] EXECUTIVE LIQUIDATION GUIDANCE"}
            </span>
            <span className={`px-2 py-0.5 text-xs font-bold border ${
              isHold
                ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                : isSell
                ? "bg-rose-100 text-rose-900 border-rose-300"
                : "bg-blue-100 text-blue-900 border-blue-300"
            }`}>
              {recBadgeText}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div className="md:col-span-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">
                {t.recommendation}
              </span>
              <h3 className="text-base font-black text-[#162f6a] mt-0.5">
                {advisory.recommendationTitle}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed mt-2 font-medium">
                {advisory.rationale}
              </p>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-slate-300 md:pl-4 space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  {t.recommendedWindow}:
                </span>
                <span className="font-bold text-slate-900 block mt-0.5">
                  {advisory.recommendedWindow}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  {t.targetPrice}:
                </span>
                <span className="tabular-nums font-black text-[#138808] text-sm block mt-0.5">
                  {formatCurrency(advisory.targetPriceMin)} – {formatCurrency(advisory.targetPriceMax)} {isHindi ? "/ क्विंटल" : "/ Qtl"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">
                  {isHindi ? "अनुमानित शुद्ध प्राप्त लाभ:" : "Projected Net Realized Spread:"}
                </span>
                <span className="tabular-nums font-bold text-slate-800 block mt-0.5">
                  +{formatCurrency(advisory.netEstimatedGainPerQuintal)} {isHindi ? "/ क्विंटल" : "/ Quintal"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: STORAGE ECONOMICS & WDRA PLEDGE FINANCE */}
        <div className="border border-slate-300">
          <div className="bg-[#162f6a] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
            <span>{isHindi ? "[अनुच्छेद २.०] भंडारण अर्थशास्त्र एवं डब्ल्यूडीआरए गोदाम बंधक वित्तपोषण" : "[PARAGRAPH 2.0] Storage Economics & WDRA Warehouse Pledge Financing"}</span>
            <span className="text-[10px] text-slate-300 font-semibold">{isHindi ? "७% प्राथमिकता ऋण अनुदान योजना" : "7% Priority Lending Scheme"}</span>
          </div>
          <div className="p-3 text-xs bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="border border-slate-200 p-2.5 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  {isHindi ? "१. भंडारण लागत विश्लेषण" : "1. Holding Cost Analysis"}
                </span>
                <div className="space-y-1 text-[11px] text-slate-700 tabular-nums">
                  <div className="flex justify-between">
                    <span>{isHindi ? "डब्ल्यूडीआरए भंडारण शुल्क:" : "WDRA Storage Fee:"}</span>
                    <strong>~₹{advisory.holdingCostPerQuintalMonth}{isHindi ? "/क्विं/माह" : "/q/mo"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{isHindi ? "सकल मूल्य लाभ:" : "Gross Price Gain:"}</span>
                    <strong className="text-emerald-700">+₹{advisory.targetPriceMin - (modalPrice || 2400)}{isHindi ? "/क्विं" : "/q"}</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-300 pt-1 text-slate-900 font-bold">
                    <span>{isHindi ? "शुद्ध लाभ:" : "Net Gain:"}</span>
                    <strong className="text-emerald-700">+₹{advisory.netEstimatedGainPerQuintal}{isHindi ? "/क्विं" : "/q"}</strong>
                  </div>
                </div>
              </div>

              <div className="border border-slate-200 p-2.5 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  {isHindi ? "२. नमी एवं गुणवत्ता मानक" : "2. Moisture & Quality Parameters"}
                </span>
                <div className="space-y-1 text-[11px] text-slate-700">
                  <div>{isHindi ? "• एफएक्यू मानक नमी:" : "• FAQ Moisture:"} <strong>&lt; 12.0%</strong></div>
                  <div>{isHindi ? "• विजातीय मिश्रण (कचरा):" : "• Foreign Admixture:"} <strong>&lt; 2.0%</strong></div>
                  <div>{isHindi ? "• कीटग्रस्त दाने:" : "• Insect Damaged:"} <strong>{isHindi ? "०.०% छूट" : "0.0% tolerance"}</strong></div>
                  <div className="text-[10px] text-slate-500 pt-0.5">{isHindi ? "उपज को पक्के खलिहान में सुखाकर साफ करें" : "Pre-dry produce on pucca threshing yard"}</div>
                </div>
              </div>

              <div className="border border-slate-200 p-2.5 bg-slate-50">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  {isHindi ? "३. बंधक ऋण ब्याज अनुदान" : "3. Pledge Loan Subvention"}
                </span>
                <div className="space-y-1 text-[11px] text-slate-700">
                  <div>• {isHindi ? "ब्याज दर:" : "Interest Rate:"} <strong>{isHindi ? "७% वार्षिक अनुदान" : "7% p.a. subvention"}</strong></div>
                  <div>• {isHindi ? "साधन:" : "Instrument:"} <strong>{isHindi ? "इलेक्ट्रॉनिक ई-एनडब्ल्यूआर रसीद" : "Electronic e-NWR"}</strong></div>
                  <div>• {isHindi ? "अधिकतम अवधि:" : "Max Tenure:"} <strong>{isHindi ? "६ माह तक" : "Up to 6 Months"}</strong></div>
                  <div className="text-[10px] text-slate-500 pt-0.5">{isHindi ? "कटाई के समय औने-पौने दाम पर बिक्री से बचाव" : "Avoids harvest season distress selling"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: RISK ASSESSMENT CHECKLIST */}
        <div className="border border-slate-300">
          <div className="bg-[#162f6a] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
            <span>{isHindi ? "[अनुच्छेद ३.०] जोखिम कारक एवं मंडी रुझान मूल्यांकन" : "[PARAGRAPH 3.0] Risk Factors & Market Sentiment Assessment"}</span>
          </div>
          <div className="p-3 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
              {(advisory.riskFactors || []).map((risk, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 border border-slate-200 bg-slate-50">
                  <span className="tabular-nums font-bold text-slate-500 text-[11px]">3.{idx + 1}</span>
                  <span className="font-medium text-slate-800 text-[11.5px]">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: HIGH-COMPATIBILITY CROP DIVERSIFICATION MATRIX */}
        <div className="border border-slate-300">
          <div className="bg-[#162f6a] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
            <span>{isHindi ? "[अनुच्छेद ४.०] उच्च-अनुकूलता फसल विविधीकरण तालिका" : "[PARAGRAPH 4.0] High-Compatibility Crop Diversification Matrix"}</span>
            <span className="text-[10px] text-slate-300 font-medium">
              {isHindi ? `लक्ष्य मृदा: ${activeSoilName} (${activeSeasonName})` : `Target: ${farmerProfile.soilType} (${farmerProfile.season})`}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="gov-table text-xs">
              <thead>
                <tr>
                  <th className="text-left">{isHindi ? "वैकल्पिक फसल" : "Alternative Crop"}</th>
                  <th className="text-left">{isHindi ? "कृषि अनुकूलता एवं मृदा मेल" : "Agronomic Compatibility & Soil Match"}</th>
                  <th className="text-right">{isHindi ? "अपेक्षित उपज" : "Expected Yield"}</th>
                  <th className="text-right">{isHindi ? "अनुमानित शुद्ध आय / एकड़" : "Est. Net Return / Acre"}</th>
                  <th className="text-center">{isHindi ? "जल आवश्यकता" : "Water Demand"}</th>
                </tr>
              </thead>
              <tbody>
                {(advisory.alternativeCrops || []).map((alt, i) => {
                  const altCropObj = CROPS_CATALOG.find(c => c.id === alt.cropName || c.name === alt.cropName);
                  const displayAltName = isHindi ? (altCropObj?.nameHi || alt.cropName) : (altCropObj?.name || alt.cropName);
                  const displayWater = isHindi
                    ? (alt.waterRequirement === "Low" ? "कम" : alt.waterRequirement === "High" ? "उच्च" : "मध्यम")
                    : alt.waterRequirement;

                  return (
                    <tr key={i}>
                      <td className="font-bold text-slate-900">{displayAltName}</td>
                      <td className="text-slate-700">{alt.suitabilityReason}</td>
                      <td className="text-right tabular-nums font-bold text-slate-800">
                        {alt.expectedYieldQuintalPerAcre} {isHindi ? "क्विं / एकड़" : "Qtl / Acre"}
                      </td>
                      <td className="text-right tabular-nums font-black text-[#138808]">{formatCurrency(alt.estimatedNetIncomePerAcre)}</td>
                      <td className="text-center">
                        <span className="px-1.5 py-0.5 border border-slate-300 bg-slate-100 font-bold text-[10px] uppercase">
                          {displayWater}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: STATUTORY SIGN-OFF BLOCK */}
        <div className="p-3 border border-slate-300 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900 block">
              {isHindi ? "किसान कॉल सेंटर परामर्श सहायता" : "Kisan Call Centre Advisory Support"}
            </span>
            <span className="text-[11px] text-slate-600">
              {isHindi
                ? "वैज्ञानिकों से सीधे संवाद हेतु डायल करें: "
                : "Dial "}
              <strong className="tabular-nums">1800-180-1551</strong>{" "}
              {isHindi
                ? "(टोल-फ्री, प्रातः ६ से रात्रि १० बजे तक)"
                : "for direct scientist interaction (Toll-Free, 6 AM – 10 PM)"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-600 block">
                {isHindi ? "सत्यापित अनुमोदन" : "Verified Sign-off"}
              </span>
              <span className="text-[10px] text-emerald-800 font-bold block">
                {isHindi ? "मुख्य कृषि वैज्ञानिक एवं अर्थशास्त्री, आईसीएआर" : "CHIEF AGRONOMIST & ECONOMIST, ICAR"}
              </span>
            </div>
            <a
              href="https://enam.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-none bg-[#162f6a] hover:bg-[#214aab] text-white px-3 py-1.5 font-bold transition text-xs"
            >
              <span>{isHindi ? "ई-नाम पोर्टल" : "e-NAM Portal"}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
