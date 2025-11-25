
export interface MandiRate {
  crop: string;
  price: number;
  change: number; // Percentage
  location: string;
  state: string; // Added for filtering
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UserLocation {
  city: string;
  state: string;
  lat?: number;
  lng?: number;
}

export interface PredictionResult {
  cropName: string;
  cropHindi: string;
  confidence: number;
  yieldEstimate: string;
  marketPriceEstimate: string;
  duration: string;
  agronomistNote: string;
  imageUrl: string;
  alternatives: Array<{
    cropName: string;
    cropHindi: string;
    confidence: number;
  }>;
}

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export enum Language {
  EN = 'English',
  HI = 'Hindi',
  PB = 'Punjabi',
  MR = 'Marathi',
  GU = 'Gujarati'
}
