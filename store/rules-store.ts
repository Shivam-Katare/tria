import { create } from "zustand";
import type { RulesSettings } from "@/types/rules";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import toast from "react-hot-toast";

interface RulesStore {
  settings: RulesSettings | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  saveSettings: (settings: RulesSettings) => Promise<void>;
  clearError: () => void;
}

export const useRulesStore = create<RulesStore>((set) => ({
  settings: null,
  isLoading: false,
  isSaving: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_ENDPOINTS.RULES);

      const result = await response.json();
      const data = result.settings;

      if (data) {
        const settings: RulesSettings = {
          fullName: data.full_name || "",
          role: data.role || "",
          emailInterests: data.email_interests
            ? data.email_interests.split(",").map((s: string) => s.trim())
            : [],
          communicationStyles: data.communication_styles
            ? data.communication_styles.split(",").map((s: string) => s.trim())
            : [],
          keyConstraints: data.key_constraints || "",
        };
        set({ settings, isLoading: false });
      } else {
        set({
          settings: {
            fullName: "",
            role: "",
            emailInterests: [],
            communicationStyles: [],
            keyConstraints: "",
          },
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        settings: {
          fullName: "",
          role: "",
          emailInterests: [],
          communicationStyles: [],
          keyConstraints: "",
        },
        isLoading: false,
      });
    }
  },

  saveSettings: async (settings: RulesSettings) => {
    set({ isSaving: true, error: null });
    try {
      const payload = {
        full_name: settings.fullName,
        role: settings.role,
        email_interests: settings.emailInterests.join(", "),
        communication_styles: settings.communicationStyles.join(", "),
        key_constraints: settings.keyConstraints,
      };

      const response = await fetch(API_ENDPOINTS.RULES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Failed to save settings. Please try again.");
      }

      set({ settings, isSaving: false });
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
      set({
        error: "Failed to save settings. Please try again.",
        isSaving: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
