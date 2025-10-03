import { GoogleGenAI, Type } from "@google/genai";
import { FullWeatherData } from '../types';

// FIX: Per guidelines, assume API_KEY is always available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    current: {
      type: Type.OBJECT,
      properties: {
        city: { type: Type.STRING, description: "The name of the city, corresponding to the provided coordinates if applicable." },
        temperature: { type: Type.NUMBER, description: "Current temperature in Celsius." },
        condition: { type: Type.STRING, description: "General weather condition (e.g., Clear, Clouds, Rain)." },
        humidity: { type: Type.NUMBER, description: "Humidity percentage." },
        windSpeed: { type: Type.NUMBER, description: "Wind speed in km/h." },
        windDirection: { type: Type.STRING, description: "Wind direction (e.g., N, SW, ENE)." },
        feelsLike: { type: Type.NUMBER, description: "The 'feels like' temperature in Celsius." },
        uvIndex: { type: Type.NUMBER, description: "The current UV index value." },
        sunrise: { type: Type.STRING, description: "The time of sunrise in local time (e.g., '6:30 AM')." },
        sunset: { type: Type.STRING, description: "The time of sunset in local time (e.g., '7:45 PM')." },
        aqi: {
          type: Type.OBJECT,
          description: "The current Air Quality Index (AQI) data.",
          properties: {
            value: { type: Type.NUMBER, description: "The overall AQI value." },
            pollutants: {
              type: Type.ARRAY,
              description: "Breakdown of major pollutants.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the pollutant (e.g., 'PM2.5', 'O3')." },
                  concentration: { type: Type.NUMBER, description: "Concentration value of the pollutant." },
                  unit: { type: Type.STRING, description: "Unit of measurement (e.g., 'µg/m³')." }
                },
                required: ["name", "concentration", "unit"]
              }
            }
          },
          required: ["value", "pollutants"]
        },
      },
      required: ["city", "temperature", "condition", "humidity", "windSpeed", "windDirection", "feelsLike", "uvIndex", "aqi", "sunrise", "sunset"],
    },
    hourly: {
      type: Type.ARRAY,
      description: "A 24-hour hourly weather forecast.",
      items: {
        type: Type.OBJECT,
        properties: {
          time: { type: Type.STRING, description: "The time for the forecast hour (e.g., '3:00 PM')." },
          temperature: { type: Type.NUMBER, description: "Temperature in Celsius for that hour." },
          condition: { type: Type.STRING, description: "General weather condition for that hour." },
        },
        required: ["time", "temperature", "condition"],
      },
    },
    forecast: {
      type: Type.ARRAY,
      description: "A 5-day weather forecast.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "The date of the forecast (e.g., 'Jul 25')." },
          day: { type: Type.STRING, description: "The day of the week (e.g., 'Thursday')." },
          maxTemp: { type: Type.NUMBER, description: "Maximum temperature in Celsius." },
          minTemp: { type: Type.NUMBER, description: "Minimum temperature in Celsius." },
          condition: { type: Type.STRING, description: "General weather condition for the day." },
        },
        required: ["date", "day", "maxTemp", "minTemp", "condition"],
      },
    },
  },
  required: ["current", "hourly", "forecast"],
};

export const fetchWeatherData = async (location: string | { lat: number; lon: number }): Promise<FullWeatherData> => {
  try {
    const prompt =
      typeof location === 'string'
        ? `Get the current weather details, a 24-hour hourly forecast, and a 5-day forecast for ${location}. Include wind speed and direction, UV index, sunrise/sunset times, and a detailed air quality index (AQI) with a breakdown of major pollutants like PM2.5, O3, and NO2. Provide all temperatures in Celsius.`
        : `Get the current weather details, a 24-hour hourly forecast, and a 5-day forecast for the location at latitude ${location.lat} and longitude ${location.lon}. Ensure the city name in the response corresponds to these coordinates. Include wind speed and direction, UV index, sunrise/sunset times, and a detailed air quality index (AQI) with a breakdown of major pollutants like PM2.5, O3, and NO2. Provide all temperatures in Celsius.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: weatherSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the API.");
    }
    
    const weatherData: FullWeatherData = JSON.parse(jsonText);
    return weatherData;

  } catch (error) {
    console.error("Error fetching weather data:", error);
    const locationName = typeof location === 'string' ? location : 'your current location';
    throw new Error(`Failed to fetch weather data for ${locationName}. The API may be unavailable or the location might not be found.`);
  }
};
