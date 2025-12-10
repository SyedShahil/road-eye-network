import { useState, useEffect, useMemo } from "react";
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
import {
  X,
  Image as ImageIcon,
  ExternalLink,
  Filter,
  Calendar as CalendarIcon,
} from "lucide-react";
import { getImagesFromFolder, DropboxImage } from "@/utils/dropbox";

export default function Data() {
  const [images, setImages] = useState<DropboxImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<DropboxImage | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  // 🔹 Filter input states (what user is currently selecting)
  const [deviceInput, setDeviceInput] = useState<string>("all");
  const [cityInput, setCityInput] = useState<string>("all");
  const [startDateInput, setStartDateInput] = useState<string>("");
  const [endDateInput, setEndDateInput] = useState<string>("");

  // 🔹 Applied filter states (what is actually used to filter images)
  const [appliedDevice, setAppliedDevice] = useState<string>("all");
  const [appliedCity, setAppliedCity] = useState<string>("all");
  const [appliedStartDate, setAppliedStartDate] = useState<string>("");
  const [appliedEndDate, setAppliedEndDate] = useState<string>("");

  // SEO
  useEffect(() => {
    document.title = "Road Data Explorer | GuardianEye";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore road usage data captured by our GuardianEye devices across multiple cities."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Explore road usage data captured by our GuardianEye devices across multiple cities.";
      document.head.appendChild(meta);
    }
  }, []);

  // Fetch images from Dropbox
  const fetchImages = () => {
    setLoading(true);
    getImagesFromFolder("/Hackathon_Data")
      .then((imgs) => setImages(imgs))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Extract unique filter options
  const cities = useMemo(() => {
    const citySet = new Set(images.map((img) => img.city || "Unknown"));
    return ["all", ...Array.from(citySet).sort()];
  }, [images]);

  const devices = useMemo(() => {
    const deviceSet = new Set(images.map((img) => img.deviceId || "Unknown"));
    return ["all", ...Array.from(deviceSet).sort()];
  }, [images]);

  // APPLY FILTERS (only uses "applied" states)
  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      // City filter
      const cityMatch =
        appliedCity === "all" || (img.city || "Unknown") === appliedCity;

      // Device filter
      const deviceMatch =
        appliedDevice === "all" ||
        (img.deviceId || "Unknown") === appliedDevice;

      // Date filter
      let dateMatch = true;

      if (appliedStartDate || appliedEndDate) {
        // Assume timestamp starts with YYYY-MM-DD or contains it at the beginning
        const ts = img.timestamp ?? "";
        const imgDateStr = ts.slice(0, 10); // "YYYY-MM-DD"

        // If no usable date string, exclude
        if (!imgDateStr || imgDateStr.length !== 10) {
          dateMatch = false;
        } else {
          if (appliedStartDate && imgDateStr < appliedStartDate) {
            dateMatch = false;
          }
          if (appliedEndDate && imgDateStr > appliedEndDate) {
            dateMatch = false;
          }
        }
      }

      return cityMatch && deviceMatch && dateMatch;
    });
  }, [images, appliedCity, appliedDevice, appliedStartDate, appliedEndDate]);

  // 🔹 When user clicks "Apply Filters"
  const handleApplyFilters = () => {
    // Copy current input values into applied filter state
    setAppliedCity(cityInput);
    setAppliedDevice(deviceInput);
    setAppliedStartDate(startDateInput);
    setAppliedEndDate(endDateInput);

    // Clear selected image, so they see fresh state
    setSelectedImage(null);

    // "Reload" – refetch from Dropbox, then filters are applied on new data
    fetchImages();
  };

  return (
    <div className="min-h-screen bg-background pt-16 font-sans">
      {/* Header */}
      <section className="hero-gradient py-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hero-foreground mb-4 tracking-tight">
            Road Data <span className="text-primary">Image Explorer</span>
          </h1>
          <p className="text-lg text-hero-foreground/70 max-w-2xl mx-auto">
            Browse and analyze road condition images captured by GuardianEye devices.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <Card className="mb-8 border-border shadow-sm bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6 items-end">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Device ID */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-semibold text-foreground/80">
                      Device ID
                    </Label>
                    <Select
                      value={deviceInput}
                      onValueChange={setDeviceInput}
                    >
                      <SelectTrigger className="w-full bg-background border-input">
                        <SelectValue placeholder="Select device" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Devices</SelectItem>
                        {devices.map(
                          (device) =>
                            device !== "all" && (
                              <SelectItem key={device} value={device}>
                                {device}
                              </SelectItem>
                            )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-semibold text-foreground/80">
                      City
                    </Label>
                    <Select value={cityInput} onValueChange={setCityInput}>
                      <SelectTrigger className="w-full bg-background border-input">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map(
                          (city) =>
                            city !== "all" && (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Start Date */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-semibold text-foreground/80">
                      Start Date
                    </Label>
                    <div className="relative">
                      <input
                        type="date"
                        value={startDateInput}
                        onChange={(e) => setStartDateInput(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-semibold text-foreground/80">
                      End Date
                    </Label>
                    <div className="relative">
                      <input
                        type="date"
                        value={endDateInput}
                        onChange={(e) => setEndDateInput(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      />
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Apply Filters Button */}
                <Button
                  className="h-10 px-6 font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                  onClick={handleApplyFilters}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Image Grid and Details */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground animate-pulse">
                Loading data from secure storage...
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Image Grid */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    Captured Images
                  </h2>
                  <Badge variant="secondary" className="px-3 py-1 text-sm">
                    {filteredImages.length} results
                  </Badge>
                </div>

                {filteredImages.length === 0 ? (
                  <div className="py-20 text-center border-2 border-dashed border-muted rounded-xl bg-muted/30">
                    <p className="text-muted-foreground">
                      No images match your filters.
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {filteredImages.map((img) => (
                      <Card
                        key={img.id}
                        className={`group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden ${
                          selectedImage?.id === img.id
                            ? "ring-2 ring-primary ring-offset-2"
                            : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                      >
                        <CardContent className="p-0">
                          <div className="aspect-video bg-muted relative overflow-hidden">
                            <img
                              src={img.link}
                              alt={img.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-4">
                              <p className="text-white text-sm truncate">
                                {img.city || "Unknown City"}
                              </p>
                            </div>
                          </div>
                          <div className="p-4 bg-card">
                            <div className="font-medium truncate">{img.name}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge
                                variant="outline"
                                className="text-xs border-border"
                              >
                                {img.deviceId}
                              </Badge>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {img.timestamp}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Details Panel */}
              <div className="lg:col-span-2">
                <div className="sticky top-24 space-y-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                    <ImageIcon className="w-6 h-6 text-primary" />
                    Details
                  </h2>

                  {selectedImage ? (
                    <Card className="overflow-hidden shadow-lg">
                      <CardContent className="p-0">
                        <div className="aspect-video relative group">
                          <img
                            src={selectedImage.link}
                            className="w-full h-full object-cover"
                          />

                          <a
                            href={selectedImage.link}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        <div className="p-6 space-y-6 bg-card">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-lg line-clamp-1">
                                {selectedImage.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                ID: {selectedImage.id}
                              </p>
                            </div>

                            <button
                              onClick={() => setSelectedImage(null)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border">
                            <div>
                              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                City
                              </span>
                              <p className="font-medium">
                                {selectedImage.city || "N/A"}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                Device ID
                              </span>
                              <p className="font-medium">
                                {selectedImage.deviceId || "N/A"}
                              </p>
                            </div>

                            <div className="col-span-2">
                              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                Timestamp
                              </span>
                              <p className="font-medium font-mono">
                                {selectedImage.timestamp || "N/A"}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              File Path
                            </span>
                            <code className="block w-full p-2 bg-muted rounded text-xs text-muted-foreground overflow-x-auto">
                              {selectedImage.path}
                            </code>
                          </div>

                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                            onClick={() => window.open(selectedImage.link, "_blank")}
                          >
                            Open Full Image
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-dashed border-2 border-muted bg-muted/50">
                      <CardContent className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="p-4 bg-background rounded-full mb-4 shadow-sm">
                          <ImageIcon className="w-8 h-8 text-muted-foreground/70" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground">
                          No Image Selected
                        </h3>
                        <p className="text-muted-foreground max-w-xs mt-2">
                          Select an image from the grid to view high-resolution
                          details and metadata.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
