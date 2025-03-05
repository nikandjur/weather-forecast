import axios, { AxiosResponse } from "axios";

interface ILocalNames {
  [key: string]: string;
}

interface ICoordinate {
  name: string;
  local_names: ILocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeatherClouds {
  all: number;
}

interface IWeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IWeatherSys {
  pod: string;
}

interface IWeatherItem {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherCondition[];
  clouds: IWeatherClouds;
  wind: IWeatherWind;
  visibility: number;
  pop: number;
  sys: IWeatherSys;
  dt_txt: string;
}

interface ICity {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface IWeather {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherItem[];
  city: ICity;
}

export const getWeather = async (city: string, cnt = 0) => {
  const apiKey: string = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  try {
    const responseDecode: AxiosResponse<ICoordinate[]> = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    const coordinates = responseDecode.data;
    const { lat, lon } = coordinates[0];

    const responseWeather: AxiosResponse<IWeather> = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=ru&cnt=${cnt}&appid=${apiKey}`
    );

    return responseWeather.data;
  } catch (error) {
    throw new Error("Не удалось загрузить данные о погоде.");
    console.error("Error fetching weather:", error);
  }
};
