import axios from 'axios';
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();


router.get('/:categories_id', async (req: any, res: any) => {
    const categories_id = req.params.categories_id;
    const { query } = req.query;
    const type: string[]= ['track','artist','playlist','album']
    if (!categories_id) {
        return res.status(400).json({ error: 'ID de artista no proporcionado' });
    }
    try {
        const [categoryInfo, searchs] = await Promise.all([
            handleSpotifyRequest(`${process.env.urlSpotifyCategories}/${categories_id}`, req),
            handleSpotifyRequestSearchs(req, res, query, type)
        ]);
        res.json({
            categoryInfo,
            searchs
        });
    } catch (error: any) {
        console.error('Error al realizar las solicitudes a Spotify:', error);
        res.status(error.response.status || 500).json({ error: 'Error al realizar las solicitudes a Spotify' });
    }
});

export async function handleSpotifyRequest(url: string, req: any) {
    try {
        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';
        const responseSpotify = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${tokenSpotify}`
             }
        });
        
        return responseSpotify.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
            try {
                await getNewToken(); // Método para refrescar el token
                console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                // Volver a intentar la solicitud a Spotify
                return handleSpotifyRequest(url, req);
            } catch (refreshError) {
                console.error('Error al refrescar el token de acceso:', refreshError);
                throw new Error('Error al refrescar el token de acceso');
            }
        } else {
            console.error('Error al realizar la solicitud a Spotify en handleSpotifyRequest:', error);
            throw error;
        }
    }
}

export async function handleSpotifyRequestSearchs(req:any, res:any, query:any, type:string[]) {
    try { // Función para hacer la petición a spotify de búsqueda de artista
        const baseUrlSpotify = process.env.baseUrlSpotify || '';
        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';

        const responseSpotify = await axios.get(baseUrlSpotify, {
            params: {
                q: query,
                type: type.join(','),
                limit: 50
            },
            headers: {
                'Authorization': `Bearer ${tokenSpotify}`
             }
        });
        
        return responseSpotify.data;


    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
            try {
                await getNewToken(); // Método para refrescar el token
                console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                // Volver a intentar la solicitud a Spotify
                return handleSpotifyRequestSearchs(req, res, query, type);
            } catch (refreshError) {
                console.error('Error al refrescar el token de acceso:', refreshError);
                res.status(500).json({ error: 'Error al refrescar el token de acceso' });
            }
        } else {
            console.error('Error al realizar la solicitud a Spotify en handleSpotifyRequest:', error);
            res.status(error.response.status || 500).json({ error: 'Error al realizar la solicitud a Spotify' });
        }
    }
}


export async function getNewToken() {

    try {
        const clientId = process.env.clientId || '';
        const clientSecret = process.env.clientSecret || '';
        const baseUrlSpotifyToken = process.env.baseUrlSpotifyToken || '';
        // Realizar la solicitud para obtener un nuevo token de Spotify (utiliza tu lógica específica aquí)
        const authOptions = {
            url: baseUrlSpotifyToken,
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: 'grant_type=client_credentials'
        };
        // Realizar la solicitud para obtener el token de acceso de Spotify
        const response = await axios(authOptions);
        if (response.status === 200) {
            const token = response.data.access_token;

            dotenv.config();
            process.env.SPOTIFY_ACCESS_TOKEN = token;
            console.log('Token de acceso de Spotify guardado en.env:', token);
        } else {
            console.error('Error al obtener el token de acceso de Spotify:', response.status);
        }
    } catch (error: any) {
        console.error('Error al realizar la solicitud para obtener el token de acceso de Spotify:', error);
    } 
}
module.exports = router;