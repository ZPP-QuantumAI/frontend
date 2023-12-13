import { useEffect } from "react";
import { API_URL } from "./constants";

function Result({ graph, code, result, setResult }) {
  useEffect(() => {
    const solve = new Object();
    solve.pythonCode = code;
    solve.graphName = graph;
    fetch(`${API_URL}/solve/tsp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solve),
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => setResult(response));
  }, []);

  return <div className="flex justify-around">{result}</div>;
}

export { Result };
