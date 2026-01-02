export interface Feature {
  icon: any;
  title: string;
  description: string;
  // Optional CTA to render a small link/button for this feature
  cta?: {
    text: string;
    href: string;
    variant?: "primary" | "secondary" | "ghostLight" | "ghostDark";
    target?: string; // e.g. '_blank'
  };
}
