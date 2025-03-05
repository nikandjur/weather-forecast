import { getCityByIP } from "@/services/getCityByIP";
import { useEffect, useState } from "react";

export const useFetchIpCity = () => {
  const [ipCity, setIpCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchIpCity = async () => {
      try {
        setIsLoading(true);
        setError(null); // Сбрасываем ошибку
        setIpCity(""); // Сбрасываем город
        const city = await getCityByIP();
        if (city) {
          setIpCity(city);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
        console.error("Error fetching IP city:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchIpCity();
  }, []);

  return { ipCity, isLoading, error };
};
