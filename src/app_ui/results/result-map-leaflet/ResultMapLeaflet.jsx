// TODO ogarnac to!!!
import AntPath from "@/reusable/AntPath";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

export function ResultMapLeaflet({ result }) {
  const [bounds, setBounds] = useState([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    if (
      result &&
      result.nodes &&
      Array.isArray(result.nodes) &&
      result.nodes.length > 0
    ) {
      const nodes = result.nodes;
      const xCoordinates = nodes.map((node) => node.x);
      const yCoordinates = nodes.map((node) => node.y);

      const minX = Math.min(...xCoordinates);
      const minY = Math.min(...yCoordinates);
      const maxX = Math.max(...xCoordinates);
      const maxY = Math.max(...yCoordinates);

      setBounds([
        [minX, minY],
        [maxX, maxY],
      ]);
    }
  }, [result]);

  return (
    <MapContainer
      className="h-[60vh]"
      center={[0, 0]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <ResultMapContent result={result} bounds={bounds} />
    </MapContainer>
  );
}

function ResultMapContent({ result, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [10, 10] });
    }
  }, [bounds, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {result &&
        result.nodes &&
        Array.isArray(result.nodes) &&
        result.nodes.map((node, index) => (
          <Marker key={index} position={[node.x, node.y]}>
            <Popup>
              Coordinate: {node.x}, {node.y}
            </Popup>
          </Marker>
        ))}
      {result &&
        result.nodes &&
        Array.isArray(result.nodes) &&
        result.nodes.length > 1 &&
        result.permutation.map(
          (i, index) =>
            index < result.nodes.length && (
              <AntPath
                key={index}
                positions={[
                  [result.nodes[i].x, result.nodes[i].y],
                  [
                    result.nodes[result.permutation[index + 1]].x,
                    result.nodes[result.permutation[index + 1]].y,
                  ],
                ]}
              />
            ),
        )}
    </>
  );
}
