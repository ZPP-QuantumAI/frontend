import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { get } from "@/lib/requests";
import { latLngBounds } from "leaflet";
import { Info, Loader2 } from "lucide-react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useQuery } from "react-query";
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

export function PreviewGraph({ row }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {row.graph.name}
        <Info size={15} className="ml-1 inline" />
      </HoverCardTrigger>
      <HoverCardContent className="w-[40vh]">
        <DisplayGraph id={row.graph.id} />
      </HoverCardContent>
    </HoverCard>
  );
}

function DisplayGraph({ id }) {
  const graph = useQuery("graph", async () => {
    return await get(`/graph/new?graphId=${id}`);
  });
  return (
    <>
      {graph.isLoading && <Loader2 className="m-auto h-20 w-20 animate-spin" />}
      {graph.isSuccess && graph.data.graphType === "MAP" && (
        <MapContainer
          className="h-[40vh]"
          center={[52.21187670838484, 20.982926472010455]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ShowMapGraph graph={graph.data}></ShowMapGraph>
        </MapContainer>
      )}
      {graph.isSuccess && graph.data.graphType === "EUCLIDEAN" && (
        <ShowEuclideanGraph graph={graph.data} />
      )}
    </>
  );
}

const sigmaStyle = { height: "40vh", background: "#E5E4E2" };

function ShowEuclideanGraph({ graph }) {
  return (
    <SigmaContainer style={sigmaStyle}>
      <GraphContent graph={graph} />
    </SigmaContainer>
  );
}

function GraphContent({ graph }) {
  const loadGraph = useLoadGraph();
  const camera = useCamera({ duration: 200, factor: 1.5 });

  useEffect(() => {
    const newGraph = new MultiDirectedGraph();
    graph.graph.nodes.map(({ x, y }, index) =>
      newGraph.addNode(index, { x: x, y: y, size: 7, color: "#3b82f6" }),
    );
    loadGraph(newGraph);
    camera.reset();
  }, [loadGraph, graph, camera]);
}

function ShowMapGraph({ graph }) {
  const nodes = graph.graph.nodes.map(
    ({ longitudeInDecimal, latitudeInDecimal }) => ({
      lng: longitudeInDecimal,
      lat: latitudeInDecimal,
    }),
  );

  const bounds = latLngBounds(nodes);
  const map = useMap();
  map.fitBounds(bounds, { padding: [10, 10] });

  return (
    <>
      {nodes.map((loc, index) => (
        <Marker key={index} position={loc}></Marker>
      ))}
    </>
  );
}
