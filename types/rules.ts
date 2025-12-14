export interface RulesSettings {
  fullName: string;
  role: string;
  emailInterests: string[]; // Will be joined to comma-separated string
  communicationStyles: string[]; // Will be joined to comma-separated string
  keyConstraints: string;
}

export const COMMUNICATION_STYLE_OPTIONS = [
  { value: "formal", label: "Formal", description: "Professional, structured" },
  { value: "casual", label: "Casual", description: "Relaxed, conversational" },
  { value: "direct", label: "Direct", description: "Straight to the point" },
  { value: "warm", label: "Warm", description: "Friendly, personable" },
  {
    value: "technical",
    label: "Technical",
    description: "Industry-specific terms",
  },
  { value: "concise", label: "Concise", description: "Brief, minimal words" },
] as const;

export const COMMON_TOPICS = [
  "Pricing",
  "Support",
  "Partnerships",
  "Hiring",
  "Product Feedback",
  "Sales",
  "Marketing",
  "Legal",
  "Contracts",
  "Meetings",
  "Demos",
] as const;
