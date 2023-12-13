import { Stepper, Step } from "react-form-stepper";
import { useState } from "react";
import { Graph } from "./Graph";
import { Algorithm } from "./Algorithm";
import { Result } from "./Result";

export default function App() {
  const [step, setStep] = useState(0);
  const [graph, setGraph] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const tmp = [
    <Graph key={0} graph={graph} setGraph={setGraph} />,
    <Algorithm key={1} code={code} setCode={setCode} />,
    <Result
      key={2}
      graph={graph}
      code={code}
      result={result}
      setResult={setResult}
    />,
  ];

  function goToSelectGraph() {
    setGraph("");
    setCode("");
    setResult("");
    setStep(0);
  }

  function goToPassAlgorithm() {
    setCode("");
    setResult("");
    setStep(1);
  }

  return (
    <div className="flex flex-col">
      <Stepper activeStep={step}>
        <Step
          completed={graph != ""}
          onClick={goToSelectGraph}
          label="Select graph"
        />
        <Step
          completed={code != ""}
          active={graph != ""}
          onClick={goToPassAlgorithm}
          label="Pass algorithm"
        />
        <Step
          completed={result != ""}
          active={code != ""}
          onClick={() => setStep(2)}
          label="Result"
        />
      </Stepper>
      {tmp[step]}
    </div>
  );
}
