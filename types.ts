// FIX: Removed self-import of 'Pollutant' to resolve a name conflict.
export interface Pollutant {
  name: string;
  concentration: number;
  unit: string;
}

export interface AQIData {
  value: number;
  pollutants: Pollutant[];
}

export interface CurrentWeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  feelsLike: number;
  uvIndex: number;
  aqi: AQIData;
  sunrise: string;
  sunset: string;
}

export interface ForecastDay {
  date: string;
  day: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
}

export interface HourlyData {
  time: string;
  temperature: number;
  condition: string;
}

export interface FullWeatherData {
  current: CurrentWeatherData;
  hourly: HourlyData[];
  forecast: ForecastDay[];
}
