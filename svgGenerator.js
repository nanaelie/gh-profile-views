function generateSVG(label, count, color) {
  const labelText = label;
  const countText = count.toString();

  const labelWidth = labelText.length * 7 + 10;
  const countWidth = countText.length * 7 + 10;
  const totalWidth = labelWidth + countWidth;
  const height = 20;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" style="border-radius: 6px;">
  <rect x="0" y="0" width="${labelWidth}" height="${height}" fill="#555" />
  <rect x="${labelWidth}" y="0" width="${countWidth}" height="${height}" fill="${color}" />

  <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Arial" font-size="12" text-anchor="middle">${labelText}</text>
  <text x="${labelWidth + countWidth / 2}" y="14" fill="#fff" font-family="Arial" font-size="12" text-anchor="middle">${countText}</text>
</svg>
  `;
}

module.exports = generateSVG;
