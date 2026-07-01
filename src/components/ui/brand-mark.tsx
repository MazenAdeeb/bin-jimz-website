import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showWordmark?: boolean;
  size?: number;
  monogramOnly?: boolean;
};

export function BrandMark({
  className,
  showWordmark = true,
  size = 40,
  monogramOnly = false,
}: Props) {
  if (!monogramOnly && showWordmark) {
    // Full lockup (shield + "Bin Jimz" wordmark), cropped from the official
    // company profile — the source crop is 1200x1047 (~1.146:1).
    const height = Math.round(size * 2.6);
    return (
      <Image
        src="/brand/bin-jimz-logo.png"
        alt="Bin Jimz"
        width={Math.round(height * 1.146)}
        height={height}
        className={cn("h-auto w-auto object-contain", className)}
        style={{ height, width: "auto" }}
        priority
      />
    );
  }

  return (
    <Image
      src="/brand/bin-jimz-mark.png"
      alt="Bin Jimz"
      width={size}
      height={size}
      className={cn("object-contain", className)}
      style={{ height: size, width: size }}
      priority
    />
  );
}
