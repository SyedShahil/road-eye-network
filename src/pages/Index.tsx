import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Eye, 
  MapPin, 
  Cpu, 
  Database, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Users
} from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "Edge-First Processing",
    description: "Raspberry Pi units with onboard AI for real-time hazard detection without cloud dependency.",
  },
  {
    icon: MapPin,
    title: "India-Specific Data",
    description: "Trained on Indian roads – autos, cows, potholes, unmarked lanes, and monsoon chaos.",
  },
  {
    icon: Database,
    title: "Multi-Modal Capture",
    description: "Synchronized video, GPS, and IMU data for comprehensive road intelligence.",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "All processing happens on-device. Your journey stays yours.",
  },
];

const stats = [
  { value: "50K+", label: "Kilometers Mapped" },
  { value: "6", label: "Cities Covered" },
  { value: "500+", label: "Hours of Video" },
  { value: "99.2%", label: "Uptime" },
];

const audiences = [
  {
    icon: Smartphone,
    title: "For Riders",
    description: "Real-time alerts for potholes, speed breakers, and road hazards. Stay safe on every journey.",
  },
  {
    icon: Zap,
    title: "For AV Companies",
    description: "India-specific training data that no simulation can replicate. Real chaos, real edge cases.",
  },
  {
    icon: Globe,
    title: "For City Planners",
    description: "Data-driven insights on road conditions, traffic patterns, and infrastructure needs.",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-hero-foreground/10 border border-hero-foreground/20">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm text-hero-foreground/80">AI Road Intelligence for India</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-hero-foreground leading-tight">
                Mapping India's Roads.{" "}
                <span className="text-primary">One Frame at a Time.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-hero-foreground/70 leading-relaxed max-w-xl">
                Low-cost edge devices capturing real-world road data. AI that understands Indian traffic. 
                Building the foundation for safer roads and autonomous vehicles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl">
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  View Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-hero-muted border-2 border-hero flex items-center justify-center text-xs font-medium text-hero-foreground/70"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-hero-foreground/60">
                  <span className="text-primary font-semibold">200+</span> early adopters testing our devices
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <div className="relative bg-hero-muted rounded-3xl p-8 border border-hero-foreground/10">
                <div className="aspect-video bg-hero rounded-xl flex items-center justify-center border border-hero-foreground/10">
                  <div className="text-center">
                    <Eye className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-hero-foreground/50">Live Feed Preview</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {["GPS Active", "IMU Recording", "AI Processing"].map((label) => (
                    <div key={label} className="bg-hero rounded-lg p-3 text-center border border-hero-foreground/10">
                      <CheckCircle className="w-5 h-5 text-success mx-auto mb-1" />
                      <span className="text-xs text-hero-foreground/70">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-primary">India's Roads</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our edge-first approach captures what satellites and simulations miss – the real chaos of Indian traffic.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences Section */}
      <section className="section-padding bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for Riders. <span className="text-primary">Backed by AI.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From everyday commuters to autonomous vehicle developers – our data serves everyone building safer roads.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((audience) => (
              <Card key={audience.title} className="bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <audience.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">{audience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-hero-foreground mb-6">
            Ready to See <span className="text-primary">India's Roads</span> Like Never Before?
          </h2>
          <p className="text-lg text-hero-foreground/70 mb-8 max-w-2xl mx-auto">
            Join our early access program and be part of building safer roads for millions of Indian commuters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Join Early Access
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
