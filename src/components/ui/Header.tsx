export const Header = () => {
  return (
    <header className="bg-gray-100 py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Прогноз погоды</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Перейти на главную страницу"
              >
                Главная
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900"
                aria-label="Перейти на страницу 'О нас'"
              >
                О нас
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
