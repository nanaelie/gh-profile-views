function generateSVG(label, count, color) {
  /*
  const padding = 10;
  const fontSize = 14;
  const charWidth = 8;

  const labelText = text.toString();
  const countText = count.toString();

  const labelWidth = labelText.length * charWidth + 2 * padding;
  const countWidth = countText.length * charWidth + 2 * padding;
  const width = labelWidth + countWidth;
  const height = 25;
  */
  return `<p><img src="https://img.shields.io/badge/${label.replace(' ', '_')}-${count}-${color}"/></p>`
  /*
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="border-radius:5px">
      <!-- Bloc titre -->
      <rect x="0" y="0" width="${labelWidth}" height="${height}" fill="${tbgcolor}" />
      <text 
        x="${labelWidth / 2}" 
        y="${height / 2 + fontSize / 2 - 2}" 
        fill="#fff" 
        font-size="${fontSize}px" 
        font-family="Arial" 
        font-weight="bold" 
        text-anchor="middle"
      >
        ${labelText}
      </text>

      <!-- Bloc compteur -->
      <rect x="${labelWidth}" y="0" width="${countWidth}" height="${height}" fill="${vbgcolor}" />
      <text 
        x="${labelWidth + countWidth / 2}" 
        y="${height / 2 + fontSize / 2 - 2}" 
        fill="#fff" 
        font-size="${fontSize}px" 
        font-family="Arial" 
        font-weight="bold" 
        text-anchor="middle"
      >
        ${countText}
      </text>
    </svg>
  `;*/
}

module.exports = generateSVG;
