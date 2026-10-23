"use client";

import React, { useState, useEffect } from "react";
import {
  Navigation,
  Truck,
  Coins,
  Award,
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Building,
  Gauge
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { translations } from "@/lib/translations";

export default function NearbyMandiComparison({
  state,
  district,
  commodity,
  modalPrice,
  language
}) {
  const t = translations[language];
  const [nearbyData, setNearbyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleType] = useState("tractor"); // "tractor" | "pickup" | "truck"

  const vehicleRates = {
    tractor: { name: "Tractor Trolley", capacity: "40 Qtl", ratePerKm: 3.2, icon: "Tractor" },
    pickup: { name: "Pickup / Mini-Truck 1.5T", capacity: "20 Qtl", ratePerKm: 4.5, icon: "Pickup" },
    truck: { name: "Commercial Truck 10-Tonne", capacity: "100 Qtl", ratePerKm: 2.6, icon: "Truck" }
  };

  useEffect(() => {
    async function fetchNearby() {
      setLoading(true);
      try {
        const res = await fetch(`/api/nearby?state=${encodeURIComponent(state)}&district=${encodeURIComponent(district)}&commodity=${encodeURIComponent(commodity)}&modalPrice=${modalPrice || 2400}`);
        const data = await res.json();
        if (data.success) {
          setNearbyData(data.markets || []);
        }
      } catch (err) {
        console.error("Failed to load nearby mandis:", err);
      } finally {
        setLoading(false);
      }
    }
    if (state && district && commodity) {
      fetchNearby();
    }
  }, [state, district, commodity, modalPrice]);

  const activeRate = vehicleRates[vehicleType].ratePerKm;

  return (
    <section className="gov-card p-0 mb-6 border border-slate-300 shadow-none bg-white overflow-hidden">
      {/* Official Section Header */}
      <div className="bg-[#162f6a] text-white px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <Navigation className="h-4 w-4 text-[#ff9933]" />
          <div>
            <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              {t.nearbyMarkets}
            </h2>
            <span className="text-[10px] text-slate-200">
              {language === "hi" ? "क्षेत्रीय मंडियों में मालभाड़ा व शुद्ध लाभ तुलना" : "Regional APMC Freight Transport Cost & Net Realization Analysis"}
            </span>
          </div>
        </div>

        {/* Vehicle Selector Tab Strip (Sharp Government Buttons) */}
        <div className="flex items-center gap-1 bg-[#0e204a] p-0.5 border border-slate-600 text-xs shrink-0">
          <span className="text-[10px] text-slate-300 font-bold uppercase px-1.5 hidden sm:inline">
            {language === "hi" ? "वाहन चयन:" : "Vehicle:"}
          </span>
          {Object.entries(vehicleRates).map(([k, v]) => {
            const vLabel = language === "hi" 
              ? (k === "tractor" ? "ट्रैक्टर" : k === "pickup" ? "पिकअप" : "ट्रक") 
              : v.name.split(" ")[0];
            const vCap = language === "hi"
              ? (k === "tractor" ? "40 क्विं." : k === "pickup" ? "20 क्विं." : "100 क्विं.")
              : v.capacity;
            return (
              <button
                key={k}
                onClick={() => setVehicleType(k)}
                className={`px-2 py-0.5 text-[11px] font-bold transition rounded-none ${
                  vehicleType === k
                    ? "bg-[#ff9933] text-slate-950 font-black"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {vLabel} ({vCap})
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500 font-medium">
            {language === "hi" 
              ? "स्थानिक दूरी एवं वाहन अनुसार मालभाड़ा गणना हो रही है..." 
              : "Calculating spatial Haversine distances and vehicle-specific freight deductions..."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {nearbyData.map((m) => {
              // Calculate dynamic freight based on chosen vehicle
              const freightPerQtl = m.distanceKm === 0 ? 0 : Math.round(m.distanceKm * (activeRate / 2));
              const netRealized = m.modalPrice - freightPerQtl;
              const localNet = (nearbyData[0]?.modalPrice || modalPrice) - 0;
              const profitDiff = netRealized - localNet;
              const isPositiveProfit = profitDiff > 0;

              return (
                <div
                  key={m.id}
                  className={`border p-3.5 transition-all relative rounded-none ${
                    isPositiveProfit || m.isBestProfit
                      ? "border-[#138808] bg-emerald-50/30"
                      : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
                >
                  {/* Highest Realization Badge */}
                  {(isPositiveProfit || m.isBestProfit) && (
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#138808] text-white px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      <Award className="h-3 w-3" />
                      {language === "hi" ? "अधिकतम शुद्ध लाभ" : "HIGHEST NET SPREAD"}
                    </div>
                  )}

                  {/* Mandi Title & Distance */}
                  <div className="pr-14 mb-2.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate-safe">
                      {language === "hi" ? m.mandiNameHi : m.mandiName}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="h-3 w-3 text-[#162f6a]" />
                        {m.distanceKm === 0 
                          ? (language === "hi" ? "स्थानीय एपीएमसी यार्ड" : "Local APMC Yard") 
                          : `${m.distanceKm} ${language === "hi" ? "किमी" : "km"}`}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-400" />
                        {m.estimatedTransitHours}{language === "hi" ? " घंटे परिवहन" : "h transit"}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Breakdown */}
                  <div className="space-y-1.5 border-t border-slate-200 pt-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">
                        {language === "hi" ? "सकल नीलामी भाव:" : "Gross Auction Rate:"}
                      </span>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {formatCurrency(m.modalPrice)}/{language === "hi" ? "क्विं" : "q"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Truck className="h-3 w-3 text-slate-400" />
                        {language === "hi" ? "मालभाड़ा" : "Freight"} ({language === "hi" ? (vehicleType === "tractor" ? "ट्रैक्टर" : vehicleType === "pickup" ? "पिकअप" : "ट्रक") : vehicleRates[vehicleType].name.split(" ")[0]}):
                      </span>
                      <span className="font-semibold text-slate-500 tabular-nums">
                        -{formatCurrency(freightPerQtl)}/{language === "hi" ? "क्विं" : "q"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 pt-1.5">
                      <span className="font-bold text-slate-900">
                        {language === "hi" ? "किसान को शुद्ध प्राप्त भाव:" : "Net Farmer Realization:"}
                      </span>
                      <span className="font-black text-[#162f6a] text-sm tabular-nums">
                        {formatCurrency(netRealized)}/{language === "hi" ? "क्विं" : "q"}
                      </span>
                    </div>

                    {/* Profit Difference vs Local */}
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[11px] font-medium text-slate-600">
                        {language === "hi" ? "शुद्ध आर्बिट्राज अंतर:" : "Net Arbitrage Spread:"}
                      </span>
                      <span className={`text-xs font-bold tabular-nums ${
                        isPositiveProfit ? "text-[#138808]" : profitDiff === 0 ? "text-slate-500" : "text-red-600"
                      }`}>
                        {profitDiff > 0 ? "+" : ""}{formatCurrency(profitDiff)}/{language === "hi" ? "क्विं" : "q"}
                      </span>
                    </div>
                  </div>

                  {/* Operating details */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium tabular-nums">
                    <span>{language === "hi" ? "व्यापार समय:" : "Trading:"} {m.operatingHours}</span>
                    <span>{language === "hi" ? "दैनिक आवक मात्रा:" : "Daily Volume:"} {formatNumber(m.tradingVolumeQuintals)} {language === "hi" ? "क्विंटल" : "Qtl"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
