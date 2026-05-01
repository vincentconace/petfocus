"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Badge from "../ui/Badge";
import WashedCard from "../ui/WashedCard";
import { useLang } from "@/lib/language-context";
import { translations as T, t } from "@/lib/i18n";

type CountyZone = {
  key: string;
  name: string;
  color: string;
  bounds: { north: number; south: number; east: number; west: number };
};

// Approximate bounding boxes for Northern Utah counties (rough rectangles).
// For production-grade boundaries, swap these for full GeoJSON polygons.
const ZONES: CountyZone[] = [
  {
    key: "davis",
    name: "Davis",
    color: "#8B2332",
    bounds: { north: 41.3, south: 40.95, east: -111.9, west: -112.3 },
  },
  {
    key: "salt-lake",
    name: "Salt Lake",
    color: "#2A8388",
    bounds: { north: 40.95, south: 40.45, east: -111.55, west: -112.25 },
  },
  {
    key: "tooele",
    name: "Tooele",
    color: "#C8A04A",
    bounds: { north: 41.05, south: 40.0, east: -112.3, west: -113.4 },
  },
  {
    key: "utah",
    name: "Utah",
    color: "#2D6E4E",
    bounds: { north: 40.5, south: 39.85, east: -111.3, west: -112.15 },
  },
];

const MAP_STYLES: any[] = [
  { elementType: "geometry", stylers: [{ color: "#FAF6EE" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#FAF6EE" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#4c4c4c" }] },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#E8DFC9" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#B7CFE3" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#F2EAD6" }],
  },
];

let googleMapsLoadingPromise: Promise<void> | null = null;
function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).google?.maps) return Promise.resolve();
  if (googleMapsLoadingPromise) return googleMapsLoadingPromise;
  googleMapsLoadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });
  return googleMapsLoadingPromise;
}

export default function ServiceArea() {
  const { lang } = useLang();
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const polygonsRef = useRef<Record<string, any>>({});
  const mapInstanceRef = useRef<any>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setMapError(true);
      return;
    }
    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const google = (window as any).google;
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 40.65, lng: -112.05 },
          zoom: 8,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          styles: MAP_STYLES,
          backgroundColor: "#FAF6EE",
        });
        mapInstanceRef.current = map;

        const bounds = new google.maps.LatLngBounds();

        ZONES.forEach((zone) => {
          const path = [
            { lat: zone.bounds.north, lng: zone.bounds.west },
            { lat: zone.bounds.north, lng: zone.bounds.east },
            { lat: zone.bounds.south, lng: zone.bounds.east },
            { lat: zone.bounds.south, lng: zone.bounds.west },
          ];
          path.forEach((p) => bounds.extend(p));

          const polygon = new google.maps.Polygon({
            paths: path,
            strokeColor: zone.color,
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: zone.color,
            fillOpacity: 0.18,
            map,
            clickable: true,
          });

          polygon.addListener("mouseover", () => {
            polygon.setOptions({ fillOpacity: 0.36, strokeWeight: 3 });
            setActiveKey(zone.key);
          });
          polygon.addListener("mouseout", () => {
            polygon.setOptions({ fillOpacity: 0.18, strokeWeight: 2 });
            setActiveKey(null);
          });

          polygonsRef.current[zone.key] = polygon;

          // County label
          const center = {
            lat: (zone.bounds.north + zone.bounds.south) / 2,
            lng: (zone.bounds.east + zone.bounds.west) / 2,
          };
          new google.maps.Marker({
            position: center,
            map,
            label: {
              text: zone.name,
              color: "#131313",
              fontSize: "12px",
              fontWeight: "600",
            },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 0,
            },
          });
        });

        map.fitBounds(bounds, 40);
        setMapReady(true);
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  const focusZone = (zone: CountyZone) => {
    const map = mapInstanceRef.current;
    const polygon = polygonsRef.current[zone.key];
    if (!map || !polygon) return;
    const b = new (window as any).google.maps.LatLngBounds();
    polygon.getPath().forEach((p: any) => b.extend(p));
    map.fitBounds(b, 40);
    polygon.setOptions({ fillOpacity: 0.42, strokeWeight: 3 });
    setActiveKey(zone.key);
    window.setTimeout(() => {
      polygon.setOptions({ fillOpacity: 0.18, strokeWeight: 2 });
    }, 1400);
  };

  return (
    <section id="area" className="py-12 lg:py-16">
      <WashedCard innerClassName="py-16 lg:py-24 px-5 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge>{t(T.area.badge, lang)}</Badge>
          <h2 className="display-2 mt-5">{t(T.area.headline, lang)}</h2>
          <p className="mt-4 text-ink-secondary text-lg">
            {t(T.area.sub, lang)}
          </p>
        </div>

        {/* County pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 max-w-3xl mx-auto mb-10">
          {ZONES.map((zone, i) => (
            <motion.button
              key={zone.key}
              onClick={() => focusZone(zone)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group flex items-center gap-2 bg-white border rounded-full pl-4 pr-5 py-2.5 shadow-pill hover:shadow-float-lg hover:-translate-y-0.5 transition-all cursor-pointer ${
                activeKey === zone.key
                  ? "border-ink-primary"
                  : "border-line"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: zone.color }}
              />
              <MapPin size={14} className="text-ink-secondary" />
              <span className="font-display text-base text-ink-primary">
                {zone.name}{" "}
                {zone.key === "utah" && (
                  <span className="text-ink-secondary">County</span>
                )}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Map */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-line shadow-card bg-bg-cream">
          <div
            ref={mapRef}
            className="w-full h-[420px] sm:h-[480px] lg:h-[560px]"
            style={{ backgroundColor: "#FAF6EE" }}
            role="region"
            aria-label="Service area map"
          />

          {/* Loading state */}
          {!mapReady && !mapError && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-cream/80 backdrop-blur-sm pointer-events-none">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-pill">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-sm text-ink-secondary">
                  {lang === "en" ? "Loading map…" : "Cargando mapa…"}
                </span>
              </div>
            </div>
          )}

          {/* Error / no API key fallback — embed with a simple Google Maps view */}
          {mapError && (
            <iframe
              title="Northern Utah service area"
              src="https://www.google.com/maps?q=Northern+Utah&output=embed&z=8"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}

          {/* Floating legend (only when map is ready) */}
          {mapReady && (
            <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 bg-white/90 backdrop-blur-md rounded-2xl border border-line shadow-pill p-3 flex flex-col gap-1.5">
              <div className="text-[0.6rem] uppercase tracking-[0.15em] text-ink-secondary font-semibold mb-1 px-1">
                {lang === "en" ? "Zones" : "Zonas"}
              </div>
              {ZONES.map((z) => (
                <button
                  key={z.key}
                  onClick={() => focusZone(z)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-bg-cream transition-colors cursor-pointer text-left"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: z.color }}
                  />
                  <span className="text-xs text-ink-primary font-medium">
                    {z.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* API key hint (only visible when missing) */}
        {mapError && (
          <p className="mt-4 text-center text-xs text-ink-subtle">
            {lang === "en"
              ? "Tip: set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to render the interactive map with highlighted zones."
              : "Tip: configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para mostrar el mapa interactivo con zonas remarcadas."}
          </p>
        )}
      </WashedCard>
    </section>
  );
}
