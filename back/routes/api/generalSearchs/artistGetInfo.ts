import axios from 'axios';
const router = require('express').Router();
const cheerio = require('cheerio');
require('dotenv').config();


router.get('/', async (req: any, res: any) => {
    try {
        const { artist } = req.query;
        const lastFmBaseUrl = process.env.baseUrl || '';
        const response = await axios.get(lastFmBaseUrl, {
            params: {
                method: 'artist.getInfo',
                artist: artist,
                autocorrect: 1,
                api_key: process.env.apiKey,
                format: 'json'
            }
        });

        const mbid = response.data.artist.mbid;
        const artista = response.data.artist.name;
        
        const imageUrl = await getArtistImage(mbid, artista);

        //Combina los datos del artista con la URL de la imagen y envía la respuesta
        const responseData = {
            artistData: response.data,
            imageUrl: imageUrl
        };
        res.json(responseData);
    } catch (error) {
        console.error('Error al realizar la búsqueda del artista:', error);
        res.status(500).json({ error: 'Error al buscar el artista' });
    }
});

async function getArtistImage(mbid: string, artist: string): Promise<string> {
    try {
        const url:any = `${process.env.baseUrlImage}${artist}${'/+images/'}${mbid}`;
        const response = await axios.get(url);
        console.log(url);
        const $ = cheerio.load(response.data);
        const imageUrl = $('.js-gallery-image').attr('src');
        console.log(imageUrl);
        return imageUrl || '';
    } catch (error) {
        console.error('Error al obtener la imagen del artista desde Last.fm:', error);
        return ''; // Retorna una cadena vacía en caso de error
    }
}


module.exports = router;