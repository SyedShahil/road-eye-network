import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X, Image as ImageIcon, ExternalLink, Filter } from "lucide-react";
import { getImagesFromFolder, DropboxImage } from "@/utils/dropbox";

const cities = ["All Cities", "Hyderabad", "Vijayawada", "Bengaluru", "Chennai", "Pune"];
const devices = ["all", "DeviceA", "DeviceB", "DeviceC"]; // Example devices

export default function Data() {
  const [images, setImages] = useState<DropboxImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<DropboxImage | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("All Cities");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch images from Dropbox folder
  useEffect(() => {
    setLoading(true);
    getImagesFromFolder("/Apps/Ruthvik-Pi-Uploader/Hackathon_Data") // replace with your Dropbox folder path
      .then((imgs) => setImages(imgs))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter images (expand later if you have metadata)
  const filteredImages = images; // you can filter by city/device later

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <section className="hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-hero-foreground mb-4">
            Road Data <span className="text-primary">Image Explorer</span>
          </h1>
          <p className="text-lg text-hero-foreground/70">
            Browse road images captured from devices.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
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
                        {devices.map((device) => (
                          <SelectItem key={device} value={device}>
                            {device}
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
                    <input type="date" className="h-10 input" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">End Date</Label>
                    <input type="date" className="h-10 input" />
                  </div>
                </div>

                <Button className="h-10">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Image Grid and Details */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading images...</p>
          ) : (
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Image Grid */}
              <div className="lg:col-span-3">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Captured Images
                  <Badge variant="secondary" className="ml-2">
                    {filteredImages.length}
                  </Badge>
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredImages.map((img) => (
                    <Card
                      key={img.id}
                      className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                        selectedImage?.id === img.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-video rounded-t-lg overflow-hidden bg-muted">
                          <img src={img.link} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="font-medium truncate">{img.name}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Image Details Panel */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Image Details
                </h2>

                {selectedImage ? (
                  <Card className="sticky top-24">
                    <CardContent className="p-0">
                      <div className="aspect-video bg-hero rounded-t-lg overflow-hidden">
                        <img
                          src={selectedImage.link}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex justify-between">
                          <div className="font-medium">{selectedImage.name}</div>
                          <button onClick={() => setSelectedImage(null)}>
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          Path: {selectedImage.path}
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => window.open(selectedImage.link, "_blank")}
                        >
                          Open Image
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="sticky top-24">
                    <CardContent className="p-12 text-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">Select an image to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
