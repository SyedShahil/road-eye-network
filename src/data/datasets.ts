export interface Dataset {
  id: string;
  name: string;
  numImages: number;
  numVideos: number;
  cities: string[];
  modalities: string[];
  conditions: string[];
  typicalPriceINR: string;
  description: string;
}

export const datasets: Dataset[] = [
  {
    id: "ds-01",
    name: "Hyderabad Monsoon Chaos",
    numImages: 10000,
    numVideos: 120,
    cities: ["Hyderabad"],
    modalities: ["Video", "GPS", "IMU"],
    conditions: ["Urban", "Rain", "Night + Day"],
    typicalPriceINR: "₹4.5L+",
    description:
      "Dense urban traffic with autos, 2-wheelers, buses, pedestrians, and heavy rain conditions.",
  },
  {
    id: "ds-02",
    name: "NH65 Highway Dataset",
    numImages: 5000,
    numVideos: 60,
    cities: ["Hyderabad", "Vijayawada"],
    modalities: ["Video", "GPS"],
    conditions: ["Highway", "Dry", "Day"],
    typicalPriceINR: "₹2.2L+",
    description:
      "Multi-lane highway traffic with trucks, buses, lane merges, and overtakes.",
  },
  {
    id: "ds-03",
    name: "Bengaluru Rush Hour",
    numImages: 15000,
    numVideos: 200,
    cities: ["Bengaluru"],
    modalities: ["Video", "GPS", "IMU"],
    conditions: ["Urban", "Peak Traffic", "Day"],
    typicalPriceINR: "₹6.8L+",
    description:
      "Extreme congestion scenarios with two-wheelers, autos, and pedestrian interactions at signals.",
  },
  {
    id: "ds-04",
    name: "Chennai Coastal Drive",
    numImages: 8000,
    numVideos: 90,
    cities: ["Chennai"],
    modalities: ["Video", "GPS"],
    conditions: ["Coastal", "Mixed", "Day + Dusk"],
    typicalPriceINR: "₹3.5L+",
    description:
      "Coastal road conditions with varying visibility, beach traffic, and mixed vehicle types.",
  },
  {
    id: "ds-05",
    name: "Pan-India Night Dataset",
    numImages: 20000,
    numVideos: 300,
    cities: ["Hyderabad", "Bengaluru", "Chennai", "Mumbai", "Pune"],
    modalities: ["Video", "GPS", "IMU"],
    conditions: ["Urban", "Highway", "Night"],
    typicalPriceINR: "₹12L+",
    description:
      "Comprehensive night driving dataset across major metros with varying lighting conditions.",
  },
  {
    id: "ds-06",
    name: "Tier-2 City Mix",
    numImages: 6000,
    numVideos: 80,
    cities: ["Vijayawada", "Visakhapatnam", "Coimbatore"],
    modalities: ["Video", "GPS"],
    conditions: ["Urban", "Semi-Urban", "Day"],
    typicalPriceINR: "₹2.8L+",
    description:
      "Unique traffic patterns from smaller cities with unpredictable road users and infrastructure.",
  },
];
