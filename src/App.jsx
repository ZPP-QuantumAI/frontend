import { useState } from "react";
import { Menu } from "./menu/Menu";
import Results from "./results/Results";

export default function App() {
  const [keys, setKeys] = useState([]);
  

  return (
    <div className="flex flex-col gap-5">
    <Menu setKeys={setKeys} />
    <div className="px-2"><Results keys={keys}/></div>
    </div>
  );
}
