import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polyline,
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
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <ResultMapContent result={result} bounds={bounds} />
    </MapContainer>
  );
}

function ResultMapContent({ result, bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
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
        result.nodes.map(
          (node, index) =>
            index < result.nodes.length - 1 && (
              <Polyline
                key={index}
                positions={[
                  [node.x, node.y],
                  [result.nodes[index + 1].x, result.nodes[index + 1].y],
                ]}
                color="blue"
              />
            ),
        )}
    </>
  );
}
