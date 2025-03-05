import { getCelsius } from "@/services/getCelsius";
import { getShortDayOfWeek } from "@/services/getShotDay";
import { IWeather } from "@/services/getWeather";
import React from "react";

interface Props {
  weather: IWeather;
}

const WeatherTable: React.FC<Props> = ({ weather }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{weather.city.name}</h1>
      <div className="max-h-96 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-0 px-4 border-b text-left">День</th>
                <th className="py-0 px-4 border-b text-left">Час</th>
                <th className="py-0 px-4 border-b text-left">Месяц</th>
                <th className="py-0 px-4 border-b text-left">Температура</th>
                <th className="py-0 px-4 border-b text-left">Ощущается</th>
                <th className="py-0 px-4 border-b text-left">Влажность</th>
                <th className="py-0 px-4 border-b text-left">Ветер</th>
                <th className="py-0 px-4 border-b text-left">Осадки</th>
              </tr>
            </thead>
            <tbody>
              {weather.list.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "hover:bg-gray-100"
                  }
                >
                  <td className="py-0 px-4 border-b">
                    {getShortDayOfWeek(item.dt).dayOfWeek.short}
                  </td>
                  <td className="py-0 px-4 border-b">
                    {getShortDayOfWeek(item.dt).hours}
                  </td>
                  <td className="py-0 px-4 border-b">
                    {getShortDayOfWeek(item.dt).month}
                  </td>
                  <td className="py-0 px-4 border-b">
                    {getCelsius(item.main.temp)}°C
                  </td>
                  <td className="py-0 px-4 border-b">
                    {getCelsius(item.main.feels_like)}°C
                  </td>
                  <td className="py-0 px-4 border-b">{item.main.humidity}%</td>
                  <td className="py-0 px-4 border-b">{item.wind.speed} m/s</td>
                  <td className="py-0 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                        className="w-15 h-15 "
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default WeatherTable;