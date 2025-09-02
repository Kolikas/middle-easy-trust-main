import { DollarSign, Copy, Send, CheckCircle, Link as LinkIcon } from "lucide-react";
import { TopNavigation, BottomNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { useState } from "react";

export default function RequestPayment() {
  const { showPlaceholder, showSuccess } = useToast();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    payerName: "",
    payerEmail: "",
    amount: "",
    memo: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateRequest = () => {
    if (!formData.payerEmail || !formData.amount) {
      showPlaceholder("Please fill in all required fields");
      return;
    }
    
    showSuccess("Payment request created", "Link has been generated and email sent");
    setStep("success");
  };

  const handleCopyLink = async () => {
    const paymentLink = `https://middle.app/pay/abc123?amount=${formData.amount}`;
    
    try {
      await navigator.clipboard.writeText(paymentLink);
      showSuccess("Link copied", "Payment link copied to clipboard");
    } catch (error) {
      showPlaceholder("Copy link");
    }
  };

  const handleSendEmail = () => {
    showPlaceholder("Send email reminder");
  };

  const handleNewRequest = () => {
    setStep("form");
    setFormData({ payerName: "", payerEmail: "", amount: "", memo: "" });
  };

  if (step === "success") {
    const paymentLink = `https://middle.app/pay/abc123?amount=${formData.amount}`;
    
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation />
        
        <main className="container-fintech py-6">
          <div className="max-w-md mx-auto">
            <div className="fintech-card text-center mb-6">
              <CheckCircle className="mx-auto mb-4 text-success" size={48} />
              <h1 className="text-h1 mb-2">Request Created!</h1>
              <p className="text-body text-muted-foreground">
                Your payment request for {formData.amount} has been created
              </p>
            </div>

            <div className="fintech-card mb-6">
              <h2 className="text-h2 mb-4">Payment Link</h2>
              
              <div className="space-y-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-sm font-mono break-all">{paymentLink}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={handleCopyLink} variant="outline" className="w-full">
                    <Copy size={16} className="mr-2" />
                    Copy Link
                  </Button>
                  <Button onClick={handleSendEmail} variant="outline" className="w-full">
                    <Send size={16} className="mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </div>

            <div className="fintech-card mb-6">
              <h3 className="font-medium mb-2">Request Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <span className="font-medium">{formData.payerEmail}</span>
                </div>
                {formData.memo && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Memo:</span>
                    <span className="font-medium">{formData.memo}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" onClick={handleNewRequest}>
                Create Another Request
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
            <h1 className="text-h1 mb-2">Request Payment</h1>
            <p className="text-body text-muted-foreground">
              Create a payment link to request funds
            </p>
          </div>

          <div className="space-y-6">
            <div className="fintech-card">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="payerName">Payer Name (optional)</Label>
                  <Input
                    id="payerName"
                    placeholder="John Doe"
                    value={formData.payerName}
                    onChange={(e) => handleInputChange("payerName", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="payerEmail">Payer Email *</Label>
                  <Input
                    id="payerEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.payerEmail}
                    onChange={(e) => handleInputChange("payerEmail", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount *</Label>
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
                    placeholder="What's this payment for?"
                    value={formData.memo}
                    onChange={(e) => handleInputChange("memo", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="fintech-card bg-primary-light">
              <div className="flex items-center gap-3">
                <LinkIcon className="text-primary" size={20} />
                <div>
                  <p className="font-medium text-sm">Secure Payment Link</p>
                  <p className="text-xs text-muted-foreground">
                    Link expires in 30 days or after payment
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={handleCreateRequest}>
              <DollarSign size={16} className="mr-2" />
              Create Payment Request
            </Button>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}