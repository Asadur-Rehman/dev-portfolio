"use client";

import { useEffect } from "react";
import { linkedIn } from "@/data/socials";

const SCRIPT_SRC = "https://platform.linkedin.com/badges/js/profile.js";
const SCRIPT_ATTR = "data-linkedin-profile-badge";

type BadgeSize = "small" | "medium" | "large";
type BadgeTheme = "light" | "dark";

type LinkedInBadgeProps = {
  size?: BadgeSize;
  theme?: BadgeTheme;
  className?: string;
};

function loadLinkedInBadgeScript() {
  if (document.querySelector(`script[${SCRIPT_ATTR}]`)) return;

  const script = document.createElement("script");
  script.src = SCRIPT_SRC;
  script.async = true;
  script.defer = true;
  script.setAttribute(SCRIPT_ATTR, "true");
  document.body.appendChild(script);
}

function BadgeMount({
  size,
  theme = "light",
  className = "",
}: LinkedInBadgeProps) {
  return (
    <div className={`linkedin-badge w-full min-w-0 ${className}`.trim()}>
      <div
        className="badge-base LI-profile-badge w-full"
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

/**
 * Official LinkedIn profile badge (Plugin Terms apply).
 * @see https://www.linkedin.com/badges/profile/create
 */
export function LinkedInBadge({ size = "medium", theme = "light", className }: LinkedInBadgeProps) {
  useEffect(() => {
    loadLinkedInBadgeScript();
  }, []);

  return <BadgeMount size={size} theme={theme} className={className} />;
}

/**
 * Responsive badge sizes — horizontal layout fills the sidebar on each breakpoint.
 * LinkedIn API max size is `large` (builder “extra-large” maps to horizontal large).
 */
export function ResponsiveLinkedInBadge({ theme = "light" }: { theme?: BadgeTheme }) {
  useEffect(() => {
    loadLinkedInBadgeScript();
  }, []);

  return (
    <div className="w-full min-w-0" aria-label="LinkedIn profile">
      <div className="sm:hidden">
        <BadgeMount size="small" theme={theme} />
      </div>
      <div className="hidden sm:block lg:hidden">
        <BadgeMount size="medium" theme={theme} />
      </div>
      <div className="hidden lg:block">
        <BadgeMount size="large" theme={theme} />
      </div>
    </div>
  );
}
