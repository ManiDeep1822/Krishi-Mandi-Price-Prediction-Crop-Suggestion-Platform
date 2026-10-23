import { NextResponse } from "next/server";
import { DISTRICT_MAP } from "@/lib/geoData";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get("state") || "Maharashtra";
    const district = searchParams.get("district") || "Nashik";

    // Lookup coordinates
    const districtsList = DISTRICT_MAP[state] || DISTRICT_MAP["Maharashtra"];
    const foundDistrict = districtsList.find(d => d.name.toLowerCase() === district.toLowerCase()) || districtsList[0];

    const lat = foundDistrict.lat || 19.9975;
    const lng = foundDistrict.lng || 73.7898;

    // Call live Open-Meteo Agricultural API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const res = await fetch(weatherUrl, {
      next: { revalidate: 600 } // cache 10 mins
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const hourly = data.hourly || {};
    const daily = data.daily || {};

    // Calculate average root-zone soil moisture (m³/m³)
    const soilMoistureArray = hourly.soil_moisture_0_to_1cm || [];
    const latestMoisture = soilMoistureArray.length > 0 ? soilMoistureArray[soilMoistureArray.length - 1] : 0.28;
    const soilMoisturePercent = Math.round(latestMoisture * 100);

    return NextResponse.json({
      success: true,
      location: {
        state,
        district: foundDistrict.name,
        lat,
        lng,
      },
      current: {
        temperature: current.temperature_2m || 28,
        humidity: current.relative_humidity_2m || 55,
        precipitationMm: current.precipitation || 0,
        windSpeedKmh: current.wind_speed_10m || 12,
        weatherCode: current.weather_code || 0,
      },
      agronomic: {
        soilMoisturePercentage: soilMoisturePercent,
        soilStatus: soilMoisturePercent > 40 ? "Adequate Moisture" : soilMoisturePercent > 20 ? "Moderate Moisture" : "Dry / Irrigation Advised",
        tempRangeDaily: {
          min: daily.temperature_2m_min ? daily.temperature_2m_min[0] : 18,
          max: daily.temperature_2m_max ? daily.temperature_2m_max[0] : 32,
        }
      },
      source: "Open-Meteo Real-Time Agricultural Meterology API"
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message || "Failed to fetch live agricultural weather",
      fallback: {
        temperature: 28.5,
        humidity: 58,
        precipitationMm: 0,
        soilMoisturePercentage: 32,
        soilStatus: "Moderate Moisture"
      }
    });
  }
}
