import { useState } from "react";
import { ArrowLeft, Sparkles, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Link } from "react-router-dom";

export default function CreateContract() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3); // Jump to preview step
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Create New Contract</h1>
            <p className="text-muted-foreground">Step {step} of 4</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`flex-1 h-2 rounded-full ${
                  num <= step ? "bg-primary" : "bg-secondary"
                } transition-colors`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Details</span>
            <span>Terms</span>
            <span>Preview</span>
            <span>Sign & Lock</span>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <Card className="fintech-card">
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client-email">Client Email</Label>
                  <Input
                    id="client-email"
                    placeholder="client@example.com"
                    type="email"
                  />
                </div>
                <div>
                  <Label htmlFor="freelancer-email">Freelancer Email</Label>
                  <Input
                    id="freelancer-email"
                    placeholder="freelancer@example.com"
                    type="email"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="project-title">Project Title</Label>
                <Input
                  id="project-title"
                  placeholder="E.g., Mobile App Development"
                />
              </div>

              <div>
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe the work to be completed..."
                  rows={4}
                />
              </div>

              <Button onClick={() => setStep(2)} className="w-full">
                Continue to Payment Terms
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="fintech-card">
            <CardHeader>
              <CardTitle>Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Total Amount ($)</Label>
                  <Input
                    id="amount"
                    placeholder="2500"
                    type="number"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select className="w-full px-3 py-2 border border-input rounded-md">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="milestones">Payment Schedule</Label>
                <Textarea
                  id="milestones"
                  placeholder="E.g., 50% upfront, 50% on completion"
                  rows={3}
                />
              </div>

              <div className="border border-card-border rounded-lg p-4 bg-accent-light">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-primary" size={16} />
                  <span className="font-medium text-sm">AI Contract Generator</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Let our AI create a professional contract based on your details
                </p>
                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {isGenerating ? "Generating..." : "Generate Contract with AI"}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Continue to Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="fintech-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye size={20} />
                Contract Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Mobile App Development Agreement</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <p><strong>Client:</strong> client@example.com</p>
                  <p><strong>Freelancer:</strong> freelancer@example.com</p>
                  <p><strong>Total Value:</strong> $2,500 USD</p>
                  <p><strong>Payment Terms:</strong> 50% upfront, 50% on completion</p>
                </div>
              </div>

              <div className="border border-card-border rounded-lg p-4">
                <h4 className="font-medium mb-2">Generated Contract Terms</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>This agreement outlines the development of a mobile application...</p>
                  <p>Deliverables include: Complete mobile app, source code, documentation...</p>
                  <p>Timeline: Project completion within 4 weeks from contract signing...</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back to Edit
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Proceed to Sign
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="fintech-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                Sign & Lock Funds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-warning-light p-4 rounded-lg border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  <strong>Important:</strong> By signing this contract, $1,250 will be locked in escrow.
                  Funds will only be released when both parties agree or through dispute resolution.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Escrow Amount</span>
                  <span className="font-semibold">$1,250</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">Middle Fee (2.5%)</span>
                  <span className="font-semibold">$31.25</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-primary-light rounded-lg">
                  <span className="text-sm font-medium">Total Charge</span>
                  <span className="font-bold">$1,281.25</span>
                </div>
              </div>

              <Button className="w-full funds-lock-animation">
                Sign Contract & Lock Funds
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By continuing, you agree to Middle's Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}