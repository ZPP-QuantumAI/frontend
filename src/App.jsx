import { useEffect, useState } from "react";
import { Menu } from "./app_ui/menu/Menu";
import Results from "./app_ui/results/Results";

export default function App() {
  const [keys, setKeys] = useState(
    JSON.parse(sessionStorage.getItem("keys")) || [],
  );

  useEffect(() => sessionStorage.setItem("keys", JSON.stringify(keys)), [keys]);

  return (
    <div className="flex flex-col gap-5">
      <Menu setKeys={setKeys} />
      <Results keys={keys} />
    </div>
  );
}
