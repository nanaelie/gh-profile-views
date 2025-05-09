const { save, remove, getViews } = require('../viewsService');
const generateSVG = require('../svgGenerator');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = new Date();
    const cutoff = new Date(now.getTime() - 60 * 60 * 1000);

    await remove(cutoff.getTime());
    await save(ip, now.getTime());
    const count = await getViews();

    const text = req.query.label || "Profile Views";
    const color = req.query.color;

    let tbgcolor = "orange", vbgcolor = "blue";
    if (color && color.includes('-')) {
      [tbgcolor, vbgcolor] = color.split('-');
    }

    const svg = generateSVG(text, count, tbgcolor, vbgcolor);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  } catch (error) {
    console.error('Erreur dans l’API counter :', error.message);
    res.status(500).send("Erreur serveur.");
  }
};

