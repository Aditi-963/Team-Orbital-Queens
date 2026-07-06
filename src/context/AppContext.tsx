import React, { createContext, useState, useContext, useEffect } from 'react';
import type { Farm, Alert, Language, ThemeMode } from '../types';
import { mockFarms, mockAlerts } from '../services/mockData';
import { translations } from '../utils/translations';

interface User {
  email: string;
  name: string;
  avatar: string;
}

interface AppContextProps {
  farms: Farm[];
  selectedFarm: Farm;
  setSelectedFarm: (farm: Farm) => void;
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  t: (key: keyof typeof translations['en']) => string;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  resolveAlert: (alertId: string) => void;
  addNewFarm: (farm: Omit<Farm, 'id' | 'historicalNdvi' | 'historicalWater' | 'historicalRainfall' | 'timeLapseImages'>) => void;
  pushNotifications: { id: string; message: string; type: string }[];
  addPushNotification: (message: string, type: string) => void;
  removePushNotification: (id: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>(mockFarms);
  const [selectedFarm, setSelectedFarm] = useState<Farm>(mockFarms[0]);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [pushNotifications, setPushNotifications] = useState<{ id: string; message: string; type: string }[]>([]);

  // Apply dark/light theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const login = (email: string, name: string) => {
    setIsAuthenticated(true);
    setUser({
      email,
      name: name || 'Ramesh Singh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    });
    addPushNotification('Successfully logged in to CropOrbit AI', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    addPushNotification('Alert resolved successfully', 'info');
  };

  const addPushNotification = (message: string, type: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setPushNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto-remove notification after 4 seconds
    setTimeout(() => {
      removePushNotification(id);
    }, 4000);
  };

  const removePushNotification = (id: string) => {
    setPushNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNewFarm = (newFarmData: Omit<Farm, 'id' | 'historicalNdvi' | 'historicalWater' | 'historicalRainfall' | 'timeLapseImages'>) => {
    const id = `farm-${farms.length + 1}`;
    const newFarm: Farm = {
      ...newFarmData,
      id,
      historicalNdvi: [
        { date: '30 Days Ago', value: 0.2 },
        { date: '20 Days Ago', value: 0.3 },
        { date: '10 Days Ago', value: 0.32 },
        { date: 'Current', value: newFarmData.ndvi }
      ],
      historicalWater: [
        { date: 'Week 1', value: 12000 },
        { date: 'Week 2', value: 13000 },
        { date: 'Week 3', value: 14000 },
        { date: 'Week 4', value: newFarmData.waterRequirement }
      ],
      historicalRainfall: [
        { date: 'Jan', value: 10 },
        { date: 'Feb', value: 15 },
        { date: 'Mar', value: 20 },
        { date: 'Apr', value: 30 }
      ],
      timeLapseImages: [
        {
          date: '2026-06-01',
          url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
          ndviUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
          growthStage: 'Germination'
        }
      ]
    };
    setFarms(prev => [...prev, newFarm]);
    setSelectedFarm(newFarm);
    addPushNotification(`New farm "${newFarm.name}" registered successfully!`, 'success');
  };

  const t = (key: keyof typeof translations['en']): string => {
    const dict = translations[language] || translations['en'];
    return (dict as any)[key] || translations['en'][key] || String(key);
  };

  return (
    <AppContext.Provider
      value={{
        farms,
        selectedFarm,
        setSelectedFarm,
        alerts,
        setAlerts,
        language,
        setLanguage,
        theme,
        toggleTheme,
        t,
        isAuthenticated,
        user,
        login,
        logout,
        resolveAlert,
        addNewFarm,
        pushNotifications,
        addPushNotification,
        removePushNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
