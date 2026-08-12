// 由同一份 16x16 像素格產生 favicon.svg 與 favicon.ico(內嵌 32x32 PNG)
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public');

const GRID = [
  '....KKKKKKKK....',
  '..KKGGGGGGGGKK..',
  '.KKGLLGGGGGGDDK.',
  'KKGGLLGGGGGGDDDK',
  'KGGGLGGGGGGGDDDK',
  'KGGGGGGGGGGDDDDK',
  'KGGGGGGGGGDDDDDK',
  '.KKGGGGGGGDDDDK.',
  '..KKGGGGGDDDKK..',
  '....KKKKKKKK....',
  '......KGDK......',
  '......KGDK......',
  '......KGDK......',
  '......KGDK......',
  '.......GD.......',
  '.......KK.......',
];

const COLORS = {
  K: '#0c0c0e',
  G: '#e8b463',
  L: '#f6d9a8',
  D: '#a8763a',
};

// SVG:同色連續橫向格子合併成一個 rect,減少節點數
function buildSvg() {
  const rects = [];
  GRID.forEach((row, y) => {
    let x = 0;
    while (x < 16) {
      const c = row[x];
      if (c === '.') { x++; continue; }
      let w = 1;
      while (x + w < 16 && row[x + w] === c) w++;
      rects.push(`<rect x="${x}" y="${y}" width="${w}" height="1" fill="${COLORS[c]}"/>`);
      x += w;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">\n${rects.join('\n')}\n</svg>\n`;
}

function hex(c) {
  const h = COLORS[c];
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function buildPng(scale) {
  const size = 16 * scale;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filter: none
    const row = GRID[Math.floor(y / scale)];
    for (let x = 0; x < size; x++) {
      const c = row[Math.floor(x / scale)];
      if (c === '.') { p += 4; continue; }
      const [r, g, b] = hex(c);
      raw[p++] = r; raw[p++] = g; raw[p++] = b; raw[p++] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ICO 允許直接內嵌 PNG(Vista 以後),不必轉 BMP
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4);   // planes
    e.writeUInt16LE(32, 6);  // bpp
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

fs.writeFileSync(path.join(OUT, 'favicon.svg'), buildSvg(), 'utf8');
const pngs = [1, 2].map((s) => ({ size: 16 * s, data: buildPng(s) }));
fs.writeFileSync(path.join(OUT, 'favicon.ico'), buildIco(pngs));
fs.writeFileSync(path.join(OUT, 'favicon-180.png'), buildPng(12)); // 192px,行動裝置加到主畫面用
console.log('done', pngs.map((p) => p.size + 'px ' + p.data.length + 'B').join(', '));
