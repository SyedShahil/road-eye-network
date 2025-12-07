export interface Device {
  id: string;
  city: string;
  status: "online" | "offline";
  lastSeen: string;
  thingspeakUrl: string;
}

export const devices: Device[] = [
  {
    id: "pi-01",
    city: "Hyderabad – Hitech City",
    status: "online",
    lastSeen: "5 minutes ago",
    thingspeakUrl: "https://thingspeak.com/channels/123456",
  },
  {
    id: "pi-02",
    city: "Vijayawada – Ring Road",
    status: "offline",
    lastSeen: "25 minutes ago",
    thingspeakUrl: "https://thingspeak.com/channels/789012",
  },
  {
    id: "pi-03",
    city: "Bengaluru – Outer Ring Road",
    status: "online",
    lastSeen: "2 minutes ago",
    thingspeakUrl: "https://thingspeak.com/channels/345678",
  },
  {
    id: "pi-04",
    city: "Chennai – OMR",
    status: "online",
    lastSeen: "1 minute ago",
    thingspeakUrl: "https://thingspeak.com/channels/901234",
  },
  {
    id: "pi-05",
    city: "Mumbai – Western Express Highway",
    status: "offline",
    lastSeen: "1 hour ago",
    thingspeakUrl: "https://thingspeak.com/channels/567890",
  },
  {
    id: "pi-06",
    city: "Pune – Hinjewadi",
    status: "online",
    lastSeen: "8 minutes ago",
    thingspeakUrl: "https://thingspeak.com/channels/234567",
  },
];
