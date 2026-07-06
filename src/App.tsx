import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardOverview from './pages/DashboardOverview';
import SatelliteMap from './pages/SatelliteMap';
import FarmDetails from './pages/FarmDetails';
import AiPredictions from './pages/AiPredictions';
import IrrigationAdvisory from './pages/IrrigationAdvisory';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Alerts from './pages/Alerts';
import Weather from './pages/Weather';
import Advisory from './pages/Advisory';
import MarketPrices from './pages/MarketPrices';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing public view */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication public view */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Authenticated Dashboard view stack */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardOverview />} />
              <Route path="/map" element={<SatelliteMap />} />
              <Route path="/farm-details" element={<FarmDetails />} />
              <Route path="/predictions" element={<AiPredictions />} />
              <Route path="/irrigation" element={<IrrigationAdvisory />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/advisory" element={<Advisory />} />
              <Route path="/market-prices" element={<MarketPrices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Wildcard redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
