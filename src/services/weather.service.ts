import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.API_KEY;

export interface ForecastParams {
  location?: string;
}

export interface SearchLocationParams {
  location?: string;
}

const forecastEndPoint = (params: ForecastParams) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${
    params.location ?? ""
  }&days=7&aqi=no&alerts=no&lang=pt`;

const searchLocationEndPoint = (params: SearchLocationParams) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${
    params.location ?? ""
  }`;

const apiCall = async (endPoint: string) => {
  const options = {
    method: "GET",
    url: endPoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

export const fetchForecastDays = (params: ForecastParams) => {
  return apiCall(forecastEndPoint(params));
};

export const fetchSearchLocations = (params: SearchLocationParams) => {
  return apiCall(searchLocationEndPoint(params));
};
