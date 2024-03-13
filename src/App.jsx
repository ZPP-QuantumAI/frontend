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
      <div className="flex px-2 gap-5 justify-evenly w-full">
        <Results keys={keys} setResult={setResult} />
        <div>
          <div className="text-center">Showed graph</div>
          <div>Grade id: {result && result.getValue("gradeId")}</div>
          <div>Graph id: {result && result.getValue("graphId")}</div>
          <div>
            Permutation: {result && result.getValue("result").permutation}
          </div>
        </div>
      </div>
    </div>
  );
}
