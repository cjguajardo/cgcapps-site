declare module "atropos";
declare module "cgc-validator";

// Cloudflare Turnstile type definitions
interface TurnstileRenderOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (error: string) => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  tabindex?: number;
  action?: string;
  cData?: string;
  appearance?: "always" | "execute" | "interaction-only";
}

interface Turnstile {
  render(
    container: string | HTMLElement,
    options: TurnstileRenderOptions,
  ): string;
  reset(widgetId?: string): void;
  remove(widgetId?: string): void;
  getResponse(widgetId?: string): string;
}

interface Window {
  turnstile?: Turnstile;
  onloadTurnstileCallback?: () => void;
}
