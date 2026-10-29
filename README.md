# 🌾 Krishi Mandi Price Prediction & Crop Suggestion Platform

> **National APMC Agricultural Market Intelligence & Predictive Decision Support System**  
> Built in compliance with **GIGW 3.0 (Guidelines for Indian Government Websites)** and standard GovTech design principles.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FManiDeep1822%2FKrishi-Mandi-Price-Prediction-Crop-Suggestion-Platform)

---

## 🏛️ Project Overview

The **Krishi Mandi Price Prediction & Crop Suggestion Platform** empowers farmers, agricultural cooperatives, and APMC traders across India with:
1. **Live APMC Mandi Rates:** Real-time commodity arrivals, modal prices, and daily spreads sourced directly from the Government of India Open Government Data (OGD) platform (Agmarknet).
2. **Predictive Price Analytics:** 4-week forward price corridor projections, volatility forecasting, and seasonal trend indicators.
3. **ICAR & Gemini AI Advisory:** Farm-level crop suggestions, soil compatibility evaluations, and optimal harvest/selling period advisories powered by Google Gemini and ICAR agronomic models.
4. **Nearby Markets & Net Realized Profit:** Distance-based freight calculations and net revenue comparisons across 30+ regional mandis.
5. **Statutory APMC Gate Entry Pass:** Single-page A4 printable pass slips with dual verification — a **100% scannable 2D QR Code** and an authentic **APMC Violet Rubber Ink Seal**.
6. **GovTech Institutional Design:** Bilingual interface (English & हिन्दी), GIGW 3.0 accessibility font scaling (`A-`, `A`, `A+`), screen reader skip links, and secure rate-limited APIs.

---

## 🚀 Live Deployment on Vercel

### Step 1: Import Repository
1. Navigate to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** → **"Project"**.
3. Select your repository: `ManiDeep1822/Krishi-Mandi-Price-Prediction-Crop-Suggestion-Platform`.

### Step 2: Configure Environment Variables
Add the following environment variables in the Vercel project configuration:

| Variable Name | Description | Example / Source |
|---|---|---|
| `DATA_GOV_IN_API_KEY` | Government of India Open Data Platform API Key | [data.gov.in](https://data.gov.in/) |
| `GEMINI_API_KEY` | Google Gemini AI Key for generative advisory | [Google AI Studio](https://aistudio.google.com/) |
| `ADMIN_SECRET_KEY` | Administrative secret key for system settings | `krishi-admin-2026` |

> *Note: If environment variables are not supplied initially, the platform will automatically operate in high-fidelity offline mode using verified ICAR benchmarks.*

### Step 3: Deploy
Click **Deploy**. Next.js 14 App Router builds automatically with zero configuration.

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm or yarn or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/ManiDeep1822/Krishi-Mandi-Price-Prediction-Crop-Suggestion-Platform.git
cd Krishi-Mandi-Price-Prediction-Crop-Suggestion-Platform

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Architecture

```
├── app/
│   ├── api/
│   │   ├── advisory/     # Gemini AI & ICAR agronomic recommendation endpoint
│   │   ├── config/       # Administrative API key management (authenticated)
│   │   ├── mandi/        # Live Agmarknet APMC feed endpoint
│   │   ├── nearby/       # Geospatial distance & freight calculation endpoint
│   │   ├── trends/       # Historical volatility & price corridor forecast
│   │   └── weather/      # Meteorological agro-climatic feed
│   ├── globals.css       # GovTech styling, GIGW 3.0, and A4 print isolation rules
│   ├── icon.svg          # Golden wheat & green sprout vector favicon
│   ├── layout.js         # Root layout with metadata and accessibility
│   └── page.js           # Main APMC intelligence dashboard
├── components/
│   ├── AIAdvisorySection.jsx   # AI harvesting & crop recommendation card
│   ├── ApiKeyModal.jsx         # Administrative credential management modal
│   ├── FarmProfileForm.jsx     # Farmer crop & land registry input card
│   ├── FarmSummaryHUD.jsx      # Agricultural weather & market status card
│   ├── Footer.jsx              # Clean institutional GovTech footer
│   ├── GatePassModal.jsx       # Single-page official entry slip with dual stamp
│   ├── Header.jsx              # Government of India navigation bar & language toggle
│   ├── LiveMandiWatch.jsx      # Real-time APMC wholesale price ledger
│   ├── NearbyMarketsMap.jsx    # Regional mandis & net realized profit calculator
│   └── PriceTrendsChart.jsx    # Recharts price corridor & MSP benchmark chart
├── lib/
│   ├── geoData.js        # State, district, crop & soil database
│   ├── rateLimit.js      # Sliding-window IP rate limiting & security
│   └── utils.js          # Currency, weight & date formatting utilities
└── public/
    └── favicon.svg       # Agricultural vector SVG favicon
```

---

## 🔒 Security & Privacy

- **Never Commit Secrets:** `.env*.local` is strictly ignored in `.gitignore`.
- **Admin Passcode Protection:** `/api/config` updates require `ADMIN_SECRET_KEY` verification.
- **Header & Injection Hardening:** Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and CRLF injection defenses are enforced.
- **Sliding-Window Rate Limiting:** In-memory sliding window protects live endpoints against automated scraping and abuse.

---

## 📜 License & Ownership

- **Website Content:** Managed & Owned by Krishi Mandi Price Prediction & Crop Suggestion Platform Team.
- **Design & Development:** Krishi Mandi Platform Technical Development & AI Cell.
- **Open Source:** MIT License
