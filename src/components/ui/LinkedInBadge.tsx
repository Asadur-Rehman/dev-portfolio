"use client";

import { useEffect } from "react";
import { linkedIn } from "@/data/socials";

const SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
const SCRIPT_ATTR = "data-linkedin-profile-badge";

type LinkedInBadgeProps = {
  size?: "small" | "medium" | "large";
  theme?: "light" | "dark";
};

/**
 * Official LinkedIn profile badge (Plugin Terms apply).
 * @see https://www.linkedin.com/badges/profile/create
 */
export function LinkedInBadge({ size = "medium", theme = "light" }: LinkedInBadgeProps) {
  useEffect(() => {
    if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.setAttribute(SCRIPT_ATTR, "true");
    document.body.appendChild(script);
  }, []);

  return (
    <div className="linkedin-badge overflow-x-auto">
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size={size}
        data-theme={theme}
        data-type="HORIZONTAL"
        data-vanity={linkedIn.vanity}
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href={`${linkedIn.url}?trk=profile-badge`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {linkedIn.badgeLabel}
        </a>
      </div>
    </div>
  );
}
