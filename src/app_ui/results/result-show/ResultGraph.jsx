import {
  ControlsContainer,
  FullScreenControl,
  SigmaContainer,
  ZoomControl,
  useCamera,
  useLoadGraph,
} from "@react-sigma/core";
import { MultiDirectedGraph } from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useEffect } from "react";

const sigmaStyle = { height: "60vh", background: "#E5E4E2" };
export function ResultGraph({ result }) {
  return (
    <SigmaContainer style={sigmaStyle}>
      <GraphContent result={result} />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl />
      </ControlsContainer>
    </SigmaContainer>
  );
}

function GraphContent({ result }) {
  const loadGraph = useLoadGraph();
  const camera = useCamera({ duration: 200, factor: 1.5 });

  useEffect(() => {
    const graph = new MultiDirectedGraph();
    result.nodes.map(({ x, y }, index) =>
      graph.addNode(index, { x: x, y: y, size: 10, color: "#3b82f6" }),
    );
    for (let i = 0; i < result.permutation.length - 1; i++) {
      const source = result.permutation[i];
      const target = result.permutation[i + 1];
      graph.addDirectedEdge(source, target, { size: 4, color: "#020817" });
    }
    loadGraph(graph);
    camera.reset();
  }, [loadGraph, result, camera]);
}
