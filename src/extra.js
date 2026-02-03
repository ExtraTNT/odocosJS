// Utility with useful extra functions.
// Random things found and copy pasted araound from projects

/**
 * Converts a base64 image to WebP
 * @param {string} base64 - The base64 image string
 * @param {number} quality - Quality between 0 and 1, default 0.8
 * @param {number} maxDimension - Maximum dimension (height) of the output image, default 0 (no limit)
 * @returns {Promise<string>}
 */
const base64ToWebP = async (base64, quality = 0.8, maxDimension = 0) => {
  const img = new Image();
  img.src = base64;

  await img.decode();

  let targetW = img.naturalWidth;
  let targetH = img.naturalHeight;
  if (maxDimension && maxDimension > 0) {
    // Cap HEIGHT (the shorter target in 1080p semantics) to maxDimension, scale WIDTH proportionally.
    const scale = Math.min(1, maxDimension / img.naturalHeight);
    targetH = Math.max(1, Math.round(img.naturalHeight * scale));
    targetW = Math.max(1, Math.round(img.naturalWidth * scale));
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const q = typeof quality === 'number' ? Math.max(0, Math.min(1, quality)) : 0.8;
  return canvas.toDataURL('image/webp', q);
};


export { base64ToWebP };