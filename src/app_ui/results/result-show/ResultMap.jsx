import AntPath from "@/reusable/AntPath";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
  useMap,
} from "react-leaflet";

export function ResultMap({ result }) {
  const newResult = { ...result };
  newResult.nodes = newResult.nodes.map(
    ({ longitudeInDecimal, latitudeInDecimal }) => ({
      lng: longitudeInDecimal,
      lat: latitudeInDecimal,
    }),
  );

  return (
    <MapContainer
      className="h-[60vh]"
      center={[0, 0]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ResultMapContent result={newResult} />
      <ZoomControl position="bottomright"></ZoomControl>
    </MapContainer>
  );
}

function ResultMapContent({ result }) {
  const map = useMap();

  const bounds = latLngBounds(result.nodes);
  map.fitBounds(bounds, { padding: [10, 10] });

  return (
    <>
      {result.nodes.map((node, index) => (
        <Marker key={index} position={node}></Marker>
      ))}
      <AntPath positions={result.permutation.map((i) => result.nodes[i])} />
    </>
  );
}
