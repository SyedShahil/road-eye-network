import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { devices } from "@/data/devices";
import { MapPin, Cpu, Wifi, WifiOff, ExternalLink, Activity } from "lucide-react";

export default function Devices() {
  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const uniqueCities = new Set(devices.map((d) => d.city.split(" – ")[0])).size;

  const stats = [
    { label: "Total Devices", value: devices.length, icon: Cpu },
    { label: "Online Now", value: onlineDevices, icon: Wifi },
    { label: "Cities Covered", value: uniqueCities, icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-foreground mb-4">
              Deployed Devices Across <span className="text-primary">India</span>
            </h1>
            <p className="text-lg text-hero-foreground/70 max-w-2xl mx-auto">
              Low-cost edge units capturing real-world Indian road data in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Map Placeholder */}
                <div className="lg:col-span-2">
                  <div className="bg-muted rounded-xl h-64 lg:h-80 flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">Interactive Map Coming Soon</p>
                      <p className="text-sm text-muted-foreground/70">Device locations across India</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  {stats.map((stat) => (
                    <Card key={stat.label} className="bg-muted/50 border-border/50">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Devices Table - Desktop */}
          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Device Fleet Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device ID</TableHead>
                    <TableHead>City / Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Sensor Channel</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium font-mono">{device.id}</TableCell>
                      <TableCell>{device.city}</TableCell>
                      <TableCell>
                        <Badge
                          variant={device.status === "online" ? "default" : "destructive"}
                          className={
                            device.status === "online"
                              ? "bg-success hover:bg-success/90"
                              : ""
                          }
                        >
                          {device.status === "online" ? (
                            <Wifi className="w-3 h-3 mr-1" />
                          ) : (
                            <WifiOff className="w-3 h-3 mr-1" />
                          )}
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{device.lastSeen}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-sm">ThingSpeak</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(device.thingspeakUrl, "_blank")}
                        >
                          Open Telemetry
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Devices Cards - Mobile */}
          <div className="md:hidden space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Device Fleet Status
            </h2>
            {devices.map((device) => (
              <Card key={device.id} className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-mono font-bold text-lg">{device.id}</div>
                      <div className="text-sm text-muted-foreground">{device.city}</div>
                    </div>
                    <Badge
                      variant={device.status === "online" ? "default" : "destructive"}
                      className={
                        device.status === "online"
                          ? "bg-success hover:bg-success/90"
                          : ""
                      }
                    >
                      {device.status === "online" ? (
                        <Wifi className="w-3 h-3 mr-1" />
                      ) : (
                        <WifiOff className="w-3 h-3 mr-1" />
                      )}
                      {device.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Last seen: {device.lastSeen}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(device.thingspeakUrl, "_blank")}
                  >
                    Open Telemetry
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
