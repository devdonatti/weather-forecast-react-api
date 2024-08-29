import Navbar from "./components/Navbar";
import WeatherPanel from "./components/WeatherPanel";

function App() {
  return (
    <div
      className="min-h-screen text-center"
      style={{
        backgroundImage: "url(/cielo.jpg)", // Ajusta el path según la ubicación de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <WeatherPanel />
    </div>
  );
}

export default App;
