const express = require('express');
const { save, remove, getViews } = require('./viewsService');
const generateSVG = require('./svgGenerator');

const app = express();
app.use(express.json());

app.get('/counter', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = new Date();
    const cutoff = new Date(now.getTime() - 60 * 60 * 1000);
    
    await remove(cutoff.getTime());
    await save(ip, now.getTime());
    const count = await getViews();

    const text = req.query.label || "Profile Views";
    const color = req.query.color;

    let tbgcolor, vbgcolor;
    if (color && color.includes('-')) {
      [tbgcolor, vbgcolor] = color.split('-');
    } else {
      tbgcolor = "orange";
      vbgcolor = "blue";
    }

    const svg = generateSVG(text, count, tbgcolor, vbgcolor);

    console.log(svg);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
    
  } catch (error) {
    console.error('Erreur dans la route "/counter":', error.message);
    res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}`);
});

