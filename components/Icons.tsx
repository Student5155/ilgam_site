import type { IconKey } from "@/lib/catalog";
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function WhatsAppIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.4Z" />
    </svg>
  );
}

export function TelegramIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M21.4 3.6 2.9 10.7c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5ZM9.9 14.5l-.4 3.9-1.5-4.8 10.6-6.7-8.7 7.6Z" />
    </svg>
  );
}

export function SearchIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </svg>
  );
}

export function ArrowIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function PinIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ClockIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function CalendarIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function WarehouseIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M3 20V9l9-5 9 5v11" />
      <path d="M7 20v-7h10v7M7 16h10" />
    </svg>
  );
}

export function TruckIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

export function EyeIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...p}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

// Нейтральная графика направлений — вместо стоковых фото
export function CategoryIcon({ icon, ...p }: { icon: IconKey } & P) {
  const props = { viewBox: "0 0 64 64", ...base, strokeWidth: 2, ...p };
  switch (icon) {
    case "cement":
      return (
        <svg {...props}>
          <path d="M16 18c0-3 3-5 6-5h20c3 0 6 2 6 5l3 34c0 2-1.5 3-3 3H16c-1.5 0-3-1-3-3l3-34Z" />
          <path d="M18 13l2-5h24l2 5" />
          <path d="M22 30h20M22 37h20M26 44h12" />
        </svg>
      );
    case "rebar":
      return (
        <svg {...props}>
          {[16, 26, 36, 46].map((y) => (
            <g key={y}>
              <path d={`M6 ${y}h52`} />
              {[12, 20, 28, 36, 44, 52].map((x) => (
                <path key={x} d={`M${x} ${y - 3}l3 6`} />
              ))}
            </g>
          ))}
        </svg>
      );
    case "mesh":
      return (
        <svg {...props}>
          <rect x="8" y="10" width="48" height="44" />
          <path d="M20 10v44M32 10v44M44 10v44M8 21h48M8 32h48M8 43h48" />
        </svg>
      );
    case "sheet":
      return (
        <svg {...props}>
          <path d="M6 24l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6v22l-6-6-6 6-6-6-6 6-6-6-6 6-6-6-6 6Z" />
        </svg>
      );
    case "insulation":
      return (
        <svg {...props}>
          <rect x="8" y="12" width="48" height="12" rx="1" />
          <rect x="8" y="26" width="48" height="12" rx="1" />
          <rect x="8" y="40" width="48" height="12" rx="1" />
          <path d="M14 18h8M30 32h8M44 46h6" />
        </svg>
      );
    case "window":
      return (
        <svg {...props}>
          <rect x="12" y="8" width="40" height="44" />
          <path d="M32 8v44M12 30h40" />
          <path d="M8 52h48v4H8z" />
          <path d="M28 20v6M36 20v6" />
        </svg>
      );
    case "door":
      return (
        <svg {...props}>
          <rect x="18" y="6" width="28" height="52" />
          <path d="M22 10h20v20H22zM22 34h20v20H22z" />
          <circle cx="41" cy="32" r="1.5" />
        </svg>
      );
    case "tire":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="12" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            const x1 = 32 + Math.cos(a) * 16;
            const y1 = 32 + Math.sin(a) * 16;
            const x2 = 32 + Math.cos(a) * 22;
            const y2 = 32 + Math.sin(a) * 22;
            return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
          })}
        </svg>
      );
    case "rim":
      return (
        <svg {...props}>
          <circle cx="32" cy="32" r="24" />
          <circle cx="32" cy="32" r="20" />
          <circle cx="32" cy="32" r="5" />
          {Array.from({ length: 5 }).map((_, i) => {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const x1 = 32 + Math.cos(a) * 7;
            const y1 = 32 + Math.sin(a) * 7;
            const x2 = 32 + Math.cos(a) * 19;
            const y2 = 32 + Math.sin(a) * 19;
            return <path key={i} d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`} />;
          })}
        </svg>
      );
  }
}
