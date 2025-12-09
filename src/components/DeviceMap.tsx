import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Fix default marker icon issue
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
  // Accident-prone zone polygon - rectangular area covering central region
  const accidentZone: LatLngExpression[] = [
    [20.6175, 78.9420],
    [20.6175, 78.9600],
    [20.6085, 78.9600],
    [20.6085, 78.9420],
  ];

  // Data Collection Route polyline - curved path matching reference image
  const route: LatLngExpression[] = [
    [20.6250, 78.9680],
    [20.6230, 78.9650],
    [20.6200, 78.9610],
    [20.6170, 78.9570],
    [20.6150, 78.9530],
    [20.6130, 78.9490],
    [20.6110, 78.9450],
    [20.6090, 78.9410],
    [20.6070, 78.9380],
    [20.6050, 78.9360],
  ];

  return (
    <div className="w-full h-full relative">
      <div className="absolute z-[1000] bg-white shadow-md p-3 rounded-lg text-sm m-4">
        <strong>Legend</strong>
        <div className="mt-2 flex flex-col gap-1">
          <span>🔴 Pothole</span>
          <span>🟧 Accident‑Prone Zone</span>
          <span className="text-blue-600">━━ Data Collection Route</span>
        </div>
      </div>

      <MapContainer
        center={[20.6130, 78.9510]}
        zoom={13.2}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution={"© OpenStreetMap contributors"}
        />

        {/* Pothole Markers */}
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng] as LatLngExpression}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

        {/* Accident-Prone Zone */}
        <Polygon
          positions={accidentZone}
          pathOptions={{ 
            color: "#ea580c", 
            fillColor: "#fed7aa", 
            fillOpacity: 0.3,
            weight: 2
          }}
        />

        {/* Data Collection Route */}
        <Polyline 
          positions={route} 
          pathOptions={{ 
            color: "#3b82f6", 
            weight: 3.5, 
            dashArray: "8, 6"
          }} 
        />
      </MapContainer>
    </div>
  );
}