import axios from 'axios';
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();


router.get('/', async (req: any, res: any) => {

    try {

        await handleSpotifyRequest(req, res);

    } catch (error:any) {
        console.log(error)
    }
});

export async function handleSpotifyRequest(req:any, res:any) {
    try { // Función para hacer la petición a spotify de búsqueda de artista


        const baseUrlSpotify = process.env.baseUrlSpotify || '';
        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';
        
        const responseSpotify = await axios.get(baseUrlSpotify, {
            params: {
                q: 'Top mundial',
                type: 'playlist',
                limit: 50
            },
            headers: {
                'Authorization': `Bearer ${tokenSpotify}`
             }
        });
        
        res.json(responseSpotify.data);


    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
            try {
                await getNewToken(); // Método para refrescar el token
                console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                // Volver a intentar la solicitud a Spotify
                return handleSpotifyRequest(req, res);
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
    axios(authOptions)
        .then(response => {
            if (response.status === 200) {
                const token = response.data.access_token;

                dotenv.config();
                process.env.SPOTIFY_ACCESS_TOKEN = token;
                console.log('Token de acceso de Spotify guardado en.env:', token);
            } else {
                console.error('Error al obtener el token de acceso de Spotify:', response.status);
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud para obtener el token de acceso de Spotify:', error);
        });

}




module.exports = router;