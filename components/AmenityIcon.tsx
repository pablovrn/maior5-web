const ICONS: Record<string, React.JSX.Element> = {
  "vitrocerámica": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <circle cx="8.5" cy="9" r="2.4" />
      <circle cx="15.5" cy="9" r="2.4" />
      <circle cx="8.5" cy="16" r="2.4" />
      <circle cx="15.5" cy="16" r="2.4" />
    </svg>
  ),
  horno: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="6.5" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <rect x="6" y="12.5" width="12" height="6" rx="1" />
    </svg>
  ),
  nevera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
      <line x1="5" y1="9.5" x2="19" y2="9.5" />
      <line x1="8" y1="5" x2="8" y2="7.5" />
      <line x1="8" y1="12.5" x2="8" y2="15" />
    </svg>
  ),
  lavadora: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <line x1="3" y1="6.5" x2="21" y2="6.5" />
      <circle cx="6.2" cy="4.7" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="4.8" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
  "televisión": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="17" x2="12" y2="20" />
    </svg>
  ),
  "aire acondicionado": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="6" width="19" height="6" rx="1.5" />
      <path d="M6 15c0 1.5 1 2.5 1 4M12 15c0 1.8 1 3 1 5M18 15c0 1.5-1 2.5-1 4" />
    </svg>
  ),
  terraza: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 10 12 3l9 7" />
      <line x1="5" y1="10" x2="5" y2="21" />
      <line x1="19" y1="10" x2="19" y2="21" />
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="5" y1="15" x2="19" y2="15" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export function AmenityIcon({ name }: { name: string }) {
  return ICONS[name] ?? DEFAULT_ICON;
}

export default function AmenityList({ amenities }: { amenities: string[] }) {
  return (
    <ul className="amenity-list">
      {amenities.map((amenity) => (
        <li key={amenity} className="amenity-pill">
          <AmenityIcon name={amenity} />
          <span style={{ textTransform: "capitalize" }}>{amenity}</span>
        </li>
      ))}
    </ul>
  );
}
