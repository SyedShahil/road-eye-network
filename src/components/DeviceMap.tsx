import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Fix default marker icon issue
const DefaultIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

L.Marker.prototype.options.icon = DefaultIcon;

interface DeviceLocation {
  lat: number;
  lng: number;
  name: string;
}

interface Props {
  locations: DeviceLocation[];
}

export default function DeviceMap({ locations }: Props) {
  const indiaCenter: LatLngExpression = [20.5937, 78.9629];

  return (
    <MapContainer
      center={indiaCenter}
      zoom={5}
      scrollWheelZoom={true}
      className="w-full h-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={"© OpenStreetMap contributors" as string}
      />

      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.lat, loc.lng] as LatLngExpression}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
