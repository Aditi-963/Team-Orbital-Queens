# 🌾 CropOrbit AI

> **Precision Farming Powered from Space**\
> **ISRO BAH 2026 Hackathon -- Team Orbital Queens**

> *Democratizing Precision Agriculture using Satellite Intelligence.*

------------------------------------------------------------------------

# 🚧 README Skeleton

> **Note:** This README preserves the structure discussed in chat and is
> designed to be expanded. It includes all major sections in a clean
> order so you can directly replace or extend content.

## Table of Contents

-   Overview
-   Problem Statement
-   Our Solution
-   Key Features
-   Workflow
-   System Architecture
-   Technology Stack
-   AI Models
-   Model Performance
-   API
-   Quick Start
-   Project Structure
-   Future Scope
-   Team
-   License
-   Acknowledgements

------------------------------------------------------------------------

# Overview

CropOrbit AI is an AI-powered agriculture monitoring platform that
combines satellite imagery, remote sensing and machine learning to
provide crop classification, moisture stress detection, crop growth
monitoring and irrigation recommendations without requiring IoT sensors
in the field.

------------------------------------------------------------------------

# Problem Statement

  Challenge               Impact
  ----------------------- ----------------
  Over-irrigation         Water wastage
  Late stress detection   Reduced yield
  Manual monitoring       Not scalable
  Expensive IoT           Not affordable
  Guesswork irrigation    Poor decisions

------------------------------------------------------------------------

# Our Solution

Satellite Data

↓

Preprocessing

↓

Feature Extraction

↓

AI Models

↓

Decision Engine

↓

Farmer Dashboard

------------------------------------------------------------------------

# Key Features

  Feature               Description
  --------------------- -----------------------------
  Crop Detection        Detects major crops
  Moisture Stress       Healthy / Moderate / Severe
  Growth Stage          Germination → Maturity
  Irrigation Advisory   Water timing & quantity
  Dashboard             Interactive analytics

------------------------------------------------------------------------

# Workflow

``` text
Satellite Data
      ↓
Preprocessing
      ↓
Feature Extraction
      ↓
AI Models
      ↓
Decision Engine
      ↓
Dashboard
      ↓
Farmer
```

------------------------------------------------------------------------

# System Architecture

``` mermaid
flowchart LR

subgraph Data Sources
A1[Sentinel-1]
A2[Sentinel-2]
A3[MODIS]
A4[ISRO Bhuvan]
A5[Weather API]
end

subgraph Processing
B1[Cloud Masking]
B2[Calibration]
B3[Correction]
end

subgraph Features
C1[NDVI]
C2[NDWI]
C3[EVI]
C4[SAVI]
end

subgraph AI
D1[Crop Classification]
D2[Stress Detection]
D3[Growth Stage]
end

subgraph Output
E1[Irrigation Advisory]
E2[Dashboard]
E3[Alerts]
end

A1 --> B1
A2 --> B1
A3 --> B1
A4 --> B1
A5 --> B1

B1 --> C1
C1 --> D1
D1 --> E1
E1 --> E2
```

------------------------------------------------------------------------

# Technology Stack

## Frontend

  Technology     Purpose
  -------------- ---------------
  React          UI
  TypeScript     Type Safety
  Tailwind CSS   Styling
  Leaflet        Maps
  Chart.js       Visualization

## Backend

  Technology   Purpose
  ------------ ------------------
  FastAPI      REST APIs
  PostgreSQL   Database
  Docker       Containerization

## AI / ML

  Technology      Purpose
  --------------- ---------------------
  TensorFlow      LSTM
  XGBoost         Crop Classification
  Random Forest   Stress Detection
  scikit-learn    ML Utilities

## Remote Sensing

  Tool                  Purpose
  --------------------- ----------------------
  Google Earth Engine   Satellite Processing
  Rasterio              Raster Analysis
  GDAL                  Geospatial
  SNAP                  SAR Processing

------------------------------------------------------------------------

# AI Models

  Model           Purpose               Accuracy
  --------------- --------------------- ----------
  XGBoost         Crop Classification   92%
  Random Forest   Moisture Stress       88%
  LSTM            Growth Stage          85%

------------------------------------------------------------------------

# API

  Endpoint               Method   Description
  ---------------------- -------- ----------------------
  /detect-crop           POST     Crop Classification
  /moisture-stress       POST     Stress Detection
  /irrigation-advisory   POST     Water Recommendation

------------------------------------------------------------------------

# Quick Start

``` bash
git clone <repo>
cd croporbit-ai

cd backend
pip install -r requirements.txt

cd ../frontend
npm install
```

------------------------------------------------------------------------

# Project Structure

``` text
backend/
frontend/
docs/
tests/
README.md
```

------------------------------------------------------------------------

# Future Scope

-   [ ] Android App
-   [ ] iOS App
-   [ ] Voice Assistant
-   [ ] Government Dashboard
-   [ ] Weather Forecasting
-   [ ] Crop Insurance
-   [ ] Multi-language Support

------------------------------------------------------------------------

# Team

  Name            Role
  --------------- ----------------------
  Aditi Rajput    Team Lead & AI/ML
  Pranjal Gupta   Satellite Processing
  Vaidehi Wate    Full Stack
  Hiranya Raut    Agriculture Domain

------------------------------------------------------------------------

# License

MIT

------------------------------------------------------------------------

# Acknowledgements

-   ISRO
-   ESA Sentinel Program
-   Google Earth Engine
-   ISRO Bhuvan
