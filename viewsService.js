const pool = require('./db');

// Enregistrer une nouvelle IP si elle n'existe pas
async function save(ip, timestamp) {
  const client = await pool.connect();
  try {
    const { rowCount } = await client.query('SELECT 1 FROM views WHERE ip = $1', [ip]);
    if (rowCount === 0) {
      await client.query('INSERT INTO views (ip, timestamp) VALUES ($1, to_timestamp($2))', [ip, timestamp / 1000]);
    }
  } catch (err) {
    console.error('Erreur dans save:', err.message);
  } finally {
    client.release();
  }
}

// Supprimer les entrées dont le timestamp est inférieur à un seuil
async function remove(cutoff) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM views WHERE timestamp < to_timestamp($1)', [cutoff / 1000]);
  } catch (err) {
    console.error('Erreur dans remove:', err.message);
  } finally {
    client.release();
  }
}

// Récupérer le nombre de vues
async function getViews() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT COUNT(*) FROM views');
    return parseInt(res.rows[0].count, 10);
  } catch (err) {
    console.error('Erreur dans getViews:', err.message);
    return 0;
  } finally {
    client.release();
  }
}

module.exports = { save, remove, getViews };

