import { getCelsius } from "@/services/getCelsius";
import { getShortDayOfWeek } from "@/services/getShotDay";
import { IWeather, getWeather } from "@/services/getWeather";
import { useState, useEffect } from "react";
import { IData } from "../WeatherChart";

export const useFetchWeather = (city: string, compareCity?: boolean) => {
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [chartData, setChartData] = useState<IData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const data = await getWeather(city);
        if (data) {
          setWeather(data);
        }
        const selectParamsCity: IData[] = data.list.map((item) => ({
          day: item.dt,
          dayChart: getShortDayOfWeek(item.dt).dayOfWeek.long,
          [`temperature_${city}`]: getCelsius(item.main.temp),
          [`humidity_${city}`]: item.main.humidity,
          [`windSpeed_${city}`]: item.wind.speed,
        }));

        const addCityForChart = chartData?.map((data) => {
          const result = selectParamsCity.find(
            (param) =>
              param.day === data.day &&
              data[`temperature_${city}`] !== param[`temperature_${city}`]
          );
          return { ...data, ...result };
        });

        setChartData(
          !compareCity ? selectParamsCity : addCityForChart || selectParamsCity
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
        console.error("Error fetching weather:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (city) fetchWeather();
  }, [city]);
  return { weather, chartData, isLoading, error };
};
