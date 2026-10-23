import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(val) {
  if (val === null || val === undefined || isNaN(val)) return "0";
  return new Intl.NumberFormat("en-IN").format(val);
}

/**
 * Calculate distance between two lat/lng coordinates in kilometers using Haversine formula
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 25; // default fallback
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Estimate freight transportation cost per quintal based on distance
 * Base rate: ₹40 loading/APMC cess + ₹1.85 per km per quintal for medium commercial vehicle (Tata Ace / Pickup)
 */
export function calculateFreightPerQuintal(distanceKm) {
  const baseHandling = 40;
  const perKmRate = 1.85;
  return Math.round(baseHandling + distanceKm * perKmRate);
}
