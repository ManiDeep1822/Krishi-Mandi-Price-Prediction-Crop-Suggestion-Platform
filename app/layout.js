import "./globals.css";

export const metadata = {
  title: "कृषि मंडी पोर्टल | Krishi Mandi Enterprise Portal - Government of India | Data.gov.in",
  description: "Official National Agricultural Market Intelligence Portal. Providing real-time Agmarknet APMC mandi prices, predictive commodity price analytics, logistics arbitrage, and ICAR agronomic harvest advisory.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    apple: "/favicon.svg"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[#f4f6fa] text-slate-900 antialiased font-sans selection:bg-[#214aab] selection:text-white">
        {children}
      </body>
    </html>
  );
}
