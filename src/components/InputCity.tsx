import React, { useState } from "react";

interface Props {
  inputCity: (city: string, checked: boolean) => void;
}

export const InputCity: React.FC<Props> = ({ inputCity }) => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  const handleClick = () => {
    // Проверка на валидность ввода
    if (validateInput(input)) {
      setError(""); // Сбрасываем ошибку
      inputCity(input, checked);
      setInput("");
    } else {
      setError("Пожалуйста, введите корректное название города."); // Устанавливаем сообщение об ошибке
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.dir(e.target.checked);
    setChecked(e.target.checked);
  };

  const validateInput = (city: string): boolean => {
    // Проверяем, что строка не пустая и содержит только буквы
    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(city.trim());
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-center items-center gap-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={handleInput}
            placeholder="название города"
            className={`border ${error ? "border-red-500" : "border-gray-300"}`} // Добавляем красную рамку при ошибке
          />
        </div>
        <button className="border border-amber-700 px-4" onClick={handleClick}>
          найти прогноз
        </button>
        <div>
          <input type="checkbox" checked={checked} onChange={handleCheck} />
          <span className="ml-2">Сравнить с другим городом</span>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};
