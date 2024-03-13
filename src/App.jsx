import { useEffect, useState } from "react";
import { Menu } from "./app_ui/menu/Menu";
import Results from "./app_ui/results/Results";

export default function App() {
  const [keys, setKeys] = useState(
    JSON.parse(sessionStorage.getItem("keys")) || [],
  );
  const [result, setResult] = useState();

  useEffect(() => sessionStorage.setItem("keys", JSON.stringify(keys)), [keys]);

  return (
    <div className="flex flex-col gap-5">
      <Menu setKeys={setKeys} />
      <div className="flex px-5 gap-5 justify-evenly">
        <Results className="w-1/2" keys={keys} setResult={setResult} />
        <div className="w-1/2">
          <div className="text-center">Showed graph</div>
          <div>Graph name: {result && result.graphName}</div>
          <div>Permutation: {result && result.result.permutation.map(node => node + " ")}</div>
        </div>
      </div>
    </div>
  );
}
