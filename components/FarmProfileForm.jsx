"use client";

import React from "react";
import {
  MapPin,
  Sprout,
  Layers,
  Calendar,
  Maximize2,
  Droplets,
  Search,
  Building,
  CheckCircle2
} from "lucide-react";
import { INDIAN_STATES, DISTRICT_MAP, CROPS_CATALOG, SOIL_TYPES, SEASONS, IRRIGATION_TYPES } from "@/lib/geoData";
import { translations } from "@/lib/translations";

export default function FarmProfileForm({
  farmerProfile,
  setFarmerProfile,
  onSubmit,
  loading,
  language
}) {
  const t = translations[language];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const availableDistricts = DISTRICT_MAP[newState] || [];
    const newDistrict = availableDistricts.length > 0 ? availableDistricts[0].name : "";
    setFarmerProfile(prev => ({
      ...prev,
      state: newState,
      district: newDistrict
    }));
  };

  const currentDistricts = DISTRICT_MAP[farmerProfile.state] || [];

  return (
    <section className="gov-card p-0 h-full border border-slate-300 shadow-none bg-white flex flex-col justify-between">
      {/* Official Government Form Header */}
      <div className="bg-[#162f6a] text-white px-4 py-2.5 flex items-center justify-between border-b border-[#0e204a]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-none bg-[#ff9933]" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
            {language === "hi" ? "कृषि एवं जोत मापदंड प्रविष्टि" : "Agricultural Land & Crop Parameter Entry Form"}
          </h2>
        </div>
        <span className="text-[10px] text-slate-300 font-semibold tracking-wider">
          {language === "hi" ? "एनआईसी-कृषि-०१" : "NIC-AGRI-01"}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-[11.5px] text-slate-600 mb-3 font-medium">
          {t.configureProfile}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Location: State */}
            <div className="space-y-1">
              <label htmlFor="farm-state" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <MapPin className="h-3 w-3 text-[#162f6a]" />
                <span>{t.state}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-state"
                name="state"
                value={farmerProfile.state}
                onChange={handleStateChange}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {language === "hi" ? st.nameHi : st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location: District */}
            <div className="space-y-1">
              <label htmlFor="farm-district" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Building className="h-3 w-3 text-[#162f6a]" />
                <span>{t.district}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-district"
                name="district"
                value={farmerProfile.district}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, district: e.target.value })}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {currentDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {language === "hi" ? d.nameHi : d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop Commodity */}
            <div className="space-y-1">
              <label htmlFor="farm-crop" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Sprout className="h-3 w-3 text-[#138808]" />
                <span>{t.crop}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-crop"
                name="crop"
                value={farmerProfile.crop}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, crop: e.target.value })}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {CROPS_CATALOG.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === "hi" ? c.nameHi : c.name} (MSP: ₹{c.baseMsp})
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Type */}
            <div className="space-y-1">
              <label htmlFor="farm-soil" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Layers className="h-3 w-3 text-[#162f6a]" />
                <span>{t.soilType}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-soil"
                name="soilType"
                value={farmerProfile.soilType}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, soilType: e.target.value })}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {SOIL_TYPES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {language === "hi" ? s.nameHi : s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div className="space-y-1">
              <label htmlFor="farm-season" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Calendar className="h-3 w-3 text-[#ff9933]" />
                <span>{t.season}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-season"
                name="season"
                value={farmerProfile.season}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, season: e.target.value })}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {SEASONS.map((sn) => (
                  <option key={sn.id} value={sn.id}>
                    {language === "hi" ? sn.nameHi : sn.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Land Size */}
            <div className="space-y-1">
              <label htmlFor="farm-landsize" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Maximize2 className="h-3 w-3 text-[#162f6a]" />
                <span>{t.landSize}</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="flex rounded-none border border-slate-300 bg-white focus-within:border-[#214aab] focus-within:ring-1 focus-within:ring-[#214aab] transition overflow-hidden">
                <input
                  id="farm-landsize"
                  name="landSize"
                  type="number"
                  min="0.5"
                  max="1000"
                  step="0.5"
                  value={farmerProfile.landSize}
                  onChange={(e) => setFarmerProfile({ ...farmerProfile, landSize: e.target.value })}
                  className="w-full bg-transparent px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="5"
                />
                <span className="flex items-center bg-slate-100 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 border-l border-slate-300 select-none shrink-0 uppercase tracking-wider">
                  {t.landUnit}
                </span>
              </div>
            </div>

            {/* Irrigation Facility */}
            <div className="space-y-1 sm:col-span-2">
              <label htmlFor="farm-irrigation" className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Droplets className="h-3 w-3 text-[#214aab]" />
                <span>{t.irrigationType}</span>
                <span className="text-red-500">*</span>
              </label>
              <select
                id="farm-irrigation"
                name="irrigation"
                value={farmerProfile.irrigation}
                onChange={(e) => setFarmerProfile({ ...farmerProfile, irrigation: e.target.value })}
                className="w-full rounded-none border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-800 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab] transition"
              >
                {IRRIGATION_TYPES.map((irr) => (
                  <option key={irr.id} value={irr.id}>
                    {language === "hi" ? irr.nameHi : irr.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Action Button */}
            <div className="sm:col-span-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-none bg-[#162f6a] hover:bg-[#214aab] px-4 py-2 text-xs font-bold text-white transition shadow-none disabled:opacity-60 uppercase tracking-wider"
              >
                <Search className="h-3.5 w-3.5" />
                <span>{loading ? (language === "hi" ? "मंडी रिकॉर्ड खोजे जा रहे हैं..." : "Querying Live APMC Records...") : (language === "hi" ? "मंडी भाव एवं विश्लेषण प्राप्त करें" : "Query Live APMC Mandi Rates")}</span>
              </button>
            </div>

          </div>
        </form>
      </div>

      <div className="bg-slate-50 p-2.5 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span>{language === "hi" ? "लाइव एगमार्कनेट एपीएमसी फीड से सीधा डेटा" : "Direct queries against live Agmarknet APMC feeds"}</span>
        <span className="text-[10px] text-slate-600 font-medium">{language === "hi" ? "कृषि एवं किसान कल्याण मंत्रालय" : "Ministry of Agri & Farmers Welfare"}</span>
      </div>
    </section>
  );
}
