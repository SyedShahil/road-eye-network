import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Map as MapIcon,
  Activity,
  Wifi,
  User,
  Clock,
  AlertTriangle,
  Navigation,
  Thermometer,
} from "lucide-react";

const CHANNEL_ID = 3136456;
const RESULTS = 1;

const RoadDataDashboard = () => {
  const [coordinates, setCoordinates] = useState({ lat: "--", lng: "--" });
  const [lastUpdate, setLastUpdate] = useState("Waiting for data...");

  useEffect(() => {
    const fetchThingSpeakData = async () => {
      const url = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?results=${RESULTS}`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.feeds && data.feeds.length > 0) {
          const latest = data.feeds[0];

          // adjust mapping if needed: here assuming field1 = lat, field2 = lng
          if (latest.field1 && latest.field2) {
            setCoordinates({
              lat: parseFloat(latest.field1).toFixed(6),
              lng: parseFloat(latest.field2).toFixed(6),
            });
          }

          const updateTime = new Date(latest.created_at);
          setLastUpdate(updateTime.toLocaleTimeString());
        }
      } catch (error) {
        console.error("Error fetching ThingSpeak data:", error);
      }
    };

    fetchThingSpeakData();
    const interval = setInterval(fetchThingSpeakData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </span>
              GuardianEye — Road Data Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl">
              Real-time monitoring of road hazards and vehicle telemetry for
              safer Indian roads.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="px-4 py-1 text-sm font-medium gap-2 h-9 rounded-full"
            >
              <User className="h-4 w-4" />
              <span className="whitespace-nowrap">
                Person ID:{" "}
                <span className="font-mono font-semibold">#efugs78</span>
              </span>
            </Badge>
            <Badge className="px-4 py-1 text-sm font-medium gap-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/40 h-9 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live System
            </Badge>
          </div>
        </header>

        {/* Info Banner */}
        <Card className="bg-muted/40 border-primary/30 rounded-2xl">
          <CardContent className="flex flex-wrap items-center gap-4 p-5">
            <div className="p-3 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Wifi className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Connected Channel</h3>
              <p className="text-sm text-muted-foreground">
                ThingSpeak Channel ID:{" "}
                <span className="font-mono font-bold text-foreground">
                  {CHANNEL_ID}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid – Acceleration X & Y */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Accel X – NEW STYLE */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Acceleration X-Axis
              </CardTitle>
              <CardDescription>G-Force Latitudinal</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Outer soft container like second image */}
              <div className="rounded-2xl border bg-muted/20 p-3 md:p-4">
                {/* Scrollable inner area with white chart background */}
                <div className="rounded-xl bg-white overflow-x-auto overflow-y-hidden">
                  <iframe
                    className="border-0 w-[700px] h-[260px] md:h-[280px]"
                    src={`https://thingspeak.com/channels/${CHANNEL_ID}/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15`}
                    title="Acceleration X"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accel Y – NEW STYLE */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Acceleration Y-Axis
              </CardTitle>
              <CardDescription>G-Force Longitudinal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/20 p-3 md:p-4">
                <div className="rounded-xl bg-white overflow-x-auto overflow-y-hidden">
                  <iframe
                    className="border-0 w-[700px] h-[260px] md:h-[280px]"
                    src={`https://thingspeak.com/channels/${CHANNEL_ID}/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15`}
                    title="Acceleration Y"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* NEW Charts Grid – Z, Temperature, Potholes */}
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Z Axis */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Acceleration Z-Axis
              </CardTitle>
              <CardDescription>Vertical G-Force</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/20 p-3 md:p-4">
                <div className="rounded-xl bg-white overflow-x-auto overflow-y-hidden">
                  <iframe
                    className="border-0 w-[700px] h-[260px] md:h-[280px]"
                    src="https://thingspeak.com/channels/3136456/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
                    title="Acceleration Z"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary" />
                Temperature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/20 p-3 md:p-4">
                <div className="rounded-xl bg-white overflow-x-auto overflow-y-hidden">
                  <iframe
                    className="border-0 w-[700px] h-[260px] md:h-[280px]"
                    src="https://thingspeak.com/channels/3136456/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
                    title="Temperature"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potholes */}
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Pothole Events
              </CardTitle>
              <CardDescription>Detected road anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/20 p-3 md:p-4">
                <div className="rounded-xl bg-white overflow-x-auto overflow-y-hidden">
                  <iframe
                    className="border-0 w-[700px] h-[260px] md:h-[280px]"
                    src="https://thingspeak.com/channels/3136456/charts/5?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line"
                    title="Potholes"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Location Section */}
        <section>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Navigation className="h-5 w-5 text-primary" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 md:p-5 rounded-xl bg-muted/40 border text-center space-y-1">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em] font-semibold">
                    Latitude
                  </div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary break-all">
                    {coordinates.lat}
                  </div>
                </div>
                <div className="p-4 md:p-5 rounded-xl bg-muted/40 border text-center space-y-1">
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-[0.18em] font-semibold">
                    Longitude
                  </div>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-primary break-all">
                    {coordinates.lng}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last updated:</span>
                <span className="font-mono">{lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Map & Feed Section */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <Card className="lg:col-span-2 rounded-2xl shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapIcon className="h-5 w-5 text-primary" />
                Road Hazard Map
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1.5 bg-red-500/10 text-red-600 px-2.5 py-1 rounded-full border border-red-500/20">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  Potholes
                </div>
                <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  Accident Zones
                </div>
                <div className="flex items-center gap-1.5 bg-sky-500/10 text-sky-600 px-2.5 py-1 rounded-full border border-sky-500/20">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  Route
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-2xl overflow-hidden border bg-background shadow-sm group">
                <img
                  src="/Map.png"
                  alt="Road Hazard Map"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-4">
                  <p className="text-xs md:text-sm text-center text-muted-foreground italic">
                    Live visualization of hazards along the urban route
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Feed */}
          <Card className="h-full flex flex-col rounded-2xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Live Event Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="max-h-[420px] overflow-y-auto pr-2 space-y-3">
                {[
                  { text: "Pothole detected near Sector 14", time: "5.56" },
                  { text: "Near-miss accident detected at NH48", time: "5.58" },
                  { text: "Speed bump detected — moderate impact", time: "6.01" },
                  { text: "Sharp turn — lateral acceleration spike", time: "6.05" },
                  { text: "Braking anomaly — possible obstruction", time: "6.09" },
                  { text: "Pothole detected near City Mall road", time: "6.12" },
                  {
                    text: "Vibration pattern — uneven road surface",
                    time: "6.14",
                  },
                ].map((event, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-start gap-3 p-3 rounded-xl border bg-muted/40 hover:bg-muted/80 transition-colors"
                  >
                    <p className="text-sm font-medium leading-snug">
                      {event.text}
                    </p>
                    <span className="text-xs font-mono text-muted-foreground whitespace-nowrap bg-background border px-1.5 py-0.5 rounded-lg">
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RoadDataDashboard;
