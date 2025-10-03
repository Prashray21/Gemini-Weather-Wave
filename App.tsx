import React, { useState, useEffect, useCallback } from 'react';
import { FullWeatherData } from './types';
import { fetchWeatherData } from './services/geminiService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Initializing...');
  const [error, setError] = useState<string | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleSearch = useCallback(async (location: string | { lat: number; lon: number }) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setLoadingMessage(
      typeof location === 'string'
        ? `Searching for ${location}...`
        : 'Fetching weather for your location...'
    );
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setGeoError(null); 
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const requestLocationAndFetchWeather = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser. Defaulting to Tokyo.");
      handleSearch('Tokyo');
      return;
    }

    setLoading(true);
    setLoadingMessage('Requesting location permission...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleSearch({ lat: latitude, lon: longitude });
      },
      (error) => {
        let message = "Could not get your location. Defaulting to Tokyo.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied. Please enable it or search for a city.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable. Please search for a city.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out. Please search for a city.";
            break;
        }
        setGeoError(message);
        handleSearch('Tokyo'); // Fallback to default city
      }
    );
  }, [handleSearch]);

  useEffect(() => {
    requestLocationAndFetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white animated-gradient">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <header className="w-full max-w-4xl mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-2">
            Gemini Weather Wave
          </h1>
          <p className="text-slate-400 mt-1">Futuristic forecasts at your fingertips</p>
        </header>
        
        <main className="w-full max-w-4xl">
          <SearchBar onSearch={handleSearch} onRequestLocation={requestLocationAndFetchWeather} />
           {geoError && (
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-center text-sm rounded-lg">
                {geoError}
              </div>
            )}
          <div className="mt-8 p-6 md:p-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-500">
            {loading && <Loader message={loadingMessage} />}
            {error && <ErrorDisplay message={error} />}
            {weatherData && (
              <div className="flex flex-col gap-8 fade-in">
                <CurrentWeather data={weatherData.current} />
                <HourlyForecast data={weatherData.hourly} />
                <Forecast data={weatherData.forecast} />
              </div>
            )}
          </div>
        </main>
         <footer className="mt-12 text-center text-slate-500 text-sm">
            <p>Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;