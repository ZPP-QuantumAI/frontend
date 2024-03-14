import { useEffect, useState } from "react";
import { Menu } from "./app_ui/menu/Menu";
import Results from "./app_ui/results/Results";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ResultMapLeaflet } from "./app_ui/results/ResultMapLeaflet";

export default function App() {
  const [keys, setKeys] = useState(
    JSON.parse(sessionStorage.getItem("keys")) || [],
  );
  const [result, setResult] = useState();

  useEffect(() => sessionStorage.setItem("keys", JSON.stringify(keys)), [keys]);

  return (
    <div className="flex flex-col gap-5">
      <Menu setKeys={setKeys} />
      <div className="flex px-5 gap-5 justify-evenly items-start">
        <div className="w-3/5">
          <Results keys={keys} setResult={setResult} />
        </div>
        <div className="w-2/5">
          <ResultMapLeaflet />
        </div>
      </div>
    </div>
  );
}
