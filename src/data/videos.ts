export interface Video {
  id: string;
  deviceId: string;
  city: string;
  timestamp: string;
  gps: string;
  label: string;
  imuSummary: string;
  videoUrl: string;
  dropboxUrl: string;
}

export const videos: Video[] = [
  {
    id: "vid-001",
    deviceId: "pi-01",
    city: "Hyderabad",
    timestamp: "2025-12-07T12:15:00Z",
    gps: "17.4474, 78.3762",
    label: "Urban · Day",
    imuSummary: "Braking events: 3 · Lane changes: 1",
    videoUrl: "https://www.dropbox.com/s/sample1/road1.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample1/road1.mp4",
  },
  {
    id: "vid-002",
    deviceId: "pi-02",
    city: "Vijayawada",
    timestamp: "2025-12-07T13:40:00Z",
    gps: "16.5062, 80.6480",
    label: "Highway · Night",
    imuSummary: "Braking events: 1 · Lane changes: 4",
    videoUrl: "https://www.dropbox.com/s/sample2/road2.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample2/road2.mp4",
  },
  {
    id: "vid-003",
    deviceId: "pi-03",
    city: "Bengaluru",
    timestamp: "2025-12-07T08:20:00Z",
    gps: "12.9716, 77.5946",
    label: "Urban · Morning",
    imuSummary: "Braking events: 7 · Lane changes: 2",
    videoUrl: "https://www.dropbox.com/s/sample3/road3.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample3/road3.mp4",
  },
  {
    id: "vid-004",
    deviceId: "pi-04",
    city: "Chennai",
    timestamp: "2025-12-07T17:30:00Z",
    gps: "13.0827, 80.2707",
    label: "Urban · Evening",
    imuSummary: "Braking events: 5 · Lane changes: 3",
    videoUrl: "https://www.dropbox.com/s/sample4/road4.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample4/road4.mp4",
  },
  {
    id: "vid-005",
    deviceId: "pi-06",
    city: "Pune",
    timestamp: "2025-12-07T10:45:00Z",
    gps: "18.5204, 73.8567",
    label: "Highway · Day",
    imuSummary: "Braking events: 2 · Lane changes: 6",
    videoUrl: "https://www.dropbox.com/s/sample5/road5.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample5/road5.mp4",
  },
  {
    id: "vid-006",
    deviceId: "pi-01",
    city: "Hyderabad",
    timestamp: "2025-12-06T22:10:00Z",
    gps: "17.3850, 78.4867",
    label: "Urban · Night",
    imuSummary: "Braking events: 4 · Lane changes: 0",
    videoUrl: "https://www.dropbox.com/s/sample6/road6.mp4?raw=1",
    dropboxUrl: "https://www.dropbox.com/s/sample6/road6.mp4",
  },
];
