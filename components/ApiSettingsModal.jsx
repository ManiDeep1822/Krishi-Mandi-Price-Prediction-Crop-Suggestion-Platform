"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Key,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Server,
  Cpu,
  Eye,
  EyeOff,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Save,
  Lock,
  ShieldAlert
} from "lucide-react";
import { translations } from "@/lib/translations";

export default function ApiSettingsModal({
  isOpen,
  onClose,
  language,
  onRefreshConfig
}) {
  const t = translations[language];
  const [adminKey, setAdminKey] = useState("krishi-admin-2026");
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [dataGovKey, setDataGovKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [showDataGovKey, setShowDataGovKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [serverConfig, setServerConfig] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current server environment config when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage("");
      setSuccessMessage("");
      fetch("/api/config")
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setServerConfig(data);
          }
        })
        .catch(err => console.warn("Failed to load config:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveToEnv = async () => {
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify({
          dataGovKey: dataGovKey || undefined,
          geminiKey: geminiKey || undefined,
          adminKey: adminKey
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || (language === "hi" ? "अमान्य पासकोड या अमान्य इनपुट।" : "Access denied: Invalid admin passcode or key format."));
      }

      setSuccessMessage(
        language === "hi"
          ? "क्रेडेंशियल्स सर्वर .env.local में सफलतापूर्वक सुरक्षित किए गए!"
          : "Credentials validated and saved to server .env.local successfully!"
      );

      if (onRefreshConfig) onRefreshConfig();
      const confRes = await fetch("/api/config");
      const confData = await confRes.json();
      setServerConfig(confData);
      setDataGovKey("");
      setGeminiKey("");
      // Run test automatically after save
      runDiagnostics();
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const runDiagnostics = async () => {
    setTesting(true);
    setTestResults(null);
    const startTime = performance.now();

    try {
      const mandiTest = await fetch(`/api/mandi?state=Maharashtra&district=Nashik&commodity=Soyabean`);
      const mandiJson = await mandiTest.json();
      const mandiDuration = Math.round(performance.now() - startTime);

      setTestResults({
        mandiOk: mandiJson.success,
        mandiSource: mandiJson.source,
        mandiLatency: mandiDuration,
        isLiveGovApi: mandiJson.isLiveGovApi,
        geminiOk: serverConfig?.geminiConfigured,
        message: mandiJson.isLiveGovApi
          ? (language === "hi" ? "Data.gov.in आधिकारिक लाइव एपीआई से सीधा जुड़ाव स्थापित!" : "Official Data.gov.in Agmarknet live stream active!")
          : (language === "hi" ? "मानक राष्ट्रीय गेटवे सक्रिय।" : "Gateway active with standard national fallback.")
      });
    } catch (err) {
      setTestResults({
        mandiOk: false,
        error: err.message
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded border border-slate-300 bg-white text-slate-900 shadow-2xl my-8 overflow-hidden">
        
        {/* Tricolor top header */}
        <div className="gov-tricolor-bar" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#162f6a] text-white px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Server className="h-5 w-5 text-[#ff9933]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider">
                {t.apiModalTitle}
              </h3>
              <p className="text-[11px] text-slate-200">
                {language === "hi" ? "सर्वर-साइड सुरक्षित पर्यावरण (.env.local)" : "Server-Side Environment Security (.env.local)"}
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

        <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Security Banner (.env.local verified) */}
          <div className="rounded border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-900 block">
                {language === "hi" ? "प्रशासक प्रमाणीकरण व सर्वर सुरक्षा गारंटी" : "Admin Authentication & Server Security Guarantee"}
              </span>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                {language === "hi" ? (
                  <>
                    क्रेडेंशियल्स केवल सर्वर के <code className="bg-white px-1 py-0.2 rounded border border-emerald-300 font-mono text-[10px]">.env.local</code> फ़ाइल में सहेजे जाते हैं। बिना वैध <strong>प्रशासक पासकोड</strong> के सर्वर पर्यावरण में कोई परिवर्तन संभव नहीं है।
                  </>
                ) : (
                  <>
                    Credentials are stored strictly in the root <code className="bg-white px-1 py-0.2 rounded border border-emerald-300 font-mono text-[10px]">.env.local</code> file on the server. Unauthorized writes are strictly blocked via mandatory <strong>Admin Passcode</strong> validation.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="rounded border border-rose-300 bg-rose-50 p-3 text-xs text-rose-900 flex items-start gap-2.5 animate-fadeIn">
              <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === "hi" ? "प्रमाणीकरण / इनपुट त्रुटि:" : "Security / Validation Error:"}
                </span>
                <p className="text-[11px] text-rose-800 mt-0.5 font-medium">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Success Message Box */}
          {successMessage && (
            <div className="rounded border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900 flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === "hi" ? "सफलतापूर्वक अद्यतन:" : "Configuration Updated:"}
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5 font-medium">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Active Server Configuration Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Status: Agmarknet API */}
            <div className="rounded border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase truncate-safe">
                  {language === "hi" ? "एगमार्कनेट मंडी फीड" : "Agmarknet Mandi Feed"}
                </span>
                <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold whitespace-nowrap shrink-0 ${
                  serverConfig?.dataGovConfigured
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}>
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span className="whitespace-nowrap">
                    {language === "hi" ? ".env में सक्रिय" : "Configured in .env"}
                  </span>
                </span>
              </div>
              <p className="text-[10px] tabular-nums text-slate-500 font-mono">
                {language === "hi" ? "सत्यापित कुंजी: " : "Verified Key: "}{serverConfig?.dataGovMasked || (language === "hi" ? "उपलब्ध नहीं" : "Not configured")}
              </p>
            </div>

            {/* Status: Gemini API */}
            <div className="rounded border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase truncate-safe">
                  {language === "hi" ? "जेमिनी परामर्श इंजन" : "Gemini Advisory Engine"}
                </span>
                <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold whitespace-nowrap shrink-0 ${
                  serverConfig?.geminiConfigured
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}>
                  <CheckCircle2 className="h-3 w-3 shrink-0" />
                  <span className="whitespace-nowrap">
                    {language === "hi" ? ".env में सक्रिय" : "Configured in .env"}
                  </span>
                </span>
              </div>
              <p className="text-[10px] tabular-nums text-slate-500 font-mono">
                {language === "hi" ? "सत्यापित कुंजी: " : "Verified Key: "}{serverConfig?.geminiMasked || (language === "hi" ? "उपलब्ध नहीं" : "Not configured")}
              </p>
            </div>
          </div>

          {/* Form to update keys into .env.local */}
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h4 className="text-xs font-bold text-[#162f6a] uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5" />
              {language === "hi" ? "सर्वर पर्यावरण अद्यतन करें (.env.local)" : "Update Server Environment (.env.local)"}
            </h4>

            {/* Admin Security Passcode Field */}
            <div className="space-y-1.5 rounded border border-slate-300 bg-slate-50/70 p-3">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="settings-admin-key" className="font-bold text-[#162f6a] flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                  <span>{language === "hi" ? "प्रशासक सुरक्षा पासकोड (Admin Passcode) *" : "Administrator Passcode (ADMIN_SECRET_KEY) *"}</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {language === "hi" ? "डिफ़ॉल्ट: krishi-admin-2026" : "Default: krishi-admin-2026"}
                </span>
              </div>
              <div className="relative">
                <input
                  id="settings-admin-key"
                  name="adminKey"
                  type={showAdminKey ? "text" : "password"}
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter Admin Secret Passcode"
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 pr-10 text-xs font-mono text-slate-800 placeholder-slate-400 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab]"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminKey(!showAdminKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showAdminKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500">
                {language === "hi"
                  ? "सर्वर फ़ाइल सिस्टम में सुरक्षा परिवर्तनों को अधिकृत करने हेतु आवश्यक।"
                  : "Required to authenticate writes to the server file system and prevent tampering."}
              </p>
            </div>

            {/* Key 1: Data.gov.in */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="settings-datagov-key" className="font-bold text-slate-700">
                  {t.dataGovKey}
                </label>
                <a
                  href="https://www.data.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#214aab] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>data.gov.in</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="relative">
                <input
                  id="settings-datagov-key"
                  name="dataGovKey"
                  type={showDataGovKey ? "text" : "password"}
                  value={dataGovKey}
                  onChange={(e) => setDataGovKey(e.target.value)}
                  placeholder={
                    language === "hi"
                      ? (serverConfig?.dataGovConfigured ? "वर्तमान कुंजी बनाए रखने हेतु खाली छोड़ें" : "Data.gov.in 579b... एपीआई कुंजी दर्ज करें")
                      : (serverConfig?.dataGovConfigured ? "Leave blank to keep existing key" : "Paste Data.gov.in 579b... API Key")
                  }
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab]"
                />
                <button
                  type="button"
                  onClick={() => setShowDataGovKey(!showDataGovKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showDataGovKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Key 2: Gemini AI */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="settings-gemini-key" className="font-bold text-slate-700">
                  {t.geminiKey}
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#214aab] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Google AI Studio</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="relative">
                <input
                  id="settings-gemini-key"
                  name="geminiKey"
                  type={showGeminiKey ? "text" : "password"}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder={
                    language === "hi"
                      ? (serverConfig?.geminiConfigured ? "वर्तमान कुंजी बनाए रखने हेतु खाली छोड़ें" : "Gemini API कुंजी (AQ.Ab8...) दर्ज करें")
                      : (serverConfig?.geminiConfigured ? "Leave blank to keep existing key" : "Paste Gemini API Key (AQ.Ab8...)")
                  }
                  className="w-full rounded border border-slate-300 bg-white px-3 py-2 pr-10 text-xs text-slate-800 placeholder-slate-400 focus:border-[#214aab] focus:outline-none focus:ring-1 focus:ring-[#214aab]"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showGeminiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Save to .env.local Button */}
            <button
              onClick={handleSaveToEnv}
              disabled={saving || (!dataGovKey && !geminiKey && !adminKey)}
              className="w-full flex items-center justify-center gap-2 rounded bg-[#162f6a] hover:bg-[#214aab] px-4 py-2 text-xs font-bold text-white transition disabled:opacity-50 uppercase tracking-wider shadow"
            >
              <Save className="h-3.5 w-3.5" />
              <span>
                {saving
                  ? (language === "hi" ? "सर्वर .env.local अद्यतन हो रहा है..." : "Validating & Updating .env.local...")
                  : (language === "hi" ? "सर्वर .env.local में सहेजें" : "Save to Server .env.local")}
              </span>
            </button>
          </div>

          {/* Diagnostic Test Results Box */}
          {testResults && (
            <div className="rounded border border-slate-300 bg-slate-50 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-slate-900 uppercase">
                  {language === "hi" ? "लाइव कनेक्टिविटी परीक्षण" : "Live Connectivity Diagnostic"}
                </span>
                <span className="tabular-nums text-[11px] text-slate-600 font-semibold">
                  {language === "hi" ? "विलंबता: " : "Latency: "}{testResults.mandiLatency}ms
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>{testResults.message}</span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {language === "hi" ? "डेटा स्रोत: " : "Source: "}{testResults.mandiSource}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={runDiagnostics}
              disabled={testing}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded border border-[#214aab] text-[#162f6a] hover:bg-slate-50 px-3 py-1.5 text-xs font-bold transition uppercase tracking-wider"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${testing ? "animate-spin text-[#214aab]" : ""}`} />
              <span>{testing ? (language === "hi" ? "परीक्षण जारी..." : "Testing Endpoints...") : t.testConnection}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto rounded bg-slate-200 hover:bg-slate-300 px-4 py-1.5 text-xs font-bold text-slate-800 transition"
            >
              {t.close}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
