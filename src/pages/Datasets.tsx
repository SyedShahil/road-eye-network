import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { datasets, Dataset } from "@/data/datasets";
import {
  Car,
  Building2,
  Map,
  ArrowRight,
  Video,
  MapPin,
  Layers,
  ImageIcon,
  Film,
  Eye,
  Send,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const audiences = [
  {
    icon: Car,
    title: "AV & ADAS Startups",
    description:
      "Train perception models on real Indian traffic. No simulation can replicate the chaos of autos, cows, and unmarked lanes.",
  },
  {
    icon: Building2,
    title: "Automotive OEMs",
    description:
      "Validate ADAS features for India-specific conditions. Understand edge cases before they become safety incidents.",
  },
  {
    icon: Map,
    title: "City Planners & Research Labs",
    description:
      "Data-driven insights for road infrastructure planning. Identify high-risk zones and traffic patterns.",
  },
];

export default function Datasets() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-foreground mb-6">
              Data That Understands{" "}
              <span className="text-primary">India's Roads</span>
            </h1>
            <p className="text-lg md:text-xl text-hero-foreground/70 mb-8">
              Curated, multi-modal datasets built from real Indian traffic, not simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero" size="xl">
                    Request Dataset Access
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Dataset Access</DialogTitle>
                    <DialogDescription>
                      Fill in your details and we'll get back to you within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="Company name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dataset">Dataset of Interest</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a dataset" />
                        </SelectTrigger>
                        <SelectContent>
                          {datasets.map((ds) => (
                            <SelectItem key={ds.id} value={ds.id}>
                              {ds.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="all">All Datasets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="use">Intended Use</Label>
                      <Textarea
                        id="use"
                        placeholder="Briefly describe how you plan to use the data..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="heroOutline" size="xl">
                <Eye className="w-5 h-5 mr-2" />
                View Sample Clips
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Audiences Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map((audience) => (
              <Card
                key={audience.title}
                className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <audience.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{audience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {audience.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dataset Catalog */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dataset <span className="text-primary">Catalog</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of Indian road datasets, each capturing unique
              traffic scenarios and conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Card
                key={dataset.id}
                className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg leading-tight">{dataset.name}</h3>
                    <span className="text-primary font-bold text-sm whitespace-nowrap ml-2">
                      {dataset.typicalPriceINR}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {dataset.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <ImageIcon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <div className="text-sm font-semibold">{(dataset.numImages / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-muted-foreground">Images</div>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <Film className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <div className="text-sm font-semibold">{dataset.numVideos}</div>
                      <div className="text-xs text-muted-foreground">Videos</div>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <MapPin className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                      <div className="text-sm font-semibold">{dataset.cities.length}</div>
                      <div className="text-xs text-muted-foreground">Cities</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dataset.modalities.map((mod) => (
                      <Badge
                        key={mod}
                        variant="secondary"
                        className="text-xs"
                      >
                        {mod}
                      </Badge>
                    ))}
                    {dataset.conditions.map((cond) => (
                      <Badge
                        key={cond}
                        className="bg-primary/10 text-primary hover:bg-primary/20 border-0 text-xs"
                      >
                        {cond}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedDataset(dataset)}
                        >
                          Request Access
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button variant="outline" size="sm" className="flex-1">
                      Preview Samples
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hero-foreground mb-6">
            Every frame trains a <span className="text-primary">safer model</span>.
          </h2>
          <p className="text-lg text-hero-foreground/70 mb-8 max-w-2xl mx-auto">
            Subscribe to monthly data feeds and get fresh edge cases delivered straight to your
            training pipeline. Custom data collection available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="hero" size="xl">
                  Talk to Us About Data
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Contact Our Data Team</DialogTitle>
                  <DialogDescription>
                    Discuss custom data collection, licensing, or partnership opportunities.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your data needs..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="heroOutline" size="xl">
              <Download className="w-5 h-5 mr-2" />
              Download Sample Spec
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
