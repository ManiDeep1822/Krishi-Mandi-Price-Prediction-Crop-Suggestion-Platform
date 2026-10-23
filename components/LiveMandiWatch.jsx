"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle,
  Clock,
  Layers,
  ArrowUpDown,
  Building2,
  FileSpreadsheet,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  FileText
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { translations } from "@/lib/translations";

const DISTRICT_HI_MAP = {
  "Nashik": "नासिक",
  "Pune": "पुणे",
  "Nagpur": "नागपुर",
  "Ahmednagar": "अहमदनगर",
  "Aurangabad": "औरंगाबाद (छ. संभाजीनगर)",
  "Chattrapati Sambhajinagar": "छ. संभाजीनगर",
  "Solapur": "सोलापूर",
  "Amravati": "अमरावती",
  "Jalgaon": "जलगांव",
  "Jalna": "जालना",
  "Beed": "बीड",
  "Buldhana": "बुलढाणा",
  "Nandurbar": "नंदुरबार",
  "Indore": "इंदौर",
  "Ujjain": "उज्जैन",
  "Bhopal": "भोपाल",
  "Dewas": "देवास",
  "Mandsaur": "मंदसौर",
  "Sehore": "सीहोर",
  "Hoshangabad": "नर्मदापुरम",
  "Ludhiana": "लुधियाना",
  "Amritsar": "अमृतसर",
  "Bhatinda": "बठिंडा",
  "Patiala": "पटियाला",
  "Jalandhar": "जालंधर",
  "Sangrur": "संगरूर",
  "Agra": "आगरा",
  "Kanpur": "कानपुर",
  "Varanasi": "वाराणसी",
  "Aligarh": "अलीगढ़",
  "Bareilly": "बरेली",
  "Meerut": "मेरठ",
  "Karnal": "करनाल",
  "Hisar": "हिसार",
  "Sirsa": "सिरसा",
  "Kurukshetra": "कुरुक्षेत्र",
  "Rohtak": "रोहतक",
  "Ahmedabad": "अहमदाबाद",
  "Rajkot": "राजकोट",
  "Surat": "सूरत",
  "Vadodara": "वडोदरा",
  "Junagadh": "जूनागढ़",
  "Jaipur": "जयपुर",
  "Jodhpur": "जोधपुर",
  "Kota": "कोटा",
  "Bikaner": "बीकानेर",
  "Alwar": "अलवर",
  "Sri Ganganagar": "श्री गंगानगर"
};

const STATE_HI_MAP = {
  "Maharashtra": "महाराष्ट्र",
  "Madhya Pradesh": "मध्य प्रदेश",
  "Punjab": "पंजाब",
  "Uttar Pradesh": "उत्तर प्रदेश",
  "Haryana": "हरियाणा",
  "Gujarat": "गुजरात",
  "Rajasthan": "राजस्थान",
  "Karnataka": "कर्नाटक",
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Telangana": "तेलंगाना",
  "Tamil Nadu": "तमिलनाडु",
  "Bihar": "बिहार",
  "West Bengal": "पश्चिम बंगाल"
};

const GRADE_HI_MAP = {
  "Local": "स्थानीय (लोकल)",
  "FAQ": "मानक (एफएक्यू)",
  "Standard": "मानक ग्रेड",
  "Super / Grade A": "उत्कृष्ट / ग्रेड-ए",
  "Grade A": "ग्रेड-ए",
  "Desi / Special": "देशी / विशिष्ट"
};

const MANDI_HI_MAP = {
  "Kille Dharur": "किल्ले धारूर",
  "Mehekar": "मेहकर",
  "Nandgaon": "नांदगांव",
  "Sinner": "सिन्नर",
  "Sinnar": "सिन्नर",
  "Masawat": "मसावत",
  "Partur": "परतूर",
  "Lasalgaon": "लासलगांव",
  "Vinchur": "विंचूर",
  "Daryapur": "दर्यापूर",
  "Chandur Railway": "चांदूर रेलवे",
  "Morshi": "मोर्शी",
  "Rahuri": "राहुरी",
  "Vambori": "वांबोरी",
  "Paithan": "पैठण",
  "Malkapur": "मलकापूर",
  "Nashik": "नासिक",
  "Pimpalgaon": "पिंपलगांव",
  "Yeola": "येवला",
  "Malegaon": "मालेगांव",
  "Kalwan": "कलवण",
  "Satana": "सटाणा",
  "Dindori": "दिंडोरी",
  "Chandwad": "चांदवड",
  "Kopargaon": "कोपरगांव",
  "Shrirampur": "श्रीरामपूर",
  "Sangamner": "संगमनेर",
  "Rahata": "राहाता",
  "Shevgaon": "शेवगांव",
  "Nevasa": "नेवासा",
  "Baramati": "बारामती",
  "Indapur": "इंदापूर",
  "Shirur": "शिरूर",
  "Daund": "दौंड",
  "Khed": "खेड",
  "Manchar": "मंचर",
  "Junnar": "जुन्नर",
  "Main Yard": "मुख्य यार्ड",
  "Grain Market": "अनाज मंडी",
  "Sub-Market Yard": "उप-मंडी यार्ड"
};

export default function LiveMandiWatch({
  records,
  sourceInfo,
  language,
  onOpenGatePass
}) {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("modalPrice");
  const [sortAsc, setSortAsc] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const isHindi = language === "hi";

  const getDistrictName = (dist) => (isHindi && DISTRICT_HI_MAP[dist]) ? DISTRICT_HI_MAP[dist] : dist;
  const getStateName = (st) => (isHindi && STATE_HI_MAP[st]) ? STATE_HI_MAP[st] : st;
  const getGradeName = (grd) => (isHindi && GRADE_HI_MAP[grd]) ? GRADE_HI_MAP[grd] : grd;
  const getMarketName = (mkt) => {
    if (!isHindi || !mkt) return mkt;
    let name = mkt;
    Object.entries(MANDI_HI_MAP).forEach(([en, hi]) => {
      name = name.replace(new RegExp(`\\b${en}\\b`, 'gi'), hi);
    });
    Object.entries(DISTRICT_HI_MAP).forEach(([en, hi]) => {
      name = name.replace(new RegExp(`\\b${en}\\b`, 'gi'), hi);
    });
    // Clean redundant APMC/यार्ड occurrences
    name = name.replace(/\bAPMC\b/gi, "").trim();
    return `${name} एपीएमसी`;
  };

  const filteredRecords = (records || []).filter(r => {
    const q = searchTerm.toLowerCase();
    return (
      r.market.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.variety.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return sortAsc ? valA - valB : valB - valA;
  });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Real CSV Export
  const handleExportCSV = () => {
    if (!filteredRecords.length) return;
    const headers = ["Market (Mandi)", "District", "State", "Grade/Variety", "Min Price (INR/Qtl)", "Modal Price (INR/Qtl)", "Max Price (INR/Qtl)", "Arrivals (Qtl)", "24h Delta %", "Arrival Date"];
    const rows = filteredRecords.map(r => [
      `"${r.market}"`,
      `"${r.district}"`,
      `"${r.state}"`,
      `"${r.grade || r.variety || 'Standard'}"`,
      r.minPrice,
      r.modalPrice,
      r.maxPrice,
      r.arrivals,
      `${r.deltaPercent || 0}%`,
      `"${r.arrivalDate}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `APMC_Mandi_Wholesale_Bulletin_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="gov-card p-0 mb-6 border border-slate-300 shadow-none rounded-none bg-white overflow-hidden">
      {/* Official Section Header */}
      <div className="bg-[#162f6a] text-white px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-[#ff9933]" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              {t.mandiWatch}
            </h2>
            <span className="text-[10px] text-slate-200">
              {language === "hi" ? "दैनिक थोक आवक एवं नीलामी लेनदेन भाव" : "Daily Wholesale Arrivals & Auction Transaction Rates"}
            </span>
          </div>
        </div>

        {/* Action Controls: Export CSV & Print Official Bulletin */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 rounded-none bg-[#0e204a] hover:bg-[#214aab] text-white text-xs px-2.5 py-1 border border-slate-600 font-semibold transition"
            title="Download CSV Spreadsheet (.csv / .xlsx)"
          >
            <Download className="h-3 w-3 text-emerald-400" />
            <span>{t.exportCsv || "Export CSV"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-none bg-[#0e204a] hover:bg-[#214aab] text-white text-xs px-2.5 py-1 border border-slate-600 font-semibold transition"
            title="Print Official Market Bulletin"
          >
            <Printer className="h-3 w-3 text-[#ff9933]" />
            <span>{t.printBulletin || "Print Bulletin"}</span>
          </button>
        </div>
      </div>

      {/* Subhead Search & Action Controls */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-700 font-semibold flex items-center gap-2">
          <span>{language === "hi" ? "आज रिपोर्टिंग एपीएमसी मंडियां:" : "Reporting APMC Mandis Today:"}</span>
          <span className="rounded-none bg-white border border-slate-300 px-2 py-0.5 font-bold text-[#162f6a]">
            {filteredRecords.length}
          </span>
          <span className="text-[11px] text-slate-500 hidden md:inline font-normal">
            {language === "hi" ? "• मंडी यार्ड विवरण देखने हेतु पंक्ति पर क्लिक करें" : "• Click row to view market yard details"}
          </span>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            id="mandi-search-input"
            name="mandiSearch"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchMandi}
            aria-label={t.searchMandi || "Search mandi, district or state"}
            className="w-full rounded-none border border-slate-300 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] font-medium"
          />
        </div>
      </div>

      {/* 1. Desktop & Tablet View: Responsive Official Government Data Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="gov-table">
          <thead>
            <tr>
              <th className="text-left w-10"></th>
              <th className="text-left">{t.market}</th>
              <th className="text-left">{t.grade}</th>
              <th className="text-right cursor-pointer select-none hover:text-[#ff9933] transition" onClick={() => toggleSort("minPrice")}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.minPrice}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-right cursor-pointer select-none hover:text-[#ff9933] transition" onClick={() => toggleSort("modalPrice")}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.modalPrice}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-right cursor-pointer select-none hover:text-[#ff9933] transition" onClick={() => toggleSort("maxPrice")}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.maxPrice}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-right cursor-pointer select-none hover:text-[#ff9933] transition" onClick={() => toggleSort("arrivals")}>
                <div className="flex items-center justify-end gap-1">
                  <span>{t.arrivals}</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-center">{t.trend}</th>
              <th className="text-center">{t.date}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-10 text-xs text-slate-500 font-medium">
                  {language === "hi" ? "दिए गए मापदंड के अनुसार कोई मंडी रिकॉर्ड प्राप्त नहीं हुआ।" : "No reporting mandis found matching the filter query."}
                </td>
              </tr>
            ) : (
              filteredRecords.map((item) => {
                const delta = item.deltaPercent || 0;
                const isExpanded = expandedId === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => toggleExpand(item.id)}
                      className={`cursor-pointer transition-colors ${
                        isExpanded ? "bg-blue-50/70" : "hover:bg-slate-100/80"
                      }`}
                    >
                      {/* Expand Toggle */}
                      <td className="text-center w-8 px-2">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-[#162f6a]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 hover:text-slate-700" />
                        )}
                      </td>

                      {/* Mandi Name & Location */}
                      <td>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {getMarketName(item.market)}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {getDistrictName(item.district)}, {getStateName(item.state)}
                        </div>
                      </td>

                      {/* Variety & Grade */}
                      <td>
                        <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-300">
                          {getGradeName(item.grade)}
                        </span>
                      </td>

                      {/* Min Price */}
                      <td className="text-right text-slate-700 tabular-nums text-xs font-semibold">
                        {formatCurrency(item.minPrice)}
                      </td>

                      {/* Modal Price (Hero Column) */}
                      <td className="text-right font-black text-[#162f6a] tabular-nums text-sm sm:text-base">
                        {formatCurrency(item.modalPrice)}
                        <span className="text-[10px] text-slate-500 block font-normal">
                          {language === "hi" ? "/ क्विंटल" : "/ Qtl"}
                        </span>
                      </td>

                      {/* Max Price */}
                      <td className="text-right text-slate-700 tabular-nums text-xs font-semibold">
                        {formatCurrency(item.maxPrice)}
                      </td>

                      {/* Arrivals */}
                      <td className="text-right text-slate-900 tabular-nums text-xs font-bold">
                        {formatNumber(item.arrivals)} <span className="text-[11px] font-normal text-slate-500">{language === "hi" ? "क्विंटल" : "Qtl"}</span>
                      </td>

                      {/* Delta Trend */}
                      <td className="text-center">
                        <span className={`inline-flex items-center gap-0.5 rounded px-2 py-0.5 text-[11px] font-bold tabular-nums ${
                          delta > 0
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : delta < 0
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : "bg-slate-100 text-slate-600 border border-slate-300"
                        }`}>
                          {delta > 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : delta < 0 ? (
                            <ArrowDownRight className="h-3 w-3" />
                          ) : (
                            <Minus className="h-3 w-3" />
                          )}
                          {Math.abs(delta)}%
                        </span>
                      </td>

                      {/* Date */}
                      <td className="text-center text-xs text-slate-600 tabular-nums font-medium">
                        {item.arrivalDate}
                      </td>
                    </tr>

                    {/* Expandable Yard Breakdown Details */}
                    {isExpanded && (
                      <tr className="bg-slate-50/90 border-b border-slate-300">
                        <td colSpan={9} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-white p-3.5 rounded border border-slate-200 shadow-xs">
                            
                            {/* Yard Address & Committee */}
                            <div className="space-y-1">
                              <span className="font-bold text-[#162f6a] uppercase text-[10px] tracking-wider flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-[#162f6a]" />
                                {t.yardGate || "APMC Market Yard Location"}
                              </span>
                              <p className="text-slate-800 font-semibold">
                                {getMarketName(item.market)} {language === "hi" ? "यार्ड, गेट सं. १" : "Yard, Gate No. 1"}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {language === "hi" ? "जिला " : "District "}{getDistrictName(item.district)}, {getStateName(item.state)} — {language === "hi" ? "पिन ४२२००१" : "Pin 422001"}
                              </p>
                              <div className="pt-1 text-[11px] text-slate-600 flex items-center gap-1">
                                <Phone className="h-3 w-3 text-slate-400" />
                                <span>{t.nodalOffice || (language === "hi" ? "सचिव कार्यालय" : "Secretary Office")}: 0253-2598XXX</span>
                              </div>
                            </div>

                            {/* Auction Timings & Trade Regulations */}
                            <div className="space-y-1">
                              <span className="font-bold text-[#162f6a] uppercase text-[10px] tracking-wider flex items-center gap-1">
                                <Clock className="h-3 w-3 text-[#162f6a]" />
                                {t.auctionSchedule || (language === "hi" ? "नीलामी समय व व्यापार" : "Auction Schedule & Trading")}
                              </span>
                              <p className="text-slate-800">
                                {t.morningAuction || (language === "hi" ? "प्रातः सत्र: ०९:३० AM – ०१:३० PM" : "Morning Session: 09:30 AM – 01:30 PM")}
                              </p>
                              <p className="text-slate-800">
                                {t.afternoonAuction || (language === "hi" ? "सायं सत्र: ०२:३० PM – ०५:३० PM" : "Evening Session: 02:30 PM – 05:30 PM")}
                              </p>
                              <p className="text-[11px] text-emerald-700 font-medium pt-1">
                                {language === "hi" ? "इलेक्ट्रॉनिक धर्मकांटा एवं ई-नाम व्यापार सक्षम" : "Electronic Weighbridge & e-NAM Trading Enabled"}
                              </p>
                            </div>

                            {/* Grade Quality Parameters */}
                            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-200 md:pl-4">
                              <span className="font-bold text-[#162f6a] uppercase text-[10px] tracking-wider flex items-center gap-1">
                                <Scale className="h-3 w-3 text-[#162f6a]" />
                                {language === "hi" ? "गुणवत्ता एवं नमी मानक" : "Quality & Moisture Standards"}
                              </span>
                              <div className="space-y-0.5 text-[11px] text-slate-600">
                                <div>• {t.moisturePermissible || (language === "hi" ? "नमी सीमा" : "Moisture Limit")}: <strong>&lt; 12.0%</strong> ({language === "hi" ? "मानक एफएक्यू" : "Standard FAQ"})</div>
                                <div>• {language === "hi" ? "विजातीय पदार्थ" : "Foreign Admixture"}: <strong>&lt; 2.0%</strong> {language === "hi" ? "अधिकतम" : "max"}</div>
                                <div>• {language === "hi" ? "क्षतिग्रस्त / बदरंग दाने" : "Damaged / Discolored"}: <strong>&lt; 3.0%</strong> {language === "hi" ? "अधिकतम" : "max"}</div>
                              </div>
                              {onOpenGatePass && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); onOpenGatePass(); }}
                                  className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#162f6a] hover:text-[#214aab] underline"
                                >
                                  <FileText className="h-3 w-3" />
                                  <span>{t.issuePassNow || "Issue Gate Pass for this Mandi"}</span>
                                </button>
                              )}
                            </div>

                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile View: Touch-Friendly Inspection Cards (under 640px) */}
      <div className="block md:hidden divide-y divide-slate-200">
        {filteredRecords.length === 0 ? (
          <div className="text-center py-8 px-4 text-xs text-slate-500 font-medium">
            {language === "hi" ? "कोई मंडी रिकॉर्ड प्राप्त नहीं हुआ।" : "No reporting mandis found matching the filter query."}
          </div>
        ) : (
          filteredRecords.map((item) => {
            const delta = item.deltaPercent || 0;
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="p-3.5 bg-white transition hover:bg-slate-50">
                {/* Header row: Mandi Name & Delta Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {getMarketName(item.market)}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {getDistrictName(item.district)}, {getStateName(item.state)}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-0.5 rounded px-2 py-0.5 text-[10px] font-bold shrink-0 ${
                    delta > 0
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : delta < 0
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-slate-100 text-slate-600 border border-slate-300"
                  }`}>
                    {delta > 0 ? (
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    ) : delta < 0 ? (
                      <ArrowDownRight className="h-2.5 w-2.5" />
                    ) : (
                      <Minus className="h-2.5 w-2.5" />
                    )}
                    {Math.abs(delta)}%
                  </span>
                </div>

                {/* Price & Arrival Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">
                      {t.modalPrice}
                    </span>
                    <span className="font-black text-[#162f6a] text-sm">
                      {formatCurrency(item.modalPrice)}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">
                      {t.minPrice} - {t.maxPrice}
                    </span>
                    <span className="font-bold text-slate-700 text-xs">
                      ₹{item.minPrice} - {item.maxPrice}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
                    <span className="text-[9px] uppercase font-bold text-slate-500 block">
                      {t.arrivals}
                    </span>
                    <span className="font-bold text-slate-800 text-xs">
                      {formatNumber(item.arrivals)} <span className="text-[9px] font-normal text-slate-500">Q</span>
                    </span>
                  </div>
                </div>

                {/* Tap to Expand Yard Details on Mobile */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="mt-2.5 w-full flex items-center justify-between text-[11px] font-semibold text-[#162f6a] bg-blue-50/60 hover:bg-blue-50 py-1.5 px-2.5 rounded border border-blue-200 transition"
                >
                  <span>{isExpanded ? (language === "hi" ? "विवरण छिपाएं" : "Hide Yard Details") : (language === "hi" ? "यार्ड व नीलामी विवरण देखें" : "View Yard & Auction Details")}</span>
                  {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>

                {/* Mobile Expanded Drawer */}
                {isExpanded && (
                  <div className="mt-2 p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-[#162f6a] shrink-0 mt-0.5" />
                      <div>
                        <strong>{getMarketName(item.market)} {language === "hi" ? "यार्ड, गेट सं. १" : "Yard, Gate No. 1"}</strong>
                        <div className="text-[11px] text-slate-500">{language === "hi" ? "पिन ४२२००१, जिला " : "Pin 422001, "}{getDistrictName(item.district)}, {getStateName(item.state)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{t.nodalOffice || (language === "hi" ? "सचिव कार्यालय" : "Secretary")}: 0253-2598XXX</span>
                    </div>

                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                      <div>• {t.morningAuction || (language === "hi" ? "प्रातः सत्र: ०९:३० AM – ०१:३० PM" : "Morning: 09:30 AM – 01:30 PM")}</div>
                      <div>• {t.afternoonAuction || (language === "hi" ? "सायं सत्र: ०२:३० PM – ०५:३० PM" : "Evening: 02:30 PM – 05:30 PM")}</div>
                      <div>• {language === "hi" ? "अधिकतम नमी: < १२.०% (मानक एफएक्यू)" : "Moisture: <12.0% FAQ"}</div>
                    </div>

                    {onOpenGatePass && (
                      <button
                        onClick={() => onOpenGatePass()}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-[#162f6a] text-white rounded text-xs font-bold shadow-xs hover:bg-[#214aab] transition"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        <span>{t.issuePassNow || (language === "hi" ? "इस मंडी के लिए गेट पास जारी करें" : "Issue Gate Pass for this Mandi")}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* Table Footer Attribution */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
        <span>{language === "hi" ? "आधिकारिक एगमार्कनेट थोक कृषि जिंस बुलेटिन से सत्यापित" : "Verified from official Agmarknet wholesale agricultural commodity bulletins"}</span>
        <span className="font-semibold text-slate-600">{language === "hi" ? "राष्ट्रीय एपीएमसी मंडी रजिस्ट्री" : "National APMC Mandi Registry"}</span>
      </div>
    </section>
  );
}
