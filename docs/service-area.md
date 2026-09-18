# Service area and direct contact

The website lists four **counties** within the state of Utah: Davis, Salt Lake,
Tooele, and Utah County. They are separate administrative areas, each containing
multiple cities. Utah County is not the entire state of Utah. The site already
identified all four as its service area; the new display preserves that scope.

## Map behavior

All four county polygons are visible together. Hovering or focusing either a
county or its list link highlights the corresponding shape without hiding the
others. Clicking either opens that county in Google Maps in a new tab, using
Google's documented Maps URL format (`api=1` and a county-specific `query`).

The local SVG is a geographic coverage overview, not a street map. No API key,
external map script, tile provider, or iframe is required. The state inset is
shown at larger sizes; native links in the list remain easy to use on phones.

The previous implementation used approximate rectangular polygons. Without a
Google Maps API key, it fell back to an iframe searching for “Northern Utah”,
and the county buttons did not control that iframe. Neither those rectangles
nor the generic search represented the four county boundaries accurately.

## Geographic source and reproduction

- Steward: State of Utah, SGID / Utah Geospatial Resource Center (UGRC).
- Source: https://gis.utah.gov/products/sgid/boundaries/county/
- Feature service: https://services1.arcgis.com/99lidPhWCzftIe9K/ArcGIS/rest/services/UtahCountyBoundaries/FeatureServer/0
- Snapshot retrieved: 2026-09-18.
- Source snapshot: `data/utah-counties.json`, containing all 29 counties.
- Query: `where=1=1`, `outFields=NAME,FIPS_STR`, `outSR=26912`,
  `maxAllowableOffset=150`, `geometryPrecision=0`, `returnGeometry=true`, `f=json`.
- Projection: NAD83 / UTM zone 12N (EPSG:26912), with north up.
- Geometry is generalized by the service to a maximum 150 m offset for a small
  web overview. It is for orientation, not a legal boundary survey.
- Source attribution is linked immediately below the map.

Regenerate the display data from the committed snapshot:

```sh
node scripts/generate-service-area.mjs
```

This writes `lib/service-area-geometry.json`. No generation or network request is
needed at runtime. The generator checks the source projection and county count.
Service county FIPS codes are 49011, 49035, 49045, and 49049.

Refresh the source snapshot with the public feature service's `/query` endpoint
and the above parameters, then rerun the generator and inspect the map. The
source page's update history and feature-service description can carry different
dates; the retrieval date above identifies this particular snapshot.

## Contact

The final CTA contains explicit `tel:+13853819161` and `sms:+13853819161` links.
The email signup, its simulated submission confirmation, and the footer email
have been removed. The footer now includes the SMS link. No message is sent by
the website: the SMS link opens the visitor's messaging application to compose.

If a navigable Google map is preferred later, the same county geometries can be
loaded as polygons in Google Maps, or Google's boundary feature styling can be
configured. Keep all four visible initially and do not infer a coverage boundary
from a place marker or a generic region search.

Google Maps URL reference: https://developers.google.com/maps/documentation/urls/get-started
Google boundary styling: https://developers.google.com/maps/documentation/javascript/dds-boundaries/style-polygon
