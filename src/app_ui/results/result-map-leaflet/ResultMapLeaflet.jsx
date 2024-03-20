import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer, Polyline, useMap } from "react-leaflet";

// Masz to w takim formacie: result = {
//   "permutation": [
//     0,
//     0
//   ],
//   "nodes": [
//     {
//       "x": 0,
//       "y": 0
//     }
//   ]
// }

export function ResultMapLeaflet({ result }) {
  let nodes = [];
  let lines = [];
  let [ center, setCenter ] = useState([51.505, -0.09])

  useEffect(() => {
    if (result && result.nodes && Array.isArray(result.nodes) && result.nodes.length > 0) {
        nodes = result.nodes;
    
        for (let i = 0; i < nodes.length - 1; i++) {
          lines.push([[nodes[i].y, nodes[i].x], [nodes[i + 1].y, nodes[i + 1].x]]);
        }
    
        setCenter([nodes[0].x, nodes[0].y]);
        // const map = useMap();
        // map.setView([nodes[0].x, nodes[0].y], map.getZoom);
      }
  }, [result])

  return (
    <MapContainer
      className="h-[60vh]"
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {nodes.map((node, index) => (
        <Marker key={index} position={[node.y, node.x]}>
          <Popup>
            Coordinate: {node.x}, {node.y}
          </Popup>
        </Marker>
      ))}
      {lines.map((line, index) => (
        <Polyline key={index} positions={line} color="blue" />
      ))}
    </MapContainer>
  );
}
