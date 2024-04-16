import { useState } from "react";
import { GradePackagesTable } from "./grade-packages-table/GradePackagesTable";
import { ResultMap } from "./result-show/ResultMap";
import { get } from "@/lib/requests";
import { ResultGraph } from "./result-show/ResultGraph";
import { Result } from "./result-show/Result";

export default function Results({ keys }) {
  const [result, setResult] = useState();

  async function changeResult(newResult) {
    const newGraph = await get(`/graph/new?graphId=${newResult.graphId}`);
    newGraph.graph.permutation = newResult.result.permutation;
    setResult(newGraph);
  }

  return (
    <div className="flex px-5 gap-5 justify-evenly items-start">
      <div className="w-3/5">
        <GradePackagesTable keys={keys} changeResult={changeResult} />
      </div>
      <div className="w-2/5">
        {/* <ResultMap result={result} /> */}
        <Result result={result} />
      </div>
    </div>
  );
}
