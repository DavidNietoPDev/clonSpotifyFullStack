import axios from 'axios';
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();



//Para buscar un artista y en la respuesta sale una lista con lo que se 
//ha buscado en el nombre, la coincidencia exacta saldrá primero
router.get('/', async (req: any, res: any) => {
    const { query } = req.query;
    const type = 'artist';
        try {
            
            await handleSpotifyRequest(req, res, query, type);

        } catch (error:any) {
            console.log(error)                    
        }
    });

// async function getArtistImage(mbids: string[], artists: string[]) {
//     const images: string[][] = [];
//     const mbides: string[] = [];
//     let count: number = 0;
//     let url: any;
//     for (const mbide of mbids) {
//         mbides.push(mbide);
//         count++;
//     }
//     for (const artist of artists) {
//         try {
//             const artistFormatted = artist.replace(/\s+/g, '+');
//             url = `${process.env.baseUrlImage}${artistFormatted}${'/+images/'}${mbides[count]}`;
//             const response = await axios.get(url);
//             if (response.status === 200) {
//                 const $ = cheerio.load(response.data);
//                 const imageUrl = $('.js-gallery-image').attr('src');
//                 if (imageUrl) {
//                     images.push([imageUrl]); // Usar un array de una sola imagen
//                 } else {
//                     console.error('No se encontró la URL de la imagen en la página:', url);
//                     images.push([]);
//                 }
//             } else {
//                 console.error('La solicitud a la URL falló con el estado: ', response.status);
//                 images.push([]);
//             } // Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error: any) {
//             if (error.response && error.response.status === 404) {
//                 console.error('La URL solicitada no fue encontrada:', url);
//                 images.push([]);
//             } else if (error.code === 'ENOTFOUND') {
//                 console.error('No se pudo conectar al servidor:', error);
//                 images.push([]);
//             } else {
//                 console.error('Otro error durante la solicitud:', error);
//                 images.push([]);
//             }
//         }
//     }
//     return images;
// }

export async function handleSpotifyRequest(req:any, res:any, query:any, type:any) {
    try { // Función para hacer la petición a spotify de búsqueda de artista
        const baseUrlSpotify = process.env.baseUrlSpotify || '';
        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';

        const responseSpotify = await axios.get(baseUrlSpotify, {
            params: {
                q: query,
                type: type,
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
                return handleSpotifyRequest(req, res, query, type);
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