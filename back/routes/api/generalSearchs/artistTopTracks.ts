import axios from 'axios';
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();


//Para buscar un artista y en la respuesta sale una lista con lo que se 
//ha buscado en el nombre, la coincidencia exacta saldrá primero

router.get('/', async (req: any, res: any) => {
    const { artist } = req.query;
    const type = 'track';
        try {
            
            await handleSpotifyRequest(req, res, artist, type);

        } catch (error:any) {
            console.log(error)
            
            
        }
    });



// router.get('/', async (req: any, res: any) => {
//     try {
//         const { artist } = req.query;
//         const baseUrl = process.env.baseUrl || '';
//         const response = await axios.get(baseUrl, {
//             params: {
//                 method: 'artist.getTopTracks',
//                 artist: artist,
//                 autocorrect: 1,
//                 api_key: process.env.apiKey,
//                 format: 'json'
//             }
//         });
//         if (response.data.error) {
//             return res.status(404).json({ error: 'El artista no pudo ser encontrado' });
//         }

//         //Recogemos las URLs de las canciones en base a la respuesta 
//         const urls = response.data.toptracks.track.map((track: any) => track.url);
//         //Usamos la función de scrapear la imagen de la canción
//         const images = await scrapeImagesTracks(urls)
//               //itera sobre cada pista en el array track de la respuesta de la API. 
//         //map() es un método de array que recorre cada elemento y devuelve un nuevo array con los resultados de llamar a una función dada en cada elemento
//         const topTracksWithImages = response.data.toptracks.track.map((track: any, index: number) => {
//             return {
//                 ...track,                       //...track: Esto copia todas las propiedades de la pista actual (track) en un nuevo objeto. 
//                                                 //... es el operador de propagación de objetos de JavaScript, que permite copiar todas las propiedades de un objeto a otro.
//                 images: images[index]
//                 //Esto agrega una nueva propiedad llamada images al objeto de la pista actual y le asigna el valor de la imagen correspondiente 
//                 //del array images basado en el mismo índice
//             };
//         });

//         res.json(topTracksWithImages);
        
//     } catch (error) {
//         console.error('Error al realizar la búsqueda de artistas', error);
//         res.status(500).json({ error: 'Error al buscar artistas' });
//     }
// });


// export async function scrapeImagesTracks(urls: string[]) {
//     const images: string[][] = [];
//     for (const url of urls) {
//         try {
//             // Realizar solicitud HTTP a la URL de la canción
//             const response = await axios.get(url);
//             const htmlContent = response.data;

//             // Cargar el contenido HTML en Cheerio
//             const $ = cheerio.load(htmlContent);

//             // Realizar el scraping para extraer la URL de la imagen de la canción
//             const randomIndex = Math.floor(Math.random() * 3);
//             const imageUrl = $('.js-video-preview-playlink img.video-preview').first().attr('src');
//             const imageUrl2 = $('a.gallery-preview-image--' + randomIndex + ' img').attr('src');
//             if (imageUrl) {
//                 images.push([imageUrl]); // Usar un array de una sola imagen
//             } else if (imageUrl2){
//                 images.push([imageUrl2]);
//                 console.log('Usando imagen por defecto', url)
//              } else {
//                 console.error('No se encontró la URL de la imagen en la página:', url);
//                 images.push([]);
//              }// Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error) {
//             console.error('Error al realizar la solicitud a la URL:', url, error);
//             images.push([]);
//         }
//     }
//     return images;
// }


export async function handleSpotifyRequest(req:any, res:any, artist:any, type:any) {
    try { // Función para hacer la petición a spotify de búsqueda de artista
        const baseUrlSpotify = process.env.baseUrlSpotify || '';
        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';

        const responseSpotify = await axios.get(baseUrlSpotify, {
            params: {
                q: artist,
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
                return handleSpotifyRequest(req, res, artist, type);
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