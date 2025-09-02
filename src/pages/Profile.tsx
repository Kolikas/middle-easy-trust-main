import { User, Shield, Star, Camera, Link as LinkIcon, Instagram, Twitter } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Profile & Verification</h1>
          <p className="text-muted-foreground">Build trust with verified identity and social links</p>
        </div>

        {/* Profile Header */}
        <Card className="fintech-card mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  <Camera size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-muted-foreground">alex.johnson@email.com</p>
                <div className="flex items-center gap-2 mt-2">
                  <Shield className="text-success" size={16} />
                  <span className="text-sm text-success font-medium">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Trust Score */}
            <div className="bg-gradient-surface p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="text-primary" size={18} />
                  <span className="font-semibold">Trust Score</span>
                </div>
                <span className="text-2xl font-bold text-primary">98%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2 mb-2">
                <div className="bg-gradient-primary h-2 rounded-full" style={{ width: "98%" }} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                <div className="text-center">
                  <div className="font-semibold text-foreground">12</div>
                  <div>Completed</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">0</div>
                  <div>Disputes</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-foreground">4.9</div>
                  <div>Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="fintech-card mb-6">
          <CardHeader>
            <CardTitle>Identity Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="text-success" size={18} />
                <div>
                  <p className="font-medium text-success-foreground">Photo ID Verified</p>
                  <p className="text-xs text-success-foreground/80">Driver's license confirmed</p>
                </div>
              </div>
              <span className="text-success font-medium text-sm">✓ Verified</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
              <div className="flex items-center gap-3">
                <Camera className="text-success" size={18} />
                <div>
                  <p className="font-medium text-success-foreground">Selfie Verification</p>
                  <p className="text-xs text-success-foreground/80">Identity confirmed</p>
                </div>
              </div>
              <span className="text-success font-medium text-sm">✓ Verified</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <User className="text-muted-foreground" size={18} />
                <div>
                  <p className="font-medium">Phone Number</p>
                  <p className="text-xs text-muted-foreground">Add for extra security</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Add</Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="fintech-card">
          <CardHeader>
            <CardTitle>Social Verification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-light rounded-lg">
              <div className="flex items-center gap-3">
                <LinkIcon className="text-primary" size={18} />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">@alexjohnson-dev</p>
                </div>
              </div>
              <span className="text-primary font-medium text-sm">✓ Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <Instagram className="text-muted-foreground" size={18} />
                <div>
                  <p className="font-medium">Instagram</p>
                  <p className="text-xs text-muted-foreground">Link your Instagram</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <Twitter className="text-muted-foreground" size={18} />
                <div>
                  <p className="font-medium">Twitter/X</p>
                  <p className="text-xs text-muted-foreground">Link your Twitter</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}