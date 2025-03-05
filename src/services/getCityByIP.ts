import axios from "axios";

export const getCityByIP = async (): Promise<string | undefined> => {
  try {
    const response = await axios.get("https://ipinfo.io/json");
    const { city } = response.data;

    if (city) {
      return city;
    } else {
      console.warn("City not found in IP info response.");
      return "Москва"; //
    }
  } catch (error: unknown) {
    console.error("Error fetching IP info:", error);
    return undefined; // Возвращаем undefined в случае ошибки
  }
};
