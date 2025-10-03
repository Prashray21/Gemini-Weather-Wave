import React from 'react';
import { HourlyData } from '../types';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  data: HourlyData[];
}

const HourlyCard: React.FC<{ hour: HourlyData }> = ({ hour }) => {
    // Simple format for time, e.g., "3:00 PM" -> "3PM"
    const formattedTime = hour.time.replace(':00', '').replace(' ', '');

    return (
        <div className="flex-shrink-0 flex flex-col items-center justify-between gap-2 p-3 w-20 bg-white/5 rounded-lg text-center transition-all duration-300 hover:bg-white/10">
            <p className="text-sm font-medium text-slate-300">{formattedTime}</p>
            <div className="w-10 h-10 my-1 text-slate-300">
                <WeatherIcon condition={hour.condition} />
            </div>
            <p className="text-lg font-bold">{Math.round(hour.temperature)}°</p>
        </div>
    );
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }
  
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Hourly Forecast</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-thin">
            {data.slice(0, 24).map((hour, index) => (
                <HourlyCard key={index} hour={hour} />
            ))}
        </div>
        <style>{`
          .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: #475569 transparent;
          }
          .scrollbar-thin::-webkit-scrollbar {
            height: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: #475569;
            border-radius: 3px;
          }
        `}</style>
    </div>
  );
};

export default HourlyForecast;