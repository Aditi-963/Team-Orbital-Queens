import type { Farm, Alert, WeatherData, ChatMessage } from '../types';

export const mockFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Vrindavan Farms',
    owner: 'Ramesh Singh',
    location: 'Bhatinda, Punjab, India',
    lat: 30.211,
    lng: 74.945,
    boundary: [
      [30.213, 74.942],
      [30.214, 74.948],
      [30.209, 74.949],
      [30.208, 74.943]
    ],
    area: 24.5,
    cropType: 'Wheat',
    plantingDate: '2025-11-15',
    expectedHarvest: '2026-04-10',
    healthScore: 94,
    ndvi: 0.82,
    ndwi: 0.65,
    evi: 0.74,
    savi: 0.79,
    soilMoisture: 42,
    lst: 26.4,
    growthStage: 'Maturity',
    waterRequirement: 12500, // liters/hectare/day
    historicalNdvi: [
      { date: '30 Days Ago', value: 0.71 },
      { date: '20 Days Ago', value: 0.75 },
      { date: '10 Days Ago', value: 0.79 },
      { date: 'Current', value: 0.82 }
    ],
    historicalWater: [
      { date: 'Week 1', value: 14000 },
      { date: 'Week 2', value: 13500 },
      { date: 'Week 3', value: 13000 },
      { date: 'Week 4', value: 12500 }
    ],
    historicalRainfall: [
      { date: 'Jan', value: 12 },
      { date: 'Feb', value: 18 },
      { date: 'Mar', value: 8 },
      { date: 'Apr', value: 2 }
    ],
    timeLapseImages: [
      {
        date: '2025-11-20',
        url: 'https://images.unsplash.com/photo-1500937386664-56d159062255?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1524169358666-79f22534bc6e?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Germination'
      },
      {
        date: '2026-01-15',
        url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Vegetative'
      },
      {
        date: '2026-03-01',
        url: 'https://images.unsplash.com/photo-1444858291040-58fe7cbacb7e?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Flowering'
      },
      {
        date: '2026-04-01',
        url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Maturity'
      }
    ]
  },
  {
    id: 'farm-2',
    name: 'Sahyadri Vineyards',
    owner: 'Anil Deshmukh',
    location: 'Nashik, Maharashtra, India',
    lat: 19.997,
    lng: 73.789,
    boundary: [
      [19.999, 73.784],
      [20.001, 73.791],
      [19.995, 73.793],
      [19.994, 73.786]
    ],
    area: 12.8,
    cropType: 'Grapes',
    plantingDate: '2025-10-01',
    expectedHarvest: '2026-03-25',
    healthScore: 78,
    ndvi: 0.62,
    ndwi: 0.48,
    evi: 0.55,
    savi: 0.58,
    soilMoisture: 31,
    lst: 31.8,
    growthStage: 'Harvest Ready',
    waterRequirement: 8400,
    historicalNdvi: [
      { date: '30 Days Ago', value: 0.74 },
      { date: '20 Days Ago', value: 0.70 },
      { date: '10 Days Ago', value: 0.66 },
      { date: 'Current', value: 0.62 }
    ],
    historicalWater: [
      { date: 'Week 1', value: 9200 },
      { date: 'Week 2', value: 8900 },
      { date: 'Week 3', value: 8600 },
      { date: 'Week 4', value: 8400 }
    ],
    historicalRainfall: [
      { date: 'Jan', value: 5 },
      { date: 'Feb', value: 2 },
      { date: 'Mar', value: 1 },
      { date: 'Apr', value: 0 }
    ],
    timeLapseImages: [
      {
        date: '2025-10-10',
        url: 'https://images.unsplash.com/photo-1530076886461-ce58cf8bdbb9?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Germination'
      },
      {
        date: '2025-12-15',
        url: 'https://images.unsplash.com/photo-1539669678207-28102629f74b?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Vegetative'
      },
      {
        date: '2026-02-10',
        url: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Flowering'
      },
      {
        date: '2026-03-15',
        url: 'https://images.unsplash.com/photo-1530076886461-ce58cf8bdbb9?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Harvest Ready'
      }
    ]
  },
  {
    id: 'farm-3',
    name: 'Narmada Valley Estates',
    owner: 'Vijay Patel',
    location: 'Bharuch, Gujarat, India',
    lat: 21.705,
    lng: 73.012,
    boundary: [
      [21.708, 73.007],
      [21.710, 73.015],
      [21.703, 73.016],
      [21.701, 73.009]
    ],
    area: 41.2,
    cropType: 'Cotton',
    plantingDate: '2026-05-10',
    expectedHarvest: '2026-10-30',
    healthScore: 86,
    ndvi: 0.35,
    ndwi: 0.72,
    evi: 0.42,
    savi: 0.39,
    soilMoisture: 68,
    lst: 34.2,
    growthStage: 'Germination',
    waterRequirement: 18500,
    historicalNdvi: [
      { date: '30 Days Ago', value: 0.10 },
      { date: '20 Days Ago', value: 0.15 },
      { date: '10 Days Ago', value: 0.28 },
      { date: 'Current', value: 0.35 }
    ],
    historicalWater: [
      { date: 'Week 1', value: 16000 },
      { date: 'Week 2', value: 17000 },
      { date: 'Week 3', value: 18000 },
      { date: 'Week 4', value: 18500 }
    ],
    historicalRainfall: [
      { date: 'Jan', value: 0 },
      { date: 'Feb', value: 0 },
      { date: 'Mar', value: 2 },
      { date: 'Apr', value: 15 }
    ],
    timeLapseImages: [
      {
        date: '2026-05-12',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Germination'
      },
      {
        date: '2026-06-05',
        url: 'https://images.unsplash.com/photo-1500937386664-56d159062255?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Germination'
      }
    ]
  },
  {
    id: 'farm-4',
    name: 'Kaveri Paddy Fields',
    owner: 'S. Sundaram',
    location: 'Thanjavur, Tamil Nadu, India',
    lat: 10.787,
    lng: 79.138,
    boundary: [
      [10.790, 79.133],
      [10.792, 79.141],
      [10.784, 79.143],
      [10.782, 79.135]
    ],
    area: 18.9,
    cropType: 'Rice',
    plantingDate: '2026-02-01',
    expectedHarvest: '2026-06-15',
    healthScore: 89,
    ndvi: 0.79,
    ndwi: 0.81,
    evi: 0.71,
    savi: 0.75,
    soilMoisture: 78,
    lst: 29.5,
    growthStage: 'Flowering',
    waterRequirement: 22000,
    historicalNdvi: [
      { date: '30 Days Ago', value: 0.55 },
      { date: '20 Days Ago', value: 0.64 },
      { date: '10 Days Ago', value: 0.73 },
      { date: 'Current', value: 0.79 }
    ],
    historicalWater: [
      { date: 'Week 1', value: 20000 },
      { date: 'Week 2', value: 21000 },
      { date: 'Week 3', value: 21500 },
      { date: 'Week 4', value: 22000 }
    ],
    historicalRainfall: [
      { date: 'Jan', value: 45 },
      { date: 'Feb', value: 30 },
      { date: 'Mar', value: 50 },
      { date: 'Apr', value: 95 }
    ],
    timeLapseImages: [
      {
        date: '2026-02-05',
        url: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Germination'
      },
      {
        date: '2026-03-20',
        url: 'https://images.unsplash.com/photo-1530906358829-e84b1779585c?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Vegetative'
      },
      {
        date: '2026-05-01',
        url: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?auto=format&fit=crop&w=800&q=80',
        ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
        growthStage: 'Flowering'
      }
    ]
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    farmId: 'farm-2',
    farmName: 'Sahyadri Vineyards',
    type: 'drought',
    severity: 'warning',
    message: 'Soil moisture dropped to 31%. Drought stress beginning to impact canopy vigor.',
    date: '2026-07-03',
    resolved: false
  },
  {
    id: 'alert-2',
    farmId: 'farm-2',
    farmName: 'Sahyadri Vineyards',
    type: 'disease_risk',
    severity: 'critical',
    message: 'High Land Surface Temp (31.8°C) & drop in humidity signals early Powdery Mildew risk.',
    date: '2026-07-04',
    resolved: false
  },
  {
    id: 'alert-3',
    farmId: 'farm-4',
    farmName: 'Kaveri Paddy Fields',
    type: 'excessive_moisture',
    severity: 'info',
    message: 'Soil moisture is at 78% following unseasonal rain. Ensure drainage channels are clear.',
    date: '2026-07-04',
    resolved: false
  }
];

export const mockWeather: Record<string, WeatherData> = {
  'farm-1': {
    temp: 34,
    condition: 'Sunny',
    humidity: 35,
    windSpeed: 12,
    forecast: [
      { day: 'Mon', temp: 34, condition: 'Sunny', humidity: 35, windSpeed: 12, precipitation: 0 },
      { day: 'Tue', temp: 35, condition: 'Sunny', humidity: 30, windSpeed: 14, precipitation: 0 },
      { day: 'Wed', temp: 36, condition: 'Sunny', humidity: 31, windSpeed: 11, precipitation: 0 },
      { day: 'Thu', temp: 34, condition: 'Partly Cloudy', humidity: 40, windSpeed: 10, precipitation: 1.2 },
      { day: 'Fri', temp: 32, condition: 'Rainy', humidity: 65, windSpeed: 18, precipitation: 14.5 },
      { day: 'Sat', temp: 30, condition: 'Partly Cloudy', humidity: 55, windSpeed: 12, precipitation: 2.1 },
      { day: 'Sun', temp: 33, condition: 'Sunny', humidity: 45, windSpeed: 9, precipitation: 0 }
    ]
  },
  'farm-2': {
    temp: 31,
    condition: 'Sunny',
    humidity: 28,
    windSpeed: 9,
    forecast: [
      { day: 'Mon', temp: 31, condition: 'Sunny', humidity: 28, windSpeed: 9, precipitation: 0 },
      { day: 'Tue', temp: 32, condition: 'Sunny', humidity: 26, windSpeed: 11, precipitation: 0 },
      { day: 'Wed', temp: 33, condition: 'Sunny', humidity: 25, windSpeed: 10, precipitation: 0 },
      { day: 'Thu', temp: 32, condition: 'Sunny', humidity: 28, windSpeed: 8, precipitation: 0 },
      { day: 'Fri', temp: 31, condition: 'Partly Cloudy', humidity: 35, windSpeed: 7, precipitation: 0 },
      { day: 'Sat', temp: 33, condition: 'Sunny', humidity: 30, windSpeed: 8, precipitation: 0 },
      { day: 'Sun', temp: 34, condition: 'Sunny', humidity: 29, windSpeed: 9, precipitation: 0 }
    ]
  },
  'farm-3': {
    temp: 36,
    condition: 'Sunny',
    humidity: 48,
    windSpeed: 15,
    forecast: [
      { day: 'Mon', temp: 36, condition: 'Sunny', humidity: 48, windSpeed: 15, precipitation: 0 },
      { day: 'Tue', temp: 37, condition: 'Sunny', humidity: 45, windSpeed: 16, precipitation: 0 },
      { day: 'Wed', temp: 38, condition: 'Sunny', humidity: 42, windSpeed: 14, precipitation: 0 },
      { day: 'Thu', temp: 36, condition: 'Partly Cloudy', humidity: 50, windSpeed: 12, precipitation: 0.5 },
      { day: 'Fri', temp: 35, condition: 'Partly Cloudy', humidity: 52, windSpeed: 11, precipitation: 0.2 },
      { day: 'Sat', temp: 37, condition: 'Sunny', humidity: 46, windSpeed: 13, precipitation: 0 },
      { day: 'Sun', temp: 37, condition: 'Sunny', humidity: 45, windSpeed: 14, precipitation: 0 }
    ]
  },
  'farm-4': {
    temp: 29,
    condition: 'Rainy',
    humidity: 82,
    windSpeed: 21,
    forecast: [
      { day: 'Mon', temp: 29, condition: 'Rainy', humidity: 82, windSpeed: 21, precipitation: 22.4 },
      { day: 'Tue', temp: 28, condition: 'Stormy', humidity: 88, windSpeed: 25, precipitation: 45.1 },
      { day: 'Wed', temp: 30, condition: 'Partly Cloudy', humidity: 75, windSpeed: 16, precipitation: 4.8 },
      { day: 'Thu', temp: 31, condition: 'Sunny', humidity: 62, windSpeed: 12, precipitation: 0 },
      { day: 'Fri', temp: 32, condition: 'Sunny', humidity: 58, windSpeed: 10, precipitation: 0 },
      { day: 'Sat', temp: 31, condition: 'Partly Cloudy', humidity: 68, windSpeed: 13, precipitation: 1.2 },
      { day: 'Sun', temp: 30, condition: 'Rainy', humidity: 78, windSpeed: 18, precipitation: 12.8 }
    ]
  }
};

export const getAiResponse = (query: string, currentFarm: Farm): string => {
  const q = query.toLowerCase();
  
  if (q.includes('water') || q.includes('irrigation') || q.includes('moisture')) {
    if (currentFarm.soilMoisture < 40) {
      return `Field sensor data indicates soil moisture at ${currentFarm.soilMoisture}%, which is below the threshold for ${currentFarm.cropType}. I recommend an irrigation sequence of ${currentFarm.waterRequirement} L/ha/day immediately, focusing on drier eastern grids.`;
    } else {
      return `Soil moisture for ${currentFarm.name} is currently optimal at ${currentFarm.soilMoisture}%. No urgent watering sequence is scheduled. Based on the weather forecast, you can delay the next irrigation for 48 hours.`;
    }
  }

  if (q.includes('ndvi') || q.includes('health') || q.includes('index') || q.includes('vigor')) {
    return `For ${currentFarm.name}, the average NDVI index is ${currentFarm.ndvi} (Health Score: ${currentFarm.healthScore}%). This represents healthy green biomass. The time-lapse analysis shows a steady rise of 15% over the past 30 days, which indicates robust growth in the vegetative-to-flowering stage.`;
  }

  if (q.includes('alert') || q.includes('warning') || q.includes('disease')) {
    const alerts = mockAlerts.filter(a => a.farmId === currentFarm.id);
    if (alerts.length > 0) {
      return `Alert Center detects ${alerts.length} warning(s) for ${currentFarm.name}: ${alerts.map(a => `[${a.type.toUpperCase()}] ${a.message}`).join('; ')}. Immediate inspection of low-lying sections is recommended.`;
    }
    return `There are currently zero active warnings or disease risks for ${currentFarm.name}. Soil moisture and LST variables are well within normal ranges.`;
  }

  if (q.includes('yield') || q.includes('harvest') || q.includes('prediction')) {
    return `CropOrbit AI forecasts an estimated yield of ${(currentFarm.area * (currentFarm.cropType === 'Wheat' ? 4.2 : currentFarm.cropType === 'Rice' ? 5.1 : 3.2)).toFixed(1)} Metric Tons (Confidence: 89%). Expected harvest window: ${currentFarm.expectedHarvest}.`;
  }

  return `I am CropOrbit's geospatial AI assistant. You can ask me questions about soil moisture levels, NDVI indexes, disease risks, or irrigation suggestions for ${currentFarm.name}. For example, try asking: "What is the NDVI health score?" or "Does this field need irrigation?"`;
};
