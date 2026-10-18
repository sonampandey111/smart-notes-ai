/**
 * Computer Vision & Colorimetric Utility Functions for AquaStrip AI
 * Includes CIE L*a*b* conversion, Delta-E 1976/2000 color difference,
 * white balance normalization, and canvas pixel extraction.
 */

// Convert RGB (0-255) to Hex string
export function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert Hex string to RGB {r, g, b}
export function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16)
    };
  }
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16)
  };
}

// Convert sRGB to CIE XYZ color space
export function rgbToXyz(r, g, b) {
  let sR = r / 255;
  let sG = g / 255;
  let sB = b / 255;

  sR = sR > 0.04045 ? Math.pow((sR + 0.055) / 1.055, 2.4) : sR / 12.92;
  sG = sG > 0.04045 ? Math.pow((sG + 0.055) / 1.055, 2.4) : sG / 12.92;
  sB = sB > 0.04045 ? Math.pow((sB + 0.055) / 1.055, 2.4) : sB / 12.92;

  sR *= 100;
  sG *= 100;
  sB *= 100;

  // D65 Standard Illuminant matrix
  const x = sR * 0.4124564 + sG * 0.3575761 + sB * 0.1804375;
  const y = sR * 0.2126729 + sG * 0.7151522 + sB * 0.0721750;
  const z = sR * 0.0193339 + sG * 0.1191920 + sB * 0.9503041;

  return { x, y, z };
}

// Convert CIE XYZ to CIE L*a*b* color space
export function xyzToLab(x, y, z) {
  // D65 reference white point
  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  let xR = x / refX;
  let yR = y / refY;
  let zR = z / refZ;

  const f = (t) => (t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116);

  const fx = f(xR);
  const fy = f(yR);
  const fz = f(zR);

  const L = Math.max(0, 116 * fy - 16);
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

// Direct sRGB to L*a*b*
export function rgbToLab(r, g, b) {
  const { x, y, z } = rgbToXyz(r, g, b);
  return xyzToLab(x, y, z);
}

// Calculate CIE76 Delta-E Color Difference (Perceptual Distance)
// Lower distance = closer color match
export function deltaE76(lab1, lab2) {
  const dL = lab1.L - lab2.L;
  const da = lab1.a - lab2.a;
  const db = lab1.b - lab2.b;
  return Math.sqrt(dL * dL + da * da + db * db);
}

// Calculate Euclidean RGB distance as secondary metric
export function rgbEuclideanDistance(c1, c2) {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

// Extract dominant representative color from a rectangular canvas region
// Filters out shadows (under-exposed) and highlights/specular glare
export function extractRegionColor(ctx, x, y, width, height) {
  const safeX = Math.max(0, Math.floor(x));
  const safeY = Math.max(0, Math.floor(y));
  const safeW = Math.max(1, Math.floor(width));
  const safeH = Math.max(1, Math.floor(height));

  const imgData = ctx.getImageData(safeX, safeY, safeW, safeH);
  const data = imgData.data;

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;
  let validPixelCount = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a < 128) continue; // skip transparent

    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

    // Glare / shadow filtering
    if (brightness < 20 || brightness > 248) {
      continue;
    }

    totalR += r;
    totalG += g;
    totalB += b;
    validPixelCount++;
  }

  // Fallback to simple average if all pixels were filtered out
  if (validPixelCount === 0) {
    for (let i = 0; i < data.length; i += 4) {
      totalR += data[i];
      totalG += data[i + 1];
      totalB += data[i + 2];
      validPixelCount++;
    }
  }

  const avgR = Math.round(totalR / validPixelCount);
  const avgG = Math.round(totalG / validPixelCount);
  const avgB = Math.round(totalB / validPixelCount);

  return {
    r: avgR,
    g: avgG,
    b: avgB,
    hex: rgbToHex(avgR, avgG, avgB)
  };
}

// Color temperature / White-balance correction
// If a reference white region is provided, scales RGB channels to neutralize cast
export function applyWhiteBalance(rgb, refWhite) {
  if (!refWhite || refWhite.r < 100 || refWhite.g < 100 || refWhite.b < 100) {
    return rgb;
  }
  const maxRef = Math.max(refWhite.r, refWhite.g, refWhite.b, 255);
  const scaleR = maxRef / Math.max(refWhite.r, 1);
  const scaleG = maxRef / Math.max(refWhite.g, 1);
  const scaleB = maxRef / Math.max(refWhite.b, 1);

  return {
    r: Math.min(255, Math.round(rgb.r * scaleR)),
    g: Math.min(255, Math.round(rgb.g * scaleG)),
    b: Math.min(255, Math.round(rgb.b * scaleB)),
    hex: rgbToHex(
      Math.min(255, Math.round(rgb.r * scaleR)),
      Math.min(255, Math.round(rgb.g * scaleG)),
      Math.min(255, Math.round(rgb.b * scaleB))
    )
  };
}

// Match measured color against a calibrated color palette using CIE L*a*b* Delta-E
// Supports continuous interpolation between the closest two color steps!
export function matchCalibratedColor(measuredRgb, palette) {
  const measuredLab = rgbToLab(measuredRgb.r, measuredRgb.g, measuredRgb.b);

  const scored = palette.map((item) => {
    const itemLab = rgbToLab(item.rgb.r, item.rgb.g, item.rgb.b);
    const distance = deltaE76(measuredLab, itemLab);
    return {
      ...item,
      distance
    };
  });

  scored.sort((a, b) => a.distance - b.distance);

  const bestMatch = scored[0];
  const secondMatch = scored[1];

  // Interpolation between closest two marks if they are adjacent values
  let interpolatedValue = bestMatch.value;
  if (
    secondMatch &&
    Math.abs(bestMatch.value - secondMatch.value) <= (bestMatch.stepSize || 1.5)
  ) {
    const totalDist = bestMatch.distance + secondMatch.distance;
    if (totalDist > 0) {
      // Inverse distance weighting
      const w1 = secondMatch.distance / totalDist;
      const w2 = bestMatch.distance / totalDist;
      interpolatedValue = parseFloat(
        (bestMatch.value * w1 + secondMatch.value * w2).toFixed(1)
      );
    }
  }

  // Calculate confidence score (0 to 100%)
  // Delta-E < 5 is almost imperceptible; > 30 is quite distinct
  const confidence = Math.max(
    10,
    Math.min(99, Math.round(100 - Math.min(bestMatch.distance, 45) * 2))
  );

  return {
    matchedItem: bestMatch,
    secondItem: secondMatch,
    interpolatedValue,
    confidence,
    measuredColorHex: rgbToHex(measuredRgb.r, measuredRgb.g, measuredRgb.b),
    calibratedColorHex: rgbToHex(bestMatch.rgb.r, bestMatch.rgb.g, bestMatch.rgb.b),
    deltaE: parseFloat(bestMatch.distance.toFixed(2))
  };
}
