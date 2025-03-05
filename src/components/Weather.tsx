import { lazy, Suspense, useState } from "react";
import { useFetchIpCity } from "./customHook/useFetchIpCity";
import { useFetchWeather } from "./customHook/useFetchWeather";
import { InputCity } from "./InputCity";
const WeatherTable = lazy(() => import("./WeatherTable"));
const WeatherChart = lazy(() => import("./WeatherChart"));

export interface IData {
  day: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export const Weather = () => {
  const [city, setCity] = useState<string>("");
  const [compareCity, setCompareCity] = useState<boolean>(false);

  const {
    ipCity,
    isLoading: isLoadingIpCity,
    error: errorIpCity,
  } = useFetchIpCity();

  const currentCity = city || ipCity;

  const {
    weather,
    chartData,
    isLoading: isLoadingWeather,
    error: errorWeather,
  } = useFetchWeather(currentCity.toLowerCase(), compareCity);

  const handleClick = (value: string, onCheck: boolean) => {
    setCompareCity(onCheck);
    setCity(value);
  };

  if (isLoadingIpCity) <div>Loading...</div>;
  if (isLoadingWeather) <div>Loading...</div>;
  if (errorIpCity)
    <div className="text-red-500">Error: {errorIpCity.message}</div>;
  if (errorWeather)
    <div className="text-red-500">Error: {errorWeather.message}</div>;

  return (
    <div>
      <InputCity inputCity={handleClick} />

      {weather && !compareCity && (
        <Suspense fallback={<div>Loading table...</div>}>
          <WeatherTable weather={weather} />
        </Suspense>
      )}

      {chartData && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <WeatherChart data={chartData} />
        </Suspense>
      )}
    </div>
  );
};
