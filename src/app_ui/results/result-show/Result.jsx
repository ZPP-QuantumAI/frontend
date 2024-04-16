import { ResultGraph } from "./ResultGraph";
import { ResultMap } from "./ResultMap";

export function Result({ result }) {
  return (
    <>
      {result?.graphType === "EUCLIDEAN" && (
        <ResultGraph result={result.graph} />
      )}
      {result?.graphType === "MAP" && <ResultMap result={result.graph} />}
    </>
  );
}
