"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import ApiSettingsModal from "@/components/ApiSettingsModal";
import FarmProfileForm from "@/components/FarmProfileForm";
import FarmSummaryHUD from "@/components/FarmSummaryHUD";
import LiveMandiWatch from "@/components/LiveMandiWatch";
import PriceTrendsAnalytics from "@/components/PriceTrendsAnalytics";
import NearbyMandiComparison from "@/components/NearbyMandiComparison";
import AIAdvisoryPanel from "@/components/AIAdvisoryPanel";
import Footer from "@/components/Footer";
import GatePassModal from "@/components/GatePassModal";
import { translations } from "@/lib/translations";
import { INDIAN_STATES, DISTRICT_MAP, CROPS_CATALOG } from "@/lib/geoData";
import {
  Table2,
  TrendingUp,
  Navigation,
  Sparkles,
  RefreshCw,
  Layers,
  Building2,
  Calendar
} from "lucide-react";

export default function Home() {
  const [language, setLanguage] = useState("en");
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [isGatePassOpen, setIsGatePassOpen] = useState(false);

  const [envConfig, setEnvConfig] = useState({
    dataGovConfigured: false,
    geminiConfigured: false,
    storageModel: ".env.local (Server-Side Environment Security)"
  });

  // Active Farmer Profile state
  const [farmerProfile, setFarmerProfile] = useState({
    state: "Maharashtra",
    district: "Nashik",
    crop: "Soyabean",
    variety: "Standard / Desi",
    soilType: "Clayey Loam",
    season: "Kharif",
    landSize: "5",
    irrigation: "Drip / Sprinkler"
  });

  // Data states
  const [mandiData, setMandiData] = useState({
    records: [],
    summary: {},
    source: "",
    isLiveGovApi: false
  });
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const t = translations[language];

  // Fetch server-side environment config on mount (Zero localStorage usage)
  const fetchEnvConfig = useCallback(async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      if (data.success) {
        setEnvConfig(data);
      }
    } catch (err) {
      console.warn("Failed to check server config:", err);
    }
  }, []);

  useEffect(() => {
    fetchEnvConfig();
  }, [fetchEnvConfig]);

  // Main data fetching orchestrator (reads directly from server environment)
  const fetchPlatformData = useCallback(async () => {
    setLoading(true);

    try {
      // 1. Fetch Live Mandi Data (Server reads .env.local DATA_GOV_IN_API_KEY)
      const mandiPromise = fetch(
        `/api/mandi?state=${encodeURIComponent(farmerProfile.state)}&district=${encodeURIComponent(farmerProfile.district)}&commodity=${encodeURIComponent(farmerProfile.crop)}`
      ).then(res => res.json());

      // 2. Fetch Live Weather Data from Open-Meteo
      const weatherPromise = fetch(
        `/api/weather?state=${encodeURIComponent(farmerProfile.state)}&district=${encodeURIComponent(farmerProfile.district)}`
      ).then(res => res.json());

      const [mandiRes, weatherRes] = await Promise.all([mandiPromise, weatherPromise]);

      if (mandiRes.success) {
        setMandiData({
          records: mandiRes.records || [],
          summary: mandiRes.summary || {},
          source: mandiRes.source || "",
          isLiveGovApi: mandiRes.isLiveGovApi || false
        });
      }

      if (weatherRes.success) {
        setWeatherData(weatherRes);
      }
    } catch (err) {
      console.error("Error fetching live platform data:", err);
    } finally {
      setLoading(false);
    }
  }, [farmerProfile.state, farmerProfile.district, farmerProfile.crop]);

  // Initial load
  useEffect(() => {
    fetchPlatformData();
  }, [fetchPlatformData]);

  const activeBenchmarkPrice = mandiData.summary?.avgModalPrice || 2400;

  const stateObj = INDIAN_STATES.find(s => s.id === farmerProfile.state || s.name === farmerProfile.state);
  const distList = DISTRICT_MAP[farmerProfile.state] || [];
  const distObj = distList.find(d => d.name === farmerProfile.district);
  const cropObj = CROPS_CATALOG.find(c => c.id === farmerProfile.crop || c.name === farmerProfile.crop);

  const displayState = language === "hi" ? (stateObj?.nameHi || farmerProfile.state) : (stateObj?.name || farmerProfile.state);
  const displayDistrict = language === "hi" ? (distObj?.nameHi || farmerProfile.district) : (distObj?.name || farmerProfile.district);
  const displayCrop = language === "hi" ? (cropObj?.nameHi || farmerProfile.crop) : (cropObj?.name || farmerProfile.crop);

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6fa] text-slate-900 font-sans">
      {/* Sticky Enterprise Header (Indian Government GIGW Standard) */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        onOpenApiSettings={() => setIsApiModalOpen(true)}
        onOpenGatePass={() => setIsGatePassOpen(true)}
        isLiveGovApi={mandiData.isLiveGovApi}
        activeSection={activeTab}
        onSelectSection={setActiveTab}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 enterprise-container py-5">
        
        {/* Enterprise GovTech Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4 overflow-x-auto whitespace-nowrap bg-white py-1.5 px-3 rounded border border-slate-200 shadow-xs">
          <span className="hover:text-[#162f6a] cursor-pointer font-medium">
            {language === "hi" ? "मुख्य पृष्ठ" : "Home"}
          </span>
          <span className="text-slate-300">/</span>
          <span className="hover:text-[#162f6a] cursor-pointer font-medium">
            {language === "hi" ? "राष्ट्रीय एपीएमसी निर्देशिका" : "National APMC Directory"}
          </span>
          <span className="text-slate-300">/</span>
          <span className="hover:text-[#162f6a] cursor-pointer font-medium">
            {displayState}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-[#162f6a] font-bold">
            {displayDistrict} ({displayCrop})
          </span>
        </div>
        
        {/* Official Two-Column Government Registry & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <FarmProfileForm
              farmerProfile={farmerProfile}
              setFarmerProfile={setFarmerProfile}
              onSubmit={() => fetchPlatformData()}
              loading={loading}
              language={language}
            />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <FarmSummaryHUD
              farmerProfile={farmerProfile}
              weatherData={weatherData}
              mandiSummary={mandiData.summary}
              language={language}
            />
          </div>
        </div>

        {/* Official Section Navigation Tabs & Utilities Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-2.5 mb-6 overflow-x-auto gap-3">
          {/* Left-Side Module Navigation Tabs Container */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === "all"
                  ? "bg-[#162f6a] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              <span>{language === "hi" ? "सभी मॉड्यूल" : "All Modules"}</span>
            </button>

            <button
              onClick={() => setActiveTab("mandi")}
              className={`flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === "mandi"
                  ? "bg-[#162f6a] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              <Table2 className="h-3.5 w-3.5" />
              <span>{t.mandiWatch}</span>
            </button>

            <button
              onClick={() => setActiveTab("trends")}
              className={`flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === "trends"
                  ? "bg-[#162f6a] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{t.priceTrends}</span>
            </button>

            <button
              onClick={() => setActiveTab("nearby")}
              className={`flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === "nearby"
                  ? "bg-[#162f6a] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>{t.nearbyMarkets}</span>
            </button>

            <button
              onClick={() => setActiveTab("advisory")}
              className={`flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeTab === "advisory"
                  ? "bg-[#162f6a] text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-300"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.aiAdvisory}</span>
            </button>
          </div>

          {/* Right-Side Refresh Live Utility Container (Matching Left Container Structure & Sizing) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => fetchPlatformData()}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-none px-3 py-1.5 text-xs font-bold uppercase transition bg-white text-[#162f6a] hover:bg-slate-100 border border-slate-300 hover:border-[#162f6a] shadow-none active:bg-slate-200"
              title="Refresh Live Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-[#214aab]" : "text-[#162f6a]"}`} />
              <span>{t.refreshData}</span>
            </button>
          </div>
        </div>

        {/* Section 1: Live APMC Mandi Price Board */}
        {(activeTab === "all" || activeTab === "mandi") && (
          <LiveMandiWatch
            records={mandiData.records}
            sourceInfo={mandiData.source}
            language={language}
            onOpenGatePass={() => setIsGatePassOpen(true)}
          />
        )}

        {/* Section 2: Historical Price Trends & Forecast Analytics */}
        {(activeTab === "all" || activeTab === "trends") && (
          <PriceTrendsAnalytics
            commodity={farmerProfile.crop}
            modalPrice={activeBenchmarkPrice}
            language={language}
          />
        )}

        {/* Section 3: Nearby APMC Mandis & Net Realized Freight Profit */}
        {(activeTab === "all" || activeTab === "nearby") && (
          <NearbyMandiComparison
            state={farmerProfile.state}
            district={farmerProfile.district}
            commodity={farmerProfile.crop}
            modalPrice={activeBenchmarkPrice}
            language={language}
          />
        )}

        {/* Section 4: AI Harvest & Selling Period Advisory */}
        {(activeTab === "all" || activeTab === "advisory") && (
          <AIAdvisoryPanel
            farmerProfile={farmerProfile}
            modalPrice={activeBenchmarkPrice}
            language={language}
          />
        )}

      </main>

      {/* Enterprise Footer */}
      <Footer language={language} />

      {/* Printable Farmer Mandi Gate Pass Modal */}
      <GatePassModal
        isOpen={isGatePassOpen}
        onClose={() => setIsGatePassOpen(false)}
        farmerProfile={farmerProfile}
        benchmarkPrice={activeBenchmarkPrice}
        language={language}
      />

      {/* Live API Settings & Diagnostic Modal */}
      <ApiSettingsModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        language={language}
        onRefreshConfig={fetchEnvConfig}
      />
    </div>
  );
}
