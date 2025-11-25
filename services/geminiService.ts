

import { Coordinates, PredictionResult } from '../types';

// REAL-WORLD CROP DATABASE (Source: ICAR & Min. of Agriculture, GOI)
// Prices updated to MSP 2024-25 or latest Market Rates
export interface CropData {
  name: string;
  hindi: string;
  soilTypes: string[];
  minRain: number;
  maxRain?: number;
  idealPh: number;
  highN: boolean;
  duration: string;
  yield: string;
  price: string;
  note: string;
  imageUrl: string;
}

export const CROP_DATABASE: CropData[] = [
  // --- CEREALS & MILLETS ---
  {
    name: "Rice (Paddy)",
    hindi: "धान (चावल)",
    soilTypes: ["Alluvial Soil", "Clayey", "Loamy Soil"],
    minRain: 1000,
    idealPh: 6.5,
    highN: true,
    duration: "120-150 Days",
    yield: "4-6 tonnes/ha",
    price: "₹2,300 / quintal (MSP)",
    note: "Kharif crop. Requires standing water (5-10cm) during early growth. Best for low-lying areas with heavy clay soils.",
    imageUrl: "https://images.unsplash.com/photo-1536625807663-02f6dc688005?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Wheat",
    hindi: "गेहूँ",
    soilTypes: ["Alluvial Soil", "Loamy Soil", "Black Soil (Regur)"],
    minRain: 400,
    maxRain: 1000,
    idealPh: 7.0,
    highN: true,
    duration: "110-130 Days",
    yield: "3.5-5.5 tonnes/ha",
    price: "₹2,425 / quintal (MSP)",
    note: "Rabi crop. Needs cool winters for tillering and warm spring for ripening. Sowing: Nov 1 - Dec 15.",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Maize (Corn)",
    hindi: "मक्का",
    soilTypes: ["Alluvial Soil", "Red Soil", "Loamy Soil", "Forest / Mountain Soil"],
    minRain: 500,
    idealPh: 6.8,
    highN: true,
    duration: "90-110 Days",
    yield: "6-8 tonnes/ha",
    price: "₹2,225 / quintal (MSP)",
    note: "Grown in both Kharif & Rabi. Highly sensitive to water stagnation. Ensure drainage.",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Barley",
    hindi: "जौ",
    soilTypes: ["Sandy Loam", "Loamy Soil", "Alluvial Soil"],
    minRain: 200,
    maxRain: 400,
    idealPh: 7.5,
    highN: false,
    duration: "100-120 Days",
    yield: "3-4 tonnes/ha",
    price: "₹1,980 / quintal (MSP)",
    note: "More drought and saline tolerant than wheat. Key industrial crop (Malting).",
    imageUrl: "https://images.unsplash.com/photo-1533235377549-30514a7e94e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Bajra (Pearl Millet)",
    hindi: "बाजरा",
    soilTypes: ["Desert / Arid Soil", "Sandy Loam", "Red Soil"],
    minRain: 350,
    maxRain: 750,
    idealPh: 7.5,
    highN: false,
    duration: "70-90 Days",
    yield: "2-3 tonnes/ha",
    price: "₹2,625 / quintal (MSP)",
    note: "Extremely drought hardy. Ideal for Rajasthan/Haryana arid zones. Can tolerate salinity.",
    imageUrl: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Jowar (Sorghum)",
    hindi: "ज्वार",
    soilTypes: ["Black Soil (Regur)", "Red Soil", "Alluvial Soil"],
    minRain: 450,
    maxRain: 1000,
    idealPh: 7.0,
    highN: true,
    duration: "100-120 Days",
    yield: "2-3.5 tonnes/ha",
    price: "₹3,371 / quintal (MSP)",
    note: "Dual purpose (Grain + Fodder). Drought tolerant but needs water at flowering.",
    imageUrl: "https://images.unsplash.com/photo-1668610531631-b0e6e7683935?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Ragi (Finger Millet)",
    hindi: "रागी (मडुआ)",
    soilTypes: ["Red Soil", "Laterite Soil", "Loamy Soil"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 6.0,
    highN: true,
    duration: "100-120 Days",
    yield: "2-3 tonnes/ha",
    price: "₹4,290 / quintal (MSP)",
    note: "Excellent for health conscious markets (Gluten free). Thrives in Karnataka/TN.",
    imageUrl: "https://images.unsplash.com/photo-1648053531388-c8004f2d0119?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Oats",
    hindi: "जई",
    soilTypes: ["Loamy Soil", "Clayey"],
    minRain: 400,
    maxRain: 800,
    idealPh: 6.0,
    highN: true,
    duration: "120-140 Days",
    yield: "3-4 tonnes/ha (Grain)",
    price: "₹2,100 / quintal",
    note: "Mainly Rabi fodder crop, but grain oats gaining popularity for breakfast cereals.",
    imageUrl: "https://images.unsplash.com/photo-1518562189689-98db57a07545?auto=format&fit=crop&w=600&q=80"
  },

  // --- PULSES (LEGUMES) ---
  {
    name: "Chickpea (Chana)",
    hindi: "चना",
    soilTypes: ["Alluvial Soil", "Black Soil (Regur)", "Loamy Soil"],
    minRain: 400,
    maxRain: 800,
    idealPh: 7.0,
    highN: false, 
    duration: "100-120 Days",
    yield: "1.5-2.5 tonnes/ha",
    price: "₹5,650 / quintal (MSP)",
    note: "Major Rabi pulse. Deep root system makes it drought tolerant. Frost at flowering causes flower drop.",
    imageUrl: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Green Gram (Moong)",
    hindi: "मूंग",
    soilTypes: ["Loamy Soil", "Alluvial Soil", "Red Soil"],
    minRain: 600,
    maxRain: 900,
    idealPh: 6.8,
    highN: false,
    duration: "60-70 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹8,682 / quintal (MSP)",
    note: "Short duration (Summer/Zaid). Excellent for restoring soil nitrogen between Wheat and Rice.",
    imageUrl: "https://images.unsplash.com/photo-1624898746200-c97793d5f573?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Black Gram (Urad)",
    hindi: "उड़द",
    soilTypes: ["Black Soil (Regur)", "Alluvial Soil", "Clayey"],
    minRain: 700,
    maxRain: 1000,
    idealPh: 6.5,
    highN: false,
    duration: "90-100 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹7,400 / quintal (MSP)",
    note: "Mainly Kharif crop in North, Rabi in South. Needs heavier soil than Moong.",
    imageUrl: "https://images.unsplash.com/photo-1599579629474-726487920786?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Pigeon Pea (Arhar/Tur)",
    hindi: "अरहर (तुअर)",
    soilTypes: ["Alluvial Soil", "Black Soil (Regur)", "Red Soil"],
    minRain: 600,
    maxRain: 1200,
    idealPh: 7.0,
    highN: false,
    duration: "150-180 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹7,550 / quintal (MSP)",
    note: "Long duration Kharif crop. Very sensitive to waterlogging (Phytophthora blight risk).",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Lentil (Masoor)",
    hindi: "मसूर",
    soilTypes: ["Loamy Soil", "Alluvial Soil", "Black Soil (Regur)"],
    minRain: 300,
    maxRain: 600,
    idealPh: 6.5,
    highN: false,
    duration: "110-130 Days",
    yield: "1.2-1.5 tonnes/ha",
    price: "₹6,700 / quintal (MSP)",
    note: "Rabi crop. Hardy and can grow on poor soils. Nitrogen fixing.",
    imageUrl: "https://images.unsplash.com/photo-1564858902570-5b572236d9c6?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Field Pea (Matar)",
    hindi: "मटर",
    soilTypes: ["Loamy Soil", "Alluvial Soil"],
    minRain: 400,
    maxRain: 700,
    idealPh: 6.5,
    highN: false,
    duration: "90-110 Days",
    yield: "2-2.5 tonnes/ha",
    price: "₹3,800 / quintal",
    note: "Requires cool climate. Sensitive to frost. Green pods harvested earlier for vegetables.",
    imageUrl: "https://images.unsplash.com/photo-1588610191834-31f8d22ce70e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kidney Bean (Rajma)",
    hindi: "राजमा",
    soilTypes: ["Loamy Soil", "Forest / Mountain Soil"],
    minRain: 800,
    maxRain: 1500,
    idealPh: 6.0,
    highN: false,
    duration: "100-120 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹8,500 / quintal",
    note: "Kharif in hills, Rabi in plains. Requires well drained soil. Cannot tolerate waterlogging.",
    imageUrl: "https://images.unsplash.com/photo-1558230588-43940d995c6b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Horse Gram (Kulthi)",
    hindi: "कुलथी",
    soilTypes: ["Red Soil", "Laterite Soil", "Poor Soil"],
    minRain: 200,
    maxRain: 700,
    idealPh: 6.5,
    highN: false,
    duration: "120-150 Days",
    yield: "0.8-1.0 tonnes/ha",
    price: "₹5,200 / quintal",
    note: "Extremely hardy drought crop. Can grow on rocky/poor land where nothing else grows.",
    imageUrl: "https://images.unsplash.com/photo-1628172820575-b9f4e8b8396c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cowpea (Lobia)",
    hindi: "लोबिया",
    soilTypes: ["Sandy Loam", "Red Soil", "Alluvial Soil"],
    minRain: 400,
    maxRain: 800,
    idealPh: 6.5,
    highN: false,
    duration: "80-110 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹5,800 / quintal",
    note: "Multipurpose (Veg + Grain + Fodder). Tolerates shade (good for intercropping).",
    imageUrl: "https://images.unsplash.com/photo-1595906756816-778736b4142d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Moth Bean",
    hindi: "मोठ",
    soilTypes: ["Desert / Arid Soil", "Sandy Loam"],
    minRain: 250,
    maxRain: 500,
    idealPh: 7.5,
    highN: false,
    duration: "70-90 Days",
    yield: "0.5-0.8 tonnes/ha",
    price: "₹6,500 / quintal",
    note: "Key crop for Bikaner/Rajasthan (used in Bhujia). Extremely drought resistant.",
    imageUrl: "https://images.unsplash.com/photo-1620055457493-2771b931936c?auto=format&fit=crop&w=600&q=80"
  },

  // --- OILSEEDS ---
  {
    name: "Soybean",
    hindi: "सोयाबीन",
    soilTypes: ["Black Soil (Regur)", "Loamy Soil"],
    minRain: 600,
    idealPh: 6.5,
    highN: false,
    duration: "90-110 Days",
    yield: "2.5-3.0 tonnes/ha",
    price: "₹4,892 / quintal (MSP)",
    note: "Predominant in MP/Maharashtra. Requires well-drained Black soil. Sowing in June-July.",
    imageUrl: "https://images.unsplash.com/photo-1627918556428-144c8c760826?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Groundnut",
    hindi: "मूंगफली",
    soilTypes: ["Red Soil", "Sandy Loam", "Loamy Soil", "Alluvial Soil"],
    minRain: 400,
    idealPh: 6.5,
    highN: false,
    duration: "100-120 Days",
    yield: "1.5-2.5 tonnes/ha",
    price: "₹6,783 / quintal (MSP)",
    note: "Needs loose soil for 'pegging'. Gypsum application (Ca & S) boosts pod formation.",
    imageUrl: "https://images.unsplash.com/photo-1563503206410-b98a397940e7?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Mustard",
    hindi: "सरसों",
    soilTypes: ["Alluvial Soil", "Loamy Soil", "Sandy Loam"],
    minRain: 300,
    maxRain: 700,
    idealPh: 7.2,
    highN: true,
    duration: "100-135 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹5,950 / quintal (MSP)",
    note: "Key Rabi oilseed. Thrives in cool temp (15-25°C). Critical irrigation at flowering.",
    imageUrl: "https://images.unsplash.com/photo-1544253396-e1792a72049d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sunflower",
    hindi: "सूरजमुखी",
    soilTypes: ["Black Soil (Regur)", "Loamy Soil", "Alluvial Soil"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 7.0,
    highN: true,
    duration: "90-100 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹7,280 / quintal (MSP)",
    note: "Photo-insensitive (Year-round). Requires Boron spray for seed setting. Bird damage is a risk.",
    imageUrl: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sesame (Til)",
    hindi: "तिल",
    soilTypes: ["Sandy Loam", "Loamy Soil", "Red Soil"],
    minRain: 400,
    maxRain: 600,
    idealPh: 6.5,
    highN: true,
    duration: "85-100 Days",
    yield: "0.5-0.8 tonnes/ha",
    price: "₹9,267 / quintal (MSP)",
    note: "Heat tolerant but very sensitive to waterlogging. Kharif in North, Rabi in South.",
    imageUrl: "https://images.unsplash.com/photo-1613535449480-92697c36a642?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Safflower (Kusum)",
    hindi: "कुसुम",
    soilTypes: ["Black Soil (Regur)", "Alluvial Soil"],
    minRain: 300,
    maxRain: 600,
    idealPh: 7.0,
    highN: false,
    duration: "120-130 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹5,940 / quintal (MSP)",
    note: "Deep rooted Rabi crop. Highly drought / salt tolerant. Spiny varieties repel cattle.",
    imageUrl: "https://images.unsplash.com/photo-1596547610037-5645db74950f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Castor",
    hindi: "अरंडी (कैस्टर)",
    soilTypes: ["Sandy Loam", "Red Soil", "Black Soil (Regur)"],
    minRain: 400,
    maxRain: 750,
    idealPh: 6.0,
    highN: true,
    duration: "150-180 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹6,000 / quintal",
    note: "Drought hardy non-edible oilseed. Gujarat is leading producer.",
    imageUrl: "https://images.unsplash.com/photo-1594291885664-964267207b5b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Linseed (Alsi)",
    hindi: "अलसी",
    soilTypes: ["Black Soil (Regur)", "Alluvial Soil", "Loamy Soil"],
    minRain: 450,
    maxRain: 750,
    idealPh: 6.0,
    highN: true,
    duration: "110-120 Days",
    yield: "0.8-1.0 tonnes/ha",
    price: "₹5,800 / quintal",
    note: "Dual purpose (Oil + Fiber/Flax). Needs cool climate. Often intercropped with Gram.",
    imageUrl: "https://images.unsplash.com/photo-1627918556428-144c8c760826?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Niger (Ramtil)",
    hindi: "रामतिल",
    soilTypes: ["Red Soil", "Forest / Mountain Soil", "Laterite Soil"],
    minRain: 800,
    maxRain: 1200,
    idealPh: 5.5,
    highN: false,
    duration: "90-100 Days",
    yield: "0.4-0.6 tonnes/ha",
    price: "₹8,717 / quintal (MSP)",
    note: "Important tribal crop. Can grow on hill slopes and poor soils.",
    imageUrl: "https://images.unsplash.com/photo-1634628741334-92762293021f?auto=format&fit=crop&w=600&q=80"
  },

  // --- COMMERCIAL / CASH CROPS ---
  {
    name: "Sugarcane",
    hindi: "गन्ना",
    soilTypes: ["Alluvial Soil", "Black Soil (Regur)", "Loamy Soil"],
    minRain: 1200,
    idealPh: 7.5,
    highN: true,
    duration: "10-12 Months",
    yield: "80-100 tonnes/ha",
    price: "₹340 / quintal (FRP)",
    note: "High water requirement. Adali (18 month) crop yields highest. Heavy potassium feeder.",
    imageUrl: "https://images.unsplash.com/photo-1616429532551-c30953a7b629?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cotton",
    hindi: "कपास",
    soilTypes: ["Black Soil (Regur)", "Alluvial Soil"],
    minRain: 500,
    idealPh: 7.0,
    highN: true,
    duration: "150-180 Days",
    yield: "2-3 tonnes/ha",
    price: "₹7,521 / quintal (MSP)",
    note: "Deep rooted. Bt Cotton common in India. Vulnerable to Pink Bollworm. Needs dry weather during boll opening.",
    imageUrl: "https://images.unsplash.com/photo-1605333166548-a9572718911b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Jute",
    hindi: "जूट (पटसन)",
    soilTypes: ["Alluvial Soil"],
    minRain: 1500,
    maxRain: 2500,
    idealPh: 6.4,
    highN: true,
    duration: "120-130 Days",
    yield: "2.5-3.0 tonnes/ha",
    price: "₹5,335 / quintal (MSP)",
    note: "Golden Fibre. Needs hot & humid climate (West Bengal/Assam). Harvested for Bast fibre.",
    imageUrl: "https://images.unsplash.com/photo-1599940778173-e276d4acb2e7?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tobacco",
    hindi: "तंबाकू",
    soilTypes: ["Red Soil", "Alluvial Soil", "Loamy Soil"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 6.0,
    highN: true,
    duration: "100-120 Days",
    yield: "1.5-2.5 tonnes/ha",
    price: "₹4,000 / quintal",
    note: "Sensitive to waterlogging. Quality depends on curing (flue-cured for cigarettes).",
    imageUrl: "https://images.unsplash.com/photo-1536615967660-bc2f40b4356c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tea",
    hindi: "चाय",
    soilTypes: ["Laterite Soil", "Forest / Mountain Soil"],
    minRain: 1500,
    maxRain: 3000,
    idealPh: 5.0,
    highN: true,
    duration: "Perennial",
    yield: "1.5-2.5 tonnes/ha",
    price: "₹180-300 / kg",
    note: "Requires acidic soil and well-drained hill slopes. Cannot tolerate standing water.",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Coffee (Robusta)",
    hindi: "कॉफी",
    soilTypes: ["Red Soil", "Laterite Soil", "Forest / Mountain Soil"],
    minRain: 1500,
    maxRain: 2500,
    idealPh: 6.0,
    highN: true,
    duration: "Perennial",
    yield: "0.8-1.0 tonnes/ha",
    price: "₹200-280 / kg",
    note: "Shade loving plant. Karnataka is largest producer. Blossom showers in April critical.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Rubber",
    hindi: "रबर",
    soilTypes: ["Laterite Soil", "Red Soil"],
    minRain: 2000,
    maxRain: 4000,
    idealPh: 5.0,
    highN: true,
    duration: "Perennial",
    yield: "1.5 tonnes/ha",
    price: "₹180 / kg",
    note: "Tropical tree. Tapping starts after 7 years. Needs high humidity.",
    imageUrl: "https://images.unsplash.com/photo-1598263156689-01588c835252?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Coconut",
    hindi: "नारियल",
    soilTypes: ["Alluvial Soil", "Red Soil", "Coastal Sand"],
    minRain: 1000,
    idealPh: 6.0,
    highN: true,
    duration: "Perennial",
    yield: "10,000 nuts/ha",
    price: "₹3,000 / quintal",
    note: "Thrives in coastal saline areas. Potassium loving crop.",
    imageUrl: "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Arecanut",
    hindi: "सुपारी",
    soilTypes: ["Laterite Soil", "Red Soil"],
    minRain: 2000,
    maxRain: 4000,
    idealPh: 6.0,
    highN: true,
    duration: "Perennial",
    yield: "1.2-1.5 tonnes/ha",
    price: "₹48,000 / quintal",
    note: "High value crop. Yellow Leaf Disease is a major threat.",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cashew",
    hindi: "काजू",
    soilTypes: ["Red Soil", "Laterite Soil", "Coastal Sand"],
    minRain: 600,
    maxRain: 2000,
    idealPh: 6.0,
    highN: true,
    duration: "Perennial",
    yield: "0.8-1.0 tonnes/ha",
    price: "₹8,000 / quintal (Raw)",
    note: "Hardy crop, can grow on wastelands. Tea mosquito bug is major pest.",
    imageUrl: "https://images.unsplash.com/photo-1539611391986-77864fa62678?auto=format&fit=crop&w=600&q=80"
  },

  // --- SPICES & VEGETABLES ---
  {
    name: "Turmeric",
    hindi: "हल्दी",
    soilTypes: ["Red Soil", "Black Soil (Regur)", "Loamy Soil", "Laterite Soil"],
    minRain: 1200,
    idealPh: 6.0,
    highN: true,
    duration: "8-9 Months",
    yield: "20-25 tonnes/ha (Fresh)",
    price: "₹13,500 / quintal",
    note: "Needs hot & humid climate. Rhizome rot is major threat (ensure drainage). High Curcumin varieties fetch premium.",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cumin (Jeera)",
    hindi: "जीरा",
    soilTypes: ["Sandy Loam", "Desert / Arid Soil"],
    minRain: 200,
    maxRain: 400,
    idealPh: 7.5,
    highN: false,
    duration: "110-120 Days",
    yield: "0.5-0.7 tonnes/ha",
    price: "₹24,500 / quintal",
    note: "Strictly for dry regions (Gujarat/Rajasthan). Clouds/Humidity cause Blight disease failure.",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Coriander (Dhania)",
    hindi: "धनिया",
    soilTypes: ["Black Soil (Regur)", "Loamy Soil"],
    minRain: 300,
    maxRain: 700,
    idealPh: 6.5,
    highN: true,
    duration: "90-110 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹6,800 / quintal",
    note: "Frost sensitive. Needs cool climate during growth and warm dry weather for maturity.",
    imageUrl: "https://images.unsplash.com/photo-1588874103859-00db04812f86?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Garlic",
    hindi: "लहसुन",
    soilTypes: ["Loamy Soil", "Alluvial Soil"],
    minRain: 600,
    idealPh: 6.5,
    highN: true,
    duration: "130-150 Days",
    yield: "10-15 tonnes/ha",
    price: "₹16,500 / quintal",
    note: "Needs cool weather for bulb initiation. Ooty garlic fetches highest price.",
    imageUrl: "https://images.unsplash.com/photo-1603622484393-21c834a0293d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Ginger",
    hindi: "अदरक",
    soilTypes: ["Laterite Soil", "Red Soil", "Loamy Soil"],
    minRain: 1500,
    idealPh: 6.0,
    highN: true,
    duration: "8-9 Months",
    yield: "15-20 tonnes/ha",
    price: "₹6,200 / quintal",
    note: "Shade loving crop. Can be intercropped in orchards. Requires heavy mulching.",
    imageUrl: "https://images.unsplash.com/photo-1600188769045-392656961a5b?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Chilli",
    hindi: "मिर्च",
    soilTypes: ["Black Soil (Regur)", "Loamy Soil", "Red Soil"],
    minRain: 600,
    maxRain: 1200,
    idealPh: 6.5,
    highN: true,
    duration: "150-180 Days",
    yield: "1.5-2 tonnes/ha (Dry)",
    price: "₹21,000 / quintal (Dry)",
    note: "Guntur (AP) is hub. Leaf curl virus is major pest. Needs warm humid climate.",
    imageUrl: "https://images.unsplash.com/photo-1563200985-780c98f99e4f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Black Pepper",
    hindi: "काली मिर्च",
    soilTypes: ["Laterite Soil", "Red Soil", "Forest / Mountain Soil"],
    minRain: 2000,
    maxRain: 3000,
    idealPh: 5.5,
    highN: true,
    duration: "Perennial",
    yield: "0.5-0.8 tonnes/ha",
    price: "₹55,000 / quintal",
    note: "King of Spices. Climber needing support (often grown on Areca/Coconut trees).",
    imageUrl: "https://images.unsplash.com/photo-1598511726623-d2199042b83c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cardamom",
    hindi: "इलायची",
    soilTypes: ["Forest / Mountain Soil", "Loamy Soil"],
    minRain: 1500,
    maxRain: 3500,
    idealPh: 5.5,
    highN: true,
    duration: "Perennial",
    yield: "0.3-0.5 tonnes/ha",
    price: "₹1,80,000 / quintal",
    note: "Queen of Spices. Needs heavy shade and high humidity (Western Ghats).",
    imageUrl: "https://images.unsplash.com/photo-1609188076824-343152c9384a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Fenugreek (Methi)",
    hindi: "मेथी",
    soilTypes: ["Loamy Soil", "Black Soil (Regur)"],
    minRain: 400,
    maxRain: 800,
    idealPh: 7.0,
    highN: false,
    duration: "90-100 Days",
    yield: "1-1.5 tonnes/ha",
    price: "₹6,500 / quintal",
    note: "Leafy veg (30 days) or Seed spice (90 days). Nitrogen fixer.",
    imageUrl: "https://images.unsplash.com/photo-1615485925822-798993f35c5c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Fennel (Saunf)",
    hindi: "सौंफ",
    soilTypes: ["Loamy Soil", "Black Soil (Regur)"],
    minRain: 400,
    maxRain: 800,
    idealPh: 7.0,
    highN: true,
    duration: "150-160 Days",
    yield: "1.5-2 tonnes/ha",
    price: "₹11,000 / quintal",
    note: "Long duration Rabi spice. Gujarat/Rajasthan are major producers.",
    imageUrl: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Onion",
    hindi: "प्याज",
    soilTypes: ["Loamy Soil", "Alluvial Soil", "Clayey"],
    minRain: 600,
    maxRain: 1000,
    idealPh: 6.5,
    highN: true,
    duration: "100-120 Days",
    yield: "25-30 tonnes/ha",
    price: "₹2,200 / quintal",
    note: "Three seasons (Kharif, Late Kharif, Rabi). Nashik is hub. Sensitive to photoperiod.",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Potato",
    hindi: "आलू",
    soilTypes: ["Sandy Loam", "Loamy Soil"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 5.5,
    highN: true,
    duration: "90-110 Days",
    yield: "25-35 tonnes/ha",
    price: "₹1,450 / quintal",
    note: "Needs cool nights for tuberization. Earth up soil to prevent greening.",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tomato",
    hindi: "टमाटर",
    soilTypes: ["Loamy Soil", "Red Soil", "Black Soil (Regur)"],
    minRain: 600,
    maxRain: 1200,
    idealPh: 6.5,
    highN: true,
    duration: "110-140 Days",
    yield: "40-60 tonnes/ha (Hybrid)",
    price: "₹1,800 / quintal",
    note: "Warm season crop. Staking required for indeterminate varieties. Susceptible to blight.",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Brinjal (Eggplant)",
    hindi: "बैंगन",
    soilTypes: ["Loamy Soil", "Clayey"],
    minRain: 600,
    maxRain: 1200,
    idealPh: 6.0,
    highN: true,
    duration: "140-160 Days",
    yield: "30-40 tonnes/ha",
    price: "₹1,800 / quintal",
    note: "Hardy vegetable. Fruit and Shoot Borer is major pest.",
    imageUrl: "https://images.unsplash.com/photo-1615486511484-92e590408023?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Okra (Bhindi)",
    hindi: "भिंडी",
    soilTypes: ["Loamy Soil", "Sandy Loam"],
    minRain: 600,
    maxRain: 1200,
    idealPh: 6.5,
    highN: true,
    duration: "90-100 Days",
    yield: "10-12 tonnes/ha",
    price: "₹2,800 / quintal",
    note: "Warm season. YVMV virus is major threat (use resistant hybrids).",
    imageUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cabbage",
    hindi: "पत्ता गोभी",
    soilTypes: ["Loamy Soil", "Clayey"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 6.5,
    highN: true,
    duration: "90-110 Days",
    yield: "30-40 tonnes/ha",
    price: "₹1,400 / quintal",
    note: "Cool season crop. Heavy feeder. Diamond Back Moth is major pest.",
    imageUrl: "https://images.unsplash.com/photo-1592885994117-64906969eb28?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Cauliflower",
    hindi: "फूलगोभी",
    soilTypes: ["Loamy Soil"],
    minRain: 500,
    maxRain: 1000,
    idealPh: 6.5,
    highN: true,
    duration: "90-110 Days",
    yield: "20-25 tonnes/ha",
    price: "₹1,800 / quintal",
    note: "More sensitive to temp/humidity than cabbage. Blanching improves curd quality.",
    imageUrl: "https://images.unsplash.com/photo-1568584711075-3d021a7c3d54?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tapioca (Cassava)",
    hindi: "टैपिओका (साबूदाना)",
    soilTypes: ["Laterite Soil", "Sandy Loam"],
    minRain: 1000,
    maxRain: 2500,
    idealPh: 5.5,
    highN: true,
    duration: "8-10 Months",
    yield: "30-40 tonnes/ha",
    price: "₹2,100 / quintal",
    note: "Starch rich tuber. Drought tolerant. Salem (TN) is major hub.",
    imageUrl: "https://images.unsplash.com/photo-1594916894081-306915f01314?auto=format&fit=crop&w=600&q=80"
  },
];

export const getCropPrediction = async (
  coords: Coordinates, 
  soilParams: { n: number; p: number; k: number; ph: number; soilType?: string; rainfall?: number }
): Promise<PredictionResult> => {
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { soilType = "", rainfall = 1000, ph, n } = soilParams;

  // SCORING ALGORITHM
  // Calculate score for ALL crops
  const scoredCrops = CROP_DATABASE.map(crop => {
    let score = 0;

    // 1. Soil Type Match (Highest Weight: 40)
    const soilMatch = crop.soilTypes.some(t => soilType.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(soilType.toLowerCase()));
    if (soilMatch) score += 40;
    else if (crop.soilTypes.includes("Loamy Soil")) score += 20;

    // 2. Rainfall Match (Weight: 30)
    const minR = crop.minRain;
    const maxR = (crop as any).maxRain || 3000;
    
    if (rainfall >= minR && rainfall <= maxR) {
        score += 30;
    } else {
        const diff = Math.min(Math.abs(rainfall - minR), Math.abs(rainfall - maxR));
        score += Math.max(0, 30 - (diff / 20)); 
    }

    // 3. pH Match (Weight: 15)
    const phDiff = Math.abs(ph - crop.idealPh);
    if (phDiff < 0.5) score += 15;
    else if (phDiff < 1.0) score += 10;
    else if (phDiff < 1.5) score += 5;

    // 4. Nitrogen Requirement (Weight: 15)
    if (crop.highN && n > 60) score += 15;
    if (!crop.highN && n < 50) score += 15;

    // Random noise to prevent identical scores every time (Simulation Realism)
    score += Math.random() * 5;

    return { crop, score };
  });

  // Sort by score descending
  scoredCrops.sort((a, b) => b.score - a.score);

  // Pick top 3
  const bestCrop = scoredCrops[0].crop;
  const bestScore = scoredCrops[0].score;

  const confidence = Math.min(98, Math.max(75, Math.floor(bestScore)));

  // Format Alternatives
  const alternatives = scoredCrops.slice(1, 3).map(item => ({
    cropName: item.crop.name,
    cropHindi: item.crop.hindi,
    confidence: Math.min(95, Math.max(60, Math.floor(item.score)))
  }));

  return {
    cropName: bestCrop.name,
    cropHindi: bestCrop.hindi,
    confidence: confidence,
    yieldEstimate: bestCrop.yield,
    marketPriceEstimate: bestCrop.price,
    duration: bestCrop.duration,
    agronomistNote: bestCrop.note,
    imageUrl: bestCrop.imageUrl,
    alternatives: alternatives
  };
};

export const getLocalWeather = async (coords: Coordinates) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // SEASON AWARE SIMULATION
    // Check current month to guess Season in India
    const month = new Date().getMonth(); // 0-11
    
    let temp = 30;
    let condition = 'Sunny';
    let humidity = 40;
    
    // Monsoon (June - Sept)
    if (month >= 5 && month <= 8) {
       temp = 28;
       condition = 'Rainy';
       humidity = 85;
    }
    // Winter (Oct - Feb)
    else if (month >= 9 || month <= 1) {
       temp = 22;
       condition = 'Clear Sky';
       humidity = 50;
    }
    // Summer (March - May)
    else {
       temp = 38;
       condition = 'Hot & Sunny';
       humidity = 30;
    }

    // Add random daily variance
    temp += Math.floor(Math.random() * 4 - 2);

    return {
        temp,
        condition,
        humidity,
        windSpeed: Math.floor(Math.random() * 15 + 5)
    }
}