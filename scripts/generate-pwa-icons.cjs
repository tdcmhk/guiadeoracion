const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crcVal = Buffer.alloc(4);
  crcVal.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crcVal]);
}

function createPng(size, title) {
  const width = size;
  const height = size;
  
  // Create RGBA image buffer with row filter bytes
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const rCard = width * 0.45;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Deep navy background: #070d19 -> r: 7, g: 13, b: 25
      let r = 7;
      let g = 13;
      let b = 25;
      let a = 255;

      // Outer gold circle/border
      if (dist >= rCard - 6 && dist <= rCard) {
        // Gold: #d4af37 -> 212, 175, 55
        r = 212;
        g = 175;
        b = 55;
      } else if (dist < rCard - 6) {
        // Inner gradient
        r = 14 + Math.floor((1 - dist / rCard) * 15);
        g = 24 + Math.floor((1 - dist / rCard) * 20);
        b = 48 + Math.floor((1 - dist / rCard) * 30);

        // Center cross / emblem
        const inCrossV = Math.abs(dx) <= width * 0.04 && dy >= -height * 0.22 && dy <= height * 0.22;
        const inCrossH = Math.abs(dy + height * 0.05) <= height * 0.04 && Math.abs(dx) <= width * 0.18;
        
        // Radio arc 1
        const rArc1 = Math.sqrt(dx * dx + (dy + height * 0.1) * (dy + height * 0.1));
        const inArc1 = Math.abs(rArc1 - width * 0.28) <= 4 && dy < 0;
        const inArc2 = Math.abs(rArc1 - width * 0.20) <= 4 && dy < 0;

        if (inCrossV || inCrossH) {
          r = 251; // #fbbf24
          g = 191;
          b = 36;
        } else if (inArc1 || inArc2) {
          r = 56;  // #38bdf8
          g = 189;
          b = 248;
        }
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(rawData));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const iconsDir = path.join(__dirname, '..', 'public', 'assets', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate 192x192
const png192 = createPng(192);
fs.writeFileSync(path.join(iconsDir, 'icon-192.png'), png192);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'pwa-192x192.png'), png192);

// Generate 512x512
const png512 = createPng(512);
fs.writeFileSync(path.join(iconsDir, 'icon-512.png'), png512);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'pwa-512x512.png'), png512);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), png192);

console.log('Successfully generated PWA PNG icons!');
