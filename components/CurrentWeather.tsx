import React from 'react';
import { CurrentWeatherData, AQIData } from '../types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

const DetailItem: React.FC<{ label: string; value: string | number; unit: string }> = ({ label, value, unit }) => (
    <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg text-center">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-lg font-medium">{value}{unit}</span>
    </div>
);

const WindDetailItem: React.FC<{ speed: number; direction: string }> = ({ speed, direction }) => {
    const getRotation = (dir: string): number => {
        const d = dir.toUpperCase();
        if (d === 'N') return 0;
        if (d === 'NNE') return 22.5;
        if (d === 'NE') return 45;
        if (d === 'ENE') return 67.5;
        if (d === 'E') return 90;
        if (d === 'ESE') return 112.5;
        if (d === 'SE') return 135;
        if (d === 'SSE') return 157.5;
        if (d === 'S') return 180;
        if (d === 'SSW') return 202.5;
        if (d === 'SW') return 225;
        if (d === 'WSW') return 247.5;
        if (d === 'W') return 270;
        if (d === 'WNW') return 292.5;
        if (d === 'NW') return 315;
        if (d === 'NNW') return 337.5;
        return 0; // Default
    };

    const rotation = getRotation(direction);

    return (
        <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg text-center">
            <span className="text-sm text-slate-400">Wind</span>
            <div className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-sky-300 transition-transform duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ transform: `rotate(${rotation}deg)` }}
                    aria-label={`Wind direction: ${direction}`}
                    role="img"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
                <span className="text-lg font-medium">{Math.round(speed)} km/h</span>
            </div>
        </div>
    );
};


const UVIndexDisplay: React.FC<{ uvIndex: number }> = ({ uvIndex }) => {
    const getUvIndexInfo = (uv: number) => {
        if (uv <= 2) return { text: 'Low', colorClass: 'text-green-400' };
        if (uv <= 5) return { text: 'Moderate', colorClass: 'text-yellow-400' };
        if (uv <= 7) return { text: 'High', colorClass: 'text-orange-400' };
        if (uv <= 10) return { text: 'Very High', colorClass: 'text-red-400' };
        return { text: 'Extreme', colorClass: 'text-purple-400' };
    };

    const { text, colorClass } = getUvIndexInfo(uvIndex);

    return (
        <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg">
            <span className="text-sm text-slate-400">UV Index</span>
            <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-medium">{uvIndex}</span>
                <span className={`text-sm font-medium ${colorClass}`}>{text}</span>
            </div>
        </div>
    );
};

const TimeItem: React.FC<{ label: 'Sunrise' | 'Sunset'; time: string }> = ({ label, time }) => {
    const icon = label === 'Sunrise' ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636m1.591 1.591L12 12m3.364-3.364 1.591-1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 3v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 18.75h18" />
      </svg>
    );

    return (
      <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-lg text-center">
        <div className="flex items-center gap-2 mb-1">
           <div className="w-5 h-5 text-yellow-300">{icon}</div>
           <span className="text-sm text-slate-400">{label}</span>
        </div>
        <span className="text-lg font-medium tracking-wider">{time}</span>
      </div>
    );
};

const AQIDisplay: React.FC<{ aqiData: AQIData }> = ({ aqiData }) => {
    const getAqiInfo = (index: number) => {
        if (index <= 50) return { text: 'Good', colorClass: 'text-green-400', description: 'Air quality is satisfactory, posing little or no risk.' };
        if (index <= 100) return { text: 'Moderate', colorClass: 'text-yellow-400', description: 'Air quality is acceptable. Some may experience minor effects.' };
        if (index <= 150) return { text: 'Unhealthy SG', colorClass: 'text-orange-400', description: 'Members of sensitive groups may experience health effects.' };
        if (index <= 200) return { text: 'Unhealthy', colorClass: 'text-red-400', description: 'The general public may experience health effects.' };
        if (index <= 300) return { text: 'Very Unhealthy', colorClass: 'text-purple-400', description: 'Health alert: risk of health effects is increased for everyone.' };
        return { text: 'Hazardous', colorClass: 'text-red-600', description: 'Health warning of emergency conditions for the entire population.' };
    };

    const { text, colorClass, description } = getAqiInfo(aqiData.value);

    return (
        <div className="flex flex-col gap-3 p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300">Air Quality</span>
                <div className="flex items-baseline gap-2 px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.2)'}}>
                    <span className="text-lg font-bold">{aqiData.value}</span>
                    <span className={`text-sm font-semibold ${colorClass}`}>{text}</span>
                </div>
            </div>
            <p className="text-xs text-slate-400 text-center border-t border-white/10 pt-2">{description}</p>
            {aqiData.pollutants && aqiData.pollutants.length > 0 && (
                <div className="mt-1">
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
                         {aqiData.pollutants.map(p => (
                             <div key={p.name} className="bg-slate-900/50 p-1.5 rounded">
                                 <span className="text-xs font-bold text-slate-300">{p.name}</span>
                                 <p className="text-sm font-mono text-slate-400">{p.concentration} <span className="text-xs">{p.unit}</span></p>
                             </div>
                         ))}
                     </div>
                </div>
            )}
        </div>
    );
};


const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 md:w-32 md:h-32 text-blue-300">
            <WeatherIcon condition={data.condition} />
        </div>
        <div>
            <h2 className="text-3xl md:text-4xl font-bold">{data.city}</h2>
            <p className="text-lg text-slate-300">{data.condition}</p>
            <p className="text-6xl md:text-7xl font-bold mt-2">{Math.round(data.temperature)}°C</p>
        </div>
      </div>
      <div className="w-full md:w-auto md:min-w-[400px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <DetailItem label="Feels Like" value={Math.round(data.feelsLike)} unit="°" />
            <DetailItem label="Humidity" value={data.humidity} unit="%" />
            <WindDetailItem speed={data.windSpeed} direction={data.windDirection} />
            <UVIndexDisplay uvIndex={data.uvIndex} />
            <TimeItem label="Sunrise" time={data.sunrise} />
            <TimeItem label="Sunset" time={data.sunset} />
        </div>
        <div className="mt-3">
            <AQIDisplay aqiData={data.aqi} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
