import React from "react";

const paths = {
  logo: <><circle cx="12" cy="8" r="3.2" fill="currentColor" stroke="none"/><circle cx="5.5" cy="12" r="2.4" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="2.4" fill="currentColor" stroke="none"/><path d="M5 20c0-3.6 3-6 7-6s7 2.4 7 6z" fill="currentColor" stroke="none"/></>,
  home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 010 6.8"/><path d="M18 14.3c2 .8 3.5 2.7 3.5 5.7"/></>,
  report: <><path d="M5 3h9l5 5v13H5z"/><path d="M14 3v5h5"/><path d="M9 17v-4M12 17v-6M15 17v-2"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
  bell: <><path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 20a2 2 0 004 0"/></>,
  chevDown: <path d="M6 9l6 6 6-6"/>,
  chevRight: <path d="M9 6l6 6-6 6"/>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  check: <path d="M5 12l5 5 9-10"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6"/></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7"/>,
  headset: <><path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1"/><rect x="17" y="14" width="4" height="6" rx="1"/></>,
  plane: <path d="M10 14l-7 2v-2l7-4V4a2 2 0 014 0v6l7 4v2l-7-2v4l2 1v1l-4-.7-4 .7v-1l2-1z" fill="currentColor"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  more: <><circle cx="12" cy="5" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="19" r="1.4" fill="currentColor"/></>,
};

export default function Icon({ name, size = 20, stroke = 1.8, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
