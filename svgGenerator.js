function generateSVG(text, count, tbgcolor, vbgcolor) {
  const labelWidth = text.length * 10 + 10;
  const countWidth = count.toString().length * 10 + 10;
  const width = labelWidth + countWidth;
  const height = 25;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" style="border-radius:5px">
        <rect x="0" y="0" width="${label_width}" height="${h}" fill="${tbgcolor}" />
        <text x="${label_width / 2}" y="${h / 2 + 5}" fill="${tfgcolor}" font-size="${font_size}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
            ${label_text}
        </text>

        <rect x="${label_width}" y="0" width="${count_width}" height="${h}" fill="${vbgcolor}" />
        <text x="${label_width + count_width / 2}" y="${h / 2 + 5}" fill="${vfgcolor}" font-size="${font_size}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="middle">
           ${count_text}
        </text>
    </svg>
  `;
}

module.exports = generateSVG;

