import { ReactNode } from "react";
import StarIcon from "./StarIcon";

/**
 * Eyebrow label — §07 label style (500, small caps, +16% tracking) in
 * Petfocus Green, which is the colour the manual uses for section eyebrows.
 */
export default function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="pill-badge">
      <StarIcon className="text-brand-support" />
      <span>{children}</span>
    </div>
  );
}
