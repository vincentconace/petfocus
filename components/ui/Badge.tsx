import { ReactNode } from "react";
import StarIcon from "./StarIcon";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="pill-badge">
      <StarIcon className="text-brand-primary" />
      <span>{children}</span>
    </div>
  );
}
