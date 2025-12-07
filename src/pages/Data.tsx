import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { videos, Video } from "@/data/videos";
import { devices } from "@/data/devices";
import {
  Video as VideoIcon,
  MapPin,
  Calendar,
  Navigation,
  Activity,
  ExternalLink,
  Filter,
  Play,
  X,
} from "lucide-react";
import { format } from "date-fns";

const cities = ["All Cities", "Hyderabad", "Vijayawada", "Bengaluru", "Chennai", "Pune"];

export default function Data() {
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesDevice = selectedDeviceId === "all" || video.deviceId === selectedDeviceId;
      const matchesCity = selectedCity === "All Cities" || video.city === selectedCity;
      return matchesDevice && matchesCity;
    });
  }, [selectedDeviceId, selectedCity]);

  const formatDate = (timestamp: string) => {
    return format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-foreground mb-4">
              Road Data <span className="text-primary">Explorer</span>
            </h1>
            <p className="text-lg text-hero-foreground/70 max-w-2xl mx-auto">
              Browse footage, GPS and sensor-rich trips from our edge devices.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Device</Label>
                    <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Devices</SelectItem>
                        {devices.map((device) => (
                          <SelectItem key={device.id} value={device.id}>
                            {device.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">City</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Start Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">End Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                </div>
                <Button className="h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Video Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <VideoIcon className="w-5 h-5 text-primary" />
                Captured Footage
                <Badge variant="secondary" className="ml-2">
                  {filteredVideos.length} clips
                </Badge>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                      selectedVideo?.id === video.id
                        ? "ring-2 ring-primary border-primary"
                        : "hover:border-primary/30"
                    }`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <CardContent className="p-0">
                      {/* Thumbnail */}
                      <div className="aspect-video bg-hero rounded-t-lg flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                        <VideoIcon className="w-12 h-12 text-hero-foreground/50" />
                        <div className="absolute inset-0 bg-hero/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-hero-foreground" />
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-mono text-sm text-muted-foreground">
                              {video.deviceId}
                            </div>
                            <div className="font-medium">{video.city}</div>
                          </div>
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            {video.label}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(video.timestamp)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Video Details Panel */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Video Details
              </h2>
              {selectedVideo ? (
                <Card className="sticky top-24">
                  <CardContent className="p-0">
                    {/* Video Player */}
                    <div className="aspect-video bg-hero rounded-t-lg relative">
                      <video
                        className="w-full h-full object-cover rounded-t-lg"
                        controls
                        poster=""
                        src={selectedVideo.videoUrl}
                      >
                        <source src={selectedVideo.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                          {selectedVideo.label}
                        </Badge>
                        <button
                          onClick={() => setSelectedVideo(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <VideoIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs">Device ID</div>
                            <div className="font-mono font-medium">{selectedVideo.deviceId}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs">City</div>
                            <div className="font-medium">{selectedVideo.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs">Timestamp</div>
                            <div className="font-medium">{formatDate(selectedVideo.timestamp)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Navigation className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs">GPS Coordinates</div>
                            <div className="font-mono text-sm">{selectedVideo.gps}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Activity className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs">IMU Summary</div>
                            <div className="font-medium">{selectedVideo.imuSummary}</div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(selectedVideo.dropboxUrl, "_blank")}
                      >
                        Open in Dropbox
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="sticky top-24">
                  <CardContent className="p-12 text-center">
                    <VideoIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select a video to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
