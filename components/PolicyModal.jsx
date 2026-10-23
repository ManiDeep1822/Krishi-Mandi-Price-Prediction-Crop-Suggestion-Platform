"use client";

import React, { useState } from "react";
import {
  X,
  Shield,
  FileText,
  Lock,
  Link2,
  AlertTriangle,
  Eye,
  Printer,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export const POLICY_DATA = {
  privacy: {
    titleEn: "Website Privacy Policy",
    titleHi: "वेबसाइट गोपनीयता नीति",
    category: "Statutory GIGW 3.0 Compliance",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Data Collection & Citizen Confidentiality",
        content: "This portal does not automatically capture any specific personal information from you (like name, phone number, or e-mail address) that allows us to identify you individually, unless you choose to provide such information (e.g. generating an APMC Mandi Gate Pass)."
      },
      {
        heading: "2. DPDP Act 2023 Conformance",
        content: "In compliance with the Digital Personal Data Protection Act (DPDP Act, 2023), any information provided by farmers—such as acreage, commodity type, or contact details—is utilized exclusively for agricultural analytics, advisory generation, and market yard queuing. It is never sold, leased, or shared with third-party commercial entities."
      },
      {
        heading: "3. Server-Side Secure Storage (.env.local)",
        content: "All sensitive administrative credentials and API access tokens are stored strictly within server-side environment variables (.env.local). No private keys or authentication tokens are ever persisted into browser localStorage or sessionStorage."
      },
      {
        heading: "4. Cookies & Session Management",
        content: "This portal uses only essential functional session cookies required for user interface accessibility settings (such as text size and high contrast toggles) and bilingual language preferences. No tracking or third-party profiling cookies are deployed."
      }
    ],
    sectionsHi: [
      {
        heading: "1. डेटा संकलन एवं नागरिक गोपनीयता",
        content: "यह पोर्टल आपकी कोई भी विशिष्ट व्यक्तिगत जानकारी (जैसे नाम, फोन नंबर या ई-मेल) स्वचालित रूप से एकत्र नहीं करता है, जब तक कि आप स्वयं ऐसी जानकारी प्रदान न करें (जैसे कि एपीएमसी मंडी गेट पास जारी करते समय)।"
      },
      {
        heading: "2. डीपीडीपी अधिनियम 2023 अनुपालन",
        content: "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP Act 2023) के तहत किसानों द्वारा दर्ज की गई जानकारी (जैसे जोत का आकार, फसल या मोबाइल नंबर) का उपयोग केवल कृषि परामर्श एवं मंडी यार्ड व्यवस्था हेतु किया जाता है। इसे किसी वाणिज्यिक संस्था के साथ साझा नहीं किया जाता।"
      },
      {
        heading: "3. सर्वर-साइड सुरक्षित भंडारण (.env.local)",
        content: "सभी संवेदनशील एपीआई कुंजियां और क्रेडेंशियल्स केवल सर्वर के .env.local में सुरक्षित रखे जाते हैं। ब्राउज़र लोकल स्टोरेज में कोई भी निजी कुंजी संग्रहीत नहीं की जाती।"
      },
      {
        heading: "4. कुकीज़ एवं सत्र प्रबंधन",
        content: "यह पोर्टल केवल भाषा चयन एवं सुलभता (अक्षर आकार व उच्च कंट्रास्ट) हेतु आवश्यक न्यूनतम सत्र कुकीज़ का उपयोग करता है। कोई ट्रैकिंग या तृतीय-पक्ष विज्ञापन कुकी तैनात नहीं की जाती।"
      }
    ]
  },
  terms: {
    titleEn: "Terms of Use & Legal Conditions",
    titleHi: "उपयोग के नियम एवं कानूनी शर्तें",
    category: "Portal Governance & Fair Use",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Acceptance of Terms",
        content: "By accessing and utilizing the Krishi Mandi Price Prediction & Crop Suggestion Platform, you agree to be bound by the terms and conditions outlined herein. If you do not accept these terms, please refrain from using the platform."
      },
      {
        heading: "2. Permitted Use of Market Intelligence",
        content: "The agricultural price data, historical trends, and ICAR advisory models provided on this portal are published for educational, informational, and farm-planning purposes. Farmers, FPOs, and traders may freely download CSV market bulletins and print APMC gate passes for non-commercial operational use."
      },
      {
        heading: "3. Integrity of Digital Gate Passes",
        content: "The generated APMC Mandi Yard Gate Pass (विक्रय पर्ची) constitutes an electronic facilitation receipt for queue management at APMC gates. Physical weighing, visual inspection, moisture verification (<12.0% FAQ grade), and final auction settlements remain subject to respective State APMC Act regulations."
      }
    ],
    sectionsHi: [
      {
        heading: "1. नियमों की स्वीकृति",
        content: "इस कृषि मंडी पोर्टल का उपयोग करके आप इन नियमों और शर्तों से बंधे रहने की सहमति प्रदान करते हैं।"
      },
      {
        heading: "2. मंडी आंकड़ों का अनुमेय उपयोग",
        content: "इस पोर्टल पर उपलब्ध कृषि भाव, ऐतिहासिक रुझान और वैज्ञानिक परामर्श किसानों और कृषक उत्पादक संगठनों (FPO) के लिए निःशुल्क उपलब्ध कराए गए हैं।"
      },
      {
        heading: "3. इलेक्ट्रॉनिक गेट पास की वैधानिकता",
        content: "उत्पन्न विक्रय पर्ची मंडी यार्ड में प्रवेश और तौल सुविधा हेतु इलेक्ट्रॉनिक टोकन है। अंतिम नीलामी और भुगतान राज्य एपीएमसी मंडी अधिनियम के नियमों के अधीन होगा।"
      }
    ]
  },
  hyperlink: {
    titleEn: "Hyperlinking Policy",
    titleHi: "हाइपरलिंकिंग नीति",
    category: "GIGW 3.0 External Navigation",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Links to Krishi Mandi Platform",
        content: "Prior permission is not required to link directly to this platform from reputable government portals, agricultural universities, or research institutes. However, linking pages must not present this portal within frames on external domains."
      },
      {
        heading: "2. External Government Links",
        content: "This portal provides external links to authorized government web portals (including Data.gov.in, Agmarknet.gov.in, e-NAM, and ICAR). The Krishi Mandi Platform cannot guarantee the continuous availability of such linked pages nor is it responsible for external portal privacy practices."
      }
    ],
    sectionsHi: [
      {
        heading: "1. इस पोर्टल के लिए लिंक",
        content: "सरकारी विभागों एवं कृषि संस्थानों द्वारा इस पोर्टल से सीधे लिंक स्थापित करने हेतु पूर्व अनुमति की आवश्यकता नहीं है, बशर्ते इसे किसी बाहरी फ्रेम में न दिखाया जाए।"
      },
      {
        heading: "2. बाहरी सरकारी लिंक",
        content: "यह पोर्टल केवल आधिकारिक सरकारी पोर्टलों (Data.gov.in, e-NAM, Agmarknet) के लिए लिंक प्रदान करता है।"
      }
    ]
  },
  copyright: {
    titleEn: "Copyright & Open Data Policy",
    titleHi: "कॉपीराइट एवं ओपन डेटा नीति",
    category: "Intellectual Property & OGD",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Ownership & Open Government License",
        content: "Material featured on this portal is published under Open Government Data (OGD) principles. Content may be reproduced free of charge in any format or media without requiring specific permission, provided the material is reproduced accurately and not used in a misleading context."
      },
      {
        heading: "2. Attribution Requirement",
        content: "Whenever material or data from this portal is cited or published, the source must be explicitly acknowledged as 'Krishi Mandi Price Prediction & Crop Suggestion Platform, Government of India'."
      }
    ],
    sectionsHi: [
      {
        heading: "1. स्वामित्व एवं ओपन लाइसेंस",
        content: "इस पोर्टल की सामग्री ओपन गवर्नमेंट डेटा सिद्धांतों के तहत उपलब्ध कराई गई है। सामग्री को बिना किसी शुल्क के पुनः प्रस्तुत किया जा सकता है, बशर्ते स्रोत का सही उल्लेख किया जाए।"
      },
      {
        heading: "2. स्रोत आभार",
        content: "सामग्री का उपयोग करते समय स्रोत के रूप में 'कृषि मंडी भाव पूर्वानुमान एवं फसल सुझाव मंच, भारत सरकार' का स्पष्ट उल्लेख अनिवार्य है।"
      }
    ]
  },
  disclaimer: {
    titleEn: "Disclaimer & Limitation of Liability",
    titleHi: "अस्वीकरण एवं दायित्व सीमा",
    category: "Statutory Legal Notice",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Accuracy of Mandi Price Records",
        content: "While all reasonable efforts have been made to ensure the accuracy and timeliness of APMC mandi rates via daily Agmarknet feeds, wholesale agricultural prices fluctuate dynamically based on intraday market arrivals, moisture quality, and trader bidding."
      },
      {
        heading: "2. Advisory Nature of Predictive AI Models",
        content: "Price trend predictions and selling window advisories generated by the Gemini AI and ICAR agronomic models are indicative decision-support tools. Farmers are advised to exercise independent commercial judgment and consult local APMC committee market supervisors before executing large-scale transactions."
      }
    ],
    sectionsHi: [
      {
        heading: "1. मंडी भाव की सटीकता",
        content: "यद्यपि एगमार्कनेट दैनिक बुलेटिन से प्राप्त आंकड़ों की सटीकता सुनिश्चित करने का हर संभव प्रयास किया गया है, तथापि थोक मंडी भाव दैनिक आवक, माल की गुणवत्ता और व्यापारी बोली के आधार पर बदल सकते हैं।"
      },
      {
        heading: "2. एआई पूर्वानुमान की सलाहकारी प्रकृति",
        content: "जेमिनी एआई और आईसीएआर मॉडल द्वारा दिए गए मूल्य पूर्वानुमान निर्णय-सहायता के लिए हैं। किसानों को सलाह दी जाती है कि वे अंतिम बिक्री निर्णय से पूर्व स्थानीय मंडी अधिकारियों से भी परामर्श करें।"
      }
    ]
  },
  accessibility: {
    titleEn: "Accessibility Statement (GIGW 3.0)",
    titleHi: "सुलभता वक्तव्य (GIGW 3.0)",
    category: "Universal Web Access",
    date: "23 October 2026",
    sectionsEn: [
      {
        heading: "1. Conformance to WCAG 2.1 Level AA",
        content: "We are committed to ensuring that the Krishi Mandi Enterprise Portal is accessible to all users regardless of disability, device, or technical proficiency. The portal conforms to the Guidelines for Indian Government Websites (GIGW 3.0) and World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA."
      },
      {
        heading: "2. Assistive Technology Support",
        content: "This portal includes an accessible 'Skip to Main Content' keyboard mechanism, dynamic text resizing tools (A-, A, A+), high-contrast viewing modes, and standardized semantic HTML markup paired with explicit form label associations for screen readers."
      }
    ],
    sectionsHi: [
      {
        heading: "1. सुलभता मानक (WCAG 2.1 Level AA)",
        content: "हम यह सुनिश्चित करने के लिए प्रतिबद्ध हैं कि यह कृषि मंडी पोर्टल दिव्यांगजन सहित सभी नागरिकों के लिए सुलभ हो। पोर्टल भारत सरकार की वेबसाइटों हेतु दिशानिर्देश (GIGW 3.0) के अनुरूप है।"
      },
      {
        heading: "2. सहायक तकनीक समर्थन",
        content: "पोर्टल में कीबोर्ड उपयोगकर्ताओं हेतु 'मुख्य सामग्री पर जाएं' लिंक, अक्षर आकार समायोजन (A-, A, A+), उच्च कंट्रास्ट मोड और स्क्रीन रीडर्स हेतु सुगम मार्कअप शामिल है।"
      }
    ]
  }
};

export default function PolicyModal({
  isOpen,
  onClose,
  policyKey = "privacy",
  language = "en"
}) {
  if (!isOpen) return null;

  const currentPolicy = POLICY_DATA[policyKey] || POLICY_DATA.privacy;
  const isHindi = language === "hi";
  const title = isHindi ? currentPolicy.titleHi : currentPolicy.titleEn;
  const sections = isHindi ? currentPolicy.sectionsHi : currentPolicy.sectionsEn;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded border border-slate-300 bg-white text-slate-900 shadow-2xl my-8 overflow-hidden print:m-0 print:border-none print:shadow-none">
        
        {/* Tricolor top strip */}
        <div className="gov-tricolor-bar" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#162f6a] text-white px-5 py-3.5 print:hidden">
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-[#ff9933]" />
            <div>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider">
                {title}
              </h3>
              <p className="text-[11px] text-slate-200">
                {isHindi ? "सांविधिक जीआईजीडब्ल्यू 3.0 अनुपालन • भारत सरकार" : `${currentPolicy.category} • Government of India`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-200 hover:bg-[#214aab] hover:text-white transition"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs print:p-0 print:max-h-none">
          
          {/* Document Header in Print/Read view */}
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                {isHindi ? "आधिकारिक सरकारी नीति दस्तावेज" : "Official Government Policy Document"}
              </span>
              <h4 className="text-base font-black text-[#162f6a] mt-0.5">
                {title}
              </h4>
            </div>
            <div className="text-right text-[11px] text-slate-500 tabular-nums">
              <div>{isHindi ? "प्रभावी तिथि: २३ अक्टूबर २०२६" : `Effective: ${currentPolicy.date}`}</div>
              <div className="text-emerald-700 font-bold">
                {isHindi ? "स्थिति: सक्रिय एवं लागू" : "Status: Active & Enforced"}
              </div>
            </div>
          </div>

          {/* Policy Text Sections */}
          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div key={idx} className="space-y-1.5 bg-slate-50 p-3.5 rounded border border-slate-200">
                <h5 className="font-bold text-[#162f6a] text-xs">
                  {sec.heading}
                </h5>
                <p className="text-slate-700 leading-relaxed text-[11.5px]">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Statutory Footer Stamp */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>{isHindi ? "जीआईजीडब्ल्यू 3.0 सत्यापित • राष्ट्रीय सूचना विज्ञान केंद्र (NIC)" : "GIGW 3.0 Verified • National Informatics Centre (NIC)"}</span>
            </div>
            <span>{isHindi ? "कृषि एवं किसान कल्याण मंत्रालय" : "Ministry of Agriculture & Farmers Welfare"}</span>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded bg-[#162f6a] hover:bg-[#214aab] text-white px-4 py-2 text-xs font-bold transition shadow-xs uppercase tracking-wider"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>{isHindi ? "दस्तावेज प्रिंट करें" : "Print Policy Document"}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto rounded bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 text-xs font-bold transition"
          >
            {isHindi ? "बंद करें" : "Close"}
          </button>
        </div>

      </div>
    </div>
  );
}
