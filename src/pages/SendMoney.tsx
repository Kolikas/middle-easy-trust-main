import { Send, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";
import { mockUser } from "@/lib/mockData";

export default function SendMoney() {
  const { showPlaceholder, showSuccess } = useToast();
  const [step, setStep] = useState<"form" | "review" | "success">("form");
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    memo: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!formData.recipient || !formData.amount) {
      showPlaceholder("Please fill in all required fields");
      return;
    }
    setStep("review");
  };

  const handleConfirm = () => {
    showSuccess("Transfer initiated", "Your transfer has been sent successfully");
    setStep("success");
  };

  const handleNewTransfer = () => {
    setStep("form");
    setFormData({ recipient: "", amount: "", memo: "" });
  };

  // KYC check - if user not verified, show blocking screen
  if (!mockUser.isVerified) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation />
        
        <main className="container-fintech py-6">
          <div className="max-w-md mx-auto">
            <div className="fintech-card text-center">
              <AlertCircle className="mx-auto mb-4 text-warning" size={48} />
              <h1 className="text-h1 mb-2">Verification Required</h1>
              <p className="text-body text-muted-foreground mb-6">
                To send money, you need to complete identity verification first.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="text-success" size={16} />
                  <span>Upload photo ID</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="text-success" size={16} />
                  <span>Take a selfie</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="text-success" size={16} />
                  <span>Verify phone number</span>
                </div>
              </div>

              <Button 
                className="w-full mb-3" 
                onClick={() => window.location.href = "/profile"}
              >
                Continue to Verification
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          </div>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation />
        
        <main className="container-fintech py-6">
          <div className="max-w-md mx-auto">
            <div className="fintech-card text-center">
              <CheckCircle className="mx-auto mb-4 text-success" size={48} />
              <h1 className="text-h1 mb-2">Transfer Sent!</h1>
              <p className="text-body text-muted-foreground mb-6">
                {formData.amount} has been sent to {formData.recipient}
              </p>
              
              <div className="space-y-3">
                <Button className="w-full" onClick={handleNewTransfer}>
                  Send Another Transfer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/"}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </main>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation />
      
      <main className="container-fintech py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h1 className="text-h1 mb-2">Send Money</h1>
            <p className="text-body text-muted-foreground">
              Transfer funds securely to anyone
            </p>
          </div>

          {step === "form" && (
            <div className="space-y-6">
              <div className="fintech-card">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      placeholder="Email or username"
                      value={formData.recipient}
                      onChange={(e) => handleInputChange("recipient", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      placeholder="$0.00"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="memo">Memo (optional)</Label>
                    <Textarea
                      id="memo"
                      placeholder="What's this for?"
                      value={formData.memo}
                      onChange={(e) => handleInputChange("memo", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="fintech-card bg-primary-light">
                <div className="flex items-center gap-3">
                  <Shield className="text-primary" size={20} />
                  <div>
                    <p className="font-medium text-sm">Secure Transfer</p>
                    <p className="text-xs text-muted-foreground">
                      Protected by bank-level encryption
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleContinue}>
                Continue
              </Button>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6">
              <div className="fintech-card">
                <h2 className="text-h2 mb-4">Review Transfer</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">{formData.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold text-lg">{formData.amount}</span>
                  </div>
                  {formData.memo && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Memo:</span>
                      <span className="font-medium">{formData.memo}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee:</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={handleConfirm}>
                  Confirm Transfer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStep("form")}
                >
                  Back to Edit
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}