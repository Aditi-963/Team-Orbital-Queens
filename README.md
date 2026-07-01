# Team-Orbital-Queens
🌾 CropOrbit AI
Precision Farming Powered From Space
🚀 ISRO BAH 2026 Hackathon – Team Orbital Queens

https://img.shields.io/badge/python-3.9+-blue.svg
https://img.shields.io/badge/FastAPI-0.68+-green.svg
https://img.shields.io/badge/React-18.0+-blue.svg
https://img.shields.io/badge/TensorFlow-2.0+-orange.svg
https://img.shields.io/badge/License-MIT-yellow.svg

📖 Overview
CropOrbit AI is an intelligent agriculture monitoring platform that leverages satellite remote sensing and artificial intelligence to:

Detect crop type automatically

Identify moisture stress levels in fields

Monitor crop growth stages over time

Generate precise irrigation recommendations

All of this is done without any on‑ground sensors – making it affordable, scalable, and accessible to every farmer.

"Democratizing precision agriculture using satellite intelligence."

🎯 Problem Statement
Agriculture is the backbone of India, yet farmers face immense challenges:

Challenge	Impact
❌ Over‑irrigation	Wastes up to 50% of water
❌ Late stress detection	Crop damage before visible symptoms
❌ Manual monitoring	Doesn't scale for large farms
❌ Expensive IoT sensors	Unaffordable for smallholders
❌ No data‑driven advice	Irrigation decisions based on guesswork
Result: India loses ₹45,000+ crore annually due to inefficient irrigation and poor crop management.

💡 Our Solution – CropOrbit AI
We bridge the gap between space technology and the farmer’s field:

✅ Satellite‑based monitoring – uses free optical & SAR data (Sentinel‑1/2, MODIS, ISRO Bhuvan)

✅ AI‑powered analytics – crop classification, stress detection, growth stage prediction

✅ Actionable irrigation advice – tells when and how much water to apply

✅ No hardware required – works entirely from space

✅ Nationwide scalability – works on any farm in India

✨ Key Features
Feature	Description
🌾 Crop Type Detection	Identifies wheat, rice, cotton, sugarcane, maize with 92% accuracy
💧 Moisture Stress Detection	Classifies fields into Healthy / Moderate / Severe stress levels
📈 Growth Stage Monitoring	Tracks germination → vegetative → flowering → maturity using LSTM
⏰ Irrigation Advisory	Recommends irrigation timing and water volume (mm) with high confidence
🗺️ Interactive Dashboard	Farm map, health indicators, trends, and alerts
📱 Farmer‑Friendly	(Planned) Mobile app with multilingual support
🏗️ System Architecture
text
┌─────────────────────────────────────────────────────────────────┐
│                         DATA ACQUISITION                        │
│  Sentinel‑1 SAR | Sentinel‑2 Optical | MODIS | ISRO Bhuvan    │
│  Weather APIs (IMD) | Historical crop data                    │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       PREPROCESSING                             │
│  Cloud masking · Radiometric calibration · Geometric correction│
│  Speckle filtering (SAR) · Resampling · Normalization         │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FEATURE EXTRACTION                           │
│  NDVI · NDWI · EVI · SAVI · Soil Moisture Index               │
│  Radar backscatter · Polarization ratios · Temporal features  │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI / ML MODELS                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │  XGBoost +  │  │  Random     │  │   LSTM      │           │
│  │  RF Ensemble│  │  Forest     │  │  (Growth    │           │
│  │  (Crop Type)│  │  (Stress)   │  │   Stages)   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DECISION ENGINE                              │
│  Irrigation scheduling · Water requirement · Alerts           │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      USER DASHBOARD                             │
│  React + TypeScript · Leaflet maps · Real‑time analytics      │
└─────────────────────────────────────────────────────────────────┘
🛠️ Technology Stack
Layer	Technology
Frontend	React 18, TypeScript, TailwindCSS, Leaflet.js, Chart.js
Backend	FastAPI (Python), PostgreSQL, Docker
AI/ML	XGBoost, Random Forest, LSTM (TensorFlow), scikit‑learn, pandas, NumPy
Satellite Processing	Google Earth Engine, Rasterio, GDAL, SNAP
Data Sources	ESA Sentinel‑1 & ‑2, MODIS, ISRO Bhuvan, IMD Weather API
Deployment	AWS / Azure / GCP (containerized with Docker)
📊 Model Performance
Model	Accuracy	Precision	Recall	F1‑Score
Crop Classification	92.0%	0.91	0.90	0.90
Moisture Stress Detection	88.0%	0.87	0.86	0.86
Growth Stage Prediction	85.0%	0.84	0.83	0.83
🚀 Quick Start
Prerequisites
Python 3.9+

Node.js 16+

PostgreSQL 12+

Docker (optional)

Clone & Install
bash
git clone https://github.com/yourusername/croporbit-ai.git
cd croporbit-ai

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install

# Environment variables
cp .env.example .env   # Fill with your API keys (Google Earth Engine, etc.)
Run the Application
bash
# Backend (FastAPI)
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend (React)
cd frontend
npm start
Access the app at http://localhost:3000 and API docs at http://localhost:8000/docs.

📡 API Endpoints
Endpoint	Method	Description
/api/v1/detect-crop	POST	Detect crop type from satellite data
/api/v1/moisture-stress	POST	Get moisture stress level and percentage
/api/v1/irrigation-advisory	POST	Get irrigation recommendation (timing + water volume)
/api/v1/farm-report/{farm_id}	GET	Complete analytics report for a farm
Example Request
json
POST /api/v1/irrigation-advisory
{
  "lat": 30.5,
  "lon": 76.3,
  "crop_type": "Wheat"
}
Example Response
json
{
  "recommendation": "Irrigate in 2-3 days",
  "water_needed": 15.0,
  "timing": "Next 48-72 hours",
  "crop": "Wheat",
  "stress_level": "Moderate",
  "confidence": 0.85
}
📁 Project Structure
text
croporbit-ai/
├── backend/
│   ├── app/
│   │   ├── api/           # FastAPI endpoints
│   │   ├── models/        # ML model wrappers
│   │   ├── services/      # Business logic (satellite fetch, advisory)
│   │   └── utils/         # Helpers (preprocessing, feature extraction)
│   ├── data/              # Sample datasets
│   ├── trained_models/    # Saved models (.pkl, .h5)
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Dashboard, Map, Analytics
│   │   ├── services/      # API calls
│   │   └── utils/
│   ├── package.json
│   └── Dockerfile
├── docs/                  # Documentation, whitepapers
├── tests/                 # Unit & integration tests
├── docker-compose.yml
├── .env.example
└── README.md
🌍 Impact & Future Scope
National Impact
Supports PMKSY (Pradhan Mantri Krishi Sinchai Yojana) and Digital Agriculture Mission

Contributes to SDG 2 (Zero Hunger) and SDG 6 (Clean Water)

Can reduce water wastage by 25% and increase yield by 15%

Future Enhancements
📱 Mobile App (Android/iOS) with offline support

🗣️ Voice‑based advisories in regional languages (Hindi, Marathi, Gujarati)

🏛️ Government Dashboard for real‑time regional monitoring

📊 Crop Insurance Integration – risk assessment for insurers

🌦️ Weather Forecast Integration for more accurate irrigation timing

🤝 Contributing
We welcome contributions! Please see CONTRIBUTING.md for guidelines.

Fork the repo

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

👥 Team – Orbital Queens
Name	Role
Aditi Rajput	Team Lead, AI/ML Engineer
Pranjal Gupta	Satellite Data Processing
Vaidehi Wate	Full Stack Developer
Hiranya Raut	Domain Expert (Agriculture)
📄 License
Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgments
ISRO for organising BAH 2026 and promoting space‑based solutions

European Space Agency for open Sentinel data

Google Earth Engine for satellite data processing

Pradhan Mantri Krishi Sinchai Yojana for inspiration

“Technology should serve the farmer – not the other way around.”

🌱 CropOrbit AI – Smarter irrigation. Better harvests. A sustainable future.

