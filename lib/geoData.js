export const INDIAN_STATES = [
  { id: "Maharashtra", name: "Maharashtra", nameHi: "महाराष्ट्र" },
  { id: "Madhya Pradesh", name: "Madhya Pradesh", nameHi: "मध्य प्रदेश" },
  { id: "Punjab", name: "Punjab", nameHi: "पंजाब" },
  { id: "Uttar Pradesh", name: "Uttar Pradesh", nameHi: "उत्तर प्रदेश" },
  { id: "Haryana", name: "Haryana", nameHi: "हरियाणा" },
  { id: "Gujarat", name: "Gujarat", nameHi: "गुजरात" },
  { id: "Rajasthan", name: "Rajasthan", nameHi: "राजस्थान" },
  { id: "Karnataka", name: "Karnataka", nameHi: "कर्नाटक" },
  { id: "Andhra Pradesh", name: "Andhra Pradesh", nameHi: "आंध्र प्रदेश" },
  { id: "Telangana", name: "Telangana", nameHi: "तेलंगाना" },
  { id: "Tamil Nadu", name: "Tamil Nadu", nameHi: "तमिलनाडु" },
  { id: "Bihar", name: "Bihar", nameHi: "बिहार" },
  { id: "West Bengal", name: "West Bengal", nameHi: "पश्चिम बंगाल" },
];

export const DISTRICT_MAP = {
  "Maharashtra": [
    { name: "Nashik", nameHi: "नासिक", lat: 19.9975, lng: 73.7898 },
    { name: "Pune", nameHi: "पुणे", lat: 18.5204, lng: 73.8567 },
    { name: "Nagpur", nameHi: "नागपुर", lat: 21.1458, lng: 79.0882 },
    { name: "Ahmednagar", nameHi: "अहमदनगर", lat: 19.0952, lng: 74.7496 },
    { name: "Aurangabad", nameHi: "औरंगाबाद (छ. संभाजीनगर)", lat: 19.8762, lng: 75.3433 },
    { name: "Solapur", nameHi: "सोलापूर", lat: 17.6599, lng: 75.9064 },
    { name: "Amravati", nameHi: "अमरावती", lat: 20.9374, lng: 77.7796 },
    { name: "Jalgaon", nameHi: "जलगांव", lat: 21.0077, lng: 75.5626 },
  ],
  "Madhya Pradesh": [
    { name: "Indore", nameHi: "इंदौर", lat: 22.7196, lng: 75.8577 },
    { name: "Ujjain", nameHi: "उज्जैन", lat: 23.1765, lng: 75.7885 },
    { name: "Bhopal", nameHi: "भोपाल", lat: 23.2599, lng: 77.4126 },
    { name: "Dewas", nameHi: "देवास", lat: 22.9676, lng: 76.0534 },
    { name: "Mandsaur", nameHi: "मंदसौर", lat: 24.0722, lng: 75.0684 },
    { name: "Sehore", nameHi: "सीहोर", lat: 23.2031, lng: 77.0844 },
    { name: "Hoshangabad", nameHi: "नर्मदापुरम (होशंगाबाद)", lat: 22.7519, lng: 77.7289 },
  ],
  "Punjab": [
    { name: "Ludhiana", nameHi: "लुधियाना", lat: 30.9010, lng: 75.8573 },
    { name: "Amritsar", nameHi: "अमृतसर", lat: 31.6340, lng: 74.8723 },
    { name: "Bhatinda", nameHi: "बठिंडा", lat: 30.2110, lng: 74.9455 },
    { name: "Patiala", nameHi: "पटियाला", lat: 30.3398, lng: 76.3869 },
    { name: "Jalandhar", nameHi: "जालंधर", lat: 31.3260, lng: 75.5762 },
    { name: "Sangrur", nameHi: "संगरूर", lat: 30.2458, lng: 75.8421 },
  ],
  "Uttar Pradesh": [
    { name: "Agra", nameHi: "आगरा", lat: 27.1767, lng: 78.0081 },
    { name: "Kanpur", nameHi: "कानपुर", lat: 26.4499, lng: 80.3319 },
    { name: "Varanasi", nameHi: "वाराणसी", lat: 25.3176, lng: 82.9739 },
    { name: "Aligarh", nameHi: "अलीगढ़", lat: 27.8974, lng: 78.0880 },
    { name: "Bareilly", nameHi: "बरेली", lat: 28.3670, lng: 79.4304 },
    { name: "Meerut", nameHi: "मेरठ", lat: 28.9845, lng: 77.7064 },
  ],
  "Haryana": [
    { name: "Karnal", nameHi: "करनाल", lat: 29.6857, lng: 76.9905 },
    { name: "Hisar", nameHi: "हिसार", lat: 29.1492, lng: 75.7217 },
    { name: "Sirsa", nameHi: "सिरसा", lat: 29.5321, lng: 75.0318 },
    { name: "Kurukshetra", nameHi: "कुरुक्षेत्र", lat: 29.9695, lng: 76.8783 },
    { name: "Rohtak", nameHi: "रोहतक", lat: 28.8955, lng: 76.6066 },
  ],
  "Gujarat": [
    { name: "Rajkot", nameHi: "राजकोट", lat: 22.3039, lng: 70.8022 },
    { name: "Surat", nameHi: "सूरत", lat: 21.1702, lng: 72.8311 },
    { name: "Ahmedabad", nameHi: "अहमदाबाद", lat: 23.0225, lng: 72.5714 },
    { name: "Junagadh", nameHi: "जूनागढ़", lat: 21.5222, lng: 70.4579 },
    { name: "Amreli", nameHi: "अमरेली", lat: 21.6032, lng: 71.2221 },
  ],
  "Rajasthan": [
    { name: "Kota", nameHi: "कोटा", lat: 25.2138, lng: 75.8648 },
    { name: "Jaipur", nameHi: "जयपुर", lat: 26.9124, lng: 75.7873 },
    { name: "Sri Ganganagar", nameHi: "श्रीगंगानगर", lat: 29.9038, lng: 73.8772 },
    { name: "Bikaner", nameHi: "बीकानेर", lat: 28.0229, lng: 73.3119 },
    { name: "Jodhpur", nameHi: "जोधपुर", lat: 26.2389, lng: 73.0243 },
  ],
  "Karnataka": [
    { name: "Belgaum", nameHi: "बेलगाम (बेलगावी)", lat: 15.8497, lng: 74.4977 },
    { name: "Dharwad", nameHi: "धारवाड़", lat: 15.4589, lng: 75.0078 },
    { name: "Shimoga", nameHi: "शिमोगा", lat: 13.9299, lng: 75.5681 },
    { name: "Bellary", nameHi: "बेल्लारी", lat: 15.1394, lng: 76.9214 },
    { name: "Mysore", nameHi: "मैसूर", lat: 12.2958, lng: 76.6394 },
  ],
  "Andhra Pradesh": [
    { name: "Guntur", nameHi: "गुंटूर", lat: 16.3067, lng: 80.4365 },
    { name: "Kurnool", nameHi: "कर्नूल", lat: 15.8281, lng: 78.0373 },
    { name: "Krishna", nameHi: "कृष्णा", lat: 16.1809, lng: 81.1303 },
    { name: "Anantapur", nameHi: "अनंतपुर", lat: 14.6819, lng: 77.6006 },
  ],
  "Telangana": [
    { name: "Warangal", nameHi: "वारंगल", lat: 17.9689, lng: 79.5941 },
    { name: "Nizamabad", nameHi: "निजामाबाद", lat: 18.6725, lng: 78.0941 },
    { name: "Karimnagar", nameHi: "करीमनगर", lat: 18.4386, lng: 79.1288 },
    { name: "Khammam", nameHi: "खम्मम", lat: 17.2473, lng: 80.1514 },
  ],
  "Tamil Nadu": [
    { name: "Coimbatore", nameHi: "कोयंबटूर", lat: 11.0168, lng: 76.9558 },
    { name: "Madurai", nameHi: "मदुरै", lat: 9.9252, lng: 78.1198 },
    { name: "Erode", nameHi: "इरोड", lat: 11.3410, lng: 77.7172 },
    { name: "Salem", nameHi: "सलेम", lat: 11.6643, lng: 78.1460 },
  ],
  "Bihar": [
    { name: "Patna", nameHi: "पटना", lat: 25.5941, lng: 85.1376 },
    { name: "Muzaffarpur", nameHi: "मुजफ्फरपुर", lat: 26.1209, lng: 85.3647 },
    { name: "Gaya", nameHi: "गया", lat: 24.7914, lng: 85.0002 },
    { name: "Bhagalpur", nameHi: "भागलपुर", lat: 25.2425, lng: 86.9842 },
  ],
  "West Bengal": [
    { name: "Burdwan", nameHi: "बर्दवान", lat: 23.2324, lng: 87.8615 },
    { name: "Hooghly", nameHi: "हुगली", lat: 22.9038, lng: 88.3968 },
    { name: "Nadia", nameHi: "नादिया", lat: 23.4710, lng: 88.5565 },
    { name: "Murshidabad", nameHi: "मुर्शिदाबाद", lat: 24.1759, lng: 88.2802 },
  ]
};

export const CROPS_CATALOG = [
  { id: "Wheat", name: "Wheat", nameHi: "गेहूं", category: "Cereals", baseMsp: 2275, season: ["Rabi"] },
  { id: "Paddy(Dhan)", name: "Paddy (Rice)", nameHi: "धान / चावल", category: "Cereals", baseMsp: 2300, season: ["Kharif"] },
  { id: "Cotton", name: "Cotton (Kapas)", nameHi: "कपास", category: "Fiber", baseMsp: 7122, season: ["Kharif"] },
  { id: "Soyabean", name: "Soybean", nameHi: "सोयाबीन", category: "Oilseeds", baseMsp: 4892, season: ["Kharif"] },
  { id: "Mustard", name: "Mustard (Sarson)", nameHi: "सरसों", category: "Oilseeds", baseMsp: 5650, season: ["Rabi"] },
  { id: "Onion", name: "Onion", nameHi: "प्याज", category: "Horticulture", baseMsp: 1800, season: ["Rabi", "Kharif"] },
  { id: "Tomato", name: "Tomato", nameHi: "टमाटर", category: "Horticulture", baseMsp: 1500, season: ["Kharif", "Rabi", "Zaid"] },
  { id: "Potato", name: "Potato", nameHi: "आलू", category: "Horticulture", baseMsp: 1200, season: ["Rabi"] },
  { id: "Gram", name: "Chana (Bengal Gram)", nameHi: "चना", category: "Pulses", baseMsp: 5440, season: ["Rabi"] },
  { id: "Arhar (Tur)", name: "Tur (Pigeon Pea)", nameHi: "अरहर / तुअर", category: "Pulses", baseMsp: 7550, season: ["Kharif"] },
  { id: "Maize", name: "Maize (Corn)", nameHi: "मक्का", category: "Cereals", baseMsp: 2090, season: ["Kharif", "Rabi"] },
  { id: "Groundnut", name: "Groundnut (Peanut)", nameHi: "मूंगफली", category: "Oilseeds", baseMsp: 6783, season: ["Kharif"] },
  { id: "Garlic", name: "Garlic", nameHi: "लहसुन", category: "Spices", baseMsp: 6500, season: ["Rabi"] },
  { id: "Chilli Red", name: "Red Chilli", nameHi: "लाल मिर्च", category: "Spices", baseMsp: 9500, season: ["Kharif", "Rabi"] },
  { id: "Sugarcane", name: "Sugarcane", nameHi: "गन्ना", category: "Commercial", baseMsp: 340, season: ["Kharif", "Rabi"] },
  { id: "Moong(Green Gram)", name: "Moong (Green Gram)", nameHi: "मूंग", category: "Pulses", baseMsp: 8558, season: ["Kharif", "Zaid"] },
  { id: "Bajra(Pearl Millet)", name: "Bajra (Pearl Millet)", nameHi: "बाजरा", category: "Millets", baseMsp: 2625, season: ["Kharif"] },
  { id: "Jowar(Sorghum)", name: "Jowar (Sorghum)", nameHi: "ज्वार", category: "Millets", baseMsp: 3371, season: ["Kharif", "Rabi"] }
];

export const SOIL_TYPES = [
  { id: "Alluvial", name: "Alluvial Soil (Gangetic/Riverine)", nameHi: "जलोढ़ मिट्टी (उपजाऊ)", ph: "6.5 - 7.8", suitability: ["Wheat", "Paddy(Dhan)", "Sugarcane", "Mustard", "Maize"] },
  { id: "Black (Regur)", name: "Black Cotton Soil (Regur)", nameHi: "काली मिट्टी (रेगुर)", ph: "7.2 - 8.5", suitability: ["Cotton", "Soyabean", "Gram", "Wheat", "Jowar(Sorghum)"] },
  { id: "Red and Yellow", name: "Red and Yellow Soil", nameHi: "लाल व पीली मिट्टी", ph: "5.5 - 6.5", suitability: ["Groundnut", "Paddy(Dhan)", "Moong(Green Gram)", "Potato", "Tomato"] },
  { id: "Laterite", name: "Laterite Soil", nameHi: "लेटराइट मिट्टी", ph: "4.5 - 5.8", suitability: ["Sugarcane", "Groundnut", "Maize", "Chilli Red"] },
  { id: "Clayey Loam", name: "Clayey Loam Soil", nameHi: "दोमट व चिकनी मिट्टी", ph: "6.0 - 7.5", suitability: ["Wheat", "Gram", "Mustard", "Onion", "Garlic"] },
  { id: "Sandy Loam", name: "Sandy Loam Soil", nameHi: "बलुई दोमट मिट्टी", ph: "6.2 - 7.2", suitability: ["Potato", "Onion", "Tomato", "Bajra(Pearl Millet)", "Mustard"] },
];

export const SEASONS = [
  { id: "Kharif", name: "Kharif (Monsoon: Jun - Oct)", nameHi: "खरीफ (मानसून: जून - अक्टूबर)" },
  { id: "Rabi", name: "Rabi (Winter: Oct - Mar)", nameHi: "रबी (सर्दियों: अक्टूबर - मार्च)" },
  { id: "Zaid", name: "Zaid (Summer: Mar - Jun)", nameHi: "जायद (गर्मी: मार्च - जून)" },
];

export const IRRIGATION_TYPES = [
  { id: "Canal", name: "Canal / Perennial River", nameHi: "नहर / बारहमासी नदी" },
  { id: "Tube Well", name: "Borewell / Tube Well", nameHi: "बोरवेल / नलकूप" },
  { id: "Drip / Sprinkler", name: "Micro-Irrigation (Drip/Sprinkler)", nameHi: "टपक / फव्वारा सिंचाई" },
  { id: "Rainfed", name: "Rainfed / Dryland", nameHi: "वर्षा आधारित (असिंचित)" },
];
