import { useState } from "react";
import { Menu } from "./menu/Menu";
import Results from "./results/Results";

export default function App() {
  const [keys, setKeys] = useState([]);
  const [result, setResult] = useState();

  return (
    <div className="flex flex-col gap-5">
    <Menu setKeys={setKeys} />
    <div className="flex px-2 gap-5 justify-evenly w-full"><Results keys={keys} setResult={setResult}/><div><div className="text-center">Showed graph</div><div>Grade id: {result && result.getValue('gradeId')}</div><div>Graph id: {result && result.getValue('graphId')}</div><div>Permutation: {result && result.getValue('result').permutation}</div></div></div>
    </div>
  );
}
