// Custom toast hook for user feedback
import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  const showPlaceholder = (action: string) => {
    sonnerToast.info(`${action} feature coming soon`, {
      description: "This will be implemented with real backend integration.",
      duration: 3000,
    });
  };

  const showSuccess = (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  };

  const showError = (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  };

  const showLoading = (message: string) => {
    return sonnerToast.loading(message);
  };

  return {
    showPlaceholder,
    showSuccess,
    showError,
    showLoading,
  };
};