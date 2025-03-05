import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface IData {
  day: number;
  dayChart?: string;
  [key: `temperature_${string}`]: number | string; // Температура для города
  [key: `humidity_${string}`]: number | string; // Влажность для города
  [key: `windSpeed_${string}`]: number | string; // Скорость ветра для города
}

interface Params {
  temperature: boolean;
  humidity: boolean;
  windSpeed: boolean;
}

const WeatherChart = ({ data }: { data: IData[] }) => {
  const [selectedParams, setSelectedParams] = useState<Params>({
    temperature: true,
    humidity: true,
    windSpeed: true,
  });

  // Обработчик изменения состояния чекбоксов
  const handleParamChange = (param: keyof typeof selectedParams) => {
    setSelectedParams((prevParams) => ({
      ...prevParams,
      [param]: !prevParams[param],
    }));
  };

  // Определение ключей данных
  const keysData = Object.keys(data[1]);

  return (
    <div
      style={{
        minWidth: "800px", // Устанавливаем минимальную ширину в 800px
        maxWidth: "100%", // Устанавливаем максимальную ширину в 100%
        height: "700px",
        background: "#f0f0f0",
        padding: "20px",
        border: "2px solid red", // рамка для контроля размеров
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={selectedParams.temperature}
            onChange={() => handleParamChange("temperature")}
          />
          Temperature
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedParams.humidity}
            onChange={() => handleParamChange("humidity")}
          />
          Humidity
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedParams.windSpeed}
            onChange={() => handleParamChange("windSpeed")}
          />
          Wind Speed
        </label>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey={"dayChart"}
            stroke="#333"
            orientation="top"
            angle={45}
          />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          {keysData.map(
            (item) =>
              item.includes("temperature") &&
              selectedParams.temperature && (
                <Line
                  key={item}
                  type="monotone"
                  dataKey={item}
                  stroke={`#ff${Math.floor(Math.random() * 0x4000)
                    .toString(16)
                    .padStart(4, "0")}`}
                  strokeWidth={1}
                  activeDot={{ r: 8 }}
                  name={`Температура ${item.split("_")[1].toUpperCase()} (°C)`}
                />
              )
          )}
          {keysData.map(
            (item) =>
              item.includes("humidity") &&
              selectedParams.humidity && (
                <Line
                  key={item}
                  type="monotone"
                  dataKey={item}
                  stroke={`#00ff${Math.floor(Math.random() * 0x1000)
                    .toString(16)
                    .padStart(4, "0")}`}
                  strokeWidth={2}
                  dot={{ r: 2, fill: "#33cc33" }}
                  activeDot={{ r: 8 }}
                  name={`Влажность ${item.split("_")[1].toUpperCase()} (%)`}
                />
              )
          )}

          {keysData.map(
            (item) =>
              item.includes("windSpeed") &&
              selectedParams.windSpeed && (
                <Line
                  key={item}
                  type="monotone"
                  dataKey={item}
                  stroke={`#0000ff${Math.floor(Math.random() * 0x100)
                    .toString(16)
                    .padStart(2, "0")}`}
                  strokeWidth={2}
                  dot={{ r: 2, fill: "#33cc33" }}
                  activeDot={{ r: 8 }}
                  name={`Ветер ${item.split("_")[1].toUpperCase()} (m/s)`}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default WeatherChart;
