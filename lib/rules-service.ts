import axios from "axios";
import type { RulesSettings } from "@/types/rules";

const RULES_ENDPOINT =
  "http://localhost:8080/api/v1/main/executions/webhook/tria/update-user-settings/update-settings-webhook-key";

export async function saveRulesSettings(
  settings: RulesSettings
): Promise<void> {
  // Convert arrays to comma-separated strings - all values are strings
  const payload = {
    full_name: settings.fullName,
    role: settings.role,
    email_interests: settings.emailInterests.join(", "),
    communication_styles: settings.communicationStyles.join(", "),
    key_constraints: settings.keyConstraints,
  };

  try {
    await axios.post(RULES_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error saving rules settings:", error);
    throw error;
  }
}

export async function loadRulesSettings(): Promise<RulesSettings | null> {
  try {
    const response = await axios.get(RULES_ENDPOINT);
    const data = response.data;

    // Convert comma-separated strings back to arrays
    return {
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
  } catch (error) {
    console.error("Error loading rules settings:", error);
    return null;
  }
}
