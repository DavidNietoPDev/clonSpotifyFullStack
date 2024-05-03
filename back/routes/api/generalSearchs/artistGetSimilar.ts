import axios from 'axios';
const router = require('express').Router();
require('dotenv').config();

router.get('/', async (req: any, res: any) => {
    try {
        const baseUrl = process.env.baseUrl || '';
        const { artist } = req.query;
        const response = await axios.get(baseUrl, {
            params: {
                method: 'artist.getSimilar',
                artist: artist,
                autocorrect: 1,
                api_key: process.env.apiKey,
                format: 'json'
            }
        });
        res.json(response.data.similarartists);

    } catch (error) {
        console.error('Error al realizar la búsqueda de artistas', error);
        res.status(500).json({ error: 'Error al buscar artistas' });
    }
});

module.exports = router;