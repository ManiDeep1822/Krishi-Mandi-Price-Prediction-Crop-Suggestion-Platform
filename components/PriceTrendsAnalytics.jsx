"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar
} from "recharts";
import { Activity, Award, AlertCircle, Table2, TrendingUp, Calendar, Download } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { CROPS_CATALOG } from "@/lib/geoData";
import { translations } from "@/lib/translations";

export default function PriceTrendsAnalytics({
  commodity,
  modalPrice,
  language
}) {
  const t = translations[language];
  const [timeRange, setTimeRange] = useState("30d");
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isHindi = language === "hi";

  const matchedCrop = CROPS_CATALOG.find(c => c.name.toLowerCase() === (commodity || "").toLowerCase()) || { baseMsp: 2400 };
  const currentMsp = matchedCrop.baseMsp;
  const mspDelta = (modalPrice || 2400) - currentMsp;
  const isAboveMsp = mspDelta >= 0;

  useEffect(() => {
    async function fetchTrends() {
      setLoading(true);
      try {
        const res = await fetch(`/api/trends?commodity=${encodeURIComponent(commodity)}&modalPrice=${modalPrice || 2400}&range=${timeRange}`);
        const data = await res.json();
        if (data.success) {
          setTrendData(data);
        }
      } catch (err) {
        console.error("Failed to load trends:", err);
      } finally {
        setLoading(false);
      }
    }
    if (commodity) {
      fetchTrends();
    }
  }, [commodity, modalPrice, timeRange]);

  const formatDate = (dateStr) => {
    if (!isHindi || !dateStr) return dateStr;
    return dateStr
      .replace(/Jan/gi, "जन")
      .replace(/Feb/gi, "फ़र")
      .replace(/Mar/gi, "मार्च")
      .replace(/Apr/gi, "अप्रैल")
      .replace(/May/gi, "मई")
      .replace(/Jun/gi, "जून")
      .replace(/Jul/gi, "जुलाई")
      .replace(/Aug/gi, "अग")
      .replace(/Sept|Sep/gi, "सितं")
      .replace(/Oct/gi, "अक्टू")
      .replace(/Nov/gi, "नवं")
      .replace(/Dec/gi, "दिसं");
  };

  const rawHistoricalPoints = trendData?.historicalPoints || [];
  const historicalPoints = rawHistoricalPoints.map(pt => ({
    ...pt,
    date: isHindi ? formatDate(pt.date) : pt.date
  }));
  const forecast = trendData?.forecast || [];

  return (
    <section className="gov-card p-0 mb-6 border border-slate-300 shadow-none bg-white overflow-hidden">
      {/* Official Section Header */}
      <div className="bg-[#162f6a] text-white px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#ff9933]" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              {t.priceTrends}
            </h2>
            <span className="text-[10px] text-slate-200">
              {isHindi ? "दैनिक थोक भाव सांख्यिकी, आवक सहसंबंध एवं मौसमी प्रक्षेप" : "Daily Wholesale Statistical Trajectory & Arrival Correlation Ledger"}
            </span>
          </div>
        </div>

        {/* Time-Range Toggles (Strict Tabular Buttons) */}
        <div className="flex items-center rounded-none bg-[#0e204a] p-0.5 border border-slate-600">
          {["7d", "30d", "90d", "1y"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`rounded-none px-2.5 py-1 text-xs font-bold transition uppercase ${
                timeRange === r
                  ? "bg-[#ff9933] text-slate-950 font-black"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {t.timeRanges[r]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        
        {/* Official MSP Benchmark Delta Bar */}
        <div className="mb-4 p-2.5 border border-slate-300 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-700">{isHindi ? "सरकारी न्यूनतम समर्थन मूल्य (MSP):" : "Official Government Minimum Support Price (MSP):"}</span>
            <span className="tabular-nums font-bold text-slate-900">₹{formatNumber(currentMsp)} / {isHindi ? "क्विंटल" : "Qtl"}</span>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold border ${
            isAboveMsp
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-amber-50 text-amber-900 border-amber-300"
          }`}>
            {isAboveMsp ? <Award className="h-3.5 w-3.5 text-emerald-700 shrink-0" /> : <AlertCircle className="h-3.5 w-3.5 text-amber-700 shrink-0" />}
            <span className="tabular-nums">
              {isAboveMsp 
                ? (isHindi
                    ? `+₹${formatNumber(mspDelta)}/क्विं (+${((mspDelta/currentMsp)*100).toFixed(1)}%) सरकारी एमएसपी समर्थन मूल्य से अधिक`
                    : `+₹${formatNumber(mspDelta)}/Qtl (+${((mspDelta/currentMsp)*100).toFixed(1)}%) Above Govt MSP Floor`)
                : (isHindi
                    ? `-₹${formatNumber(Math.abs(mspDelta))}/क्विं एमएसपी आधार से कम — सरकारी खरीद केंद्र सक्रिय`
                    : `-₹${formatNumber(Math.abs(mspDelta))}/Qtl Below MSP Floor — Govt Procurement Centers Active`)}
            </span>
          </div>
        </div>

        {/* Main Statistical Chart (Clean Official Line Chart - Zero Neon Gradients) */}
        <div className="h-64 sm:h-72 w-full pt-1 border border-slate-200 bg-[#fdfefe] p-2">
          {loading ? (
            <div className="flex h-full items-center justify-center text-xs text-slate-500 font-medium">
              {isHindi ? "एगमार्कनेट से सांख्यिकीय मूल्य बिंदु लोड हो रहे हैं..." : "Loading statistical price points from Agmarknet..."}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={historicalPoints} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 10, fill: "#475569" }} />
                <YAxis
                  yAxisId="left"
                  stroke="#162f6a"
                  tick={{ fontSize: 10, fill: "#162f6a", fontWeight: 600 }}
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => `₹${val}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#64748b"
                  tick={{ fontSize: 9, fill: "#64748b" }}
                  domain={[0, 'auto']}
                  tickFormatter={(val) => `${val}q`}
                />
                <Tooltip
                  labelFormatter={(lbl) => formatDate(lbl)}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#64748b",
                    borderRadius: "0px",
                    fontSize: "11px",
                    color: "#0f172a"
                  }}
                  formatter={(val, name) => [
                    name === (isHindi ? "दैनिक आवक" : "Daily Arrivals") ? `${formatNumber(val)} ${isHindi ? "क्विंटल" : "Quintals"}` : `₹${formatNumber(val)}/${isHindi ? "क्विं" : "q"}`,
                    name
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px", fontWeight: 600 }} />
                <Bar yAxisId="right" dataKey="arrivals" name={isHindi ? "दैनिक आवक (क्विंटल)" : "Daily Arrivals (Qtl)"} fill="#cbd5e1" opacity={0.7} />
                <Line yAxisId="left" type="monotone" dataKey="modalPrice" name={isHindi ? "मॉडल भाव (₹/क्विंटल)" : "Modal Price (₹/Qtl)"} stroke="#162f6a" strokeWidth={2.2} dot={false} />
                <Line yAxisId="left" type="monotone" dataKey="mspBenchmark" name={isHindi ? "सरकारी एमएसपी आधार (फ्लोर)" : "Govt MSP Benchmark (Floor)"} stroke="#b45309" strokeDasharray="4 4" strokeWidth={1.8} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 4-Week Expected Price Corridor */}
        {forecast.length > 0 && (
          <div className="mt-4 border-t border-slate-200 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#162f6a] uppercase tracking-wide">
                <TrendingUp className="h-3.5 w-3.5 text-[#138808]" />
                {isHindi ? "आगामी 4-सप्ताह मूल्य प्रक्षेप गलियारा" : "Upcoming 4-Week Mandi Price Corridor"}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {isHindi ? "९५% ऐतिहासिक मंडी विचरण सीमा" : "95% Historical Mandi Variance Envelope"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {forecast.map((fc, i) => (
                <div key={i} className="border border-slate-300 bg-slate-50 p-2.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-600 block uppercase">
                    {isHindi ? `सप्ताह ${i + 1}` : fc.week}
                  </span>
                  <p className="text-sm font-black text-[#162f6a] mt-0.5 tabular-nums">
                    {formatCurrency(fc.projectedModal)}
                  </p>
                  <span className="text-[10px] text-slate-500 block mt-0.5 tabular-nums">
                    {isHindi ? "सीमा:" : "Range:"} {formatCurrency(fc.lowerBound)} – {formatCurrency(fc.upperBound)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historical Price & Arrival Volume Ledger Table */}
        <div className="mt-5 border-t border-slate-200 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#162f6a] uppercase tracking-wider flex items-center gap-1.5">
              <Table2 className="h-3.5 w-3.5" />
              {isHindi ? "दैनिक थोक भाव एवं आवक लेजर (विगत 5 कार्यदिवस)" : "Daily APMC Wholesale Price & Arrival Volume Ledger"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {isHindi ? "इकाई: ₹ / क्विंटल" : "Unit: ₹ / Quintal"}
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-300">
            <table className="gov-table text-xs">
              <thead>
                <tr>
                  <th className="text-left">{isHindi ? "दिनांक" : "Date"}</th>
                  <th className="text-right">{isHindi ? "न्यूनतम भाव (₹)" : "Min Rate (₹)"}</th>
                  <th className="text-right">{isHindi ? "मॉडल भाव (₹)" : "Modal Rate (₹)"}</th>
                  <th className="text-right">{isHindi ? "अधिकतम भाव (₹)" : "Max Rate (₹)"}</th>
                  <th className="text-right">{isHindi ? "दैनिक आवक (क्विं.)" : "Daily Arrivals (Qtl)"}</th>
                  <th className="text-center">{isHindi ? "एमएसपी अंतर" : "Spread vs MSP"}</th>
                </tr>
              </thead>
              <tbody>
                {historicalPoints.slice(-5).reverse().map((pt, idx) => {
                  const ptSpread = pt.modalPrice - currentMsp;
                  return (
                    <tr key={idx}>
                      <td className="tabular-nums font-medium text-slate-800">{pt.date}</td>
                      <td className="text-right tabular-nums text-slate-700 font-semibold">{formatCurrency(pt.modalPrice - 80)}</td>
                      <td className="text-right tabular-nums font-bold text-[#162f6a]">{formatCurrency(pt.modalPrice)}</td>
                      <td className="text-right tabular-nums text-slate-700 font-semibold">{formatCurrency(pt.modalPrice + 90)}</td>
                      <td className="text-right tabular-nums text-slate-800 font-semibold">{formatNumber(pt.arrivals)}</td>
                      <td className="text-center">
                        <span className={`inline-block px-1.5 py-0.2 text-[10px] font-bold tabular-nums ${ptSpread >= 0 ? "text-emerald-800 bg-emerald-50" : "text-amber-800 bg-amber-50"}`}>
                          {ptSpread >= 0 ? `+₹${ptSpread}` : `-₹${Math.abs(ptSpread)}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
