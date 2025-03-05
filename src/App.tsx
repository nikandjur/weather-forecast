import "./App.css";
import { Layout } from "./components/ui/Layout";
import { Weather } from "./components/Weather";

function App() {
  return (
    <Layout>
      <h2 className="text-lg font-bold p-4">Погода на 5 дней</h2>
      <Weather />
    </Layout>
  );
}

export default App;
