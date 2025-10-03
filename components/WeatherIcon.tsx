
import React from 'react';

interface WeatherIconProps {
  condition: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('clear')) {
      return (
        // Sun
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="32" cy="32" r="10"/><path d="M32 2v6M32 56v6M2 32h6M56 32h6M9.86 9.86l4.24 4.24M49.9 49.9l-4.24-4.24M9.86 54.14l4.24-4.24M49.9 14.1l-4.24 4.24"/></svg>
      );
    }
    if (lowerCaseCondition.includes('cloud')) {
      return (
        // Cloud
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M41.5 20.5A10.5 10.5 0 0021 20.5a10.4 10.4 0 00-1 .5 12 12 0 00-11 11.5A12.08 12.08 0 009 51h33a11 11 0 000-22 10.87 10.87 0 00-1-5.5z"/></svg>
      );
    }
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
      return (
        // Rain
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M41.5 20.5A10.5 10.5 0 0021 20.5a10.4 10.4 0 00-1 .5 12 12 0 00-11 11.5A12.08 12.08 0 009 51h33a11 11 0 000-22 10.87 10.87 0 00-1-5.5zM24 51v6m8-6v6m8-6v6"/></svg>
      );
    }
    if (lowerCaseCondition.includes('thunderstorm')) {
      return (
        // Thunderstorm
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M41.5 20.5A10.5 10.5 0 0021 20.5a10.4 10.4 0 00-1 .5 12 12 0 00-11 11.5A12.08 12.08 0 009 51h33a11 11 0 000-22 10.87 10.87 0 00-1-5.5z"/><path d="M29 42l-4 8h14l-4-8h-3l-3 6-2-4h-2z"/></svg>
      );
    }
    if (lowerCaseCondition.includes('snow')) {
      return (
        // Snow
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M41.5 20.5A10.5 10.5 0 0021 20.5a10.4 10.4 0 00-1 .5 12 12 0 00-11 11.5A12.08 12.08 0 009 51h33a11 11 0 000-22 10.87 10.87 0 00-1-5.5zM21 54l-3 3 3 3m10-6l-3 3 3 3m10-6l-3 3 3 3m-5-15l3-3-3-3m-10 6l3-3-3-3m-10 6l3-3-3-3"/></svg>
      );
    }
    if (lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog') || lowerCaseCondition.includes('haze')) {
       return (
        // Mist/Fog
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 42h56M4 50h56M20 42V22.4A12.4 12.4 0 0132.4 10h0A12.4 12.4 0 0145 22.4V42"/></svg>
       );
    }
    // Default: Atmosphere/Generic
    return (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 32h6M56 32h6M32 2v6M32 56v6"/></svg>
    );
  };

  return getIcon();
};

export default WeatherIcon;
