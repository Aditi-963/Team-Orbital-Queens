export interface HistoricalMetric {
  date: string;
  value: number;
}

export interface TimeLapseImage {
  date: string;
  url: string;
  ndviUrl: string;
  growthStage: string;
}

export interface Farm {
  id: string;
  name: string;
  owner: string;
  location: string;
  lat: number;
  lng: number;
  boundary: [number, number][]; // coordinates for Leaflet polygon
  area: number; // in hectares
  cropType: string;
  plantingDate: string;
  expectedHarvest: string;
  healthScore: number; // 0 to 100
  ndvi: number; // -1 to 1
  ndwi: number; // -1 to 1
  evi: number; // -1 to 1
  savi: number; // -1 to 1
  soilMoisture: number; // 0 to 100 %
  lst: number; // Land Surface Temperature in °C
  growthStage: 'Germination' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvest Ready';
  waterRequirement: number; // Liters/hectare/day
  historicalNdvi: HistoricalMetric[];
  historicalWater: HistoricalMetric[];
  historicalRainfall: HistoricalMetric[];
  timeLapseImages: TimeLapseImage[];
}

export interface Alert {
  id: string;
  farmId: string;
  farmName: string;
  type: 'drought' | 'excessive_moisture' | 'disease_risk' | 'pest_outbreak';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  date: string;
  resolved: boolean;
}

export interface WeatherForecast {
  day: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Partly Cloudy';
  humidity: number;
  windSpeed: number;
  precipitation: number; // in mm
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: WeatherForecast[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export type Language = 'en' | 'hi' | 'mr' | 'gu';
export type ThemeMode = 'dark' | 'light';
