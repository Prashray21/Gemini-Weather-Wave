
import React from 'react';
import { ForecastDay } from '../types';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  data: ForecastDay[];
}

const ForecastCard: React.FC<{ day: ForecastDay }> = ({ day }) => {
    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <p className="font-semibold text-slate-300">{day.day.substring(0, 3)}</p>
            <p className="text-sm text-slate-400">{day.date}</p>
            <div className="w-12 h-12 my-2 text-slate-300">
                <WeatherIcon condition={day.condition} />
            </div>
            <p className="font-medium">
                {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
            </p>
        </div>
    );
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div>
        <h3 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">5-Day Forecast</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {data.slice(0, 5).map((day, index) => (
                <ForecastCard key={index} day={day} />
            ))}
        </div>
    </div>
  );
};

export default Forecast;
