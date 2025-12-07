import { Eye, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-hero text-hero-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Guardian<span className="text-primary">Eye</span>
              </span>
            </Link>
            <p className="text-hero-foreground/70 text-sm leading-relaxed">
              AI-powered road intelligence built for India's unique traffic conditions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/devices" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">Devices</Link></li>
              <li><Link to="/data" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">Data Explorer</Link></li>
              <li><Link to="/datasets" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">Datasets</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-hero-foreground/70 hover:text-hero-foreground transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-hero-foreground/70">
                <Mail className="w-4 h-4" />
                hello@guardianeye.ai
              </li>
              <li className="flex items-center gap-2 text-hero-foreground/70">
                <Phone className="w-4 h-4" />
                +91 40 1234 5678
              </li>
              <li className="flex items-start gap-2 text-hero-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>T-Hub, Hyderabad, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hero-foreground/10 mt-12 pt-8 text-center text-sm text-hero-foreground/50">
          <p>© 2025 Guardian Eye. All rights reserved. Building safer roads for India.</p>
        </div>
      </div>
    </footer>
  );
}
