import { useState } from "react";
import { GradePackagesTable } from "./grade-packages-table/GradePackagesTable";
import { ResultMapLeaflet } from "./result-map-leaflet/ResultMapLeaflet";
import { get } from "@/lib/requests";

export default function Results({ keys }) {
  const [result, setResult] = useState();

  async function changeResult(newResult) {
    const simpleResult = {};
    simpleResult.permutation = newResult.result.permutation;
    simpleResult.nodes = (
      await get(`/graph/?graphId=${newResult.graphId}`)
    ).nodes;
    setResult(simpleResult);
  }

  return (
    <div className="flex px-5 gap-5 justify-evenly items-start">
      <div className="w-3/5">
        <GradePackagesTable keys={keys} changeResult={changeResult} />
      </div>
      <div className="w-2/5">
        <ResultMapLeaflet result={result} />
      </div>
    </div>
  );
}
