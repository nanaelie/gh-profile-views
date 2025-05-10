/*function generateSVG(label, count, color) {
  const labelText = label;
  const countText = count.toString();

  const labelWidth = labelText.length * 7 + 10;
  const countWidth = countText.length * 7 + 10;
  const totalWidth = labelWidth + countWidth;
  const height = 20;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" border-radius="8px">
  <!-- Label background -->
  <rect x="0" y="0" width="${labelWidth}" height="${height}" fill="#555" />
  <!-- Count background -->
  <rect x="${labelWidth}" y="0" width="${countWidth}" height="${height}" fill="${color}" />

  <!-- Label text -->
  <text x="${labelWidth / 2}" y="14" fill="#fff" font-family="Arial" font-size="12" text-anchor="middle">${labelText}</text>
  
  <!-- Count text -->
  <text x="${labelWidth + countWidth / 2}" y="14" fill="#fff" font-family="Arial" font-size="12" text-anchor="middle">${countText}</text>
</svg>
  `;
}

module.exports = generateSVG;
*/

function generateSVG(label, count, color) {
  const labelText = label;
  const countText = count.toString();
  const combinedText = `${labelText}: ${countText}`;

  const width = combinedText.length * 7 + 20;
  const height = 25;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="black" flood-opacity="0.3"/>
    </filter>
  </defs>

  <g filter="url(#shadow)">
    <!-- Background with full border-radius -->
    <rect x="0" y="0" width="${width}" height="${height}" rx="8" ry="8" fill="${color}" />

    <!-- Text centered -->
    <text x="${width / 2}" y="${height / 2 + 4}" fill="#fff" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">
      ${combinedText}
    </text>
  </g>
</svg>
  `;
}

