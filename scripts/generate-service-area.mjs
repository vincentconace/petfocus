/**
 * Build the display geometry from the committed UGRC snapshot.
 * Run: node scripts/generate-service-area.mjs
 * Source and download query: docs/service-area.md
 * UTM coordinates preserve local shape and distances without a map dependency.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const source = JSON.parse(readFileSync(new URL('../data/utah-counties.json', import.meta.url), 'utf8'));
if (source.spatialReference?.wkid !== 26912 || source.features?.length !== 29) {
  throw new Error('Expected all 29 Utah counties in NAD83 / UTM zone 12N (EPSG:26912).');
}
const names = ['DAVIS', 'SALT LAKE', 'TOOELE', 'UTAH'];
const keyFor = (name) => name.toLowerCase().replaceAll(' ', '-');
const selected = source.features.filter((f) => names.includes(f.attributes.NAME));
if (selected.length !== 4) throw new Error('Missing a service county.');
const points = (features) => features.flatMap((f) => f.geometry.rings.flat());
const extent = (features) => {
  const p = points(features);
  return [Math.min(...p.map(p => p[0])), Math.min(...p.map(p => p[1])), Math.max(...p.map(p => p[0])), Math.max(...p.map(p => p[1]))];
};
const project = (bounds, width, height, padding) => {
  const [minX, minY, maxX, maxY] = bounds;
  const scale = Math.min((width - padding * 2) / (maxX - minX), (height - padding * 2) / (maxY - minY));
  const offsetX = (width - (maxX - minX) * scale) / 2;
  const offsetY = (height - (maxY - minY) * scale) / 2;
  return ([x,y]) => [Number((offsetX + (x - minX) * scale).toFixed(2)), Number((offsetY + (maxY - y) * scale).toFixed(2))];
};
const regionProject = project(extent(selected), 800, 540, 48);
const stateProject = project(extent(source.features), 100, 132, 5);
const path = (rings, transform) => rings.map(ring => ring.map((point,i) => `${i === 0 ? 'M' : 'L'}${transform(point).join(',')}`).join('') + 'Z').join('');
const centroid = (rings) => {
  // ArcGIS outer rings have consistent winding; largest ring is the mainland.
  const signedArea = ring => ring.slice(0,-1).reduce((a,p,i) => a + p[0] * ring[i+1][1] - ring[i+1][0] * p[1],0);
  const ring = [...rings].sort((a,b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a)))[0];
  let x=0,y=0;
  for(let i=0;i<ring.length-1;i++) {
    const [a,b]=[ring[i],ring[i+1]];
    const cross=a[0]*b[1]-b[0]*a[1];
    x+=(a[0]+b[0])*cross;
    y+=(a[1]+b[1])*cross;
  }
  return [x/(3*signedArea(ring)),y/(3*signedArea(ring))];
};
const output = {
  viewBox: '0 0 800 540',
  counties: source.features.map(f => ({
    key: keyFor(f.attributes.NAME),
    name: f.attributes.NAME,
    fips: f.attributes.FIPS_STR,
    served: names.includes(f.attributes.NAME),
    path: path(f.geometry.rings, regionProject),
    statePath: path(f.geometry.rings, stateProject),
    label: regionProject(centroid(f.geometry.rings)),
  })),
};
writeFileSync(new URL('../lib/service-area-geometry.json', import.meta.url), JSON.stringify(output));
console.log(`Generated ${output.counties.length} county shapes; ${selected.length} service counties.`);
