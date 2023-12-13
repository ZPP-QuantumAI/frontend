import { useState, useEffect } from "react";

function Graph({ graph, setGraph }) {
  const [graphs, setGraphs] = useState(new Map());

  useEffect(() => {
    getGraphs();
  }, []);

  async function getGraphs() {
    let response = await fetch("http://34.116.224.190:8080/graph/");
    response = await response.json();
    setGraphs(new Map(response.map((g) => [g.name, g.nodes])));
  }

  function showGraph(event) {
    setGraph(event.target.value);
  }

  function AddGraph() {
    let regexInput =
      /^([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n)*([+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?\n?)$/;
    let regexNumber = /[+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?/g;

    function addGraph(event) {
      event.preventDefault();

      if (!regexInput.test(event.target[1].value)) {
        alert("Wrong input!");
        return;
      }

      const graph = new Object();
      graph.name = event.target[0].value;
      graph.nodes = event.target[1].value.match(regexNumber).map((s) => {
        const numbers = s.split(" ");
        return { x: parseFloat(numbers[0]), y: parseFloat(numbers[1]) };
      });

      fetch("http://34.116.224.190:8080/graph/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(graph),
      })
        .then(getGraphs)
        .then(() => setGraph(graph.name));
    }

    return (
      <form onSubmit={addGraph} className="flex flex-col gap-2">
        <label>
          Name: <input type="text"></input>
        </label>
        <textarea rows="4" cols="40"></textarea>
        <button type="submit">Add graph</button>
      </form>
    );
  }

  function SelectGraph() {
    return (
      <div className="flex flex-col">
        <select defaultValue={graph} onChange={showGraph}>
          <option value="" disabled hidden>
            Choose graph
          </option>
          {[...graphs].map(([name]) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {graph != "" && (
          <div>
            {graphs.get(graph).map((node, i) => (
              <div key={i}>
                {node.x} {node.y}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-around">
      <AddGraph />
      <SelectGraph />
    </div>
  );
}

export { Graph };
